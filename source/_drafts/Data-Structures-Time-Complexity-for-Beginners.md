---
layout: draft
title: Data Structures Time Complexity for Beginners
comments: true
pageviews__total: 0
pageviews__recent: 0
pageviews__avg_time: 0
tutorial__order: 0
toc: true
photos:
  - /images/data-structures-time-complexity-small.jpg
  - /images/data-structures-time-complexity-large.jpg
photos__background_color: '#F4F0EF'
tags:
  - big-o notation
  - algorithms
  - tutorial_algorithms
categories:
  - Programming
  - Data Structures and Algorithms (DSA)
date: 2018-04-28 19:20:40
updated: 2018-04-28 19:20:40
---

When we are developing software we have to store data in memory in a data structure. There are many types of data types such as arrays, maps, sets, lists, graphs, etc. Choosing the right data structure for the job can be tricky. So, this post will help you know the trade-offs so you can always use the right tool for the job.

<!-- more -->

# Data Structures Big-O Cheatsheet

This table is summary of everything that we are going to cover on this post. Bookmarket, pin it or share it so you have it at hand.

Data Structures | Runtime
-|-
array | -

# Primitive Data Types

Primitive data types are the most basic elements where all the other data structures built upon.  Some primities are:

- Integers. E.g., `1`, `2`, `3`, ...
- Characters. E.g., `a`, `b`, `"1"`, `"*"`
- Booleans. E.g., `true` or `false`.
- Float (floating points) or doubles. E.g., `3.14159`, `1483e-2`.

# Array

Arrays are collections a collection or zero or more primitives. Arrays are one of the most used data type because it's simplicity and fast way of retriving information.

You can think of an array as a drawer where you can store things on the cabinets. When you want to search for something you can go directly to the cabinet (*`O(1)`*). However, if you forgot what cabinet had what then you will have to open one by one (*`O(n)`*) to verify its content until you find what you are looking for. That same happens with an array.

http://apprize.info/javascript/20lessons/20lessons.files/image052.jpg

https://cdn2.iconfinder.com/data/icons/furniture-12/48/drawer-cabinet-closet-shelf-cabin-cupboard-furntiure-512.png

Depending on the programming language, arrays has some differences. For some dynamic languages like JavaScript and Ruby, an array can contain different data types: numbers, strings, words, objects and even functions. Typed languages like Java/C/C++ you have to defined the size of the array before hand and the type of each element. JavaScript would increase the size of the array automatically when it needs to.

## Access an element in an array

If you know the index for the element that you are looking for, then you can access the element directly like this:

```js
/**
 * Access element on the array matching the index
 * Runtime: O(1)
 * @param {Array} array
 * @param {Integer} index
 */
function access(array, index) {
  return array[index];
}

const array = [1, 'word', 3.14, {a: 1}];
access(array, 0); // => 1
access(array, 3); // => {a: 1}
```

As you can see in the code above, accessing an element on an array has a constant time:

> Array access runtime is a *O(1)*

*Note: You can also change any value at a given index in constant time.*

## Search an element in an array

If we don't know the index of the element that we want from an array. Then we have to iterate through each element on the array until we find what we are looking for.

```js
/**
 * Search for element in the array
 * Runtime: O(n)
 * @param {Array} array
 * @param {any} element
 */
function search(array, element) {
  for (let index = 0; index < array.length; index++) {
    if(element === array[index]) {
      return index;
    }
  }
}

const array = [1, 'word', 3.14, {a: 1}];
console.log(search(array, 'word')); // => 1
console.log(search(array, 3.14)); // => 2
```

Given the for-loop, we have:

> Array search runtime is a *O(n)*


## Insert element on an array

<!-- https://stackoverflow.com/a/22615787/684957 -->
<!-- https://tc39.github.io/ecma262/#sec-array.prototype.push -->
<!-- https://github.com/v8/v8/blob/master/src/js/array.js -->
<!-- https://github.com/v8/v8/blob/master/src/builtins/builtins-array.cc#L145 -->
<!-- https://tc39.github.io/ecma262/#sec-array.prototype.unshift -->

