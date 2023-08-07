---
layout: post
title: 8 time complexities that every programmer should know
comments: true
toc: true
pageviews__total: 467273
pageviews__recent: 12278
pageviews__avg_time: 1797
tutorial__order: 2
photos:
- /images/data-structures-must-know-algorithms-running-time-complexity-small.jpg
- /images/data-structures-must-know-algorithms-running-time-complexity-large.jpg
photos__background_color: '#F4F0EF'
alias: /blog/2018/04/05/most-popular-algorithms-time-complexity-every-programmer-should-know-free-online-tutorial-course/
tags:
  - algorithms
  - tutorial_algorithms
categories:
  - Coding
  - Data Structures and Algorithms (DSA)
date: 2018-04-05 16:10:09
updated: 2019-09-19 11:39:53
---

## Summary

Learn how to compare algorithms and develop code that scales! In this post, we cover 8 Big-O notations and provide an example or 2 for each. We are going to learn the top algorithm's running time that every developer should be familiar with. Knowing these time complexities will help you to assess if your code will scale. Also, it's handy to compare multiple solutions for the same problem. By the end of it, you would be able to eyeball different implementations and know which one will perform better without running the code!

<!-- more -->

In the [previous post](/blog/2018/04/04/how-you-can-change-the-world-learning-data-structures-algorithms-free-online-course-tutorial/), we saw how Alan Turing saved millions of lives with an optimized algorithm. In most cases, faster algorithms can save you time, money and enable new technology. So, this is paramount to know how to measure algorithms' performance.

### What is time complexity?

To recap **time complexity** estimates how an algorithm performs regardless of the kind of machine it runs on. You can get the time complexity by "counting" the number of operations performed by your code. This time complexity is defined as a function of the input size `n` using Big-O notation. `n` indicates the input size, while O is the worst-case scenario growth rate function.

We use the Big-O notation to classify algorithms based on their running time or space (memory used) as the input grows. The `O` function is the growth rate in function of the input size `n`.

Here are the **big O cheatsheet** and examples that we will cover in this post before we dive in. **Click** on them to go to the implementation. 😉


<table>
<thead>
<tr>
<th>Big O Notation</th>
<th>Name</th>
<th>Example(s)</th>
</tr>
</thead>
<tbody>
<tr>
<td class="green"><i>O(1)</i></td>
<td class="green">Constant</td>
<td># <a href="#Odd-or-Even">Odd or Even number</a>,<br># <a href="#Look-up-table">Look-up table (on average)</a></td>
</tr>
<tr>
<td class="green"><i>O(log n)</i></td>
<td class="green">Logarithmic</td>
<td># <a href="#Binary-search">Finding element on sorted array with <strong>binary search</strong></a></td>
</tr>
<tr>
<td class="green"><i>O(n)</i></td>
<td class="green">Linear</td>
<td># <a href="#The-largest-item-on-an-unsorted-array">Find max element in unsorted array</a>,<br># Duplicate elements in array with Hash Map</td>
</tr>
<tr>
<td class="green"><i>O(n log n)</i></td>
<td class="green">Linearithmic</td>
<td># <a href="#Mergesort">Sorting elements in array with <strong>merge sort</strong></a></td>
</tr>
<tr>
<td class="orange"><i>O(n<sup>2</sup>)</i></td>
<td class="orange">Quadratic</td>
<td># <a href="#Has-duplicates">Duplicate elements in array **(naïve)**</a>,<br># <a href="#Bubble-sort">Sorting array with <strong>bubble sort</strong></a></td>
</tr>
<tr>
<td class="orange"><i>O(n<sup>3</sup>)</i></td>
<td class="orange">Cubic</td>
<td># <a href="#Triple-nested-loops">3 variables equation solver</a></td>
</tr>
<tr>
<td class="red"><i>O(2<sup>n</sup>)</i></td>
<td class="red">Exponential</td>
<td># <a href="#Subsets-of-a-Set">Find all subsets</a></td>
</tr>
<tr>
<td class="red"><i>O(n!)</i></td>
<td class="red">Factorial</td>
<td># <a href="#Permutations">Find all permutations of a given set/string</a></td>
</tr>
</tbody>
</table>

