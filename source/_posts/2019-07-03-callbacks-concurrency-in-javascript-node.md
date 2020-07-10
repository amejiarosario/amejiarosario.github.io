---
layout: post
title: Understanding JavaScript Callbacks and best practices
comments: true
pageviews__total: 2493
pageviews__recent: 133
pageviews__avg_time: 189
tutorial__order: 0
toc: true
photos:
  - /images/callbacks-concurrency-in-javascript-small.png
  - /images/callbacks-concurrency-in-javascript-large.png
photos__background_color: '#FBE000'
tags:
  - javascript
  - nodejs
  - tutorial_async-javascript
categories:
  - Coding
date: 2019-07-03 19:06:12
updated: 2019-07-03 19:06:12
---

Callbacks are one of the critical elements to understand JavaScript and Node.js. Nearly, all the asynchronous functions use a callback (or promises). In this post, we are going to cover callbacks in-depth and best practices.

<!-- more -->

This post assumes you know the [difference between synchronous and asynchronous code](/asynchronous-vs-synchronous-handling-concurrency-in-javascript).

JavaScript is an event-driven language. Instead of waiting for things to happen, it executes while listening for events. The way you respond to an event is using callbacks.

# JavaScript callbacks

> A callback is a function that is passed as an argument to another function.

Callbacks are also known as **higher-order function**.

An example of a callback is the following:

```js
const compute = (n1, n2, callback) => callback(n1, n2);
const sum = (n1, n2) => n1 + n2;
const product = (n1, n2) => n1 * n2;

console.log(compute(5, 3, sum));     // ↪️  8
console.log(compute(5, 3, product)); // ↪️  15
```

As you can see the function `compute` takes two numbers and a callback function. This `callback` function can be `sum`, `product` and any other that you develop that operates two numbers.

## Callback Advantages

Callbacks can help to make your code more maintainable if you use them well. They will also help you to:

- Keep your code DRY (Do Not Repeat Yourself)
- Implement better abstraction where you can have more generic functions like `compute` that can handle all sorts of functionalities (e.g., `sum`, `product`)
- Improve code readability and maintainability.


So far, we have only seen callbacks that are executed immediately; however, most of the callbacks in JavaScript are tied to an event like a timer, API request or reading a file.

## Asynchronous callbacks

> An asynchronous callback is a function that is passed as an argument to another function _and gets invoke zero or multiple times after certain events happens_.

It's like when your friends tell you to call them back when you arrive at the restaurant. You coming to the restaurant is the "event" that _triggers_ the callback. Something similar happens in the programming world. The event could be you click a button, a file is loaded into memory, and request to a server API, and so on.

Let's see an example with two callbacks:

```js
const id = setInterval(() => console.log('tick ⏰'), 1e3);
setTimeout(() => clearInterval(id), 5e3);
```

First, you notice that we are using anonymous functions (in the previous example, we were passing the named functions such as `sum` and `product`). The callback passed to `setInterval` is triggered every second, and it prints `tick`. The second callback is called one after 5 seconds. It cancels the interval, so it just writes `tick` five times.

> Callbacks are a way to make sure a particular code doesn’t execute until another has already finished.

The `console.log('tick')` only gets executed when a second has passed.

The functions `setInterval` and `setTimeout` callbacks are very simple. They don't provide any parameters on the callback functions. But, if we are reading from the file system or network, we can get the response as a callback parameter.

## Callback Parameters

The callback parameters allow you to get messages into your functions when they are available. Let's say we are going to create a vanilla server on Node.js.

```js
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
```

We have two callbacks here. The `http.createServer`'s callback sends the parameters (`req`)uest and (`res`)ponse every time somebody connects to the server.

You can test this server using curl (or browser)

```sh
curl 127.0.0.1:1777/this/is/cool
```

There you have it! An HTTP server that replies to everyone that connects to it using a callback. But, What would happen if there's an error? Let's see how to handle that next.

## Handling errors with Node.js callbacks

Some callbacks send errors on the first parameter and then the data (`callback(error, data)`). That's very common in Node.js API.
Let's say we want to see all the directories on a given folder:

```js
const fs = require('fs');

fs.readdir('/Users/adrian/Code', (error, files) => {
  if (error) { console.error(error); }
  console.log(files);
});
```

As you notice, the first parameter will have an error message. If you run it, you would probably have the error message (unless you have the same name and directory).

```
{ [Error: ENOENT: no such file or directory, scandir '/Users/noAdrian/Code']
  errno: -2,
  code: 'ENOENT',
  syscall: 'scandir',
  path: '/Users/noAdrian/Code' }
undefined
```

So that's how you handle errors, you check for that parameter. But (there's always a but) what if I need to do multiple async operations. The easiest way (but not the best) is to have a callback inside a callback:

```js
const fs = require('fs');

const dir = '/Users/adrian/Code';

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
```

As you can see, this program will first read files in a directory and then check the file size of each file, and if it's a directory, it will be omitted.

When callbacks are nested too many levels deep, we call this callback hell! 🔥 Or the pyramid of doom ⚠️

![callback hell](/images/callback-hell.gif)

Because they are hard to maintain, how do we fix the callback hell? Read on!

## Callback Hell problem and solutions

Callback hell is when you have too many nested callbacks.

```js
a(() => {
  b(() => {
    c(() => {
      d();
    });
  });
});
```

To make your code better, you should:

1. Keep you code shallow (avoid too many nested functions): keep your code at 1-3 indentation levels.
2. Modularize: convert your anonymous callbacks into named functions.
3. Use promises and async/await.

Let's fix the callback hell from `printFilesSize` keeping our code shallow and modularizing it.

```js
const fs = require('fs');

const dir = '/Users/adrian/Code';

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
```

The original implement had five levels of indentation, now that we modularized it is 1-2 levels.

Callbacks are not the only way to deal with asynchronous code. In the following post we are going to cover:

- Promises
- Async/Await
- Generators

Stay tuned!
