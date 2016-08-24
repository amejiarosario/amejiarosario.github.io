---
layout: post
title: Building a Node.js static file server (files over HTTP) using ES6+
comments: true
toc: true
pageviews__total: 0
pageviews__recent: 0
pageviews__avg_time: 0
tutorial__order: 0
photos__background_color: '#235E7E'
photos:
 - /images/node-package-manager-small.png
 - /images/node-package-manager-large.png
tags:
  - javascript
categories:
  - Programming
  - Web Development
date: 2016-08-24 17:54:42
updated: 2016-08-24 17:54:42
---

We are going to a **static file server** in Node.js. This web server is going to respond with the content of the file in a given subpath. While we are doing this exercise we are going to cover more about `http` module. Also, use some utilities from other core modules such as `path`, `url` and `fs`.

<!-- more -->

# HTTP Web Servers

Node's HTTP module is versatile. You can use it as a client, to grab content from websites or as a server. We are going to use it server files from our file system.

If you are familiar with Ruby or Python or Node. It's the equivalent of this

```bash Existing HTTP Servers Implementations
# python HTTP server
python -m SimpleHTTPServer 9000

# ruby HTTP server
ruby -run -e httpd . -p 9000

# Node HTTP server (npm install http-server)
http-server . -p 9000
```

Let's do our own. It's not that hard.

# Simple HTTP Server

One of the simplest servers that you can create in Node, looks like this:

```javascript Simple server.js
const http = require('http');

http.createServer(function (req, res) {
  // server code

  console.log(`${req.method} ${req.url}`);
  res.end('hello world!');

}).listen(9000);

console.log('Server listening on port 9000');
```

To test it out, save the code in a file called `server.js` and run:

```bash
node server.js
```

Then open the browser on `http://localhost:9000` and you will see the "hello world!" message.

Let's explain what's going on in the code. We are using the function `http.createServer` with a callback. This callback function is going to be called every time a client connects to the server. You can see that it takes two parameters: `req`uest and `res`ponse.

The request contains the client's information. For instance: requested URL, path, headers, HTTP method, and so forth.

The response object is used to reply to the client. You can set what you want to send back to the client. For instance, data, headers, etc.

Finally, the listening part. It allows you to set the port that you want your server to run on. In this case, we are using `9000`.



# Node.js HTTP static file server with ES6+

Let's now proceed to do the static web server. We want to parse the URL path and get the file matching that path. For instance, if we get a request like `localhost:9000/example/server.js`. We want to look for a file in `./example/server.js`.

Browsers use as a header the `Content-type`, to know how to render the file. So, we can infer their type by the extension and translate to the corresponding type.

All together looks like this:

```javascript static_server.js
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
// you can pass the parameter in the command line.
// e.g. node static_server.js 3000
const port = process.argv[2] || 9000;

http.createServer(function (req, res) {
  console.log(`${req.method} ${req.url}`);

  // parse URL
  const parsedUrl = url.parse(req.url);
  // extract URL path
  let pathname = `.${parsedUrl.pathname}`;
  // based on the URL path, extract the file extention. e.g. .js, .doc, ...
  const ext = path.parse(pathname).ext;
  // maps file extention to MIME typere
  const map = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword'
  };

  fs.exists(pathname, function (exist) {
    if(!exist) {
      // if the file is not found, return 404
      res.statusCode = 404;
      res.end(`File ${pathname} not found!`);
      return;
    }

    // if is a directory search for index file matching the extention
    if (fs.statSync(pathname).isDirectory()) {
      pathname += '/index' + ext;
    }

    // read file from file system
    fs.readFile(pathname, function(err, data){
      if(err){
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        // if the file is found, set Content-type and send data
        res.setHeader('Content-type', map[ext] || 'text/plain' );
        res.end(data);
      }
    });
  });


}).listen(parseInt(port));

console.log(`Server listening on port ${port}`);
```

We are using Node.js core `path.parse` libraries to get the extentions from the URL path.   Similarly, we are using `url.parse` to break down the `request.url` into it's components. Then, we extract the extention from the file. Finally, we use `fs.readFile` to get the content from the file system. If any error occurs related to the file path, we return a 404 and otherwise return the file content.

Give it a try with:

```bash Command lines to test the server
# run server
node server.js

# get the javascript file with
curl -i localhost:9000/server.js

# testing with non-existing file
curl -i localhost:9000/invalid-file.doc
```

For the first one, you will get a 200 OK response, while for the 2nd one you will get a 404 not found error, as expected.

