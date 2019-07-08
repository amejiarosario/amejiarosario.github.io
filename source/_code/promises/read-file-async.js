const fs = require('fs');

const readfileAsync = filename => new Promise((resolve, reject) => {
  fs.readFile(filename, (error, content) => {
    if (error) { reject(error); }
    resolve(content);
  });
});

readfileAsync('./file.txt')
  .then(content => console.log(`${content.length}: ${content}`))
  .catch(error => console.error(`ERROR: ${error}`));