There are multiple ways to insert elements on array. You can append a new element to end or you can append it to the begining of the array.

Depending on the programming language the implementation woulld be slightly different. For instance, in JavaScript we can accomplish append to end with `push` and append to beginning with `unshift`. Let's start with append to tail:

```js
/**
 * Insert at the end of the array
 * Runtime: O(1)
 * @param {Array} array
 * @param {*} element
 */
function insertToTail(array, element) {
  array.push(element);
  return array;
}

const array = [1, 2, 3];
console.log(insertToTail(array, 4)); // => [ 1, 2, 3, 4 ]
```

Based on the [language specification](https://tc39.github.io/ecma262/#sec-array.prototype.push), push just set the new value at the end of the array. Thus,

> The `Array.push` runtime is a *O(1)*

Let's now try appeding to head:

```js
/**
 * Insert at the beginning of the array
 * Runtime: O(n)
 * @param {Array} array
 * @param {*} element
 */
function insertToHead(array, element) {
  array.unshift(element);
  return array;
}

const array = [1, 2, 3];
console.log(insertToHead(array, 0)); // => [ 0, 1, 2, 3, ]
```

What do you think is the runtime of the `insertToHead` function? Looks exactly the same as the previous one except that we are using `unshift` instead of `push`. But, there's a catch! [unshift algorithm](https://tc39.github.io/ecma262/#sec-array.prototype.unshift) makes room for the new element by moving all existing ones to the next position in the array.

> The `Array.unshift` runtime is a *O(n)*

## Deleting elements from an array

What do you think is the running time of deleting an element from an array?

Well, let's think about the different cases:
1. You can delete from the end of the array which might be constant time. *O(1)*
2. However, you can also delete from the beginning or middle of the array. In that case, you would have to move all the following elements to close the gap. *O(n)*

Talk is cheap, let's do the code!

```js
/**
 * Delete is a keyword so we have to use `remove` instead.
 * Runtime: O(n)
 * @param {Array} array
 * @param {any} element
 */
function remove(array, element) {
  const index = search(array, element);
  array.splice(index, 1);
  return array;
}

const array1 = [0, 1, 2, 3];
console.log(remove(array1, 1)); // => [ 0, 2, 3 ]
```

So we are using our `search` function to find the elemnts' index *O(n)*. Then we use the [JS built-in `splice`](https://tc39.github.io/ecma262/#sec-array.prototype.splice) function which has a running time of *O(n)*. What's the total *O(2n)*? Remember we constants doesn't matter as much.

We take the worst case scenario:

> Deleting an item for the we would say that is *O(n)*.

## Array time complexity

We can sum up the arrays time complexity as follows:

Operation | Time Complexity
-|-
Access | *`O(1)`*
Insert | *`O(n)`*
Search | *`O(n)`*
Delete | *`O(n)`*

# Hash Table

<!-- https://en.wikipedia.org/wiki/Hash_table -->
<!-- https://en.wikipedia.org/wiki/Associative_array -->
<!-- https://medium.com/front-end-hacking/es6-map-vs-object-what-and-when-b80621932373 -->

Hash Table has many names like Hash Map or just Map, Dictionary, Associative Arrays and so on. The concept is the same while the implementation might change.

> Hash table is a data structure that maps keys to values

Going back to the drawer analogy. Instead of each cabinets having numbers (like array indexes) we have a `key`. That key gets translated into an index using a *hash function*.

There are at least two ways to implement hash map:
1. Array: Using a hash function to map a key to the array index value. Worst: `O(n)`, Average: `O(1)`
2. Binary Tree Search: using a self-balancing binary search tree to look up for values (more on this later). Worst: *`O(log n)`*, Average: *`O(log n)`*.

The most common implementation of Maps is using an array and `hash` function. So, we are going to implement that going forward.

## Hash Function

The perfect hash function is the one that for every key it assigns an unique index. Perfect hashing algorithms allows a *constant time* access/lookup. However, it's hard to achieve a perfect hashing function in practice. You might have the case where two different keys yields on the same index: *collision*.

Collision on hash maps are unavoidable when using an array-like underlying data structure. So one way to deal with it is to store multiple values in the same bucket. When we try to access the key's value and there are multiple value we just iterate over the values *O(n)*. However, in most implementations the hash is big enough to avoid collisions so we can consider that the average lookup time is *O(1)*.

A very simple (and bad) hash function would this one:

```js
class NaiveHashMap {
  constructor(size = 2) {
    this.array = new Array(size);
  }

  set(key, value) {
    const index = this.getIndex(key);
    this.array[index] = value;
  }

  get(key) {
    const index = this.getIndex(key);
    return this.array[index];
  }

  hash(key) { // very bad hashing function
    return key.toString().length;
  }

  getIndex(key) {
    const indexHash = this.hash(key);
    const index = indexHash % this.array.length;
    return index;
  }
}

// usage:
const hashMap = new NaiveHashMap();

hashMap.set('cat', 2);
hashMap.set('rat', 7);
hashMap.set('dog', 1);
hashMap.set('art', 4);

console.log(hashMap.array); // [ <1 empty item>, [ { key: 'cat', value: 2 }, { key: 'rat', value: 7 }, { key: 'dog', value: 1 }, { key: 'art', value: 1 } ] ]

// const assert = require('assert');
// assert.equal(hashMap.get('cat'), 2);
// assert.equal(hashMap.get('rat'), 7);
// assert.equal(hashMap.get('dog'), 1);
```

This `Map` allow us to `set` a key and a value and then `get` the value using a `key`. The key part is the `hash` function let's see multiple implementations to see how it affects the performance of the Map.

Can you tell what's wrong with `NaiveHashMap` before expanding the answer bellow?

<details>
 <summary>What is wrong with `NaiveHashMap` is that...</summary>

<br><br>
**1)** **Hash function** generates many duplicates. E.g.

