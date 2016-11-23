const downloadData = require('./google-analytics-collector');
const pageViewsBlogUpdater = require('./google-analytics-compactor');

downloadData().then(function (totalPath) {
  console.log(totalPath);

  return downloadData('28daysAgo').then(function (recentPath) {

    console.log(recentPath);
    return pageViewsBlogUpdater(recentPath, totalPath)
  });
}).then(function (updated) {
  console.log(updated);
}).catch(function (err) {
  console.error(err);
});
