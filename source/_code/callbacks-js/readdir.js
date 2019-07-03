const fs = require('fs');

fs.readdir('/Users/adrian/Code', (error, files) => {
  if (error) { console.error(error); }
  console.log(files);
});
