var google = require('googleapis');
// var analyticsreporting = google.analyticsreporting('v4');
var https = require('https');
var fs = require('fs');

// http://stackoverflow.com/questions/24918629/inserting-an-event-with-the-nodejs-google-calendar-api-returns-400-missing-end

const SCOPES = ['https://www.googleapis.com/auth/analytics.readonly'];
const DISCOVERY_URI = 'https://analyticsreporting.googleapis.com/$discovery/rest';
const KEY_FILE_LOCATION = '/Users/admejiar/Dropbox/keys/MyProject-625a1c430e16.p12';
const SERVICE_ACCOUNT_EMAIL = 'analytics@global-student-137718.iam.gserviceaccount.com';
const VIEW_ID = '58359416';
const startDate = '28daysAgo';
// const startDate = '2011-06-10';
const endDate = 'yesterday';

var url = `https://www.googleapis.com/analytics/v3/data/ga?ids=ga%3A58359416&start-date=${startDate}&end-date=${endDate}&metrics=ga%3AbounceRate%2Cga%3Apageviews%2Cga%3AavgTimeOnPage&dimensions=ga%3ApagePath&sort=-ga%3Apageviews&access_token=`;

var authClient = new google.auth.JWT(
  SERVICE_ACCOUNT_EMAIL,
  KEY_FILE_LOCATION,
  null,
  SCOPES
);

authClient.authorize(function(err, token) {
  if(err){
       console.log('--- Google Error --- ',err);
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
      console.log('.');
      // console.log(JSON.stringify(d, null, 2));
      body.push(d);
    });

    res.on('end', (d) => {
      console.log('----- FINISHED -----');
      fs.writeFile(`data/pageviews-${startDate}-${endDate}.json`, body.join(""), function(err) {
          if(err) {
              return console.log(err);
          }
          console.log("The file was saved!");
      });
    })
  }).on('error', (e) => {
    console.error(e);
  });
});