Now, Let's go one by one and provide code examples!

You can find all these implementations and more in the Github repo:
[https://github.com/amejiarosario/dsa.js](https://github.com/amejiarosario/dsa.js)

---
This post is part of a tutorial series:

**Learning Data Structures and Algorithms (DSA) for Beginners**
1. [Intro to algorithm's time complexity and Big O notation](/blog/2018/04/04/how-you-can-change-the-world-learning-data-structures-algorithms-free-online-course-tutorial/)
<!-- 1. Intro to Algorithm's Time Complexity and Big O Notation **👈 you are here** -->

1. Eight time complexities that every programmer should know **👈 you are here**
<!-- 1. [Eight time complexities that every programmer should know](/blog/2018/04/05/most-popular-algorithms-time-complexity-every-programmer-should-know-free-online-tutorial-course/) -->

1. [Data Structures for Beginners: Arrays, HashMaps, and Lists](/blog/2018/04/28/Data-Structures-Time-Complexity-for-Beginners-Arrays-HashMaps-Linked-Lists-Stacks-Queues-tutorial/)
<!-- 1. Data Structures for Beginners: Arrays, HashMaps, and Lists **👈 you are here** -->

1. [Graph Data Structures for Beginners](/blog/2018/05/14/Data-Structures-for-Beginners-Graphs-Time-Complexity-tutorial/)
<!-- 1. Graph Data Structures for Beginners **👈 you are here** -->

1. [Trees Data Structures for Beginners](/blog/2018/06/11/Data-Structures-for-Beginners-Trees-binary-search-tree-tutorial/)
<!-- 1. Trees Data Structures for Beginners **👈 you are here** -->

1. [Self-balanced Binary Search Trees](/blog/2018/07/16/Self-balanced-Binary-Search-Trees-with-AVL-tree-Data-Structure-for-beginners/)
<!-- 1. Self-balanced Binary Search Trees  **👈 you are here** -->

1. [Appendix I: Analysis of Recursive Algorithms](/blog/2018/04/24/Analysis-of-Recursive-Algorithms/)
<!-- 1. Appendix I: Analysis of Recursive Algorithms **👈 you are here** -->
---

<!-- table: time complexities -->

## O(1) - Constant time

<iframe width="560" height="315" src="https://www.youtube.com/embed/mnv6sV-Ih8s?rel=0&start=520" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

`O(1)` describes algorithms that take the same amount of time to compute regardless of the input size.

For instance, if a function takes the same time to process ten elements and 1 million items, then we say that it has a constant growth rate or `O(1)`. Let’s see some cases.

**Examples of constant runtime algorithms**:
- Find if a number is even or odd.
- Check if an item on an array is null.
- Print the first element from a list.
- Find a value on a map.

For our discussion, we are going to implement the first and last example.

### Odd or Even

Find if a number is odd or even.

```js
  function isEvenOrOdd(n) {
    return n % 2 ? 'Odd' : 'Even';
  }

  console.log(isEvenOrOdd(10)); // => Even
  console.log(isEvenOrOdd(10001)); // => Odd
```

**Advanced Note:** you could also replace *`n % 2`* with the bit AND operator: *`n & 1`*. If the first bit (<abbr title="Least Significant Bit">LSB</abbr>) is `1` then is odd otherwise is even.

It doesn't matter if n is `10` or `10,001`. It will execute line 2 one time.

> Do not be fooled by one-liners. They don't always translate to constant times. You have to be aware of how they are implemented.

If you have a method like `Array.sort()` or any other array or object method, you have to look into the implementation to determine its running time.

Primitive operations like sum, multiplication, subtraction, division, modulo, bit shift, etc., have a constant runtime. Did you expect that? Let's go into detail about why they are constant time. If you use the schoolbook long multiplication algorithm, it would take <code>O(n<sup>2</sup>)</code> to multiply two numbers. However, most programming languages limit numbers to max value (e.g. in JS: `Number.MAX_VALUE` is `1.7976931348623157e+308`). So, you cannot operate numbers that yield a result greater than the `MAX_VALUE`. So, primitive operations are bound to be completed on a fixed amount of instructions `O(1)` or throw overflow errors (in JS, `Infinity` keyword).

<!-- Addition O(n), Multiplication O(n^2) https://en.wikipedia.org/wiki/Computational_complexity_of_mathematical_operations -->

 This example was easy. Let's do another one.

### Look-up table

Given a string, find its word frequency data.

```js
const dictionary = {the: 22038615, be: 12545825, and: 10741073, of: 10343885, a: 10144200, in: 6996437, to: 6332195 /* ... */};

function getWordFrequency(dictionary, word) {
  return dictionary[word];
}

console.log(getWordFrequency(dictionary, 'the'));
console.log(getWordFrequency(dictionary, 'in'));
```

Again, we can be sure that even if the dictionary has 10 or 1 million words, it would still execute line 4 once to find the word. However, if we decided to store the dictionary as an array rather than a hash map, it would be a different story. In the next section, we will explore what's the running time to find an item in an array.

> Only a hash table with a perfect *hash function* will have a worst-case runtime of *O(1)*. The ideal hash function is not practical, so some collisions and workarounds lead to a worst-case runtime of *O(n)*. Still, on *average*, the lookup time is *O(1)*.

## O(n) - Linear time

<iframe width="560" height="315" src="https://www.youtube.com/embed/mnv6sV-Ih8s?rel=0&start=732" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Linear running time algorithms are widespread. These algorithms imply that the program visits every element from the input.

Linear time complexity _`O(n)`_ means that the algorithms take proportionally longer to complete as the input grows.

**Examples of linear time algorithms**:
- Get the max/min value in an array.
- Find a given element in a collection.
- Print all the values in a list.

Let's implement the first example.

### The largest item on an unsorted array

Let's say you want to find the maximum value from an unsorted array.

```js
function findMax(n) {
  let max;
  let counter = 0;

  for (let i = 0; i < n.length; i++) {
    counter++;
    if(max === undefined || max < n[i]) {
      max = n[i];
    }
  }

  console.log(`n: ${n.length}, counter: ${counter}`);
  return max;
}
```

How many operations will the `findMax` function do?

Well, it checks every element from `n`. If the current item is more significant than `max` it will do an assignment.

Notice that we added a counter to count how many times the inner block is executed.

If you get the time complexity, it would be something like this:
- Line 2-3: 2 operations
- Line 4: a loop of size n
- Line 6-8: 3 operations inside the for-loop.

So, this gets us `3(n) + 2`.

Applying the Big O notation that we learn in the
[previous post](https://adrianmejia.com/blog/2018/04/04/how-you-can-change-the-world-learning-data-structures-algorithms-free-online-course-tutorial/#Asymptotic-analysis),
we only need the biggest order term, thus `O(n)`.

We can verify this using our `counter`. If `n` has 3 elements:

```js
findMax([3, 1, 2]);
// n: 3, counter: 3
```

or if `n` has 9 elements:

```js
findMax([4,5,6,1,9,2,8,3,7])
// n: 9, counter: 9
```

Now imagine that you have an array of one million items. Do you think it will take the same time? Of course not. It will take longer to the size of the input. If we plot `n` and `findMax` running time, we will have a linear function graph.

{% img /images/linear-running-time-o(n).jpg 'Linear Running time O(n) example' %}

## O(n^2) - Quadratic time

<iframe width="560" height="315" src="https://www.youtube.com/embed/ZRCTMYv2fRU?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

A function with a quadratic time complexity has a growth rate of n<sup>2</sup>. If the input is size 2, it will do four operations. If the input is size 8, it will take 64, and so on.

Here are some **examples of quadratic algorithms**:
- Check if a collection has duplicated values.
- Sorting items in a collection using bubble sort, insertion sort, or selection sort.
- Find all possible ordered pairs in an array.

Let's implement the first two.

### Has duplicates

You want to find duplicate words in an array. A naïve solution will be the following:

```js
function hasDuplicates(n) {
  const duplicates = [];
  let counter = 0; // debug

  for (let outter = 0; outter < n.length; outter++) {
    for (let inner = 0; inner < n.length; inner++) {
      counter++; // debug

      if(outter === inner) continue;

      if(n[outter] === n[inner]) {
        return true;
      }
    }
  }

  console.log(`n: ${n.length}, counter: ${counter}`); // debug
  return false;
}
```

Time complexity analysis:
- Line 2-3: 2 operations
- Line 5-6: double-loop of size n, so `n^2`.
- Line 7-13: has ~3 operations inside the double-loop

We get `3n^2 + 2`.

When we have an asymptotic analysis, we drop all constants and leave the most critical term: `n^2`. So, in the big O notation, it would be `O(n^2)`.

We are using a counter variable to help us verify. The `hasDuplicates` function has two loops. If we have an input of 4 words, it will execute the inner block 16 times. If we have 9, it will perform counter 81 times and so forth.

```js
hasDuplicates([1,2,3,4]);
// n: 4, counter: 16
```

and with n size 9:

```js
hasDuplicates([1,2,3,4,5,6,7,8,9]);
// n: 9, counter: 81
```
Let's see another example.

  ## Bubble sort

We want to sort the elements in an array. One way to do this is using bubble sort as follows:

```js
function sort(n) {
  for (let outer = 0; outer < n.length; outer++) {
    let outerElement = n[outer];

    for (let inner = outer + 1; inner < n.length; inner++) {
      let innerElement = n[inner];

      if(outerElement > innerElement) {
        // swap
        n[outer] = innerElement;
        n[inner] = outerElement;
        // update references
        outerElement = n[outer];
        innerElement = n[inner];
      }
    }
  }
  return n;
}
```

You might also notice that for a very big `n`, the time it takes to solve the problem increases a lot. Can you spot the relationship between nested loops and the running time? When a function has a single loop, it usually translates into a running time complexity of O(n). Now, this function has 2 nested loops and quadratic running time: O(n<sup>2</sup>).

<!--

As you can probably guess, two inner loops translate to O(n^2) since it has to go through the array twice in most cases.

Usually, we want to stay away from polynomial running times (quadratic, cubic, O(n^c), etc.) since they take longer to compute as the input grows fast. However, they are not the worst. Let's something that takes even longer.

### Quicksort
---

Expand:
  * worst case: reverse order
  * best case: already ordered

---
-->

## O(n^c) - Polynomial time

Polynomial running is represented as O(n<sup>c</sup>), when `c > 1`. As you already saw, two inner loops almost translate to O(n<sup>2</sup>) since it has to go through the array twice in most cases. Are three nested loops cubic? If each one visit all elements, then yes!

Usually, we want to stay away from polynomial running times (quadratic, cubic, n<sup>c</sup>, etc.) since they take longer to compute as the input grows fast. However, they are not the worst.


### Triple nested loops
Let's say you want to find the solutions for a multi-variable equation that looks like this:

> 3x + 9y + 8z = 79

This naïve program will give you all the solutions that satisfy the equation where `x`, `y`, and `z` < `n`.

```js
function findXYZ(n) {
  const solutions = [];

  for(let x = 0; x < n; x++) {
    for(let y = 0; y < n; y++) {
      for(let z = 0; z < n; z++) {
        if( 3*x + 9*y + 8*z === 79 ) {
          solutions.push({x, y, z});
        }
      }
    }
  }

  return solutions;
}

console.log(findXYZ(10)); // => [{x: 0, y: 7, z: 2}, ...]
```

This algorithm has a cubic running time: `O(n^3)`.

** Note:** We could do a more efficient solution to solve multi-variable equations, but this works to show an example of a cubic runtime.

## O(log n) - Logarithmic time

<iframe width="560" height="315" src="https://www.youtube.com/embed/cCPOayp1vek?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Logarithmic time complexities usually apply to algorithms that divide problems in half every time. For instance, let's say that we want to look for a book in a dictionary. As you know, this book has every word sorted alphabetically. If you are looking for a word, then there are at least two ways to do it:

Algorithm A:

1. Start on the first page of the book and go word by word until you find what you are looking for.

Algorithm B:

1. Open the book in the middle and check the first word on it.
1. If the word you are looking for is alphabetically more significant, then look to the right. Otherwise, look in the left half.
1. Divide the remainder in half again, and repeat step #2 until you find the word you are looking for.

Which one is faster? The first algorithms go word by word _O(n)_, while the algorithm B split the problem in half on each iteration _O(log n)_. This 2nd algorithm is a **binary search**.

### Binary search

Find the index of an element in a sorted array.

If we implement (Algorithm A) going through all the elements in an array, it will take a running time of `O(n)`. Can we do better? We can try using the fact that the collection is already sorted. Later, we can divide it in half as we look for the element in question.

{% codeblock lang:js mark:3-4,11,14 %}
function indexOf(array, element, offset = 0) {
  // split array in half
  const half = parseInt(array.length / 2);
  const current = array[half];

  if(current === element) {
    return offset + half;
  } else if(element > current) {
    const right = array.slice(half);
    return indexOf(right, element, offset + half);
  } else {
    const left = array.slice(0, half)
    return indexOf(left, element, offset);
  }
}

// Usage example with a list of names in ascending order:
const directory = ["Adrian", "Bella", "Charlotte", "Daniel", "Emma", "Hanna", "Isabella", "Jayden", "Kaylee", "Luke", "Mia", "Nora", "Olivia", "Paisley", "Riley", "Thomas", "Wyatt", "Xander", "Zoe"];
console.log(indexOf(directory, 'Hanna'));   // => 5
console.log(indexOf(directory, 'Adrian'));  // => 0
console.log(indexOf(directory, 'Zoe'));     // => 18
{% endcodeblock %}

Calculating the time complexity of `indexOf` is not as straightforward as the previous examples. This function is recursive.

There are several ways to analyze recursive algorithms. For simplicity, we are going to use the `Master Method`.

### Master Method for recursive algorithms

Finding the runtime of recursive algorithms is not as easy as counting the operations. This method helps us to determine the runtime of recursive algorithms. We are going to explain this solution using the `indexOf` function as an illustration.

When analyzing recursive algorithms, we care about these three things:
- The runtime of the work done outside the recursion (line 3-4): `O(1)`
- How many recursive calls the problem is divided (line 11 or 14): `1` recursive call. Notice only one or the other will happen, never both.
- How much `n` is reduced on each recursive call (line 10 or 13): `1/2`. Every recursive call cuts `n` in half.

1) The Master Method formula is the following:

> T(n) = a T(n/b) + f(n)

where:
- `T`: time complexity function in terms of the input size `n`.
- `n`: the size of the input. duh? :)
- `a`: the number of sub-problems. For our case, we only split the problem into one subproblem. So, `a=1`.
- `b`: the factor by which `n` is reduced. For our example, we divide `n` in half each time. Thus, `b=2`.
- `f(n)`: the running time outside the recursion. Since dividing by 2 is constant time, we have `f(n) = O(1)`.

2) Once we know the values of `a`, `b` and `f(n)`. We can determine the runtime of the recursion using this formula:

> n<sup>log<sub>b</sub>a</sup>

This value will help us to find which master method case we are solving.

For binary search, we have:

n<sup>log<sub>b</sub>a</sup> = n<sup>log<sub>2</sub>1</sup> = n<sub>0</sub> = 1

3) Finally, we compare the recursion runtime from step 2) and the runtime `f(n)` from step 1). Based on that, we have the following cases:

**_Case 1_: Most of the work done in the recursion.**

If <code>n<sup>log<sub>b</sub>a</sup></code> > `f(n)`,

**then** runtime is:

> <i>O(n<sup>log<sub>b</sub>a</sup>)</i>

**_Case 2_: The runtime of the work done in the recursion and outside is the same**

If <code>n<sup>log<sub>b</sub>a</sup></code> === `f(n)`,

**then** runtime is:

> <i>O(n<sup>log<sub>b</sub>a</sup> log(n))</i>

**_Case 3_: Most of the work is done outside the recursion**

If <code>n<sup>log<sub>b</sub>a</sup></code> < `f(n)`,

**then** runtime is:

> <i>O(f(n))</i>

Now, let's combine everything we learned here to get the running time of our binary search function `indexOf`.

### Master Method for Binary Search

The binary search algorithm slit `n` in half until a solution is found or the array is exhausted. So, using the Master Method:

