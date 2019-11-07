---
layout: post
title: The JavaScript Promise Tutorial
comments: true
pageviews__total: 757
pageviews__recent: 202
pageviews__avg_time: 175
tutorial__order: 0
toc: true
photos:
  - /images/promises-concurrency-in-javascript-small.png
  - /images/promises-concurrency-in-javascript-large.png
photos__background_color: '#EEE8D5'
tags:
  - javascript
  - nodejs
  - tutorial_async-javascript
categories:
  - Coding
date: 2019-07-08 19:26:12
updated: 2019-07-08 19:26:12
---

This post is the ultimate JavaScript Promises tutorial: recipes and examples for everyday situations (or that's the goal 😉). We cover all the necessary methods like `then`, `catch`, and `finally`. Also, we go over more complex situations like executing promises in parallel with `Promise.all`, timing out APIs with `Promise.race`, promise chaining and some best practices and gotchas.

<!-- more -->

_NOTE: I'd like this post to be up-to-date with the most common use cases for promises. If you have a question about promises and is not answered here. Please, comment below or reach out me directly [@amejiarosario](https://twitter.com/amejiarosario). I'll look into it and update this post._

# JavaScript Promises

A promise is an object that allows you to handle asynchronous operations. It's an alternative to plain old callbacks.

Promises have many advantages over callbacks. To name a few:

- Make the async code easier to read.
- Provide combined error handling.
- Better control flow. You can have async actions execute in parallel or series.

Callbacks tend to form deeply nested structures (a.k.a. Callback hell). Like the following:


```js
a(() => {
  b(() => {
    c(() => {
      d(() => {
        // and so on ...
      });
    });
  });
});
```

If you convert those functions to promises, they can be chained producing more maintainable code. Something like this:

```js
Promise.resolve()
  .then(a)
  .then(b)
  .then(c)
  .then(d)
  .catch(console.error);
```

As you can see, in the example above, the promise object exposes the methods `.then` and `.catch`. We are going to explore these methods later.

## How do I convert an existing callback API to promises?

We can convert callbacks into promises using the Promise constructor.

The Promise constructor takes a callback with two arguments `resolve` and `reject`.

- **Resolve**: is a callback that should be invoked when the async operation is completed.
- **Reject**: is a callback function to be invoked when an error occurs.

The constructor returns an object immediately, the promise instance. You can get notified when the promise is "done" using the method `.then` in the promise instance. Let's see an example.

### Wait, aren't promises just callbacks?

Yes and no. Promises are not "just" callbacks, but they do use asynchronous callbacks on the `.then` and `.catch` methods. Promises are an abstraction on top of callbacks that allows you to chain multiple async operations and handle errors more elegantly. Let's see it in action.

#### Promises anti-pattern (promise hell)
Before jumping into how to convert callbacks to promises, let's see how NOT to it.

Please don't convert callbacks to promises from this:

```js
a(() => {
  b(() => {
    c(() => {
      d(() => {
        // and so on ...
      });
    });
  });
});
```

To this:

```js
a().then(() => {
  return b().then(() => {
    return c().then(() => {
      return d().then(() =>{
        // ⚠️ Please never ever do to this! ⚠️
      });
    });
  });
});
```

Always keep your promises as flat as you can.

It's better to do this:

```js
a()
  .then(b)
  .then(c)
  .then(d)
```

Let's do some real-life examples! 💪

### Promesifying Timeouts

Let's see an example. What do you think will be the output of the following program?

<script defer async src="https://embed.runkit.com" data-element-id="my-element"></script>
<pre id="my-element">
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('time is up ⏰');
  }, 1e3);

  setTimeout(() => {
    reject('Oops 🔥');
  }, 2e3);
});

promise
  .then(console.log)
  .catch(console.error);
</pre>

Is the output:

```
time is up ⏰
Oops! 🔥
```

or is it

```
time is up ⏰
```

?

It's the latter, because

> When a promise it's `resolve`d, it can no longer be `reject`ed.


Once you call one method (`resolve` or `reject`) the other is invalidated since the promise in a *settled* state. Let's explore all the different states of a promise.

## Promise states

There are four states in which the promises can be:

- ⏳ **Pending**: initial state. Async operation is still in process.
- ✅ **Fulfilled**: the operation was successful. It invokes `.then` callback. E.g., `.then(onSuccess)`.
- ⛔️ **Rejected**: the operation failed. It invokes the `.catch` or `.then` 's second argument (if any). E.g., `.catch(onError)` or `.then(..., onError)`
- 😵 **Settled**: it's the promise final state. The promise is dead. Nothing else can be resolved or rejected anymore. The `.finally` method is invoked.

![Promises four states](/images/promises-states.png)

## Promise instance methods

The Promise API exposes three main methods: `then`, `catch` and `finally`. Let's explore each one and provide examples.

### Promise then

The `then` method allows you to get notified when the asynchronous operation is done, either succeeded or failed. It takes two arguments, one for the successful execution and the other one if an error happens.

```js
promise.then(onSuccess, onError);
```

You can also omit the 2nd argument and use the `.catch` the method instead to handle errors.

`then` returns a new promise so you can chain multiple promises together. Like in the example below:

```js
Promise.resolve()
  .then(() => console.log('then#1'))
  .then(() => console.log('then#2'))
  .then(() => console.log('then#3'));
```

`Promise.resolve` immediately resolves the promise as successful. So all the following `then` are called. The output would be

```
then#1
then#2
then#3
```

Let's see how to handle errors on promises with `then` and `catch`.

### Promise catch

Promise `.catch` the method takes a function as an argument which handles errors if they occur. If everything goes well, the catch method is never called.

Let's say we have the following promises, which one resolves or rejects after 1 second and print out their letter.

```js
const a = () => new Promise((resolve) => setTimeout(() => { console.log('a'), resolve() }, 1e3));
const b = () => new Promise((resolve) => setTimeout(() => { console.log('b'), resolve() }, 1e3));
const c = () => new Promise((resolve, reject) => setTimeout(() => { console.log('c'), reject('Oops!') }, 1e3));
const d = () => new Promise((resolve) => setTimeout(() => { console.log('d'), resolve() }, 1e3));
```

Notice that `c` simulates a rejection with `reject('Oops!')`

```js
Promise.resolve()
  .then(a)
  .then(b)
  .then(c)
  .then(d)
  .catch(console.error)
```

The output is the following:

![promise catch](/images/promise-catch.gif)

For this case, you will see `a`, `b` and the error message on `c`. The function` will never get executed because the error broke the sequence.

Also, you can handle the error using the 2nd argument of the `then` function. However, be aware that `catch` will not execute anymore.

```js
Promise.resolve()
  .then(a)
  .then(b)
  .then(c)
  .then(d, () => console.log('c errored out but no big deal'))
  .catch(console.error)
```

![promise then error handling](/images/promise-then-on-error.gif)

As you can see the catch doesn't get called because we are handling the error on the `.then(..., onError)` part.
`d` is not being called regardless. If you want to ignore the error and continue with the execution of the promise chain, you can add a `catch` on `c`. Something like this:

```js
Promise.resolve()
  .then(a)
  .then(b)
  .then(() => c().catch(() => console.log('error ignored')))
  .then(d)
  .catch(console.error)
```

![promise then error handling](/images/promise-catch-ignored.gif)

Now `d` gets executed!! In all the other cases, it didn't.
This early `catch` is not desired in most cases, it can lead to things falling silently and make your async operations harder to debug.

### Promise finally

The `finally` method is called only when the promise is settled.

You can use a `.then` after the `.catch`, in case you want a piece of code to execute always, even after a failure.

```js
Promise.resolve()
  .then(a)
  .then(b)
  .then(c)
  .then(d)
  .catch(console.error)
  .then(() => console.log('always called'));
```

or you can use the `.finally` keyword:

```js
Promise.resolve()
  .then(a)
  .then(b)
  .then(c)
  .then(d)
  .catch(console.error)
  .finally(() => console.log('always called'));
```

## Promise class Methods

There are four static methods that you can use directly from the `Promise` object.

- Promise.all
- Promise.reject
- Promise.resolve
- Promise.race

Let's see each one and provide examples.

### Promise.resolve and Promise.reject

These two are helper functions that resolve or reject immediately. You can pass a `reason` that will be passed on the next `.then`.

```js
Promise.resolve('Yay!!!')
  .then(console.log)
  .catch(console.error)
```

This code will output `Yay!!!` as expected.

```js
Promise.reject('Oops 🔥')
  .then(console.log)
  .catch(console.error)
