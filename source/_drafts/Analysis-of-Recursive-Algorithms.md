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

We are going to explore two methods of obtaining the time complexity of recursive algorithms. One is the **Master Method** and other is the **Recursion Tree**. Let's get started with the first one!

# Master Method

The Master Method is the most straitforward way of obtaining runtime of recursive algorithms. You need to identify 3 things:

- *`a`*: How many recursion functions there are? E.g. Binary search has 1, Merge Sort has 2, etc...
- *`b`*: What rate is the input reduce? E.g. Binary search and Merge sort cut input in half.
- *`f(n)`* Runtime of the work done outside the recursion?

The general formula for the Master Method is:

> \` T(n) = a * T(n / b) + f(n) \`




# Recursion tree

Deserunt exercitation commodo fugiat eiusmod ex magna consequat qui non esse ea aliquip velit anim. Minim sit eu do anim dolore ipsum dolor. Quis exercitation anim anim cupidatat. Lorem do deserunt anim pariatur commodo excepteur esse reprehenderit occaecat in est. Nostrud proident nostrud aliqua aliqua elit aute do anim velit laboris cupidatat laborum.

Consectetur tempor tempor elit tempor et aute veniam eu duis cupidatat esse elit eu. Eu aliqua culpa et minim nulla ad. Minim commodo eu laborum occaecat deserunt duis. Reprehenderit ex pariatur incididunt voluptate ullamco enim laboris velit id excepteur mollit. Fugiat laboris laborum proident sit. Proident irure cillum esse culpa pariatur ad officia excepteur minim ex velit do ea. Amet ad duis eiusmod sint minim Lorem laboris eu quis.



# Summary

Deserunt veniam proident minim enim enim reprehenderit pariatur pariatur aliqua. Ex ad irure nisi elit. Dolor non proident ad nostrud officia occaecat esse culpa ut consequat laboris.
