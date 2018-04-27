---
layout: draft
title: Analysis of Recursive Algorithms
comments: true
pageviews__total: 0
pageviews__recent: 0
pageviews__avg_time: 0
tutorial__order: 3
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


Analyzing the running time of non-recursive algorithms is pretty straigthtforward. You count the lines of code and if there's any loops you multiply the number of lines by length of the loop. However, recursive algorithms are not that intuitive. They divide the input into one or more subproblems and execute some work outside the recursion as well. On this post, we are going to learn how to get the big O notation for recurisve algorithms.

<!-- more -->

This post is part of a serie of the Data Structures and Algorithms (DSA) for Beginners:

1. [Algorithm's time complexity and Big O notation](/blog/2018/04/04/how-you-can-change-the-world-learning-data-structures-algorithms-free-online-course-tutorial/)
1. [Eight most popular running times of algorithms </i>with examples</i>](/blog/2018/04/05/big-o-notation-and-time-complexity-to-speed-up-your-algorithms/)
1. Analysis of Recursive Algorithms **👈 you are here**

We are going to explore two methods of obtaining the time complexity of recursive algorithms. For that, we are going to use the **Master Theorem** (or master method)
<!-- One is the **Master Theorem** and other is the **Recursion Tree**.  -->
Let's get started with the first one!

#  Master Theorem

The Master Theorem is the most straitforward way of obtaining runtime of recursive algorithms. You need to identify 3 things:

- *`a`*: Subproblems. How many recursion functions there are? E.g. Binary search has 1, Merge Sort has 2, etc...
- *`b`*: Relative subproblem size. What rate is the input reduced? E.g. Binary search and Merge sort cut input in half.
- *`f(n)`* Runtime of the work done outside the recursion? E.g. \`O(n)\`

The general formula for the Master Theorem is:

> \` T(n) = a * T(n / b) + f(n) \`

Once, we have `a`, `b` and `f(n)` we also need to know the runtime of the work done in the recursion. That is given by:

> \` O(n^(log_b a)) \`

Finally, we have 3 cases depending how the runtime of the recursion compares to the work done outiside the recursion *`f(n)`*.

**Case 1** Recursion runtime is higher: \`n^(log_b a) > f(n)\`

Runtime: \`O(n^(log_b a))\`

**Case 2** Same runtime inside and outside recursion: \`n^(log_b a) ~~ f(n)\`

Runtime: \`O(n^(log_b a) log n)\`

**Case 3:** Recursion runtime is lower: \`n^(log_b a) < f(n)\`

Runtime: \`O(f(n))\`

This might see a little abstract at first but after a few example it will clearer.

# Master Theorem Examples

In the previous post we used Master Method to get the time complexity for the [binary search](/blog/2018/04/05/big-o-notation-and-time-complexity-to-speed-up-your-algorithms/#Binary-search) and [merge sort](/blog/2018/04/05/big-o-notation-and-time-complexity-to-speed-up-your-algorithms/#Mergesort). Both fall into the case 2. Let's explore some other examples.

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
- Sub-problems size? it's 1/4 of the original size, so `b=4`
- Runtime without recursion? Constant, so `f(n) = 1`.

Substituting the values we get:

\` T(n) = a * T(n / b) + f(n) \`

\` T(n) = 2 * T(n / 4) + 1 \`

**2)** What's the runtime of the recusion by itself? Using the formula, we get:

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

So, this new implementation divides the input in 3 subproblems (`a = 3`). The input size is divided by 3 (`b=3`). The work to `merge` the 3 sub-problems is still `O(n)`.

**1)** Using the Master Theorem, we get:

\` T(n) = a * T(n / b) + f(n) \`

\` T(n) = 3 * T(n / 3) + n \`

**2)** Let's compute the amount of work done in the recursion:

\` n^(log_b a) \`

\` n^(log_3 3) = n \`

**3)** Since `f(n)` and the recursive work are the same: `n`, we are looking at the *case 3*. Thus, the run time is:

\`O(n^(log_b a) log n)\`

\`O(n^(log_3 3) log n)\`

> \`O(n log n)\`

It's the same as merge sort dividing the input in 2 subproblems and half `n`.

## Case 3 Example

Case 3 of the Master Method is not very common in real life, since it implies that most of the work is done on the base case of the recursion. If most work is done outside the recursion, it means that we can easily re-write the code to be non-recursive way.

Anyways, let's solve this example:

**1)** \` T(n) = 3 * T(n / 2) + n^2 \`

- a=3
- b=2
- f(n) = n^2



**2)** Calculate recursive work:

\` n^(log_2 3) \`

\` n^(1.48) \`

**3)** Since, f(n) is bigger than the recursive work we have:

> \` O(n^2) \`


# Master Method Exceptions

Master method is very useful but there are certain cases when you cannot use it.

- *`T(n)`* is not monotone. E.g. \` T(n) = sin n\`.
- *`f(n)`* is not polynomial. E.g. \` T(n) = 2 * T(n/2) + 2^n \`.
- *`b`* cannot be expressed as a constant. E.g. \` T(n) = 2 * T(sqrt(n)) + n \`.


# Summary

...


<!-- Stick around to learn how to figure out the time complexity of algorithms that doesn't fit the Master Theorem. -->
<!-- # Recursion tree -->

<!-- Recursion tree is a valuable way to determine the runtime of recursive algorithms. Let's see the following example: -->

<!-- ## Fibonacci running time complexity -->

<!-- https://stackoverflow.com/a/360773/684957
http://courses.csail.mit.edu/6.01/spring07/lectures/lecture4.pdf
https://en.wikipedia.org/wiki/Fibonacci_number#Closed_form_expression -->

<!--
```js
function fibonacci(n) {
  if (n <= 1)
    return n;
  else {
    return fibonacci(n - 1) + fibonacci(n - 2);
  }
}
```

What's the running time of this recursive function? We cannot use the master method since `b` cannot be expressed as a constant. Let's express the recursion like this:

\` T(n) = { ( T(n - 1) + T(n - 2) + O(1), n > 1 ), ( 1, n <= 1 ) :} \`


\` sum_{i=0}^m 1 = m+1 \` -->

<!--
We can run the iteration for a couple of times to see if we can identify a pattern. This is the base equation with *`T(n)`*

1) \`  T(n) = T(n - 1) + T(n - 2) + 1\`

Let's substitute *`n`* from `1)` with *`n - 1`* and get the following:

\`T(n - 1) = T((n - 1) - 1) + T((n - 1) - 2) + 1\`

that can be simplify to:

2) \`T(n - 1) = T(n - 2) + T(n - 3) + 1\`

Let's do it again replace: *`n`* from `2)` with *`n - 1`*:

\`T((n -1) - 1) = T((n-1) - 2) + T((n-1) - 3) + 1\`

simplifying:

3) \`T(n-2) = T(n-3) + T(n-4) + 1\`



```
         1
      /       \
   T(n-1)   T(n-2)