> T(n) = a T(n/b) + f(n)

1) Find `a`, `b` and `f(n)` and replace it in the formula:
- `a`: the number of sub-problems. For our example, we only split the problem into another subproblem. So `a=1`.
- `b`: the factor by which `n` is reduced. For our case, we divide `n` in half each time. Thus, `b=2`.
- `f(n)`: the running time outside the recursion: `O(1)`.

Thus,

> T(n) = T(n/2) + O(1)

2) Compare the runtime executed inside and outside the recursion:

- Runtime of the work done **outside** the recursion: `f(n)`. E.g. `O(1)`.
- Runtime of work done **inside** the recursion given by this formula <code>n<sup>log<sub>b</sub>a</sup></code>. E.g. O(<code>n<sup>log<sub>2</sub>1<sup></code>) = O(<code>n<sup>0<sub></code>) = `O(1)`.


3) Finally, getting the runtime. Based on the comparison of the expressions from the previous steps, find the case it matches.

As we saw in the previous step, the work outside and inside the recursion has the same runtime, so we are in **case 2**.

> O(n<sup>log<sub>b</sub>a</sup> log(n))

Making the substitution, we get:

O(n<sup>log<sub>2</sub>1</sup> log(n))

O(n<sup>0</sup> log(n))

O(log(n))  **👈 this is the running time of a binary search**

