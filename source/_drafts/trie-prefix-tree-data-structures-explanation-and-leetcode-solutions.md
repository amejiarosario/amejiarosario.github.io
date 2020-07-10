---
layout: draft
title: Trie (Prefix Tree) Data Structures Explanation and Leetcode solutions
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
date: 2020-07-02 17:09:24
updated: 2020-07-02 17:09:24
---


A Trie or Prefix Tree is a tree data structure that is useful for searching words and implementing autocomplete functionalities or replacing Hash Maps in some cases.
In these post, we are going to learn how to implement a Trie in JavaScript and how we can use it to solve some algorithms problems.

<!-- more -->

# Applications

## Autocomplete

One of the most common uses of prefix tries or Trie is to implement autocomplete functionality. For instance, when you type a search term in Google, it get's you frequent related terms.

![Trie being used for autocomplete functionality](/images/google-autocomplete.png)

## Hash Map vs Trie

Another usage for a Trie, is to replace a HashMap.

- There's no collisions. A Hash Map with many collision could degrade the lookup time to `O(n)`, while a Trie will always be `O(m)`, where `m` is the max length of a word or phrase.
- Usually Trie are used to store words or phrases, but it can be used to store numbers as well. Just be aware that some floating points might have long number of digits and a Hash Map might be more appropiate for that case.

# Implementation and Exercises

https://leetcode.com/problemset/all/?topicSlugs=trie
https://leetcode.com/problems/design-search-autocomplete-system/


# Summary

Deserunt veniam proident minim enim enim reprehenderit pariatur pariatur aliqua. Ex ad irure nisi elit. Dolor non proident ad nostrud officia occaecat esse culpa ut consequat laboris.