```
 -->


<!--

https://www.cs.cornell.edu/courses/cs3110/2012sp/lectures/lec20-master/lec20.html


 -->

<!-- ## Other -->

<!-- https://stackoverflow.com/q/13467674/684957 -->

<!-- ```java
// O(n)
int recursiveFun1(int n)
{
    if (n <= 0)
        return 1;
    else
        return 1 + recursiveFun1(n-1);
}

// O(n)
int recursiveFun2(int n)
{
    if (n <= 0)
        return 1;
    else
        return 1 + recursiveFun2(n-5);
}

// O(log n)
int recursiveFun3(int n)
{
    if (n <= 0)
        return 1;
    else
        return 1 + recursiveFun3(n/5);
}

// O(n^2)
void recursiveFun4(int n, int m, int o)
{
    if (n <= 0)
    {
        printf("%d, %d\n",m, o);
    }
    else
    {
        recursiveFun4(n-1, m+1, o);
        recursiveFun4(n-1, m, o+1);
    }
}

// O(n)
int recursiveFun5(int n)
{
    for (i = 0; i < n; i += 2) {
        // do something
    }

    if (n <= 0)
        return 1;
    else
        return 1 + recursiveFun5(n-5);
}
```


# Summary

Deserunt veniam proident minim enim enim reprehenderit pariatur pariatur aliqua. Ex ad irure nisi elit. Dolor non proident ad nostrud officia occaecat esse culpa ut consequat laboris. -->


<!--

ex and solutions:
http://www.csd.uwo.ca/~moreno/CS433-CS9624/Resources/master.pdf
http://www.cse.unt.edu/~tarau/teaching/cf1/Master%20theorem.pdf
https://www.math.dartmouth.edu/archive/m19w03/public_html/Section5-2.pdf

 -->