<!--

https://www.youtube.com/watch?v=6CX7s7JnXs0 - Master Method ( incl. Step-By-Step Guide and Examples ) - Analysis

https://stackoverflow.com/questions/tagged/big-o?sort=votes&pageSize=20

https://mauriciopoppe.github.io/function-plot/

https://www.topcoder.com/community/data-science/data-science-tutorials/binary-search/

https://stackoverflow.com/questions/tagged/algorithm
https://stackoverflow.com/questions/tagged/data-structures
https://math.stackexchange.com/questions/tagged/recursive-algorithms+algorithms

https://stackoverflow.com/q/13467674/684957
https://en.wikipedia.org/wiki/Master_theorem_(analysis_of_algorithms) -->

## O(n log n) - Linearithmic

<iframe width="560" height="315" src="https://www.youtube.com/embed/PADwBMuehYc?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Linearithmic time complexity it's slightly slower than a linear algorithm. However, it's still much better than a quadratic algorithm (you will see a graph at the very end of the post).

**Examples of Linearithmic algorithms:**
- Efficient sorting algorithms like merge sort, quicksort, and others.

### Mergesort

What's the best way to sort an array?  Before, we proposed a solution using bubble sort that has a time complexity of O(n<sup>2</sup>). Can we do better?

We can use an algorithm called `mergesort` to improve it.
This is how mergesort works:

