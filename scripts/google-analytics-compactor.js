const recent = require('./data/pageviews-28daysAgo-yesterday.json');
const total = require('./data/pageviews-2011-06-10-yesterday.json');
const url = require('url');
const fs = require('fs');

const postsPath = '../source/_posts/';

function parseGaData(data){
  let hash = {};

  for(const row of data.rows) {
    const [pagePath, bounceRate, pageviews, avgTimeOnPage] = row;
    const key = url.parse(pagePath);
    // console.log(pagePath, pageviews);

    if(hash[key.pathname]){
      console.log('[dedup] aggregating... ', key.path);
      let t = hash[key.pathname];
      t.alternatives = [] || t.alternatives;
      t.alternatives.push(key.query);
      t.bounceRate = parseFloat(t.bounceRate, 10) + parseFloat(bounceRate, 10);
      t.pageviews = parseFloat(t.pageviews, 10) + parseFloat(pageviews, 10);
      t.avgTimeOnPage = parseFloat(t.avgTimeOnPage, 10) + parseFloat(avgTimeOnPage, 10);
    } else {
      hash[key.pathname] = {
        bounceRate,
        pageviews,
        avgTimeOnPage
      }
    }
  }
  // console.log(hash);
}

function updateBlog(hash){
  fs.readdir(postsPath, (err, files) => {
    console.log(err);
    files.forEach(file => {
      console.log(file);
    });
  });
}


const recentGa = parseGaData(recent);
updateBlog(recentGa);
