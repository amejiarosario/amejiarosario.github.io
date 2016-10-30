const recent = require('./data/pageviews-28daysAgo-yesterday.json');
const total = require('./data/pageviews-2011-06-10-yesterday.json');
const url = require('url');
const fs = require('fs');

const postsPath = '../source/_posts/';

function parseGaData(data){
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

function updateBlog(hash) {
  fs.readdir(postsPath, (err, files) => {
    console.log(err);
    for(const file of files) {
      const [filename, ext] = file.split('.');
      const key = filename.replace(/\d{4}-\d{2}-\d{2}-/, '');
      console.log(hash.get(key));
      if(hash.get(key)){

      }
    }
  });
}


const recentGa = parseGaData(recent);
updateBlog(recentGa);
