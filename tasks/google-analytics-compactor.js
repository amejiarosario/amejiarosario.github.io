const url = require('url');
const fs = require('fs');
const path = require('path');

const postsPath = path.join(__dirname, '..', 'source', '_posts');
console.log(postsPath);

function parseGa(data) {
  const hash = new Map();

  for (const row of data.rows) {
    const [pagePath, bounceRate, pageviews, avgTimeOnPage] = row;
    const urlParsed = url.parse(pagePath);
    const postName = urlParsed.pathname.replace(/\/blog\/\d{4}\/\d{2}\/\d{2}\//, '').split(/\//)[0];
    // console.log(pagePath, pageviews);

    if (!postName) {
      // console.error('No key!! ', key, pagePath);
      continue;
    }

    const key = postName.toLowerCase();

    if (hash.get(key)) {
      // console.log('[dedup] aggregating... ', pagePath);
      const t = hash.get(key);
      // t.alternatives = t.alternatives || [];
      // t.alternatives.push(urlParsed.query);
      t.bounceRate = parseFloat(t.bounceRate, 10) + parseFloat(bounceRate, 10);
      t.pageviews = parseFloat(t.pageviews, 10) + parseFloat(pageviews, 10);
      t.avgTimeOnPage = parseFloat(t.avgTimeOnPage, 10) + parseFloat(avgTimeOnPage, 10);

      hash.set(key, t);
    } else {
      hash.set(key, {
        bounceRate,
        pageviews,
        avgTimeOnPage,
      });
    }
    // console.log('data: ', key, hash.get(key));
  }

  // console.log(hash);
  return hash;
}

function updateBlog(recent, total) {
  // console.log({recent, total});

  return new Promise((resolve, reject) => {
    fs.readdir(postsPath, (err, files) => {
      if (err) {
        console.error({ err });
        reject(err);
        return;
      }

      for (const file of files) {
        const [filename, ext] = file.split('.');
        const key = filename.replace(/\d{4}-\d{2}-\d{2}-/, '').toLowerCase();
        const gaRecent = recent.get(key);
        const gaTotal = total.get(key);

        if (gaRecent || gaTotal) {
          const fullPath = path.join(postsPath, file);

          fs.readFile(fullPath, 'utf-8', (error, content) => {
            if (error) {
              console.error({ error });
              reject(error);
            }
            console.log({ fullPath, key, gaRecent, gaTotal });

            if (gaTotal) {
              content = content.replace(/pageviews__total:\s+\d*\n/, `pageviews__total: ${gaTotal.pageviews}\n`);
              content = content.replace(/pageviews__avg_time:\s+\d*\n/, `pageviews__avg_time: ${Math.round(gaTotal.avgTimeOnPage)}\n`);
              // console.log('\tgaTotal.pageviews', gaTotal.pageviews);
              // console.log('\tgaTotal.avgTimeOnPage', gaTotal.avgTimeOnPage);
            }

            if (gaRecent) {
              content = content.replace(/pageviews__recent:\s+\d*\n/, `pageviews__recent: ${gaRecent.pageviews}\n`);
              // console.log('\tgaRecent.pageviews', gaRecent.pageviews);

              // total might contain sampled data which will make it less accurate
              // https://developers.google.com/analytics/devguides/reporting/core/v3/reference#samplingLevel
              if (+gaRecent.pageviews > +gaTotal.pageviews) {
                content = content.replace(/pageviews__total:\s+\d*\n/, `pageviews__total: ${gaRecent.pageviews}\n`);
              }
            }

            fs.writeFile(fullPath, content, (err) => {
              if (err) {
                console.error(err);
                reject(err);
              } else {
                console.log(`\twrote successful: ${key}`); // ${content.length} on
                console.log(`\tcontent: ${content.length} - ${content.substring(0, 300)}`);
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

function tester() {
  const recentPath = './data/pageviews-28daysAgo-yesterday-1548368649582.json';
  const totalPath = './data/pageviews-2011-06-10-yesterday-1548368648808.json';

  pageViewsBlogUpdater(recentPath, totalPath);

  // const recent = require(recentPath);
  // const total = require(totalPath);

  // parseGa(recent);
  // parseGa(total);
}

tester();
