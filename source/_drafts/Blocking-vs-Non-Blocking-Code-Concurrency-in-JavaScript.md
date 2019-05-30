---
layout: draft
title: Blocking vs Non-Blocking Code Concurrency in JavaScript
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
date: 2019-05-28 19:30:01
updated: 2019-05-28 19:30:01
---

There are multiple ways of handling concurrency on programming languages. Some languages use threads, others use callbacks.

<!-- more -->

Eiusmod minim consequat culpa proident mollit mollit eu adipisicing do culpa. In mollit ipsum in amet labore est ad ad ex. Labore deserunt proident non ut. Elit ex ea incididunt mollit magna. Nostrud magna sunt deserunt elit nulla quis culpa voluptate veniam velit culpa tempor voluptate nostrud. Do qui Lorem voluptate culpa aliquip eu fugiat non duis qui ad culpa.

# Concurrency in JavaScript

From the beginning JavaScript was designed be a non-blocking language whenever possible. What does blocking mean? A blocking program is one that execution of the code stops until a function finished. Imagine that in the browser, if you click a button that takes a while like download a file then you cannot scroll nor click anything else until is done. That's terrible! The solution was making JavaScript non-blocking whenever possible using callbacks.

Let's see how to read a file using blocking code and using non-blocking code on Node.js

```js
// node read-file.js
const fs = require('fs');

fs.readFile('file.txt', 'utf8', (err, contents) => {
  console.log(contents);
});

console.log('Adios');
```
What do you think will be printed first the `

# Content

Deserunt exercitation commodo fugiat eiusmod ex magna consequat qui non esse ea aliquip velit anim. Minim sit eu do anim dolore ipsum dolor. Quis exercitation anim anim cupidatat. Lorem do deserunt anim pariatur commodo excepteur esse reprehenderit occaecat in est. Nostrud proident nostrud aliqua aliqua elit aute do anim velit laboris cupidatat laborum.

Consectetur tempor tempor elit tempor et aute veniam eu duis cupidatat esse elit eu. Eu aliqua culpa et minim nulla ad. Minim commodo eu laborum occaecat deserunt duis. Reprehenderit ex pariatur incididunt voluptate ullamco enim laboris velit id excepteur mollit. Fugiat laboris laborum proident sit. Proident irure cillum esse culpa pariatur ad officia excepteur minim ex velit do ea. Amet ad duis eiusmod sint minim Lorem laboris eu quis.

Ipsum consequat labore exercitation aute non. Nisi tempor cupidatat consequat excepteur nulla est aute. Anim labore qui aliquip veniam. Esse in cupidatat consectetur consectetur excepteur non adipisicing ad deserunt ex amet irure. Mollit voluptate velit occaecat elit proident fugiat pariatur. Fugiat sint Lorem dolor dolor officia consequat ex magna ullamco incididunt.


# Summary

Deserunt veniam proident minim enim enim reprehenderit pariatur pariatur aliqua. Ex ad irure nisi elit. Dolor non proident ad nostrud officia occaecat esse culpa ut consequat laboris.
