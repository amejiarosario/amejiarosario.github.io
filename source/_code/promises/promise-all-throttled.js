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

function test() {
  const assert = require('assert');
  // const requests = Array(5).fill().map((_, i) => () => new Promise((resolve => setTimeout(() => resolve(`task #${i}`), 5000 * (0.1 + Math.random())))));
  const requests = Array(10).fill().map((_, i) => () => new Promise((resolve => setTimeout(() => { console.log(`exec'ing task #${i}`), resolve(`task #${i}`); }, 5000))));

  promiseAllThrottled(requests, { concurrency: 3 })
    // .then(r => assert.equal(r, ['task #1']))
    .then(console.log)
    .catch(error => console.error('Oops something went wrong', error));
  // asyncPool(3, requests)
  //   // .then(r => assert.deepEqual(r, [ 'task #0', 'task #1', 'task #2', 'task #3', 'task #4' ]))
  //   .then(console.log)
  //   .catch(error => console.error(`Oops something went wrong: ${error}`));
}

test();


function asyncPool(poolLimit, array) {
  let i = 0;
  const ret = [];
  const executing = [];

  const enqueue = () => {
    if (i === array.length) {
      return Promise.resolve();
    }

    const item = array[i++];
    // const p = Promise.resolve().then(() => item());
    const p = item();
    ret.push(p);

    // const e = p.then(() => executing.splice(executing.indexOf(e), 1));
    const e = p.then(() => {
      console.log('debug', {
        executing,
        e,
        'executing.indexOf(e)': executing.indexOf(e),
        'executing.splice(executing.indexOf(e), 1)': executing.splice(executing.indexOf(e), 1),
      });
      // remove itself from the executing queue when done
      return executing.splice(executing.indexOf(e), 1);
    });
    executing.push(e);

    let r = Promise.resolve();
    if (executing.length >= poolLimit) {
      r = Promise.race(executing);
    }

    return r.then(() => enqueue());
  };

  return enqueue().then(() => Promise.all(ret));
}

// https://stackoverflow.com/questions/46376432/understanding-promise-race-usage
async function batchRequests(options) {
  const query = { offset: 0, limit: options.limit };

  do {
    batch = await model.findAll(query);
    query.offset += options.limit;

    if (batch.length) {
      const promise = doLongRequestForBatch(batch).then(() => {
        // Once complete, pop this promise from our array
        // so that we know we can add another batch in its place
        _.remove(promises, p => p === promise);
      });
      promises.push(promise);

      // Once we hit our concurrency limit, wait for at least one promise to
      // resolve before continuing to batch off requests
      if (promises.length >= options.concurrentBatches) {
        await Promise.race(promises);
      }
    }
  } while (batch.length);

  // Wait for remaining batches to finish
  return Promise.all(promises);
}
