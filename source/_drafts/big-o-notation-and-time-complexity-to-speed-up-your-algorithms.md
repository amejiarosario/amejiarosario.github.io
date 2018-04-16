---
layout: draft
title: What you need to know about Big O notation to speed up your algorithms
comments: true
toc: true
pageviews__total: 0
pageviews__recent: 0
pageviews__avg_time: 0
tutorial__order: 0
tags:
  - big-o notation
  - algorithms
categories:
  - Programming
  - Data Structures and Algorithms (DSA)
date: 2018-04-05 16:10:09
---

# Summary

In the previous post, we saw how an optimized algorithm saved millions of lives in the case of Alan Turing. But, in most common cases: fast algorithms can save you time, money and enabled new technology. So, It is paramount to know how to measure our algorithms performance.

To sum up, time complexity estimates the time taken by an algorithm independently from what kind of machine is run on. Time complexity is obtain by counting the number of elementary operations performed by the algorithm in the source code. This time complexity is expressed as a function of the input size using Big-O notation.

The Big-O notation is used to classify algorithms based on their running time or space (memory used) as the input grows. The O function is the growth rate in terms of the input size `n`. For instance, if a function takes the same time with an input of 1 as an input of 1 million, then we say that it has a constant grow rate or O(1). On the other hand, if a function grows at the same rate as the input, we say it has a linear running time O(n). `n` indicates the size of the input while O is the grow rate function.

Now, we are going to explore 8 of the most common time complexities and provides code examples!

<!-- table: time complexities -->

# O(1) - Constant time

  `O(1)` describes algorithms that has that takes the same time compute regardless of the input size. If the input size is 1 million or 10 elements, it doesn't matter it will take the same time. You can't get better than that. Let's see some examples.

  ## odd or even

  Find if a number is odd or even

  ```js
    function isEvenOrOdd(n) {
      return n % 2 ? 'Odd' : 'Even';
    }

    console.log(isEvenOrOdd(10)); // => Even
    console.log(isEvenOrOdd(10001)); // => Odd
  ```

  It doesn't matter if n is 10 or 10,001, it will execute line 2 only one time. This is kinda easy let's see another example.

  ## look-up table

  Look up the the word frequency given a dictionary.

```js
const dictionary = {the: 22038615, be: 12545825, and: 10741073, of: 10343885, a: 10144200, in: 6996437, to: 6332195 /* ... */};

function getWordFrequency(dictionary, word) {
  return dictionary[word];
}

console.log(getWordFrequency(dictionary, 'the'));
console.log(getWordFrequency(dictionary, 'in'));
```

Again, we can be sure that even if the dictionary has 1 million words, it would still execute line 4 only one time to find the word. However, if we decided to store the dictionary as an array rather than a hash map, then it would be a different story. In the next section, we are going to explore what's the running time to find an item in an array.

# O(n) - Linear time

  Linear running time algorithms are very common. It implies visiting every element from the input in the worst-case scenario.

  Linear time complexity means that as the input grows the algorithms takes proportionally longer. A function with a linear time complexity has a growth rate O(n). Let's do an example:

  ## Largest item on unsorted array

  Let's say you want to find the max value from an unsorted array and you want to find the maximum.

```js
function findMax(n) {
  let max;
  let counter = 0;

  for (let i = 0; i < n.length; i++) {
    counter++;
    if(!max && max < n[i]) {
      max = n[i];
    }
  }

  console.log(`n: ${n.length}, counter: ${counter}`);
  return max;
}
```

How many operations will the `findMax` function do? Well it basically checks every element from `n` and if it is bigger it will do an assignment. We could agree that if perform a constant number of operations (assignment, checks, increments) n times: O(k*n). We don't care about being too specific about the constant so we make it 1. Thus, we have O(n) running time.

Notice that we added a counter so it can help us count how many times the inner block is executed.

If `n` has 3 elements:

```js
findMax([3, 1, 2]);
// n: 3, counter: 3
```

or if `n` has 9 elements:

```js
findMax([4,5,6,1,9,2,8,3,7])
// n: 9, counter: 9
```

Now imaging that you have an array of one million items. Do you think it will take the same time? Of course not, it will take longer proportionally to the size of the input. If we plot it n and `findMax` running time we will have a graph exactly like a linear equation.



