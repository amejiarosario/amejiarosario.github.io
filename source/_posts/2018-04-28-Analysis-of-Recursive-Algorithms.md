---
layout: post
title: Analysis of Recursive Algorithms
comments: true
pageviews__total: 3165
pageviews__recent: 267
pageviews__avg_time: 236
tutorial__order: 100
toc: true
photos:
  - /images/data-structures-analysis-of-recursive-algorithms-small.jpg
  - /images/data-structures-analysis-of-recursive-algorithms-large.jpg
photos__background_color: '#F4F0EF'
tags:
  - big-o notation
  - algorithms
  - tutorial_algorithms
categories:
  - Programming
  - Data Structures and Algorithms (DSA)
date: 2018-04-24 08:44:35
updated: 2018-04-24 08:44:35
---

<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-MML-AM_CHTML" async></script>



Analyzing the running time of non-recursive algorithms is pretty straightforward. You count the lines of code, and if there are any loops, you multiply by the length. However, recursive algorithms are not that intuitive. They divide the input into one or more subproblems. On this post, we are going to learn how to get the big O notation for most recursive algorithms.

<!-- more -->

We are going to explore how to obtain the time complexity of recursive algorithms. For that, we are going to use the **Master Theorem** (or master method).
<!-- One is the **Master Theorem** and other is the **Recursion Tree**.  -->

---
This post is part of a tutorial series:

**Learning Data Structures and Algorithms (DSA) for Beginners**
1. [Intro to algorithm's time complexity and Big O notation](/blog/2018/04/04/how-you-can-change-the-world-learning-data-structures-algorithms-free-online-course-tutorial/)
<!-- 1. Intro to Algorithm's Time Complexity and Big O Notation **👈 you are here** -->

1. [Eight time complexities that every programmer should know](/blog/2018/04/05/most-popular-algorithms-time-complexity-every-programmer-should-know-free-online-tutorial-course/)
<!-- 1. Eight time complexities that every programmer should know **👈 you are here** -->

1. [Data Structures for Beginners: Arrays, HashMaps, and Lists](/blog/2018/04/28/Data-Structures-Time-Complexity-for-Beginners-Arrays-HashMaps-Linked-Lists-Stacks-Queues-tutorial/)
<!-- 1. Data Structures for Beginners: Arrays, HashMaps, and Lists **👈 you are here** -->

1. [Graph Data Structures for Beginners](/blog/2018/05/14/Data-Structures-for-Beginners-Graphs-Time-Complexity-tutorial/)
<!-- 1. Graph Data Structures for Beginners **👈 you are here** -->

1. [Trees Data Structures for Beginners](/blog/2018/06/11/Data-Structures-for-Beginners-Trees-binary-search-tree-tutorial/)
<!-- 1. Trees Data Structures for Beginners **👈 you are here** -->

1. [Self-balanced Binary Search Trees](/blog/2018/07/16/self-balanced-binary-search-trees-with-avl-tree-data-structure-for-beginners/)
<!-- 1. Self-balanced Binary Search Trees  **👈 you are here** -->

1. Appendix I: Analysis of Recursive Algorithms **👈 you are here**
<!-- 1. [Appendix I: Analysis of Recursive Algorithms](/blog/2018/04/24/Analysis-of-Recursive-Algorithms/) -->
---

#  Master Theorem

The Master Theorem is the easiest way of obtaining runtime of recursive algorithms. First, you need to identify three elements:

- *`a`*: Subproblems. How many recursion (split) functions are there? E.g., the Binary search has 1 split, Merge Sort has 2 split, etc.
- *`b`*: Relative subproblem size. What rate is the input reduced? E.g., Binary search and Merge sort cut input in half.
- *`f(n)`* Runtime of the work done outside the recursion? E.g. \`O(n)\` or \`O(1)\`

The general formula for the Master Theorem is:
> \` T(n) = a * T(n / b) + f(n) \`

Once, we have `a`, `b` and `f(n)` we can determine the runtime of the work done by the recursion. That is given by:

> \` O(n^(log_b a)) \`

Finally, we compare the runtime of the split/recursion functions and *`f(n)`*. There are 3 possible cases:

**Case 1** Recursion/split runtime is higher: \`n^(log_b a) > f(n)\`

> Final runtime: \`O(n^(log_b a))\`

**Case 2** Same runtime inside and outside recursion: \`n^(log_b a) ~~ f(n)\`

> Final runtime: \`O(n^(log_b a) log n)\`

**Case 3:** Recursion/split runtime is lower: \`n^(log_b a) < f(n)\`

> Final runtime: \`O(f(n))\`

These 3 cases might see a little abstract at first, but after a few examples, it will be more evident.

# Master Theorem Examples

In the [previous post])(/blog/2018/04/05/most-popular-algorithms-time-complexity-every-programmer-should-know-free-online-tutorial-course/) we used Master Method to get the time complexity for the [binary search](/blog/2018/04/05/most-popular-algorithms-time-complexity-every-programmer-should-know-free-online-tutorial-course/#Binary-search) and [merge sort](/blog/2018/04/05/most-popular-algorithms-time-complexity-every-programmer-should-know-free-online-tutorial-course/#Mergesort). Both of them fall into the case 2. Let's explore some other examples.

## Case 1 Example

What's the runtime of this recursion?

```js
function recursiveFn1(n) {
 if(!n) {
 return 1;
  }
 return recursiveFn1(n/4) + recursiveFn1(n/4)
}
```

**1)** Let's identify `a`, `b` and `f(n)` from the Master Theorem

- Sub-problems? 2, so `a=2`
- Sub-problems size? it's 1/4 of the original `n` size, thus `b=4`
- Runtime without recursion? Constant, therefore `f(n) = 1`.

Substituting the values we get:

\` T(n) = a * T(n / b) + f(n) \`

\` T(n) = 2 * T(n / 4) + 1 \`

**2)** What's the runtime of the recursion by itself? Using the formula, we get:

\` n^(log_b a) \`

\` n^(log_4 2) = n^0.5 = sqrt(n)\`

**3)** Comparing `f(n)` with the result in step 2, we see that it matches case 1.

Since \`O(n^0.5) > O(1)\` then the runtime is:

\` O(n^(log_b a)) \`

\` O(n^(log_4 2)) \`

> \`  O(sqrt(n)) \`



## Case 2 Example

What would be the runtime of the mergesort if instead of splitting the array in 2 we split it up in 3?

```js
function sort(n) {
 const length = n.length;
 // base case
 if(length === 1) {
 return n;
  }
 if(length === 2) {
 return n[0] > n[1] ? [n[1], n[0]] : [n[0], n[1]];
  }
 // slit and merge
 const third = length/3;
 return merge(
 sort(n.slice(0, third)),
 sort(n.slice(third, 2 * third)),
 sort(n.slice(2 * third))
 );
}

function merge(a = [], b = [], c = []) {
 const merged = [];

 for (let ai = 0, bi = 0, ci = 0; ai < a.length || bi < b.length || ci < c.length;) {
 const nonNullValues = [a[ai], b[bi], c[ci]].filter(x => x === 0 || x );
 const min = Math.min.apply(null, nonNullValues);

 if(min === a[ai]) {
 merged.push(a[ai++]);
    } else if(min === b[bi]) {
 merged.push(b[bi++]);
    } else {
 merged.push(c[ci++]);
    }
  }

 return merged;
}
```

So, this new implementation divides the input into 3 subproblems (`a = 3`). The input size is divided by 3 (`b=3`). The work to `merge` the 3 sub-problems is still `O(n)`.

**1)** Using the Master Theorem, we get:

\` T(n) = a * T(n / b) + f(n) \`

\` T(n) = 3 * T(n / 3) + n \`

**2)** Let's compute the amount of work done in the recursion:

\` n^(log_b a) \`

\` n^(log_3 3) = n \`

**3)** Since `f(n)` and the recursive work is the same: `n`, we are looking at the *case 2*. Thus, the runtime is:

\`O(n^(log_b a) log n)\`

\`O(n^(log_3 3) log n)\`

> \`O(n log n)\`

It's the same as merge sort dividing the input into 2 subproblems and half `n`.

## Case 3 Example

The case 3 of the Master Method is not very common in real life. It implies that most of the work is done in the base case of the recursion. If most work is done outside the recursion, it means that we can re-write the code in a non-recursive way.

Anyways, let's solve this example:

**1)** \` T(n) = 3 * T(n / 2) + n^2 \`

- a=3
- b=2
- f(n) = n^2

**2)** Calculate recursive work:

\` n^(log_2 3) \`

\` n^(1.48) \`

**3)** Since *`f(n)`* is bigger than the recursive work we have:

> \` O(n^2) \`

# Master Method Exceptions

The master method is handy but there are certain cases when you cannot use it.

- *`T(n)`* is not monotone. E.g. \` T(n) = sin n\`.
- *`f(n)`* is not polynomial. E.g. \` T(n) = 2 * T(n/2) + 2^n \`.
- *`b`* cannot be expressed as a constant. E.g. \` T(n) = 2 * T(sqrt(n)) + n \`.

For these cases, you would have to recursion tree method or substitution method. We are going to explore these methods in future posts after covering the fundamentals.

# Summary

On this post, we provided the tools to quickly obtain the runtime of recursive algorithms that split input by a constant factor. We covered the Master Method and provided examples for each one of its possible cases.
