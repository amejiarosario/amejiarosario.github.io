const fs = require('fs');
const path = require('path');

const fsPromises = fs.promises;
const POST_PATH = path.join(__dirname, '..', 'source', '_posts');

// sanitize filename (lowercase, remove date)
function sanitize(filename) {
  const [name] = filename.split('.');
  return name.replace(/\d{4}-\d{2}-\d{2}-/, '').toLowerCase();
}

function findPostInGa(postNames, data) {
  return data.rows.reduce((map, row) => {
    const [pagePath, bounceRate, pageviews, avgTimeOnPage] = row;
    const index = postNames.findIndex(pn => pagePath.toLowerCase().includes(pn));
    if (index > -1) {
      map[postNames[index]] = map[postNames[index]] || {
        pageviews: 0,
        bounceRate: 100,
        avgTimeOnPage: 0,
        ga: [],
        paths: [],
      };
      const post = map[postNames[index]];
      post.pageviews += parseInt(pageviews, 10);
      post.bounceRate = parseInt(Math.min(post.bounceRate, +bounceRate), 10);
      post.avgTimeOnPage = parseInt(Math.max(post.avgTimeOnPage, +avgTimeOnPage), 10);
      post.paths.push(pagePath);
      post.ga.push(row);
    }
    return map;
  }, {});
}

// use sanitize filename to match google analytics data
// merge results
async function matchGoogleAnalytics(postNames, recentPath, totalPath) {
  const [recent, total] = await Promise.all([
    fsPromises.readFile(recentPath),
    fsPromises.readFile(totalPath),
  ]);

  const recentData = findPostInGa(postNames, JSON.parse(recent));
  const totalData = findPostInGa(postNames, JSON.parse(total));
  return { recentData, totalData };
}

async function writeToPosts(files, { recentData, totalData }) {
  return Promise.all(files.map(async (fileName) => {
    const key = sanitize(fileName);
    const gaRecent = recentData[key];
    const gaTotal = totalData[key];

    if (!(gaRecent || gaTotal)) { return; }

    const fullPath = path.join(POST_PATH, fileName);
    let content = await fsPromises.readFile(fullPath, 'utf-8');

    if (gaTotal) {
      content = content.replace(/pageviews__total:\s+\d*\n/, `pageviews__total: ${gaTotal.pageviews}\n`);
      content = content.replace(/pageviews__avg_time:\s+\d*\n/, `pageviews__avg_time: ${gaTotal.avgTimeOnPage}\n`);
    }

    if (gaRecent) {
      content = content.replace(/pageviews__recent:\s+\d*\n/, `pageviews__recent: ${gaRecent.pageviews}\n`);
      // total might contain sampled data which will make it less accurate
      // https://developers.google.com/analytics/devguides/reporting/core/v3/reference#samplingLevel
      if (+gaRecent.pageviews > +gaTotal.pageviews) {
        content = content.replace(/pageviews__total:\s+\d*\n/, `pageviews__total: ${gaRecent.pageviews}\n`);
      }
    }

    await fsPromises.writeFile(fullPath, content);
  }));
}

async function updatePosts(
  recentPath = './data/pageviews-28daysAgo-yesterday-1560610123559.json',
  totalPath = './data/pageviews-2011-07-12-yesterday-1560610122947.json',
) {
  // get list of posts filename
  const filenames = await fsPromises.readdir(POST_PATH);
  const postFiles = filenames.map(f => sanitize(f));
  const map = await matchGoogleAnalytics(postFiles, recentPath, totalPath);
  await writeToPosts(filenames, map);
  // console.log(JSON.stringify(map.recentData, null, 2));
}

updatePosts();

module.exports = {
  sanitize,
  findPostInGa,
  updatePosts,
};