```

The output will be a console error with the error reason of `Oops 🔥`.

### Executing promises in Parallel with Promise.all

Usually, promises are executed in series, one after another, but if they are independent of each other.

Let's say are polling data from 2 different APIs. Since they are not related we can do all at once with `Promise.all()`.

For this example, we are going to pull the Bitcoin price in USD and convert it to EUR. As you imagine, both API calls can be called in parallel. However, we need a way to know when both are done to calculate the final price. We can use `Promise.all`. When all promises are done, a new promise will be returning will the results.

<script defer async src="https://embed.runkit.com" data-element-id="promise-all"></script>
<pre id="promise-all">
const axios = require('axios');

const bitcoinPromise = axios.get('https://api.coinpaprika.com/v1/coins/btc-bitcoin/markets');
const dollarPromise = axios.get('https://api.exchangeratesapi.io/latest?base=USD');
const currency = 'EUR';

// Get the price of bitcoins on
Promise.all([bitcoinPromise, dollarPromise])
  .then(([bitcoinMarkets, dollarExchanges]) => {
    const byCoinbaseBtc = d => d.exchange_id === 'coinbase-pro' && d.pair === 'BTC/USD';
    const coinbaseBtc = bitcoinMarkets.data.find(byCoinbaseBtc)
    const coinbaseBtcInUsd = coinbaseBtc.quotes.USD.price;
    const rate = dollarExchanges.data.rates[currency];
    return rate * coinbaseBtcInUsd;
  })
  .then(price => console.log(`The Bitcoin in ${currency} is ${price.toLocaleString()}`))
  .catch(console.log);
</pre>


As you can see, `Promise.all` accepts an array of promises. When the request both requests are completed, then we can proceed to calculate the price.

Let's do another example and time it:

```js
const a = () => new Promise((resolve) => setTimeout(() => resolve('a'), 2000));
const b = () => new Promise((resolve) => setTimeout(() => resolve('b'), 1000));
const c = () => new Promise((resolve) => setTimeout(() => resolve('c'), 1000));
const d = () => new Promise((resolve) => setTimeout(() => resolve('d'), 1000));

console.time('promise.all');
Promise.all([a(), b(), c(), d()])
  .then(results => console.log(`Done! ${results}`))
  .catch(console.error)
  .finally(() => console.timeEnd('promise.all'));
```

How long is it going to take to solve each of these promises? 5 seconds? 1 second? Or 2 seconds?

You can experiment with the dev tools and report back your results ;)

### Promise race

The `Promise.race(iterable)` takes a collection of promises and resolves as soon as the first promise settles.

```js
const a = () => new Promise((resolve) => setTimeout(() => resolve('a'), 2000));
const b = () => new Promise((resolve) => setTimeout(() => resolve('b'), 1000));
const c = () => new Promise((resolve) => setTimeout(() => resolve('c'), 1000));
const d = () => new Promise((resolve) => setTimeout(() => resolve('d'), 1000));

console.time('promise.race');
Promise.race([a(), b(), c(), d()])
  .then(results => console.log(`Done! ${results}`))
  .catch(console.error)
  .finally(() => console.timeEnd('promise.race'));
```

What's the output?

It's `b`! With `Promise.race` only the fastest gets to be part of the result. 🏁

You might wonder: _What's the usage of the Promise race?_

I haven't used it as often as the others. But, it can come handy in some cases like timing out promises and [batching array of requests](#How-to-limit-parallel-promises).

#### Timing out requests with Promise race

```js
Promise.race([
  fetch('http://slowwly.robertomurray.co.uk/delay/3000/url/https://api.jsonbin.io/b/5d1fb4dd138da811182c69af'),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error('request timeout')), 1000))
])
.then(console.log)
.catch(console.error);
```

![Promise race timeout](/images/promise-race-fail.gif)

If the request is fast enough, then you have the result.

```js
Promise.race([
  fetch('http://slowwly.robertomurray.co.uk/delay/1/url/https://api.jsonbin.io/b/5d1fb4dd138da811182c69af'),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error('request timeout')), 1000))
])
.then(console.log)
.catch(console.error);
```

![Promise race](/images/promise-race-pass.gif)


## Promises FAQ

This section covers tricks and tips using all the promises methods that we explained before.

### Executing promises in series and passing arguments

This time we are going to use the promises API for Node's `fs` and we are going to concatenate two files:

```js
const fs = require('fs').promises; // requires node v8+