1. We are going to divide the array recursively until the elements are two or less.
2. We know how to sort two items, so we sort them iteratively (base case).
3. The final step is merging: we merge in taking one by one from each array such that they are in ascending order.

Here's the code for merge sort:

```js
/**
 * Sort array in asc order using merge-sort
 * @example
 *    sort([3, 2, 1]) => [1, 2, 3]
 *    sort([3]) => [3]
 *    sort([3, 2]) => [2, 3]
 * @param {array} array
 */
function sort(array = []) {
  const size = array.length;
  // base case
  if (size < 2) {
    return array;
  }
  if (size === 2) {
    return array[0] > array[1] ? [array[1], array[0]] : array;
  }
  // split and merge
  const mid = parseInt(size / 2, 10);
  return merge(sort(array.slice(0, mid)), sort(array.slice(mid)));
}

/**
 * Merge two arrays in asc order
 * @example
 *    merge([2,5,9], [1,6,7]) => [1, 2, 5, 6, 7, 9]
 * @param {array} array1
 * @param {array} array2
 * @returns {array} merged arrays in asc order
 */
function merge(array1 = [], array2 = []) {
  const merged = [];
  let array1Index = 0;
  let array2Index = 0;
  // merge elements on a and b in asc order. Run-time O(a + b)
  while (array1Index < array1.length || array2Index < array2.length) {
    if (array1Index >= array1.length || array1[array1Index] > array2[array2Index]) {
      merged.push(array2[array2Index]);
      array2Index += 1;
    } else {
      merged.push(array1[array1Index]);
      array1Index += 1;
    }
  }
  return merged;
}
```
As you can see, it has two functions, `sort` and `merge`. Merge is an auxiliary function that runs once through the collection `a` and `b`, so it's running time is O(n). Let's apply the Master Method to find the running time.

