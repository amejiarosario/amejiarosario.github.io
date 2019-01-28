---
layout: post
title: Overview of JavaScript ES6 features (a.k.a ECMAScript 6 and ES2015+)
comments: true
toc: true
pageviews__total: 55378
pageviews__recent: 161
pageviews__avg_time: 327.9294513
tutorial__order: 0
photos__background_color: '#F5DA55'
photos:
  - /images/es6-core-features-overview-small.png
  - /images/es6-core-features-overview-large.png
tags:
  - javascript
categories:
  - Programming
  - Web Development
date: 2016-10-19 17:01:34
updated: 2016-10-25 12:02:34
---

JavaScript has changed quite a bit in the last years. These are 12 new features that you can start using today!

# JavaScript History

The new additions to the language are called ECMAScript 6. It is also referred as ES6 or ES2015+.

Since JavaScript conception on 1995, it has been evolving slowly. New additions happened every few years. ECMAScript came to be in 1997 to guide the path of JavaScript. It has been releasing versions such as ES3, ES5, ES6 and so on.

{% img /images/history-javascript-evolution-es6.png 'History of JavaScript Evolution' %}

As you can see, there are gaps of 10 and 6 years between the ES3, ES5, and ES6. The new model is to make small incremental changes every year. Instead of doing massive changes at once like happened with ES6.

# Browsers Support

All modern browser and environments support ES6 already!

{% img /images/es6-javascript-support.png 'ES6 Support' %}
<small>source: https://kangax.github.io/compat-table/es6/</small>

Chrome, MS Edge, Firefox, Safari, Node and many others have already built-in support for most of the features of JavaScript ES6. So, everything that you are going to learn in this tutorial you can start using it right now.

Let's get started with ECMAScript 6!

# Core ES6 Features

You can test all these code snippets on your browser console!

{% img /images/javascript-es6-classes-on-browser-console.png "Testing Javascript ES6 classes on browser console" %}

So don't take my word and test every ES5 and ES6 example. Let's dig in 💪

## Block scope variables

With ES6, we went from declaring variables with `var` to  use `let`/`const`.

What was wrong with `var`?

The issue with `var` is the variable leaks into other code block such as `for` loops or `if` blocks.

{% codeblock lang:js mark:4,10 ES5 %}
var x = 'outer';
function test(inner) {
  if (inner) {
    var x = 'inner'; // scope whole function
    return x;
  }
  return x; // gets redefined because line 4 declaration is hoisted
}

test(false); // undefined 😱
test(true); // inner
{% endcodeblock %}

For `test(false)` you would expect to return `outer`, BUT NO, you get `undefined`.

Why?

Because even though the if-block is not executed, the expression `var x` in line 4 is hoisted.

> var **hoisting**:
- `var` is function scoped. It is availble in the whole function even before being declared.
- Declarations are Hoisted. So you can use a variable before it has been declared.
- Initializations are NOT hoisted. If you are using `var` ALWAYS declare your variables at the top.
- After applying the rules of hoisting we can understand better what's happening:
{% codeblock lang:js mark:3,5 ES5 %}
var x = 'outer';
function test(inner) {
  var x; // HOISTED DECLARATION
  if (inner) {
    x = 'inner'; // INITIALIZATION NOT HOISTED
    return x;
  }
  return x;
}
{% endcodeblock %}


ECMAScript 2015 comes to the rescue:

{% codeblock lang:js mark:1,4 ES6 %}
let x = 'outer';
function test(inner) {
  if (inner) {
    let x = 'inner';
    return x;
  }
  return x; // gets result from line 1 as expected
}

test(false); // outer
test(true); // inner
{% endcodeblock %}

Changing `var` for `let` makes things work as expected. If the `if` block is not called the variable `x` doesn't get hoisted out of the block.

> Let **hoisting** and "temporal dead zone"
- In ES6, `let` will hoist the variable to the top of the block (NOT at the top of function like ES5).
- However, referencing the variable in the block before the variable declaration results in a `ReferenceError`.
- `let` is blocked scoped. You cannot use it before it is declared.
- "Temporal dead zone" is the zone from the start of the block until the variable is declared.

**IIFE**

