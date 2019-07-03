const fs = require('fs');

const dir = '/Users/admejiar/Code';

function printFileSize(filePath) {
  fs.lstat(filePath, (err, stat) => {
    if (err) { console.error(err); }
    if (stat.isFile()) {
      console.log(filePath, stat.size.toLocaleString());
    }
  });
}

function printFilesSize(files, basePath) {
  files.forEach((filename) => {
    const filePath = `${basePath}/${filename}`;

    printFileSize(filePath);
  });
}

function printFilesSizeFromDirectory(basePath) {
  fs.readdir(basePath, (err, files) => {
    if (err) {
      console.log(`Error finding files: ${err}`);
    } else {
      printFilesSize(files, basePath);
    }
  });
}

printFilesSizeFromDirectory(dir);
