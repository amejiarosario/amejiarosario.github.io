const downloadData = require('./google-analytics-collector');
const pageViewsBlogUpdater = require('./google-analytics-compactor');

downloadData().then((totalPath) => {
  console.log({ totalPath });

  return downloadData('28daysAgo').then((recentPath) => {
    console.log({ recentPath });
    return pageViewsBlogUpdater(recentPath, totalPath);
  });
}).then((updated) => {
  console.log(updated);
}).catch((err) => {
  console.error(err);
});