Let's show an example before explaining <abbr title="immediately-invoked function expressionn">IIFE</abbr>. Take a look here:

{% codeblock lang:js mark:2 ES5 %}
{
  var private = 1;
}

console.log(private); // 1
{% endcodeblock %}

As you can see, `private` leaks out. You need to use <abbr title="immediately-invoked function expressionn">IIFE</abbr> (immediately-invoked function expression) to contain it:

{% codeblock lang:js mark:1,3 ES5 %}
(function(){
  var private2 = 1;
})();

console.log(private2); // Uncaught ReferenceError
{% endcodeblock %}

If you take a look at jQuery/lodash or other open source projects you will notice they have <abbr title="immediately-invoked function expression">IIFE</abbr> to avoid polluting the global environment and just defining on global such as `_`, `$` or `jQuery`.

On ES6 is much cleaner, We also don't need to use <abbr title="immediately-invoked function expression">IIFE</abbr> anymore when we can just use blocks and `let`:

{% codeblock lang:js mark:2 ES6 %}
{
  let private3 = 1;
}

console.log(private3); // Uncaught ReferenceError
{% endcodeblock %}

**Const**

You can also use `const` if you don't want a variable to change at all.

{% img /images/javascript-es6-const-variables-example.png 'const variable example' %}

> Bottom line: ditch `var` for `let` and `const`.
- Use `const` for all your references; avoid using `var`.
- If you must reassign references, use `let` instead of `const`.

## Template Literals

We don't have to do more nesting concatenations when we have template literals. Take a look:

```javascript ES5
var first = 'Adrian';
var last = 'Mejia';
console.log('Your name is ' + first + ' ' + last + '.');
```