### Master Method for Mergesort

We are going to apply the <a href="#Master-Method-for-recursive-algorithms">Master Method that we explained above</a> to find the runtime:

1) Let's find the values of: `T(n) = a T(n/b) + f(n)`

  - `a`: The number of sub-problems is 2 (line 20). So, `a = 2`.
  - `b`: Each of the sub-problems divides `n` in half. So, `b = 2`
  - `f(n)`: The work done outside the recursion is the function `merge`, which has a runtime of `O(n)` since it visits all the elements on the given arrays.

Substituting the values:

> T(n) = 2 T(n/2) + O(n)

2) Let's find the work done in the recursion: <code>n<sup>log<sub>b</sub>a</sup></code>.

n<sup>log<sub>2</sub>2</sup>

n<sup>1</sup> = n

3) Finally, we can see that recursion runtime from step 2) is O(n) and also the non-recursion runtime is O(n). So, we have the <a href="#Case-2-The-runtime-of-the-work-done-in-the-recursion-and-outside-is-the-same"> case 2 </a>: <code><i>O(n<sup>log<sub>b</sub>a</sup> log(n))</i></code>

<i>O(n<sup>log<sub>2</sub>2</sup> log(n))</i>

<i>O(n<sup>1</sup> log(n))</i>

<i>O(n log(n))</i> **👈 this is running time of the merge sort**


## O(2^n) - Exponential time

<iframe width="560" height="315" src="https://www.youtube.com/embed/LDwZK4I6QDc?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Exponential (base 2) running time means that the calculations performed by an algorithm double every time as the input grows.

**Examples of exponential runtime algorithms:**
- Power Set: finding all the subsets on a set.
- Fibonacci using a recursive algorithm.
- Travelling salesman problem using dynamic programming.

### Power Set

To understand the power set, let's imagine you are buying a pizza.
The store has many toppings that you can choose from, like pepperoni, mushrooms, bacon, and pineapple.
Let's call each topping A, B, C, D. What are your choices? You can select no topping (you are on a diet ;), you can choose one topping, or two or three or all of them, and so on. The power set gives you all the possibilities (BTW, there 16 with four toppings, as you will see later)

Finding all distinct subsets of a given set. For instance, let's do some examples to try to come up with an algorithm to solve it:
```js
powerset('') // =>  ['']
powerset('a') // => ['', 'a']
powerset('ab') // => ['', 'a', 'b', 'ab']
```

Did you notice any pattern?

- The first returns an empty element.
- The second case returns the empty element + the 1st element.
- The 3rd case returns precisely the results of the 2nd case + the same array with the 2nd element `b` appended to it.

What if you want to find the subsets of `abc`? Well, it would be precisely the subsets of 'ab' and again the subsets of `ab` with `c` appended at the end of each element.

As you noticed, every time the input gets longer, the output is twice as long as the previous one. Let's code it up:

```js
function powerset(n = '') {
  const array = Array.from(n);
  const base = [''];

  const results = array.reduce((previous, element) => {
    const previousPlusElement = previous.map(el => {
      return `${el}${element}`;
    });
    return previous.concat(previousPlusElement);
  }, base);

  return results;
}
```

If we run that function for a couple of cases we will get:

```js
powerset('') // ...
// n = 0, f(n) = 1;
powerset('a') // , a...
// n = 1, f(n) = 2;
powerset('ab') // , a, b, ab...
// n = 2, f(n) = 4;
powerset('abc') // , a, b, ab, c, ac, bc, abc...
// n = 3, f(n) = 8;
powerset('abcd') // , a, b, ab, c, ac, bc, abc, d, ad, bd, abd, cd, acd, bcd...
// n = 4, f(n) = 16;
powerset('abcde') // , a, b, ab, c, ac, bc, abc, d, ad, bd, abd, cd, acd, bcd...
// n = 5, f(n) = 32;
```

As expected, if you plot `n` and `f(n)`, you will notice that it would be exactly like the function `2^n`. This algorithm has a running time of `O(2^n)`.

** Note:** You should avoid functions with exponential running times (if possible) since they don't scale well. The time it takes to process the output doubles with every additional input size. But exponential running time is not the worst yet; others go even slower. Let's see one more example in the next section.

## O(n!) - Factorial time

<iframe width="560" height="315" src="https://www.youtube.com/embed/snBRcJlrnVw?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Factorial is the multiplication of all positive integer numbers less than itself. For instance:

> 5! = 5 x 4 x 3 x 2 x 1 = 120

It grows pretty quickly:

> 20! = 2,432,902,008,176,640,000

As you might guess, you want to stay away, if possible, from algorithms that have this running time!

**Examples of O(n!) factorial runtime algorithms**:
- Permutations of a string.
- Solving the traveling salesman problem with a brute-force search

Let's solve the first example.

### Permutations

Write a function that computes all the different words that can be formed given a string. E.g.

```js
getPermutations('a') // => [ 'a']
getPermutations('ab') // =>  [ 'ab', 'ba']
getPermutations('abc') // => [ 'abc', 'acb', 'bac', 'bca', 'cab', 'cba' ]
```

How would you solve that?

A straightforward way will be to check if the string has a length of 1. If so, return that string since you can't arrange it differently.

For strings with a length bigger than 1, we could use recursion to divide the problem into smaller problems until we get to the length 1 case. We can take out the first character and solve the problem for the remainder of the string until we have a length of 1.

```js
function getPermutations(string, prefix = '') {
  if(string.length <= 1) {
    return [prefix + string];
  }

  return Array.from(string).reduce((result, char, index) => {
    const reminder = string.slice(0, index) + string.slice(index+1);
    result = result.concat(getPermutations(reminder, prefix + char));
    return result;
  }, []);
}
```

If print out the output, it would be something like this:

```js
getPermutations('ab') // ab, ba...
// n = 2, f(n) = 2;
getPermutations('abc') // abc, acb, bac, bca, cab, cba...
// n = 3, f(n) = 6;
getPermutations('abcd') // abcd, abdc, acbd, acdb, adbc, adcb, bacd...
// n = 4, f(n) = 24;
getPermutations('abcde') // abcde, abced, abdce, abdec, abecd, abedc, acbde...
// n = 5, f(n) = 120;
```

I tried with a string with a length of 10. It took around 8 seconds!

```sh
time node ./lib/permutations.js
## getPermutations('abcdefghij') // => abcdefghij, abcdefghji, abcdefgihj, abcdefgijh, abcdefgjhi, abcdefgjih, abcdefhgij...
## // n = 10, f(n) = 3,628,800;
## ./lib/permutations.js  8.06s user 0.63s system 101% cpu 8.562 total
```

I have a little homework for you:

> Can you try with a permutation with 11 characters? ;) Comment below on what happened to your computer!

## All running complexities graphs

We explored the most common algorithms running times with one or two examples each! They should give you an idea of how to calculate your running times when developing your projects. Below you can find a chart with a graph of all the time complexities that we covered:

{% img /images/big-o-running-time-complexity.png 'Big o running time complexities' %}

Mind your time complexity!


<!-- Backlinks and references -->

<!-- https://www.reddit.com/r/compsci/comments/8hwozu/8_time_complexities_that_every_programmer_should/ -->