fs.readFile('file.txt', 'utf8')
  .then(content1 => fs.writeFile('output.txt', content1))
  .then(() => fs.readFile('file2.txt', 'utf8'))
  .then(content2 => fs.writeFile('output.txt', content2, { flag: 'a+' }))
  .catch(error => console.log(error));
```

On this example, we read file 1 and write it to the output file. Later, we read file 2 and append it to the output file again.
As you can see, `writeFile` promise returns the content of the file, and you can use it in the next `then` clause.

### How do I chain multiple conditional promises?

You might have a case where you want to skip specific steps on a promise chain. You can do that in two ways.

<script defer async src="https://embed.runkit.com" data-element-id="ex1"></script>
<pre id="ex1">
const a = () => new Promise((resolve) => setTimeout(() => { console.log('a'), resolve() }, 1e3));
const b = () => new Promise((resolve) => setTimeout(() => { console.log('b'), resolve() }, 2e3));
const c = () => new Promise((resolve) => setTimeout(() => { console.log('c'), resolve() }, 3e3));
const d = () => new Promise((resolve) => setTimeout(() => { console.log('d'), resolve() }, 4e3));

const shouldExecA = true;
const shouldExecB = false;
const shouldExecC = false;
const shouldExecD = true;

Promise.resolve()
  .then(() => shouldExecA && a())
  .then(() => shouldExecB && b())
  .then(() => shouldExecC && c())
  .then(() => shouldExecD && d())
  .then(() => console.log('done'))
</pre>

If you run the code example, you will notice that only `a` and `d` are executed as expected.

An alternative way is creating a chain and then only add them if
```js
const chain = Promise.resolve();
if (shouldExecA) chain = chain.then(a);
if (shouldExecB) chain = chain.then(b);
if (shouldExecC) chain = chain.then(c);
if (shouldExecD) chain = chain.then(d);

chain
  .then(() => console.log('done'));
```

### How to limit parallel promises?

To accomplish this, we have to throttle `Promise.all` somehow.

Let's say you have many concurrent requests to do. If you do a `Promise.all` that won't be good (especially when the API is rate limited).
So, we need to develop and function that does that for us. Let's call it `promiseAllThrottled`.

```js
// simulate 10 async tasks that takes 5 seconds to complete.
const requests = Array(10)
  .fill()
  .map((_, i) => () => new Promise((resolve => setTimeout(() => { console.log(`exec'ing task #${i}`), resolve(`task #${i}`); }, 5000))));

promiseAllThrottled(requests, { concurrency: 3 })
  .then(console.log)
  .catch(error => console.error('Oops something went wrong', error));
```

The output should be something like this:

![promise throttle](/images/promise-throttle.gif)

So, the code above will limit the concurrency to 3 tasks executing in parallel. This is one possible implementation of `promiseAllThrottled` using `Promise.race` to throttle the number of active tasks at a given time:

```js
/**
 * Similar to Promise.all but a concurrency limit
 *
 * @param {Array} iterable Array of functions that returns a promise
 * @param {Object} concurrency max number of parallel promises running
 */
function promiseAllThrottled(iterable, { concurrency = 3 } = {}) {
  const promises = [];

  function enqueue(current = 0, queue = []) {
    // return if done
    if (current === iterable.length) { return Promise.resolve(); }
    // take one promise from collection
    const promise = iterable[current];
    const activatedPromise = promise();
    // add promise to the final result array
    promises.push(activatedPromise);
    // add current activated promise to queue and remove it when done
    const autoRemovePromise = activatedPromise.then(() => {
      // remove promise from the queue when done
      return queue.splice(queue.indexOf(autoRemovePromise), 1);
    });
    // add promise to the queue
    queue.push(autoRemovePromise);

    // if queue length >= concurrency, wait for one promise to finish before adding more.
    const readyForMore = queue.length < concurrency ? Promise.resolve() : Promise.race(queue);
    return readyForMore.then(() => enqueue(current + 1, queue));
  }

  return enqueue()
    .then(() => Promise.all(promises));
}
```

The `promiseAllThrottled` takes promises one by one. It executes the promises and adds it to the queue. If the queue is less than the concurrency limit, it keeps adding to the line. Once the limit is reached, then we use `Promise.race` to wait for one promise to finish so we can replace it with a new one.
The trick here is that the promise removes itself from the queue when it is done.