Now you can use backtick (\`) and string interpolation `${}`:

```javascript ES6
const first = 'Adrian';
const last = 'Mejia';
console.log(`Your name is ${first} ${last}.`);
```

## Multi-line strings

We don't have to concatenate strings + `\n` anymore like this:

{% codeblock lang:js ES5 %}
var template = '<li *ngFor="let todo of todos" [ngClass]="{completed: todo.isDone}" >\n' +
'  <div class="view">\n' +
'    <input class="toggle" type="checkbox" [checked]="todo.isDone">\n' +
'    <label>{{todo.title}}</label>\n' +
'    <button class="destroy"></button>\n' +
'  </div>\n' +
'  <input class="edit" value="{{todo.title}}">\n' +
'</li>';
console.log(template);
{% endcodeblock %}

On ES6 we can use the backtick again to solve this:

{% codeblock ES6 %}
const template = `<li *ngFor="let todo of todos" [ngClass]="{completed: todo.isDone}" >
  <div class="view">
    <input class="toggle" type="checkbox" [checked]="todo.isDone">
    <label>{{todo.title}}</label>
    <button class="destroy"></button>
  </div>
  <input class="edit" value="{{todo.title}}">
</li>`;
console.log(template);
{% endcodeblock %}

Both pieces of code will have exactly the same result.

## Destructuring Assignment

ES6 desctructing is very useful and consise. Follow this examples:

**Getting elements from an arrays**

{% codeblock lang:js mark:3-4 ES5 %}
var array = [1, 2, 3, 4];

var first = array[0];
var third = array[2];

console.log(first, third); // 1 3
{% endcodeblock %}

Same as:

{% codeblock lang:js mark:3 ES6 %}
const array = [1, 2, 3, 4];

const [first, ,third] = array;

console.log(first, third); // 1 3
{% endcodeblock %}

**Swapping values**

{% codeblock lang:js mark:4-6 ES5 %}
var a = 1;
var b = 2;

var tmp = a;
a = b;
b = tmp;

console.log(a, b); // 2 1
{% endcodeblock %}

same as

{% codeblock lang:js mark:4 ES6 %}
let a = 1;
let b = 2;

[a, b] = [b, a];

console.log(a, b); // 2 1
{% endcodeblock %}

**Destructuring for multiple return values**

{% codeblock lang:js mark:3,7-8 ES5 %}
function margin() {
  var left=1, right=2, top=3, bottom=4;
  return { left: left, right: right, top: top, bottom: bottom };
}

var data = margin();
var left = data.left;
var bottom = data.bottom;

console.log(left, bottom); // 1 4
{% endcodeblock %}

In line 3, you could also return it in an array like this (and save some typing):

```javascript
return [left, right, top, bottom];
```

but then, the caller needs to think about the order of return data.

```javascript
var left = data[0];
var bottom = data[3];
```

With ES6, the caller selects only the data they need (line 6):

{% codeblock lang:js mark:3,6 ES6 %}
function margin() {
  const left=1, right=2, top=3, bottom=4;
  return { left, right, top, bottom };
}

const { left, bottom } = margin();

console.log(left, bottom); // 1 4
{% endcodeblock %}

*Notice:* Line 3, we have some other ES6 features going on. We can compact `{ left: left }` to just `{ left }`. Look how much concise it is compare to the ES5 version. Isn’t that cool?

**Destructuring for parameters matching**

{% codeblock lang:js mark:4-5 ES5 %}
var user = {firstName: 'Adrian', lastName: 'Mejia'};

function getFullName(user) {
  var firstName = user.firstName;
  var lastName = user.lastName;

  return firstName + ' ' + lastName;
}

console.log(getFullName(user)); // Adrian Mejia
{% endcodeblock %}

Same as (but more concise):

{% codeblock lang:js mark:4 ES6 %}
const user = {firstName: 'Adrian', lastName: 'Mejia'};

function getFullName({ firstName, lastName }) {
  return `${firstName} ${lastName}`;
}

console.log(getFullName(user)); // Adrian Mejia
{% endcodeblock %}

**Deep Matching**

{% codeblock lang:js mark:6-7 ES5 %}
function settings() {
  return { display: { color: 'red' }, keyboard: { layout: 'querty'} };
}

var tmp = settings();
var displayColor = tmp.display.color;
var keyboardLayout = tmp.keyboard.layout;

console.log(displayColor, keyboardLayout); // red querty
{% endcodeblock %}

Same as (but more concise):

{% codeblock lang:js mark:5 ES6 %}
function settings() {
  return { display: { color: 'red' }, keyboard: { layout: 'querty'} };
}

const { display: { color: displayColor }, keyboard: { layout: keyboardLayout }} = settings();

console.log(displayColor, keyboardLayout); // red querty
{% endcodeblock %}

This is also called object destructing.


As you can see, destructing is very useful and encourages good coding styles.

> Best practices:
- Use array destructing to get elements out or swap variables. It saves you from creating temporary references.
- Don't use array destructuring for multiple return values, instead use object destructuring

## Classes and Objects

With ECMAScript 6, We went from "constructor functions" 🔨 to "classes" 🍸.

> In JavaScript every single object has a prototype, which is another object.
All JavaScript objects inherit their methods and properties from their prototype.

In ES5, we did Object Oriented programming (<abbr title="Object-Oriented Programming">OOP</abbr>) using constructor functions to create objects as follows:

{% codeblock lang:js mark:1,5 ES5 %}
var Animal = (function () {
  function MyConstructor(name) {
    this.name = name;
  }
  MyConstructor.prototype.speak = function speak() {
    console.log(this.name + ' makes a noise.');
  };
  return MyConstructor;
})();

var animal = new Animal('animal');
animal.speak(); // animal makes a noise.
{% endcodeblock %}

In ES6, we have some syntax sugar. We can do the same with less boiler plate and new keywords such as `class` and `constructor`. Also, notice how clearly we define methods `constructor.prototype.speak = function ()` vs `speak()`:

{% codeblock lang:js mark:1,2,5 ES6 %}
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    console.log(this.name + ' makes a noise.');
  }
}

const animal = new Animal('animal');
animal.speak(); // animal makes a noise.
{% endcodeblock %}

As we saw, both styles (ES5/6) produces the same results behind the scenes and are used in the same way.

> Best practices:
- Always use `class` syntax and avoid manipulating the `prototype` directly. Why? because it makes the code more concise and easier to understand.
- Avoid having an empty constructor. Classes have a default constructor if one is not specified.

## Inheritance

Building on the previous `Animal` class. Let's say we want to extend it and define a `Lion` class

In ES5, It's a little more involved with prototypal inheritance.

{% codeblock lang:js mark:3,7-8,11 ES5 %}
var Lion = (function () {
  function MyConstructor(name){
    Animal.call(this, name);
  }

  // prototypal inheritance
  MyConstructor.prototype = Object.create(Animal.prototype);
  MyConstructor.prototype.constructor = Animal;

  MyConstructor.prototype.speak = function speak() {
    Animal.prototype.speak.call(this);
    console.log(this.name + ' roars 🦁');
  };
  return MyConstructor;
})();

var lion = new Lion('Simba');
lion.speak(); // Simba makes a noise.
// Simba roars.
{% endcodeblock %}

I won't go over all details but notice:

  - Line 3, we explicitly call `Animal` constructor with the parameters.
  - Line 7-8, we assigned the `Lion` prototype to `Animal`'s prototype.
  - Line 11, we call the `speak` method from the parent class `Animal`.

In ES6, we have a new keywords `extends` and `super` <img src="/images/superman_shield.svg" width="25" height="25" alt="superman shield" style="display:inline-block;">.

{% codeblock lang:js mark:3 ES6 %}
class Lion extends Animal {
  speak() {
    super.speak();
    console.log(this.name + ' roars 🦁');
  }
}

const lion = new Lion('Simba');
lion.speak(); // Simba makes a noise.
// Simba roars.
{% endcodeblock %}

Looks how legible this ES6 code looks compared with ES5 and they do exactly the same. Win!

> Best practices:
- Use the built-in way for inherintance with `extends`.

## Native Promises

We went from callback hell 👹 to promises 🙏

{% codeblock lang:js mark:3,11 ES5 %}
function printAfterTimeout(string, timeout, done){
  setTimeout(function(){
    done(string);
  }, timeout);
}

printAfterTimeout('Hello ', 2e3, function(result){
  console.log(result);

  // nested callback
  printAfterTimeout(result + 'Reader', 2e3, function(result){
    console.log(result);
  });
});
{% endcodeblock %}

We have one function that receives a callback to execute when is `done`. We have to execute it twice one after another. That's why we called the 2nd time `printAfterTimeout` in the callback.

This can get messy pretty quickly if you need a 3rd or 4th callback. Let's see how we can do it with promises:

{% codeblock lang:js mark:4,11,13 ES6 %}
function printAfterTimeout(string, timeout){
  return new Promise((resolve, reject) => {
    setTimeout(function(){
      resolve(string);
    }, timeout);
  });
}

printAfterTimeout('Hello ', 2e3).then((result) => {
  console.log(result);
  return printAfterTimeout(result + 'Reader', 2e3);

}).then((result) => {
  console.log(result);
});
{% endcodeblock %}

As you can see, with promises we can use `then` to do something after another function is done. No more need to keep nesting functions.

## Arrow functions

ES6 didn't remove the function expressions but it added a new one called arrow functions.

In ES5, we have some issues with `this`:

{% codeblock lang:js mark:1,4,9 ES5 %}
var _this = this; // need to hold a reference

$('.btn').click(function(event){
  _this.sendData(); // reference outer this
});

$('.input').on('change',function(event){
  this.sendData(); // reference outer this
}.bind(this)); // bind to outer this
{% endcodeblock %}


You need to use a temporary `this` to reference inside a function or use `bind`. In ES6, you can use the arrow function!

{% codeblock lang:js mark:2,6 ES6 %}
// this will reference the outer one
$('.btn').click((event) =>  this.sendData());

// implicit returns
const ids = [291, 288, 984];
const messages = ids.map(value => `ID is ${value}`);
{% endcodeblock %}

## For...of

We went from `for` to `forEach` and then to `for...of`:

```javascript ES5
// for
var array = ['a', 'b', 'c', 'd'];
for (var i = 0; i < array.length; i++) {
  var element = array[i];
  console.log(element);
}

// forEach
array.forEach(function (element) {
  console.log(element);
});
```

The ES6 for...of also allow us to do iterations.

```javascript ES6
// for ...of
const array = ['a', 'b', 'c', 'd'];
for (const element of array) {
    console.log(element);
}
```

## Default parameters

We went from checking if the variable was defined to assign a value to `default parameters`. Have you done something like this before?

{% codeblock lang:js mark:2-4,8,9 ES5 %}
function point(x, y, isFlag){
  x = x || 0;
  y = y || -1;
  isFlag = isFlag || true;
  console.log(x,y, isFlag);
}

point(0, 0) // 0 -1 true 😱
point(0, 0, false) // 0 -1 true 😱😱
point(1) // 1 -1 true
point() // 0 -1 true
{% endcodeblock %}

Probably yes, it's a common pattern to check is the variable has a value or assign a default. Yet, notice there are some issues:

- Line 8, we pass `0, 0` and get `0, -1`
- Line 9, we pass `false` but get `true`.


If you have a boolean as a default parameter or set the value to zero, it doesn't work. Do you know why??? I'll tell you after the ES6 example ;)

With ES6, Now you can do better with less code!

{% codeblock lang:js mark:1,5,6 ES6 %}
function point(x = 0, y = -1, isFlag = true){
  console.log(x,y, isFlag);
}

point(0, 0) // 0 0 true
point(0, 0, false) // 0 0 false
point(1) // 1 -1 true
point() // 0 -1 true
{% endcodeblock %}

Notice line 5 and 6 we get the expected results. The ES5 example didn't work. We have to check for `undefined` first since `false`, `null`, `undefined` and `0` are falsy values. We can get away with numbers:

{% codeblock lang:js mark:3-4,8-9 ES5 %}
function point(x, y, isFlag){
  x = x || 0;
  y = typeof(y) === 'undefined' ? -1 : y;
  isFlag = typeof(isFlag) === 'undefined' ? true : isFlag;
  console.log(x,y, isFlag);
}

point(0, 0) // 0 0 true
point(0, 0, false) // 0 0 false
point(1) // 1 -1 true
point() // 0 -1 true
{% endcodeblock %}

Now it works as expected when we check for `undefined`.

## Rest parameters

We went from arguments to rest parameters and spread operator.

On ES5, it's clumpsy to get an arbitrary number of arguments:
{% codeblock lang:js mark:2 ES5 %}
function printf(format) {
  var params = [].slice.call(arguments, 1);
  console.log('params: ', params);
  console.log('format: ', format);
}

printf('%s %d %.2f', 'adrian', 321, Math.PI);
{% endcodeblock %}

We can do the same using the  rest operator `...`.

{% codeblock lang:js mark:1 ES6 %}
function printf(format, ...params) {
  console.log('params: ', params);
  console.log('format: ', format);
}

printf('%s %d %.2f', 'adrian', 321, Math.PI);
{% endcodeblock %}

## Spread operator

We went from `apply()` to the spread operator. Again we have `...` to the rescue:

> Reminder: we use `apply()` to convert an array into a list of arguments. For instance, `Math.max()` takes a list of parameters, but if we have an array we can use `apply` to make it work.

{% img /images/javascript-math-apply-arrays.png "JavaScript Math apply for arrays" %}

As we saw in earlier, we can use `apply` to pass arrays as list of arguments:

{% codeblock lang:js ES5 %}
Math.max.apply(Math, [2,100,1,6,43]) // 100
{% endcodeblock %}

In ES6, you can use the spread operator:

{% codeblock lang:js ES6 %}
Math.max(...[2,100,1,6,43]) // 100
{% endcodeblock %}

Also, we went from `concat` arrays to use spread operator:

{% codeblock lang:js mark:5 ES5 %}
var array1 = [2,100,1,6,43];
var array2 = ['a', 'b', 'c', 'd'];
var array3 = [false, true, null, undefined];

console.log(array1.concat(array2, array3));
{% endcodeblock %}

In ES6, you can flatten nested arrays using the spread operator:

{% codeblock lang:js mark:5 ES6 %}
const array1 = [2,100,1,6,43];
const array2 = ['a', 'b', 'c', 'd'];
const array3 = [false, true, null, undefined];

console.log([...array1, ...array2, ...array3]);
{% endcodeblock %}

# Conclusion

JavaScript has gone through a lot of changes. This article covers most of the core features that every JavaScript developer should know. Also, we cover some best practices to make your code more concise and easier to reason about.

If you think there are some other MUST KNOW feature let me know in the comments below and I will update this article.
