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
