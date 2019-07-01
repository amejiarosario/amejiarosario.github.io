const fs = require('fs');

console.time('readFileSync');

for (let x = 0; x < 10; x++) {
  const largeFile = fs.readFileSync('/users/admejiar/Downloads/Docker.dmg');
  console.log(`File size#${x}: ${Math.round(largeFile.length / 1e6)} MB`);
}

const data = fs.readFileSync('./file.txt', 'utf-8'); // blocks here until file is read
console.log('file.txt data: ', data.trim());

console.timeEnd('readFileSync');