# O(n^2) - Quadratic time

  A function with a quadratic time complexity has a growth rate n^2. If the input is 2 it will do roughly 4 operations. If the input is 8 it will take 64. Let's do an example of a quadratic algorithm:

  ## Has duplicates

  Let's say you want to find duplicate words in an array. A naïve solution will be the following:

```js
function hasDuplicates(n) {
  const dupliates = [];
  let counter = 0;

  for (let outter = 0; outter < n.length; outter++) {
    for (let inner = 0; inner < n.length; inner++) {
      counter++;

      if(outter === inner) continue;

      if(n[outter] === n[inner]) {
        return true;
      }
    }
  }

  console.log(`n: ${n.length}, counter: ${counter}`);
  return false;
}
```

Again, we are using a counter variable to help use see what's going on. The hasDupliates function has two loops. If we have an input of 4 words, it will execute the innter block 16 times.

```js
hasDuplicates([1,2,3,4]);
// n: 4, counter: 16
```

and with n size 9:

```js
hasDuplicates([1,2,3,4,5,6,7,8,9]);
// n: 9, counter: 81
```

Also, you might notice that for very large n, the time it takes to solve the problem also increases. Can you spot the relationship between loops and the running time? When the function one single loop it had a running time complexity of O(n). Now, this function has 2 nested loops and quadratic running time: O(n^2).

  ## Bubble sort


There are many ways to sort elements in an array. This is a simple way to do it:

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

As you can probably guess, two inner loops almost translate to O(n^2) since it has to go through the array twice in most cases.

Usually, we want to stay away from polynomial running times (quadratic, cubic, O(n^c) …) since they take longer to compute as the input grows fast. However, they are not the worst. Let's something that takes even longer.

---

Expand:
  * worst case: reverse order
  * best case: already ordered

---

<!-- ## Quick sort -->

# O(n^c) - Polynomial time

Polynomial running is represented as O(n^c), when c > 1. As you already saw, two inner loops almost translate to O(n^2) since it has to go through the array twice in most cases. Are three nested loops cubic? In most cases, yes!

Usually, we want to stay away from polynomial running times (quadratic, cubic, O(n^c) …) since they take longer to compute as the input grows fast. However, they are not the worst. Let's something that takes even longer.

## Triple nested loops
Let's say you want to find the solutions for a multi-variable equation that looks like this:

> 3x + 9y + 8z = 79

This program will give you all the solutions that satisfy the equation where `x`, `y` and `z` < `n`

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

As you might guessed this algorithm has a cubic running time: `O(n^3)`

# O(log n) - Logarithmic time

Logarithmic time complexities usually aplies for algorithms that divides problems in half every time. For instance, let's say that we want to look for a person on a phone book. There are at least two ways to do it:

Algorithm A:
- Start at the begining of the book and go in order until you find the person you are looking for.

Algorithm B:
- Open the book in the middle and check the first name on it
- If the name that we are looking for is alphabetically bigger. Then look in the 2nd half, otherwise look in the 1st half

Which one is faster? Imagine that we have 10 million items.

## Binary search

Find the element in a sorted array.

If we implement (Algorithm A) going through all the elements in an array, it will take a running time of `O(n)`. Can we do better? Let's try using the fact that the array is already sorted and divide in half as we look for the element in question.




# O(n log n) - Linearithmic

Linearithmic time complexity it's slighly slower than a linear algorihtm but still much better than a quadratic algorithm (you will see a graph at the very end of the post).

So far we have seen iterative functions to calculate running times. In this example we are going to see how to calculate time complexities for recursive functions.

## Mergesort

What's the best way to sort an array?  Before, we proposed a solution using bubble sort that has a time complexity of O(n^2). Can we do better?

We can use an algorithm call `mergesort` to make it perform better. Basically, we are going to divide the array recursively until they are two or less elements. We know how to sort 2 elements, so we sort them. The final step is merging: we merge in taking one by one from each array such that is in ascending order.

Here's the code for merge sort:

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
  const mid = length/2;
  return merge(sort(n.slice(0, mid)), sort(n.slice(mid)));
}

