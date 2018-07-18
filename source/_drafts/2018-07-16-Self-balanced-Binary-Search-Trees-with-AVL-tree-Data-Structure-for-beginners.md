---
layout: draft
title: Self-balanced Binary Search Trees with AVL
comments: true
pageviews__total: 0
pageviews__recent: 0
pageviews__avg_time: 0
tutorial__order: 7
toc: true
photos:
  - /images/data-structures-for-beginners-balanced-binary-search-tree-avl-small.jpg
  - /images/data-structures-for-beginners-balanced-binary-search-tree-avl-large.jpg
photos__background_color: '#F4F0EF'
tags:
  - big-o notation
  - algorithms
  - tutorial_algorithms
categories:
  - Programming
  - Data Structures and Algorithms (DSA)
date: 2018-07-16 15:43:11
updated: 2018-07-16 15:43:11
---


Sunt commodo enim magna ex sint reprehenderit sunt proident reprehenderit. Pariatur sint est proident ullamco id cillum proident Lorem officia et commodo incididunt. Incididunt esse irure fugiat anim aliqua anim. Id enim commodo labore ad aliqua. Adipisicing non aliqua nisi anim nisi consequat dolore nulla deserunt minim aliquip veniam fugiat.

<!-- more -->

Eiusmod minim consequat culpa proident mollit mollit eu adipisicing do culpa. In mollit ipsum in amet labore est ad ad ex. Labore deserunt proident non ut. Elit ex ea incididunt mollit magna. Nostrud magna sunt deserunt elit nulla quis culpa voluptate veniam velit culpa tempor voluptate nostrud. Do qui Lorem voluptate culpa aliquip eu fugiat non duis qui ad culpa.

---
This post is part of a tutorial series:

**Learning Data Structures and Algorithms (DSA) for Beginners**
1. [Intro to algorithm's time complexity and Big O notation](/blog/2018/04/04/how-you-can-change-the-world-learning-data-structures-algorithms-free-online-course-tutorial/)
<!-- 1. Intro to Algorithm's Time Complexity and Big O Notation **👈 you are here** -->

1. [Eight time complexities that every programmer should know](/blog/2018/04/05/most-popular-algorithms-time-complexity-every-programmer-should-know-free-online-tutorial-course/)
<!-- 1. Eight time complexities that every programmer should know **👈 you are here** -->

1. [Data Structures for Beginners: Arrays, HashMaps, and Lists](/blog/2018/04/28/Data-Structures-Time-Complexity-for-Beginners-Arrays-HashMaps-Linked-Lists-Stacks-Queues-tutorial/)
<!-- 1. Data Structures for Beginners: Arrays, HashMaps, and Lists **👈 you are here** -->

1. [Graph Data Structures for Beginners](/blog/2018/05/14/Data-Structures-for-Beginners-Graphs-Time-Complexity-tutorial/)
<!-- 1. Graph Data Structures for Beginners **👈 you are here** -->

1. [Trees Data Structures for Beginners](/blog/2018/06/11/Data-Structures-for-Beginners-Trees-binary-search-tree-tutorial/)
<!-- 1. Trees Data Structures for Beginners **👈 you are here** -->

1. Self-balanced Binary Search Trees **👈 you are here**

1. [Apendix I: Analysis of Recursive Algorithms](/blog/2018/04/24/Analysis-of-Recursive-Algorithms/)
---

Eiusmod minim consequat culpa proident mollit mollit eu adipisicing do culpa. In mollit ipsum in amet labore est ad ad ex. Labore deserunt proident non ut. Elit ex ea incididunt mollit magna. Nostrud magna sunt deserunt elit nulla quis culpa voluptate veniam velit culpa tempor voluptate nostrud. Do qui Lorem voluptate culpa aliquip eu fugiat non duis qui ad culpa.

# Content



Perfect binary trees are always balanced because their height is the lowest possible given the number of nodes

\`|~ log_2 (n + 1) ~|\`

or

*`Math.ceil( Math.log2(n  + 1) )`*, where *`n`* is the total number of nodes.

However, perfect binary trees are not very common in the real world. We just want to gurantee a search time of *`O(log n)`*. Relaxing a little bit the definition we can say that a tree is balanced if:

1. The left subtree height and the right subtree height differ by at most 1.
2. Left and right subtree are balanced (using rule **#1**)

For instance, if you have a tree with 7 nodes:

```
1          A
         /   \
2       B     C
       /     / \
3     D     E   F
           /
4         G
```

If you check the subtrees heights recursevely you will notice they never differ by more than on.

- `A` descendants:
  - `B` subtree has a height of 2, while `C` has a height of 3. The difference is less than one so: Balanced!
- `C` descendents:
  - `E` subtree has a height of 2, while `F` has a height of 1: Balanced!

On the other hand, take a look at this tree:

```
1          A
         /   \
2       B     C
       /     /
3     D     E
           /
4         G
```

Let's check the subtrees height recursively:
- `A` descendants:
  - `B` subtree has a height of 2, while `C` has a height of 3. The difference is less than one so: Balanced!
- `C` descendents:
  - `E` subtree has a height of 2, while the right subtree (of `C`) has a height of 0. The difference between 2 and 0 is more than one, so: NOT balanced!



# Summary

Deserunt veniam proident minim enim enim reprehenderit pariatur pariatur aliqua. Ex ad irure nisi elit. Dolor non proident ad nostrud officia occaecat esse culpa ut consequat laboris.
