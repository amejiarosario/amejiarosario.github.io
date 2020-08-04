---
layout: draft
title: >-
  How to solve any 2D Arrays Maze interview questions in JavaScript? DFS
  vs. BFS
comments: true
pageviews__total: 0
pageviews__recent: 0
pageviews__avg_time: 0
tutorial__order: 0
toc: true
photos:
  - /images/placeholder-small.jpg
  - /images/placeholder-large.jpg
photos__background_color: '#F4F0EF'
tags:
  - big-o notation
  - algorithms
  - tutorial_algorithms
categories:
  - Programming
  - Data Structures and Algorithms (DSA)
date: 2020-07-23 16:15:55
updated: 2020-07-23 16:15:55
---


In this article, we are going to solve some algorithmic questions that you might receive while doing a technical interview. We explore 10 steps that you can take to tackle any questions and then we dive into solving problems using Breadth-First Search (BFS) and Queues.

This post assumes you have some basic notions of [big o notation](https://adrianmejia.com/most-popular-algorithms-time-complexity-every-programmer-should-know-free-online-tutorial-course/), [queues](https://adrianmejia.com/data-structures-time-complexity-for-beginners-arrays-hashmaps-linked-lists-stacks-queues-tutorial/#Queues), and [graph traversals](https://adrianmejia.com/data-structures-for-beginners-graphs-time-complexity-tutorial/#Breadth-first-search-BFS-Graph-search). If you need additional refreshers you can click on the provided links or expand the quick recap.

<details>
  <summary>Queue Recap</summary>

**Queue**

As you might know, the queue is a data structure that restricts the way you add and remove information. You can only remove data in the same way you inserted it: First-In, First-Out (FIFO).

The **insert** operation is called `enqueue` and the **remove** opeartion is called `dequeue`

{% img /images/queue-enqueue-dequeue.png "Queue operations: enqueue and dequeue" %}

You can also think of a Queue as a line of people waiting for their turn to talk to a cashier. The first one that got into the line, will be the first one to be served.

{% img /images/queue.png "Queue of people" %}

You might wonder, what's the big deal with the Queues? With an array, you can add and remove from any place that you want. Isn't an array better then? Well, it depends on the application. Let's do an example.
</details>

Let's say you are interviewing at a tech company and you get asked the following:

# A chess knight problem ♘

> Given an **infinite** chessboard, find out how many moves does the knight needs to reach a given square on the board.

Wow, how do you translate such a vague statement into code?  Every time I work on an algorithmic problem, I follow these steps:

# Steps to solve any algorithmic question

1. 👂 Listen/read carefully and repeat the question out loud (in your own words).
2. 🗣  Ask clarifying questions to help understand the problem better.
3. 🎨  Create 2-3 examples and draw diagrams about the problem.
4. 💪 Find a brute force solution as soon as possible (how would you do it manually). But don't implement it yet!
5. 🎯  Determine what's the best time complexity, theoretically. E.g. `O(n)` or `O(m * n)`, etc.
6. 🧠  Brainstorm different approaches (Think out loud). State the runtime (Big O) of each approach.
7. 📝 Let's CODE: Implement the best approach you have so far (or the brute force) while following a **simple and short** example. You can write the code while testing multiple examples at once to save time.
8. 🏃‍♂️ DRY RUN: Test your implementation **on your mind.** Imagine you are the compiler and you have to tell the output of EACH LINE. Make fixes as needed. (For some companies the code execution is disable (Facebook) or other's use a Google Doc (Google) so it's important to learn to test the code in your mind.)
9. 💻  RUN YOUR CODE if allowed
10. 🐛  Fix issues as they emerge and repeat previews steps if necessary.

Let's go step by step!

# Asking Clarifying questions

Once you understand the statement, the first thing you need to do, before doing any code, at all is to **ask clarifying questions**. Try to come up with some questions you would ask before looking at my clarifying questions below...

<details>
  <summary>My clarifying questions...</summary>


<dl>
  <dt>What do you mean by infinite board?</dt>
  <dd>A regular chess board it's an 8x8 grid but for this questions we have a infinite board (very big limits 1M+ x 1M+). This means the solution better be efficient.</dd>
</dl>

<dl>
  <dt>How do we know the initial position of the knight?</dt>
  <dd>Let's say it starts in the coordinates 0,0.</dd>
</dl>

<dl>
  <dt>How does the knight moves again? Is like an `L`, right?</dt>
  <dd>Yes, It may move two squares vertically and one square horizontally, or two squares horizontally and one square vertically (with both forming the shape of an L)</dd>
</dl>

<dl>
  <dt>Given enough movements does the knight reach every point in the board?</dt>
  <dd>

Yes
![https://upload.wikimedia.org/wikipedia/commons/c/ca/Knights-Tour-Animation.gif](https://upload.wikimedia.org/wikipedia/commons/c/ca/Knights-Tour-Animation.gif)

  </dd>
</dl>

<dl>
  <dt>How's the target location given? As an x, y coordinates?</dt>
  <dd>Yes, coordinates relative to the starting point.</dd>
</dl>

</details>


After you ask some clarifying questions, the next step is to come up with some examples. This is key! Before you write any code, try to identify edge cases and possible scalability problems. Let's draw a board with some possible target positions.


{% img /images/infinite-chessboard.png 'infinite chessboard' %}


The first case, T1, is on the best case scenario. It's just one hop away, the second case is interesting because you have to move away from the starting point and then come back. The other two cases are just far away destinations.

Now that you have some examples, it's time to brainstorm approaches! No coding yet!

If you are familiar with graphs, you might notice that this can be seen as a graph problem. The starting position can be seen as a node, and then each of the next 8 positions are the adjacent nodes.


{% img /images/chessboard-knight-next-moves.png 'chessboard knight next moves' %}


So basically, once we have a starting point and adjacent nodes that we can visit, this can be solved using a graph traversal algorithm.

# Breadth-First-Search (BFS) vs Depth-First-Search (DFS)

The most common graph traversal algorithms are breadth-first-search (BFS) and depth-first-search (DFS). BFS covers all cases adjacent paths nearby and then expand, while DFS goes deep on one path and only comes back when there's nowhere else to go.

<table>
  <tr>
    <td>

![https://upload.wikimedia.org/wikipedia/commons/5/5d/Breadth-First-Search-Algorithm.gif](https://upload.wikimedia.org/wikipedia/commons/5/5d/Breadth-First-Search-Algorithm.gif)
    </td>
    <td>
![https://upload.wikimedia.org/wikipedia/commons/7/7f/Depth-First-Search.gif](https://upload.wikimedia.org/wikipedia/commons/7/7f/Depth-First-Search.gif)
    </td>
  </tr>
  <tr>
    <td>
Breadth-First-Search (BFS)
    </td>
    <td>
Depth-First-Search (DFS)
    </td>
  </tr>
</table>







In the pictures above, you can see that BFS goes level by level, while DFS goes as deep as it can in a branch.

In general, you want to use **DFS** when...

- The solutions is far away from the starting point.
- If the graph/tree/maze might be wide but not too deep (e.g. graph is finite).
- There are too many adjacent nodes to be practical for BFS.
- Usually used for game simulations where the number of possible moves is massive. DFS make a decision, then explore all paths through this decision. And if this decision leads to win situation, we stop.
- **Real-world applications of DFS**: topological sorting (use for scheduling a sequence of jobs or tasks based on their dependencies), spreadsheets, build systems, data serialization, etc.

You want to use **BFS** when...

- The solution is near to the starting point.
- If the graph/tree/maze is extremely deep but not too wide (e.g. graph might be infinite).
- The number of adjacent nodes is limited. (e.g. for our case, each cell has 8 next possible moves)
- Usually used for finding shortest path between two nodes.
- **Real-world applications of BFS**: anything that can benefit from finding the shortest path, such as GPS Navigation systems (Google Maps), Peer to peer (P2P) applications such as the torrent clients. Other applications are web crawlers, social networks, etc.

Since the board is infinite, DFS won't work for us. If it chooses a path that doesn't contain the target location, it will never find an end. So, BFS is the right approach here!

Enough reading, let's move our fingers and coding it up!

# Solution to the Chess Knight Problem

First, give it a try yourself before looking at my answer, but don't spin your wheels for too long.  If you haven't get it working after 35 minutes, take a peek at the answer. Then try again on your own.

Give it a try!

```js
/**
 * Given an infinite chessboard, find out how many moves does
 * the knight needs to reach a given square coordinate on the board.
 *
 * @param {Number} dx - Destination x coordinate
 * @param {Number} dy - Destination y coordinate
 * @returns {Number} minimum number of moves to reach target
 */
function knightMoves(dx, dy) {
    // write your awesome code here!
}

const assert = require('assert');
assert.equal(knightMoves(0, 0), 0, 'finds t0');
assert.equal(knightMoves(1, 2), 1, 'finds t1');
assert.equal(knightMoves(0, 1), 3, 'finds t2');
assert.equal(knightMoves(6, -6), 4, 'finds t3');
assert.equal(knightMoves(0, 7), 5, 'finds t4');
assert.equal(knightMoves(170, 123), 99, 'finds far far away galaxies');
console.log('Congrats! 👏👏👏  All tests passed! 🎂');
```

<details>
  <summary>My answer (click to expand)</summary>


Here's an interview friendly solution:

```js
function knightMoves(dx, dy) { // destination x and y
  const queue = [[[0, 0], 0]];
  const seen = new Set([0, 0].toString());

  for (const [[x, y], moves] of queue) { // current x and y
    if (x === dx && y === dy) return moves;
    const next = [1, -1].map((i) => [2, -2].map((j) => [[x + i, y + j], [x + j, y + i]])).flat(2);
    for (const [nx, ny] of next) { // next x and y
      if (seen.has([nx, ny].toString())) continue;
      seen.add([nx, ny].toString());
      queue.push([[nx, ny], moves + 1]);
    }
  }

  return -1;
}
```

What??? No fancy `Graph` nor `Queue` class? and less than 20 lines of code?! Yep 😉

We have an old-school array as Queue, where we store 3 values: the `[x, y]` coordinate and the number of `moves` so far. We initialized everything to `0`.

It's very important to keep track of the positions that you have "seen", otherwise, you will repeat visited places and make your program very slow or run out of memory! For that, we have a `Set`.

GOTCHA: the `Set` in JavaScript for Array values works by reference and not by value. To overcome this issue, we have to convert the array to a string.

```jsx
const s = new Set();

s.add([0, 0]);
console.log(s.has([0, 0])); // false 🙀

s.add([0, 0].toString());
console.log(s.has([0, 0].toString())); // true 👍
```

Ok, moving on... we reach the `for...of` loop. Here we dequeue values. Notice that we are NOT using `queue.shift()`, to take values from the front of the queue. This is because `shift` has a time complexity of `O(n)`. It will take the first element from the array and then "shift" all the other elements one position. Imagine that you have an array of millions of items. It will move all of them! There are two ways to avoid that overhead, we iterate the queue or implement a queue using a LinkedList.

After we dequeue an element the first thing we do is to check if is a solution. If it is we return the number of movements that took us to get there and we are done!

If the dequeued element didn't match the target, we need to calculate the next eight possible positions given the current x and y. Remember a knight moves in L, so it will be translated to `1` position on `x` and `2` on `y` or vice-versa:

```jsx
const next = [[x + 1, y + 2], [x + 2, y + 1], [x + 2, y - 1], [x + 1, y - 2], [x - 1, y - 2], [x - 2, y - 1], [x - 2, y + 1], [x - 1, y + 2]];
// for x=0, y=0: [[1,2],[2,1],[2,-1],[1,-2],[-1,-2],[-2,-1],[-2,1],[-1,2]]
```

You can also get fancy and calculate it using two `Array.map`s

```jsx
const next = [1, -1].map((i) => [2, -2].map((j) => [[x + i, y + j], [x + j, y + i]])).flat(2);
// for x=0, y=0: [[1,2],[2,1],[2,-1],[1,-2],[-1,-2],[-2,-1],[-2,1],[-1,2]]
```

Or also, using two `Array.reduce`s

```jsx
const next = [1, -1].reduce((a, i) => [2, -2].reduce((b, j) => [...b, [x + i, y + j], [x + j, y + i]], a), []);
// for x=0, y=0: [[1,2],[2,1],[2,-1],[1,-2],[-1,-2],[-2,-1],[-2,1],[-1,2]]
```

Once you generate the 8 next positions, you need to add them all to the queue and add `+1` to the current position. Finally, we don't add a position to the queue if we have already seen it before.

That's it!

</details>




How you did? Paste your solution and questions on the comments section!

Most BFS problems follows the same pattern:

1. Initialize queue
2. Initialize set to keep track of visited positions.
3. Loop until the queue is empty or you find a solution.
4. Dequeue element from queue and check if it's a solution
5. If it's not part of the solution, then move to get next possible moves (neighbor nodes)
6. Skip seen nodes
7. Mark next node as seen.
8. Add neighbor to queue and increase the distance.
9. If you didn't find the answer, return something like -1/null/undefined.

# BFS Template

```js
function bfs(target) {
  const queue = [[0, 0]]; // 1. Initialize queue with Node and current distance 0
  const seen = new Set(0); // 2. Initialize set

  for (const [current, distance] of queue) { // 3. Loop until the queue is empty
    if (current === target) return distance; // 4. Check dequeued is solution
    for (const [neighbor, currDist] of getNeighbors(node)) { // 5. Get next possible moves (neighbor nodes)
      if (seen.has(neighbor) continue; // 6. Skip seen nodes
      seen.add(neighbor); // 7. Mark next node as seen.
      queue.push([neighbor, currDist + 1]); // 8. Add neighbor to queue and increase the distance.
    }
  }

  return -1; // 9. If you didn't find the answer, return something like -1/null/undefined.
}

function getNeighbors(node) {
	// TODO: implement based on the problem.
}
```

# Exercises to Practice

Keep practicing until it becomes natural to you. Here's another exercise:

## Does the Maze have a path?

```js
/**
 * You have a ball at a starting point, that can roll up, down, left and right.
 * However, the ball won't stop rolling until it hits a wall.
 * Your tasks is to check if there's a path from start to destination
 * You may assume that the borders of the maze are all walls.
 *
 * @param {number[][]} maze - 2D array where 1 = wall and 0 = empty.
 * @param {number[]} start - [row, col] of the starting point
 * @param {number[]} destination - [row, col] target destination
 * @return {boolean}
 */
function hasPath(maze, start, destination) {

};

// --- testing ---

const assert = require('assert');

assert.equal(hasPath([
	[ 0 ]
], [0, 0], [0, 0]), true, 'should pass case #1');

assert.equal(hasPath([
	[ 1 ]
], [0, 0], [0, 0]), false, 'should pass case #2');

assert.equal(hasPath([
	[ 0, 0, 0 ]
], [0, 0], [0, 2]), true, 'should pass case #3');

assert.equal(hasPath([
    [ 0, 0, 0 ],
], [0, 0], [0, 1]), false, 'should pass case #4');

assert.equal(hasPath([
	[ 0, 1, 0 ],
], [0, 0], [0, 2]), false, 'should pass case #5');

assert.equal(hasPath([
	[ 0, 1, 0 ],
	[ 0, 0, 0 ],
], [0, 2], [0, 0]), true, 'should pass case #6');

assert.equal(hasPath([
  [ 0, 0, 1, 0, 0 ],
  [ 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 1, 0 ],
  [ 1, 1, 0, 1, 1 ],
  [ 0, 0, 0, 0, 0 ]
], [ 0, 4 ], [ 3, 2 ]), false, 'should pass case #7');

assert.equal(hasPath([
  [ 0, 0, 1, 0, 0 ],
  [ 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 1, 0 ],
  [ 1, 1, 0, 1, 1 ],
  [ 0, 0, 0, 0, 0 ]
], [ 0, 4 ], [ 4, 4 ]), true, 'should pass case #8');

console.log('Congrats! 👏👏👏  All tests passed! 🎂');
```

- My answer

    ```jsx
    /**
     * You have a ball at a starting point, that can roll up, down, left and right.
     * However, the ball won't stop rolling until it hits a wall.
     * Your tasks is to check if there's a path from start to destination
     * You may assume that the borders of the maze are all walls.
     *
     * @param {number[][]} maze - 2D array where 1 = wall and 0 = empty.
     * @param {number[]} start - [row, col] of the starting point
     * @param {number[]} dest - destination [row, col] target destination
     * @return {boolean}
     */
    function hasPath(maze, start, dest) {
      const queue = [[start, 0]];
      const seen = new Set([start.join()]);
      const directions = [[0,1], [0,-1], [1,0], [-1,0]]; // right, left, down and up.

      for (let [[r, c], dist] of queue) {
        if (r === dest[0] && c === dest[1] && maze[r] && maze[r][c] === 0) return true;

        for (let [dr, dc] of directions) {
          let nr = r, nc = c; // IMPORTANT: reset coordinates
          while (maze[nr + dr] && maze[nr + dr][nc + dc] === 0) {
              nr += dr;
              nc += dc;
          }
          if (seen.has([nr, nc].join())) continue;
          seen.add([nr, nc].join());
          queue.push([[nr, nc], dist + 1]);
        }
      }

      return false;
    };

    // --- testing ---

    const assert = require('assert');

    assert.equal(hasPath([
    	[ 0 ]
    ], [0, 0], [0, 0]), true, 'should pass case #1');

    assert.equal(hasPath([
    	[ 1 ]
    ], [0, 0], [0, 0]), false, 'should pass case #2');

    assert.equal(hasPath([
    	[ 0, 0, 0 ]
    ], [0, 0], [0, 2]), true, 'should pass case #3');

    assert.equal(hasPath([
        [ 0, 0, 0 ],
    ], [0, 0], [0, 1]), false, 'should pass case #4');

    assert.equal(hasPath([
    	[ 0, 1, 0 ],
    ], [0, 0], [0, 2]), false, 'should pass case #5');

    assert.equal(hasPath([
    	[ 0, 1, 0 ],
    	[ 0, 0, 0 ],
    ], [0, 2], [0, 0]), true, 'should pass case #6');

    assert.equal(hasPath([
      [ 0, 0, 1, 0, 0 ],
      [ 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 1, 0 ],
      [ 1, 1, 0, 1, 1 ],
      [ 0, 0, 0, 0, 0 ]
    ], [ 0, 4 ], [ 3, 2 ]), false, 'should pass case #7');

    assert.equal(hasPath([
      [ 0, 0, 1, 0, 0 ],
      [ 0, 0, 0, 0, 0 ],
      [ 0, 0, 0, 1, 0 ],
      [ 1, 1, 0, 1, 1 ],
      [ 0, 0, 0, 0, 0 ]
    ], [ 0, 4 ], [ 4, 4 ]), true, 'should pass case #8');

    console.log('Congrats! 👏👏👏  All tests passed! 🎂');
    ```