function merge(a = [], b = []) {
  const merged = [];

  for (let ai = 0, bi = 0; ai < a.length || bi < b.length;) {
    if(ai >= a.length || a[ai] > b[bi]) {
      merged.push(b[bi++]);
    } else {
      merged.push(a[ai++]);
    }
  }

  return merged;
}
```
As you can see it has two functions sort and merge. Merge is an auxiliary function that runs once through array a and array b, so it's running time is O(n). Sort function split the array in half every time, which is a O(log n). Combining both we get O(n log n).


# O(2^n) - Exponential time

Exponential (base 2) running time means that the calculations performed by an algorithm doubles every time the input grows.

## Subsets of a Set

Finding all distinct subsets of a given set. For instance, let's do some examples manully to try to come up with an algorithm to solve it:
```js
getSubsets('') // =>  ['']
getSubsets('a') // => ['', 'a']
getSubsets('ab') // => ['', 'a', 'b', 'ab']
```

Did you notice any pattern?

The first returns have a empty element and it returns and empty element.
The second case returns the empty element + the 1st element.
The 3rd case returns exactly the results of 2nd case + the same array with the 2nd element `b` appended to it.

What if you want to find the subsets of `abc`? Well, it would be exctly the subsets of 'ab' and again the subsets of `ab` with `c` appended at the end of each element.

As you noticed, everytime time the input gets longer the output is twice as long as the previous one. Let's code it op:

```js
function getSubsets(n = '') {
  const array = Array.from(n);
  const base = [''];

  const results = array.reduce((previous, element) => {
    const previousPlusElement = previous.map(el => {
      return `${el}${element}`;
    });
    return previous.concat(previousPlusElement);
  }, base);

  console.log(`getSubsets(${n}) // ${results.slice(0, 15).join(', ')}... `);
  console.log(`n: ${array.length}, counter: ${results.length};`);
  return results;
}
```

If we run that function for a couple of cases we will get:

```js
getSubsets('') // ...
// n = 0, f(n) = 1;
getSubsets('a') // , a...
// n = 1, f(n) = 2;
getSubsets('ab') // , a, b, ab...
// n = 2, f(n) = 4;
getSubsets('abc') // , a, b, ab, c, ac, bc, abc...
// n = 3, f(n) = 8;
getSubsets('abcd') // , a, b, ab, c, ac, bc, abc, d, ad, bd, abd, cd, acd, bcd...
// n = 4, f(n) = 16;
getSubsets('abcde') // , a, b, ab, c, ac, bc, abc, d, ad, bd, abd, cd, acd, bcd...
// n = 5, f(n) = 32;
```

As expected, if you plot `n` and `f(n)`, you will notice that it would be exactly like the function `2^n`. This algorithm has a running time of `O(2^n)`.

**Note:** You should avoid functions with exponential running times (if possible) since they don't scale well. The time it takes to process the output doubles with every additional input size. But exponential running time is not the worst, there are others that take even longer. Let's see one more example in the next section.

# O(n!) - Factorial time

Factorial is the multiplication of all positive integer numbers less than itself. For instance:

> 5! = 5 x 4 x 3 x 2 x 1 = 120

It grows pretty quickly:

> 20! = 2,432,902,008,176,640,000

As you might guessed, you want to stay away if possible from algorithms that have this running time!

## Permutations

Write a function that computes all the different words that can be formed given a string. E.g.

```js
getPermutations('a') // => [ 'a']
getPermutations('ab') // =>  [ 'ab', 'ba']
getPermutations('abc') // => [ 'abc', 'acb', 'bac', 'bca', 'cab', 'cba' ]
```

How would you solve that?

One simple way would be to check if the string has a length of 1, if so, return that string since you can't arrange it differently.

For strings with a length bigger than 1, we could use recursion to divide the problem in smaller problems until we get to the length 1 case. We can take out the first character and solve the problem for the reminder of the string until we have a string of length 1.

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

I tried with an string with a length of 10. It took around 8 seconds!

```sh
time node ./lib/permutations.js
# getPermutations('abcdefghij') // => abcdefghij, abcdefghji, abcdefgihj, abcdefgijh, abcdefgjhi, abcdefgjih, abcdefhgij...
# // n = 10, f(n) = 3,628,800;
# ./lib/permutations.js  8.06s user 0.63s system 101% cpu 8.562 total
```

I have a little homework for you...

> Can you try with a permutation with 11 characters? ;) Comment below what happened to your computer!

# All running complexities graphs

We explored the most common algorithms running times with one or two examples each! This should give you an idea how to calculate your own running times when developing your projects. Below you can find a chart with graph of all the time complexities that we covered:

{% img /images/big-o-running-time-complexity.png 'Big o running time complexities' %}

Mind your complexity!



