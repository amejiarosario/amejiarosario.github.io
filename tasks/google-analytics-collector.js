var google = require('googleapis');
// var analyticsreporting = google.analyticsreporting('v4');
var https = require('https');
var fs = require('fs');

// const startDate = '28daysAgo';
// // const startDate = '2011-06-10';
// const endDate = 'yesterday';

// https://ga-dev-tools.appspot.com/query-explorer/?start-date=30daysAgo&end-date=yesterday&metrics=ga%3AbounceRate%2Cga%3Apageviews%2Cga%3AavgTimeOnPage&dimensions=ga%3ApagePath&sort=-ga%3Apageviews
// https://adrianmejia.com/blog/2011/07/12/how-to-set-up-samba-in-ubuntu-linux-and-access-it-in-mac-os-and-windows/
/**
 * Download googgle analytics data into a JSON file
 *
 * @param startDate {string} defaults to '2011-06-10' could be a relative time too like '28daysAgo'
 * @param endDate {string} defaults to 'yesterday'
 * @returns {*}
 */
function downloadFiles(startDate = '2011-07-12', endDate = 'yesterday') {

  // const DISCOVERY_URI = 'https://analyticsreporting.googleapis.com/$discovery/rest';
  // const VIEW_ID = '58359416';
  // http://stackoverflow.com/questions/24918629/inserting-an-event-with-the-nodejs-google-calendar-api-returns-400-missing-end
  const SCOPES = ['https://www.googleapis.com/auth/analytics.readonly'];
  const KEY_FILE_LOCATION = '/Users/admejiar/Dropbox/keys/MyProject-625a1c430e16.p12';
  const SERVICE_ACCOUNT_EMAIL = 'analytics@global-student-137718.iam.gserviceaccount.com';
  const url = `https://www.googleapis.com/analytics/v3/data/ga?ids=ga%3A58359416&start-date=${startDate}&end-date=${endDate}&metrics=ga%3AbounceRate%2Cga%3Apageviews%2Cga%3AavgTimeOnPage&dimensions=ga%3ApagePath&sort=-ga%3Apageviews&samplingLevel=higher_precision&include-empty-rows=false&access_token=`;

  const authClient = new google.auth.JWT(SERVICE_ACCOUNT_EMAIL, KEY_FILE_LOCATION, null, SCOPES);

  return new Promise(function(resolve, reject){
    authClient.authorize(function(err, token) {
      if (err) {
        console.log('--- Google Error --- ', err);
        reject(err);
        return;
      }

      console.log('Token: ', token);
      var req = url + token.access_token;
      console.log(req);

      https.get(req, (res) => {
        let body = [];
        console.log('statusCode: ', res.statusCode);
        console.log('headers: ', res.headers);

        res.on('data', (d) => {
          // process.stdout.write(d);
          process.stdout.write('.');
          // console.log(JSON.stringify(d, null, 2));
          body.push(d);
        });

        res.on('end', (d) => {
          console.log('----- FINISHED -----');
          const  filename = `./data/pageviews-${startDate}-${endDate}-${+new Date()}.json`;
          fs.writeFile(filename, body.join(""), function(err) {
            if (err) {
              return console.log(err);
            }
            console.log(`The file was saved to ${filename}`);

            resolve(filename);
          });
        })
      }).on('error', (e) => {
        console.error(e);
        reject(err);
      });
    });
  });
}

module.exports = downloadFiles;
