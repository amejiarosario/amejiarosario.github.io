const http = require('http');

const port = 1777;
const host = '127.0.0.1';

const proxy = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(`Hello World from Node! You used url "${req.url}"\r\n`);
});

proxy.listen(port, host, () => {
  console.log(`Server running on http://${host}:${port}`);
});
