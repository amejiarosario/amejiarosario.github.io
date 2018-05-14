---
layout: draft
title: "Data Structures for Beginners: Arrays, HashMaps and Lists"
comments: true
pageviews__total: 0
pageviews__recent: 0
pageviews__avg_time: 0
tutorial__order: 4
toc: true
photos:
  - /images/data-structures-time-complexity-lists-arrays-stacks-queues-hash-maps-sets-small.jpg
  - /images/data-structures-time-complexity-lists-arrays-stacks-queues-hash-maps-sets-large.jpg
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


<!-- Data Structures Time Complexity for Beginners -->

When we are developing software we have to store data in memory in a data structure. There are many types of data types such as arrays, maps, sets, lists, trees, graphs, etc. Choosing the right data structure for a task can be tricky. So, this post will help you know the trade-offs so you can always use the right tool for the job.

<!-- more -->

# Data Structures Big-O Cheatsheet

This table is summary of everything that we are going to cover on this post. Bookmarket, pin it or share it so you have it at hand when you need it.

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

## Array operations time complexity

We can sum up the arrays time complexity as follows:

Operation | Time Complexity
-|-
Access | *`O(1)`*
Insert | *`O(n)`*
Search | *`O(n)`*
Delete | *`O(n)`*

# Hash Maps

<!-- https://en.wikipedia.org/wiki/Hash_table -->
<!-- https://en.wikipedia.org/wiki/Associative_array -->
<!-- https://medium.com/front-end-hacking/es6-map-vs-object-what-and-when-b80621932373 -->

Hash Maps has many names like Hash Tables, Hash Maps, Map, Dictionary, Associative Arrays and so on. The concept is the same while the implementation might change.

> Hash table is a data structure that **maps** keys to values

Going back to the drawer analogy. Instead of each cabinets having numbers (like array indexes) we have a `key`. That key gets translated into an index using a *hash function*.

There are at least two ways to implement hash map:
1. **Array**: Using a hash function to map a key to the array index value. Worst: `O(n)`, Average: `O(1)`
2. **Binary Search Tree**: using a self-balancing binary search tree to look up for values (more on this later). Worst: *`O(log n)`*, Average: *`O(log n)`*.


We are going to cover Trees & Binary Search Trees so don't worry too much about it for now.

The most common implementation of Maps is using an **array** and `hash` function. So, we are going to implement that going forward.

## Hash Function

The perfect hash function is the one that for every key it assigns an unique index. Perfect hashing algorithms allows a *constant time* access/lookup. However, it's hard to achieve a perfect hashing function in practice. You might have the case where two different keys yields on the same index: *collision*.

Collision on hash maps are unavoidable when using an array-like underlying data structure. So one way to deal with it is to store multiple values in the same bucket. When we try to access the key's value and there are multiple value we just iterate over the values *O(n)*. However, in most implementations the hash is big enough to avoid collisions so we can consider that the average lookup time is *O(1)*.

## Hash Map vs Array

Why go through the trouble of converting the key into an index and not using an array directly you might ask. Well, the main difference is that an index doesn't have any relationshiop with the data is saving while the key does.

Let's say you want to count how many times words are used in a text. How would you implement that?

