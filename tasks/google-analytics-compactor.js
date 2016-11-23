// const recent = require('./data/pageviews-28daysAgo-yesterday.json');
// const total = require('./data/pageviews-2011-06-10-yesterday.json');

const url = require('url');
const fs = require('fs');
const path = require('path');

const postsPath = path.join(__dirname, '..', 'source', '_posts');
console.log(postsPath);

function parseGa(data){
  let hash = new Map();

  for(const row of data.rows) {
    const [pagePath, bounceRate, pageviews, avgTimeOnPage] = row;
    const urlParsed = url.parse(pagePath);
    const key = urlParsed.pathname.replace(/\/blog\/\d{4}\/\d{2}\/\d{2}\//,'').split(/\//)[0];
    // console.log(pagePath, pageviews);

    if(hash.get(key)) {
      console.log('[dedup] aggregating... ', urlParsed.path);
      let t = hash.get(key);
      t.alternatives = [] || t.alternatives;
      t.alternatives.push(urlParsed.query);
      t.bounceRate = parseFloat(t.bounceRate, 10) + parseFloat(bounceRate, 10);
      t.pageviews = parseFloat(t.pageviews, 10) + parseFloat(pageviews, 10);
      t.avgTimeOnPage = parseFloat(t.avgTimeOnPage, 10) + parseFloat(avgTimeOnPage, 10);

      hash.set(key, t);
    } else {
      hash.set(key, {
        bounceRate,
        pageviews,
        avgTimeOnPage
      });
    }
  }

  // console.log(hash);
  return hash;
}

function updateBlog(recent, total) {
  return new Promise((resolve, reject) => {

    fs.readdir(postsPath, (err, files) => {
      console.error(err);
      reject(err);

      for(const file of files) {
        const [filename, ext] = file.split('.');
        const key = filename.replace(/\d{4}-\d{2}-\d{2}-/, '');
        const gaRecent = recent.get(key);
        const gaTotal = total.get(key);

        if(gaRecent || gaTotal) {
          const fullPath = path.join(postsPath, file);
          console.log(fullPath);
          fs.readFile(fullPath, 'utf-8', (err, content) => {
            if(gaRecent) {
              content = content.replace(/pageviews__recent:\s\d*\n/, `pageviews__recent: ${gaRecent.pageviews}\n`);
            }

            if(gaTotal) {
              content = content.replace(/pageviews__total:\s\d*\n/, `pageviews__total: ${gaTotal.pageviews}\n`);
              content = content.replace(/pageviews__avg_time:\s\d*\n/, `pageviews__avg_time: ${Math.round(gaTotal.avgTimeOnPage)}\n`);
            }

            fs.writeFile(fullPath, content, (err) => {
              if(err){
                console.error(err);
                reject(err)
              } else {
                console.log('wrote successful: ', content.length);
              }
            });
          });
        }
      }

      resolve(`${files.length} updated`);
    });

  });
}

/**
 * Update blogs total and recent pageviews
 * @param recentPath
 * @param totalPath
 */
function pageViewsBlogUpdater(recentPath, totalPath) {
  const recent = require(recentPath);
  const total = require(totalPath);

  return updateBlog(parseGa(recent), parseGa(total));
}

module.exports = pageViewsBlogUpdater;