```js
hash('cat') // 3
hash('dog') // 3
```
This will cause a lot of collisions.

<br><br>
**2)** **Collisions** are not handled at all. Both `cat` and `dog` will override each other on the position 3 of the array.

<br><br>
**3)** **Size of the array** even if we get a better hash function we will will get duplicates because array has a size of 3 which less than the number of elements that we want to fit. We want to have an initial capacity that is well beyond what we need to fit.
</details>

Did you guess any? ^

> The main purpose of a HashMap is to reduce the search/access time of an Array from *`O(n)`* to *`O(1)`*.

For that we need:

1. A good hash function that produces as few collisions as possible.
2. Array that is big enough to hold all the needed values.

Let's give it another shot to our hash function:

```js
  hash(key) {
    let hashValue = 0;
    const stringKey = key.toString();

    for (let index = 0; index < stringKey.length; index++) {
      const charCode = stringKey.charCodeAt(index);
      hashValue += charCode;
    }

    return hashValue;
  }
```

This one is better because each letter matters. We take the [ascii](https://www.asciitable.com/) code of the string
```js
hash('cat') // 312  (c=99 + a=97 + t=116)
hash('dog') // 314 (d=100 + o=111 + g=103)
```
However, there's still an issue since `rat` and `art` are both 327, **collision!**

We can fix that by offseting the sum with the possition:

```js
  hash(key) {
    let hashValue = 0;
    const stringKey = key.toString();

    for (let index = 0; index < stringKey.length; index++) {
      const charCode = stringKey.charCodeAt(index);
      hashValue += charCode << (index * 8);
    }

    return hashValue;
  }
```

Now let's try again, this time with hex numbers so we can clearly see the offset

```js
// r = 114 or 0x72; a = 97 or 0x61; t = 116 or 0x74
hash('rat'); // 7,627,122 (r: 114 * 1 + a: 97 * 256 + t: 116 * 65,536) or in hex: 0x726174 (r: 0x72 + a: 0x6100 + t: 0x740000)
hash('art'); // 7,631,457 or 0x617274
```

Now we have a much better hash function! We also can increase the initial capacity fo the array to minimize collisions. Let's put all together:

```js
/**
 * Hash Map data structure implementation
 */
class BetterHashMap {

  /**
   * Initialize array that holds the values. Default is size 1,000
   * @param {number} size
   */
  constructor(size = 1000) {
    this.array = new Array(size);
  }

  /**
   * insert a key/value pair into the hash map
   * @param {any} key
   * @param {any} value
   */
  set(key, value) {
    const index = this.getIndex(key);
    if(this.array[index]) {
      this.array[index].push({key, value});
    } else {
      this.array[index] = [{key, value}];
    }
    return this;
  }

  /**
   * Gets the value out of the hash map
   * @param {any} key
   */
  get(key) {
    const hashIndex = this.getIndex(key);
    for (let index = 0; index < this.array[hashIndex].length; index++) {
      const entry = this.array[hashIndex][index];
      if(entry.key === key) {
        return entry.value
      }
    }
  }

  /**
   * Decent hash function where each char code is added with an offset depending on the possition
   * @param {any} key
   */
  hash(key) {
    let hashValue = 0;
    const stringKey = key.toString();

    for (let index = 0; index < stringKey.length; index++) {
      const charCode = stringKey.charCodeAt(index);
      hashValue += charCode << (index * 8);
    }

    return hashValue;
  }

  /**
   * Get the array index after applying the hash funtion to the given key
   * @param {any} key
   */
  getIndex(key) {
    const indexHash = this.hash(key);
    const index = indexHash % this.array.length;
    return index;
  }
}

// Usage:
const hashMap = new HashMap();

hashMap.set('cat', 2);
hashMap.set('rat', 7);
hashMap.set('dog', 1);
hashMap.set('art', 0); // <-- NO more collision with rat

console.log(hashMap.array);

// const assert = require('assert');
// assert.equal(hashMap.get('cat'), 2);
// assert.equal(hashMap.get('rat'), 7);
// assert.equal(hashMap.get('dog'), 1);
```

This `HashMap` gets the job done but still there are some enhancements that we can do:
1. **Rehash**: if we are getting more than 1000 items we will run into issues. We could keep track a of the size of the hash and increment the size of the array once **load factor** (items/array_size) threshold is met. For instance <a href="https://docs.oracle.com/javase/10/docs/api/java/util/HashMap.html#%3Cinit%3E()">Java's HashMap</a> starts with a capacity of 16 and a load factor of 0.75.

2. **Handle Override**: the current implementation doesn't handle overwrite. You can add that as well.


## Hash Map vs Array

Why go through the trouble of converting the key into an index and not using an array directly you might ask. Well, the main difference is that an index doesn't have any relationshiop with the data is saving while the key does.

Let's say you want to count how many times words are used in a text. How would you implement that?

1. You can use two arrays (let's call it `A` and `B`). One for storing the word and another for storing how many times they have seen.
2. You can use a Hash Map. They *`key`* is the word and the *`value`* is frecuency of the word.

What is the runtime for the approach #1 using two arrays? If we say the number of words in the text is *`n`*. Then we have to `search` if the word in the array `A` or not and then increment the value on array `B` matching that index. The runtime would be \`O(n^2)\`.

What is the runtime for the approach #2 using a Hash Map? Well, we iterate through each word on the text and increment the value if there is something there or set it to zero if that word is seen for the first time. The runtime would be \`O(n)\` which is much more performant than approach #2.

Differences between Hash Map and Array
- Search on array is *O(n)* while on a Hash Map is *O(1)*
- Arrays can have duplicate values, while Hash Map cannot have duplicated keys (It can be use to implement Sets).
- Array has a key (index) that is always a number from 0 to max value, while in a Hash Map you have control of they key and it can be whatever you want: number, string, or symbol.

## Insert element on a Hash Map

Inserting a element on a Hash Map requires two things: a key and a value.

```js
/**
 * Insert element (key, value) on a hash map
 * Runtime: O(1)
 *
 * @param {Object} hash
 * @param {any} key
 * @param {any} value
 */
function insert(hash, key, value) {
  hash[key] = value;
  return hash;
}

const hash = {};
console.log(insert(hash, 'word', 1)); // => { word: 1 }
```

Similar to the array:

> Insert element in Hash Map runtime is *O(1)*

In modern JavaScript you can use `Map`s.

```js
/**
 * Insert element (key, value) on a hash map
 * Runtime: O(1)
 *
 * @param {Map} map
 * @param {any} key
 * @param {any} value
 */
function insertMap(map, key, value) {
  map.set(key, value);
  return map;
}

const map = new Map();
console.log(insertMap(map, 'word', 1)); // Map { 'word' => 1 }
```

What's the difference between a Map and using a regular Object key-value pair (`{}`).

## Map vs Regular Object





## Access an element on a Hash Map

Very similar to an array:

# Stacks

Ipsum consequat labore exercitation aute non. Nisi tempor cupidatat consequat excepteur nulla est aute. Anim labore qui aliquip veniam. Esse in cupidatat consectetur consectetur excepteur non adipisicing ad deserunt ex amet irure. Mollit voluptate velit occaecat elit proident fugiat pariatur. Fugiat sint Lorem dolor dolor officia consequat ex magna ullamco incididunt.

# Queues

Ipsum consequat labore exercitation aute non. Nisi tempor cupidatat consequat excepteur nulla est aute. Anim labore qui aliquip veniam. Esse in cupidatat consectetur consectetur excepteur non adipisicing ad deserunt ex amet irure. Mollit voluptate velit occaecat elit proident fugiat pariatur. Fugiat sint Lorem dolor dolor officia consequat ex magna ullamco incididunt.

# Linked Lists

Ipsum consequat labore exercitation aute non. Nisi tempor cupidatat consequat excepteur nulla est aute. Anim labore qui aliquip veniam. Esse in cupidatat consectetur consectetur excepteur non adipisicing ad deserunt ex amet irure. Mollit voluptate velit occaecat elit proident fugiat pariatur. Fugiat sint Lorem dolor dolor officia consequat ex magna ullamco incididunt.

## Singly Linked Lists

Ipsum consequat labore exercitation aute non. Nisi tempor cupidatat consequat excepteur nulla est aute. Anim labore qui aliquip veniam. Esse in cupidatat consectetur consectetur excepteur non adipisicing ad deserunt ex amet irure. Mollit voluptate velit occaecat elit proident fugiat pariatur. Fugiat sint Lorem dolor dolor officia consequat ex magna ullamco incididunt.

## Doubly Linked Lists

Ipsum consequat labore exercitation aute non. Nisi tempor cupidatat consequat excepteur nulla est aute. Anim labore qui aliquip veniam. Esse in cupidatat consectetur consectetur excepteur non adipisicing ad deserunt ex amet irure. Mollit voluptate velit occaecat elit proident fugiat pariatur. Fugiat sint Lorem dolor dolor officia consequat ex magna ullamco incididunt.

# Trees

Ipsum consequat labore exercitation aute non. Nisi tempor cupidatat consequat excepteur nulla est aute. Anim labore qui aliquip veniam. Esse in cupidatat consectetur consectetur excepteur non adipisicing ad deserunt ex amet irure. Mollit voluptate velit occaecat elit proident fugiat pariatur. Fugiat sint Lorem dolor dolor officia consequat ex magna ullamco incididunt.

## Binary Trees

Ipsum consequat labore exercitation aute non. Nisi tempor cupidatat consequat excepteur nulla est aute. Anim labore qui aliquip veniam. Esse in cupidatat consectetur consectetur excepteur non adipisicing ad deserunt ex amet irure. Mollit voluptate velit occaecat elit proident fugiat pariatur. Fugiat sint Lorem dolor dolor officia consequat ex magna ullamco incididunt.

## Binary Search Trees

Ipsum consequat labore exercitation aute non. Nisi tempor cupidatat consequat excepteur nulla est aute. Anim labore qui aliquip veniam. Esse in cupidatat consectetur consectetur excepteur non adipisicing ad deserunt ex amet irure. Mollit voluptate velit occaecat elit proident fugiat pariatur. Fugiat sint Lorem dolor dolor officia consequat ex magna ullamco incididunt.

## Heaps

Ipsum consequat labore exercitation aute non. Nisi tempor cupidatat consequat excepteur nulla est aute. Anim labore qui aliquip veniam. Esse in cupidatat consectetur consectetur excepteur non adipisicing ad deserunt ex amet irure. Mollit voluptate velit occaecat elit proident fugiat pariatur. Fugiat sint Lorem dolor dolor officia consequat ex magna ullamco incididunt.

# Graph

Ipsum consequat labore exercitation aute non. Nisi tempor cupidatat consequat excepteur nulla est aute. Anim labore qui aliquip veniam. Esse in cupidatat consectetur consectetur excepteur non adipisicing ad deserunt ex amet irure. Mollit voluptate velit occaecat elit proident fugiat pariatur. Fugiat sint Lorem dolor dolor officia consequat ex magna ullamco incididunt.

## Cyclic and Acyclic Graph

Ipsum consequat labore exercitation aute non. Nisi tempor cupidatat consequat excepteur nulla est aute. Anim labore qui aliquip veniam. Esse in cupidatat consectetur consectetur excepteur non adipisicing ad deserunt ex amet irure. Mollit voluptate velit occaecat elit proident fugiat pariatur. Fugiat sint Lorem dolor dolor officia consequat ex magna ullamco incididunt.

## Breadth-frirst search (BFS)

Incididunt labore aliquip id consectetur ut pariatur anim esse. Laboris laboris velit et ipsum irure nostrud aliquip fugiat ullamco officia in aliqua do elit. Quis magna nostrud elit minim nisi aliquip exercitation. Fugiat magna aute aliqua labore ea dolor nostrud voluptate. Esse aute anim minim velit qui est quis est id id nisi incididunt in pariatur. Incididunt sunt minim in non nostrud ullamco tempor.


## Depth-frirst search (DFS)

Incididunt labore aliquip id consectetur ut pariatur anim esse. Laboris laboris velit et ipsum irure nostrud aliquip fugiat ullamco officia in aliqua do elit. Quis magna nostrud elit minim nisi aliquip exercitation. Fugiat magna aute aliqua labore ea dolor nostrud voluptate. Esse aute anim minim velit qui est quis est id id nisi incididunt in pariatur. Incididunt sunt minim in non nostrud ullamco tempor.


# Summary

Deserunt veniam proident minim enim enim reprehenderit pariatur pariatur aliqua. Ex ad irure nisi elit. Dolor non proident ad nostrud officia occaecat esse culpa ut consequat laboris.

<!-- Links

http://bigocheatsheet.com/

http://cooervo.github.io/Algorithms-DataStructures-BigONotation/

https://medium.freecodecamp.org/time-is-complex-but-priceless-f0abd015063c

https://code.tutsplus.com/tutorials/data-structures-with-javascript-whats-a-data-structure--cms-23347


Arrays:

Time complexity table for Arrays and dyanmic DS
https://en.wikipedia.org/wiki/Linked_list#Linked_lists_vs._dynamic_arrays

JavaScript runtime complexity of Array functions
https://stackoverflow.com/a/22615787/684957


-->