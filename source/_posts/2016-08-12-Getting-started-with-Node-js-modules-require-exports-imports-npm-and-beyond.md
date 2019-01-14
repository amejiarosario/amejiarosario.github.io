---
layout: post
title: "Getting started with Node.js modules: require, exports, imports and beyond"
comments: true
toc: true
pageviews__total: 42767
pageviews__recent:  233
pageviews__avg_time: 312
tutorial__order: 0
photos__background_color: '#333'
photos:
 - /images/node-modules-small.png
 - /images/node-modules-large.png
tags:
  - NodeJS
  - javascript
categories:
  - Programming
  - Web Development
date: 2016-08-12 16:30:23
updated: 2016-08-12 16:30:23
---

Modules are a key concept to understand Node.js projects. We cover Node modules: require, exports and the future import.

<!-- more -->

Node modules allow you to write reusable code. You can include your own modules into another module. Using Node Package Manager (NPM), you can publish your module to the community. Also, NPM enables you to reuse modules made by other developers using.

In this section, we are going to cover how to create Node modules and each one of its components:

- Require
- Exports
- Module.exports

> We are using Node 6+ for the examples and ES6 syntax. But the concepts are true for any version.

# Require

`require` are used to consume modules. It allows you to include modules into your programs. You can include built-in core Node.js modules, community-based modules (node_modules) and local modules.

Let's say we want to read a file from the filesystem. Node has a core module called 'fs':

{% codeblock lang:js mark:1 %}
const fs = require('fs');

fs.readFile('./file.txt', 'utf-8', (err, data) => {
  if(err) { throw err; }
  console.log('data: ', data);
});
{% endcodeblock %}

As you can see, we imported the "fs" module into our program. It allows us to any function attached to it, like "readFile".

Require will look for files in the following order:

1. Built-in core Node.js modules (like `fs`)
2. Modules in `node_modules` folder.
3. If the module name has a `./`, `/` or `../`, it will look for the directory/file in the given path. It matches the extensions: `*.js`, `*.json` and `*.node`.

# Exports

`exports` are used to create modules. It allows you to export your own objects and functions. Let's do an example:

```javascript circle.js
const PI = 3.14159265359;
exports.area = (radius) => Math.pow(radius, 2) * PI;
exports.circunference = (radius) => 2 * radius * PI;
```

In the code below, we are exporting the `area` function. We defined the constant PI but this is only accessible within the module. Only the elements associated to `exports` are accessible outside the module.

So, we can consume it using `require` in another file like follows:

```javascript main.js
const circle = require('./circle');

let r = 3;
console.log(`Circle with radius ${r} has
  area: ${circle.area(r)};
  circunference: ${circle.circunference(r)}`);
```

Noticed that this time we prefix the module name with './'. That indicates that the module is a local file.

# Module Wrapper

You can think of each module as self-contained function like the following one:

```javascript Module Wrapper
(function (exports, require, module, __filename, __dirname) {
  module.exports = exports = {};

  // Your module code ...

});
```

We have already covered `exports` and `require`. Notice the relationship between `module.exports` and `exports`. They points to the same reference. However, if you assign something directly to `exports` you will break its link to `module.exports`. More on that in the next section.

For our convenience `__filename` and `__dirname` are defined. They provide the full path to the current file and directory. The latter excludes the filename and just print out the directory path.

For instance, for our `./circle.js` module, it would be something like this:

- `__filename`: `/User/adrian/code/circle.js`

- `__dirname`: `/User/adrian/code`

Ok, we have covered `exports`, `require`, `__filename`, and `__dirname`. The only one we haven't cover is `module`. Let's go for it!

# Module.exports vs Exports

Module is not a global, it is local for each module. It contains metadata about a module, such as module id, exports, parent, children, ...

`exports` is an alias of `module.exports`. So, whatever you assign to `exports` is also available on `module.exports`. However, if you assign something directly to exports, then you lose the shortcut to `module.exports`. E.g.

```javascript cat.js
class Cat {
  makeSound() {
    return 'Meowww';
  }
}

// exports = Cat; // It will not work
module.exports = Cat;
```

Try the following example with `exports` and then with `module.exports`.

``` javascript main.js
const Cat = require('./cat');
var cat = new Cat();
console.log(cat.makeSound());
```

To sum up, when to use `module.exports` vs `exports`:

Use `exports` to:

- Export named function. e.g. `exports.area`, `exports.circunference`.

Use `module.exports` to:

1. If you want to export an object, class, function at the root level (e.g. `module.exports = Cat`

2. If you want to return a single object that exposes multiple assignments. e.g.`module.exports = {area: area, circumference: circunference};`


# Imports

Imports are not available in Node as the version 6. However, it might come in future versions.


```javascript future of modules in javascript
import circle from './circle';
import {area, circumference} from './circle';
```

You can use it today, using transpilers such as Traceur Compiler, Babel or Rollup. But, that will be for another post.



# Summary

We learned about how to create Node.js modules and use it in our code.  Modules allow us to reuse code easily. They provide functionality that is isolated from other modules. Required is used to load modules. Export and module exports allow defining what parts of our code we want to expose. We also explored the difference between module.exports and exports. Finally, we took a quick pick about what's coming up for modules using `imports`.
