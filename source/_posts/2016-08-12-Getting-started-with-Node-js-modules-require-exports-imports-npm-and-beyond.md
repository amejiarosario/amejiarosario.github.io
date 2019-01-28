---
layout: post
title: "Getting started with Node.js modules: require, exports, imports and beyond"
comments: true
toc: true
pageviews__total: 77448
pageviews__recent: 4386
pageviews__avg_time: 737
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
updated: 2019-01-28 16:50:23
---

Getting started with Node.js modules: require, exports, imports and beyond.

Modules are a crucial concept to understand Node.js projects. In this post, we cover Node modules: `require`, `exports` and, the future `import`.

<!-- more -->

Node modules allow you to write reusable code. You can nest them one inside another. Using the Node Package Manager (NPM), you can publish your modules and make them available to the community. Also, NPM enables you to reuse modules made by other developers.

In this section, we are going to cover how to create Node modules and each one of its components:

- Require
- Exports
- Module.exports

> We are using Node 10.x for the examples and ES6 syntax. However, the concepts are valid for any version.

# Require

`require` are used to consume modules. It allows you to include modules in your programs. You can add built-in core Node.js modules, community-based modules (`node_modules`) and local modules.

Let's say we want to read a file from the filesystem. Node has a core module called 'fs':

{% codeblock lang:js mark:1 %}
const fs = require('fs');

fs.readFile('./file.txt', 'utf-8', (err, data) => {
  if(err) { throw err; }
  console.log('data: ', data);
});
{% endcodeblock %}

As you can see, we imported the "fs" module into our code. It allows us to use any function attached to it, like "readFile" and many others.

The `require` function will look for files in the following order:

1. Built-in core Node.js modules (like `fs`)
2. Modules in the `node_modules` folder.
3. If the module name has a `./`, `/` or `../`, it will look for the directory/file in the given path. It matches the file extensions: `*.js`, `*.json` and `*.node`.

# Exports

The `exports` keyword gives you the chance to "export" your own objects and methods. Let's do an example:

```javascript circle.js
const PI = 3.14159265359;

exports.area = radius => (radius ** 2) * PI;
exports.circumference = radius => 2 * radius * PI;
```

In the code below, we are exporting the `area` and `circumference` functions. We defined the `PI` constant, but this is only accessible within the module. Only the elements associated with `exports` are available outside the module.

So, we can consume it using `require` in another file like follows:

```javascript main.js
const circle = require('./circle');

const r = 3;
console.log(`Circle with radius ${r} has
  area: ${circle.area(r)};
  circunference: ${circle.circumference(r)}`);
```

Noticed that this time we prefix the module name with `./`. That indicates that the module is a local file.

# Module Wrapper

You can think of each Node.js module as a self-contained function like the following one:

```javascript Module Wrapper
(function (exports, require, module, __filename, __dirname) {
  module.exports = exports = {};

  // Your module code ...

});
```

We have already covered `exports` and `require`. Notice the relationship between `module.exports` and `exports`. They point to the same reference. But, if you assign something directly to `exports` you will break its link to `module.exports`. More on that in the next section.

For our convenience `__filename` and `__dirname` are defined. They provide the full path to the current file and directory. The latter excludes the filename and print out the directory path.

For instance, for our `./circle.js` module, it would be something like this:

- `__filename`: `/User/adrian/code/circle.js`

- `__dirname`: `/User/adrian/code`

Ok, we have covered `exports`, `require`, `__filename`, and `__dirname`. The only one we haven't cover is `module`. Let's go for it!

# Module.exports vs Exports

The `module` is not global; it is local for each module. It contains metadata about a module like id, exports, parent, children, and so on.

`exports` is an alias of `module.exports`. Consequently, whatever you assign to `exports` is also available on `module.exports`. However, if you assign something directly to exports, then you lose the shortcut to `module.exports`. E.g.

```javascript cat.js
class Cat {
  makeSound() {
    return 'Meowww';
  }
}

// exports = Cat; // It will not work with `new Cat();`
// exports.Cat = Cat; // It will require `new Cat.Cat();` to work (yuck!)
module.exports = Cat;
```

Try the following case with `exports` and then with `module.exports`.

``` javascript main.js
const Cat = require('./cat');

const cat = new Cat();
console.log(cat.makeSound());
```

To sum up, when to use `module.exports` vs `exports`:

Use `exports` to:

- Export named function. e.g. `exports.area`, `exports.circunference`.

Use `module.exports` to:

1. If you want to export an object, class, function at the root level (e.g. `module.exports = Cat`)

2. If you prefer to return a single object that exposes multiple assignments. e.g.`module.exports = {area, circumference};`


# Imports

Starting with version 8.5.0+, Node.js supports ES modules natively with a feature flag and new file extention `*.mjs`.

For instace, our previous `circle.js` can be rewritten as `circle.mjs` as follows:

```javascript cirle.mjs
const PI = 3.14159265359;

export function area(radius) {
  return (radius ** 2) * PI;
}

export function circumference(radius) {
  return 2 * radius * PI;
}
```

Then, we can use import:

```javascript main.mjs
import { area, circumference } from './circle.mjs';

const r = 3;

console.log(`Circle with radius ${r} has
  area: ${area(r)};
  circunference: ${circumference(r)}`);
```

And, finally you can run it using the experimental module feature flag:

```bash
node --experimental-modules main.mjs
```

If you don't like experimental modules, another alternative is to use a transpiler. That converts modern JavaScript to older versions for you. Good options are
[TypeScript](https://www.typescriptlang.org/docs/handbook/modules.html),
[Babel](https://babeljs.io/docs/en/babel-plugin-transform-modules-commonjs), and
[Rollup](https://rollupjs.org/guide/en#importing).

# Summary

We learned about how to create Node.js modules and used it in our code.  Modules allow us to reuse code easily. They provide functionality that is isolated from other modules. The `require` function is used to load modules. The `exports` and `module.exports` allow us to define what parts of our code we want to expose. We also explored the difference between `module.exports` and `exports`. Finally, we took a quick pick about what's coming up for modules using `imports`.
