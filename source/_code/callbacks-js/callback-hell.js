const fs = require('fs');

const dir = '/Users/admejiar/Code';

function printFilesSize(basePath) {
  fs.readdir(basePath, (err, files) => {
    if (err) {
      console.log(`Error finding files: ${err}`);
    } else {
      files.forEach((filename) => {
        const filePath = `${basePath}/${filename}`;

        fs.lstat(filePath, (err, stat) => {
          if (err) { console.error(err); }
          if (stat.isFile()) {
            console.log(filePath, stat.size.toLocaleString());
          }
        });
      });
    }
  });
}

printFilesSize(dir);