1. You can use two arrays (let's call it `A` and `B`). One for storing the word and another for storing how many times they have seen.
2. You can use a Hash Map. They *`key`* is the word and the *`value`* is frecuency of the word.

What is the runtime for the approach #1 using two arrays? If we say the number of words in the text is *`n`*. Then we have to `search` if the word in the array `A` or not and then increment the value on array `B` matching that index. The runtime would be \`O(n^2)\`.

What is the runtime for the approach #2 using a Hash Map? Well, we iterate through each word on the text and increment the value if there is something there or set it to zero if that word is seen for the first time. The runtime would be \`O(n)\` which is much more performant than approach #2.

Differences between Hash Map and Array
- Search on array is *O(n)* while on a Hash Map is *O(1)*
- Arrays can have duplicate values, while Hash Map cannot have duplicated keys
<!-- (It can be use to implement Sets). -->
- Array has a key (index) that is always a number from 0 to max value, while in a Hash Map you have control of they key and it can be whatever you want: number, string, or symbol.

## Naïve HashMap implementation

<a id="NaiveHashMap"></a>
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


## Improving Hash Function

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
    const stringKey = `${key}`;

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

What about different types?

```js
hash(1); // 49
hash('1'); // 49

hash('1,2,3'); // 741485668
hash([1,2,3]); // 741485668

hash('undefined') // 3402815551
hash(undefined) // 3402815551
```

Houston, we have a problem!! Differnt values shouldn't return the same hash!

How can we solve that?

One way is taking into account the key `type` into the hash function.

```js
  hash(key) {
    let hashValue = 0;
    const stringTypeKey = `${key}${typeof key}`;

    for (let index = 0; index < stringTypeKey.length; index++) {
      const charCode = stringTypeKey.charCodeAt(index);
      hashValue += charCode << (index * 8);
    }

    return hashValue;
  }
```

Let's test that again:

```js
console.log(hash(1)); // 1843909523
console.log(hash('1')); // 1927012762

console.log(hash('1,2,3')); // 2668498381
console.log(hash([1,2,3])); // 2533949129

console.log(hash('undefined')); // 5329828264
console.log(hash(undefined)); // 6940203017
```

<a id="DecentHashMap"></a>
Now we have a much better hash function!!

We also can increase the initial capacity of the array to minimize collisions. Let's put all of that together in the next section.

## Decent HashMap Implementation

The following implementation:
- uses a **hash function** that minimizes collsions
- use a **faily large capacity** (1000).
- **Handles collisions** by appending values to a list

```js
/**
 * Hash Map data structure implementation
 */
class DecentHashMap {

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
const hashMap = new DecentHashMap();

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

This implementation is good enough to help use figuring out the runtime of common operations like insert/search/delete/edit.

## Insert element on a Hash Map runtime

Inserting a element on a Hash Map requires two things: a key and a value. We could use our [DecentHashMap](#DecentHashMap) data structure that we develop or use the built-in as follows:

```js
/**
 * Insert element (key, value) on a object
 * Runtime: O(1)
 *
 * @param {Object} object
 * @param {any} key
 * @param {any} value
 */
function insert(object, key, value) {
  object[key] = value;
  return object;
}

const object = {};
console.log(insert(hash, 'word', 1)); // => { word: 1 }
```

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

**Note:** We are going to use the `Map` rather than regular `Object`, since the Map's key could be anything while on Object's key can only be string or number. Also Map keeps the order of insertion.

Behind the scences, the `Map.set` just insert elements into an array (take a look at [`DecentHashMap.set`](#DecentHashMap)). So, similar to `Array.push` we have that:

> Insert element in Hash Map runtime is *O(1)*

## Search/Access an element on a Hash Map runtime

This is the `Map.get` function that we use the get the value associated to a key. Let's evaluate the implementation from [`DecentHashMap.get`](#DecentHashMap)):

{% codeblock lang:js mark:3 %}
  get(key) {
    const hashIndex = this.getIndex(key);
    const values = this.array[hashIndex];
    for (let index = 0; index < values.length; index++) {
      const entry = values[index];
      if(entry.key === key) {
        return entry.value
      }
    }
  }
{% endcodeblock %}

If there's no collision, then `values` will only have one value and the access time would be *`O(1)`*. But, we know there will be collisions. If the initial capacity is too small and/or the hash function is very bad like [NaiveHashMap.hash](#NaiveHashMap) then most of the elements will end up in a few buckets *`O(n)`*.

> HashMap access has a runtime of *`O(1)`* on average and worst-case of *`O(n)`*.

## Edit element on a HashMap runtime

Excepteur magna pariatur reprehenderit aliquip nulla adipisicing nostrud et velit proident laboris ullamco tempor cillum. Labore in voluptate aliqua exercitation cillum. Et nostrud mollit in aliquip nostrud officia ut aliqua cillum labore eiusmod et labore.

In incididunt nisi reprehenderit consequat Lorem id ut Lorem ex duis proident sunt ullamco velit. Eu laborum minim eu et anim aute. Sint aute labore sit cupidatat ut dolor ut do et aliquip excepteur commodo enim sit. Id quis veniam duis et consectetur pariatur nulla in officia.

## Delete element on a HashMap runtime

Duis mollit duis enim mollit laborum. Lorem aliquip sunt ut sit. Eu elit nulla officia cillum aliqua pariatur. Id id et quis cillum Lorem pariatur occaecat.

Cupidatat proident cillum elit eiusmod pariatur sit non. Sit nulla est excepteur nulla tempor sit. Dolor et tempor ipsum qui voluptate Lorem fugiat tempor excepteur magna et fugiat reprehenderit aliqua.

Cillum pariatur non officia nulla duis ex et occaecat tempor pariatur reprehenderit voluptate sint sit. Eiusmod exercitation exercitation aliquip deserunt est aliqua reprehenderit minim ullamco minim est duis aliqua. Quis pariatur in quis enim culpa pariatur consequat enim voluptate. Quis sint do elit laboris amet excepteur cillum. Exercitation incididunt laboris duis ullamco quis dolor sit dolore anim ipsum ea ipsum dolor. Excepteur elit eiusmod sit fugiat voluptate culpa laborum. Aute minim officia nisi dolore ipsum ut officia dolor eu laboris amet sit.

## HashMap operations time complexity

We can sum up the arrays time complexity as follows:

Operation | Time Complexity | Average
-|-|-
Access/Search | *`O(n)`* | *`O(1)`*
Insert | *`O(n)`* | *`O(1)`*
Delete | *`O(n)`* | *`O(1)`*


# Sets

Ut consequat aute quis irure aute dolore esse nisi et. Officia esse anim velit irure. Labore aliquip veniam irure non excepteur quis. Ea consectetur consectetur culpa fugiat esse laboris cupidatat dolor quis enim labore mollit id. Occaecat sit deserunt dolor nisi et labore.

Sunt excepteur enim aute nostrud proident et commodo do do tempor reprehenderit nisi anim ipsum. Aliqua elit veniam eu id. Cillum non do ipsum est voluptate occaecat proident commodo aliquip labore cupidatat ut aliqua amet. Aliqua fugiat in velit ex culpa irure enim occaecat pariatur. Esse proident quis adipisicing ea ea mollit nisi. Ut officia aliqua incididunt do aliquip. Do quis nostrud amet voluptate aliqua.

Anim quis ipsum labore reprehenderit sit tempor ex qui culpa aliqua. Proident dolore nostrud duis id sunt minim nulla aliqua velit duis sit. Officia aute cupidatat est duis est cupidatat minim cillum aliquip irure anim qui nostrud. Dolor aute deserunt do ipsum enim labore laboris. Aliquip et et labore consequat eiusmod veniam pariatur qui proident laboris dolore quis pariatur nostrud.

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