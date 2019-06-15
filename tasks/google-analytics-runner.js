const downloadData = require('./google-analytics-collector');
const pp = require('./post-processor');

async function main() {
  const [totalPath, recentPath] = await Promise.all([
    downloadData(),
    downloadData('28daysAgo'),
  ]);
  return pp.updatePosts(recentPath, totalPath);
}

main()
  .then(() => console.log('Done!'))
  .catch(console.error);

// const pageViewsBlogUpdater = require('./google-analytics-compactor');

// downloadData().then((totalPath) => {
//   console.log({ totalPath });

//   return downloadData('28daysAgo').then((recentPath) => {
//     console.log({ recentPath });
//     return pageViewsBlogUpdater(recentPath, totalPath);
//   });
// }).then((updated) => {
//   console.log(updated);
// }).catch((err) => {
//   console.error(err);
// });
