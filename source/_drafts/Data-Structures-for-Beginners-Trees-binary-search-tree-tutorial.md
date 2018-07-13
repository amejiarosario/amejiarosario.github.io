---
layout: draft
title: 'Data Structures for Beginners: Trees'
comments: true
pageviews__total: 0
pageviews__recent: 0
pageviews__avg_time: 0
tutorial__order: 0
toc: true
photos:
  - /images/data-structures-for-beginners-trees-binary-search-tree-small.jpg
  - /images/data-structures-for-beginners-trees-binary-search-tree-large.jpg
photos__background_color: '#F4F0EF'
tags:
  - big-o notation
  - algorithms
  - tutorial_algorithms
categories:
  - Programming
  - Data Structures and Algorithms (DSA)
date: 2018-06-11 18:49:30
updated: 2018-06-11 18:49:30
---

<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-MML-AM_CHTML" async></script>

Tree data structures are very widely used on applications like databases and search applications to name a few. We are going to explore the different types of trees and how to implement them.

<!-- more -->

In the previous post, we explored the Graph data structures which is a generalized cased of trees. Let's get started learning what are tree data structures! 🌲

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

1. Data Structures for Beginners: Trees **👈 you are here**

1. [Apendix I: Analysis of Recursive Algorithms](/blog/2018/04/24/Analysis-of-Recursive-Algorithms/)
---

# Trees: basic concepts

Tree is a data structure where a node can zero ore more children. Tree is a type of graph, but not all graphs are trees (only the acyclic undirected graph are trees).

{% img https://www.tutorialspoint.com/data_structures_algorithms/images/binary_tree.jpg Tree %}

{% img http://www.i-programmer.info/images/stories/BabBag/trees/Tree1.jpg Tree elements %}

As you can see on the graph, the last nodes on a tree is called *leaf*.

The number of levels in a tree is also refered as **height**, represented by *h*.

# Binary Trees

Binary tress are trees that has at most two desendents (children).

Image of Binary tree vs non-binary Tree

A binary tree is one of the most common form of trees and has many applications such as:

- Searching
- Cryptography: [Generate pseudorandom numbers](https://www.cs.princeton.edu/courses/archive/fall07/cos433/prf_goldreich.pdf)
- Implement peformant [Maps](https://adrianmejia.com/blog/2018/04/28/data-structures-time-complexity-for-beginners-arrays-hashmaps-linked-lists-stacks-queues-tutorial/#HashMaps) and [Sets](https://adrianmejia.com/blog/2018/04/28/data-structures-time-complexity-for-beginners-arrays-hashmaps-linked-lists-stacks-queues-tutorial/#Sets) data structures.
- Implement priority queues

## Full, Complete and Perfect binary trees

Depending on how many nodes arrangements a binary tree can be **full**, **complete** and **perfect**:
- **Full binary tree**: each node has 0 or 2 children
- **Complete binary tree**: when all levels except the last one are full with nodes.
- **Perfect binary tree**: when all the levels (including the last one) are full with nodes.

<!-- If each node has only two children (left and right) we call it **Binary Tree**. -->

<!-- A binary tree where every node has 0 or 2 children then it said to be a **full binary tree** -->

<!-- When a binary is perfect and comple, it is called a **Perfect Binary Tree**. -->
{% img http://www.csie.ntnu.edu.tw/~u91029/BinaryTree2.png full Binary Tree %}

<!-- **Complete binary tree** is when all levels except the last one are filled with nodes. -->


You can also have a combination of full and complete binary trees:
{% img https://gsourcecode.files.wordpress.com/2012/02/complete-full-trees1.png "Complete/Full binary tree" %}


<!-- If each non-leaf node on a binary tree has two descendents then we say is a **complete tree** -->

<!-- { img https://www.cs.cmu.edu/~adamchik/15-121/lectures/Trees/pix/full_complete.bmp caption } -->

Perfect binary trees have \`2^k - 1\`, where *`k`* is the last level of tree (starting with 1).


## Binary Search Trees (BST)

Binary Search Trees or BST for short are a special application of binary trees. BST has at most two nodes (like all binary trees), however, the values are in such a way that the left children value must be less than the parent and the right children is must be higher.

BST vs non-BST


## Balanced vs Non-balanced Trees

It's important to keep the balance on trees, especially when using Binary Search Trees to guarantee a search time of *`O(log n)`*. If the tree is not balanced, then the search time won't be any different than searching a value on a LinkedList *`O(n)`*.

{% img http://www.stoimen.com/blog/wp-content/uploads/2012/07/3.-Balanced-vs.-Non-Balanced.png Balanced vs unbalanced Tree %}

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

## Binary Tree Transversal

Enim do eiusmod labore do Lorem. Id qui tempor ad duis in quis ex magna cupidatat fugiat sit. Ad minim eu mollit deserunt est aute. Nostrud duis ea minim deserunt irure ex incididunt qui.

Incididunt occaecat mollit veniam veniam tempor commodo deserunt. Culpa nostrud incididunt ullamco tempor consequat voluptate culpa in non cillum Lorem nulla. Exercitation reprehenderit non labore Lorem ullamco aliquip ullamco. Ut labore amet nostrud exercitation. Tempor dolore eu et occaecat sit et ut cupidatat ipsum ex excepteur. Laboris incididunt laborum consequat esse fugiat tempor irure.

Adipisicing ipsum pariatur laborum magna labore anim eu do consequat in. Nisi id aute qui velit laboris do. Esse anim excepteur ullamco nulla ut velit quis in elit sit mollit dolor ex irure. Nostrud Lorem elit enim ullamco culpa magna sunt laboris officia eu. Magna esse dolore velit non occaecat do esse ut esse. Do in cillum magna nulla culpa aliqua deserunt labore sunt eiusmod adipisicing do aliquip.

# Heaps

<!-- https://en.wikipedia.org/wiki/Heap_(data_structure) -->

Ipsum consequat labore exercitation aute non. Nisi tempor cupidatat consequat excepteur nulla est aute. Anim labore qui aliquip veniam. Esse in cupidatat consectetur consectetur excepteur non adipisicing ad deserunt ex amet irure. Mollit voluptate velit occaecat elit proident fugiat pariatur. Fugiat sint Lorem dolor dolor officia consequat ex magna ullamco incididunt.

## Tries


Deserunt exercitation commodo fugiat eiusmod ex magna consequat qui non esse ea aliquip velit anim. Minim sit eu do anim dolore ipsum dolor. Quis exercitation anim anim cupidatat. Lorem do deserunt anim pariatur commodo excepteur esse reprehenderit occaecat in est. Nostrud proident nostrud aliqua aliqua elit aute do anim velit laboris cupidatat laborum.

Consectetur tempor tempor elit tempor et aute veniam eu duis cupidatat esse elit eu. Eu aliqua culpa et minim nulla ad. Minim commodo eu laborum occaecat deserunt duis. Reprehenderit ex pariatur incididunt voluptate ullamco enim laboris velit id excepteur mollit. Fugiat laboris laborum proident sit. Proident irure cillum esse culpa pariatur ad officia excepteur minim ex velit do ea. Amet ad duis eiusmod sint minim Lorem laboris eu quis.

Ipsum consequat labore exercitation aute non. Nisi tempor cupidatat consequat excepteur nulla est aute. Anim labore qui aliquip veniam. Esse in cupidatat consectetur consectetur excepteur non adipisicing ad deserunt ex amet irure. Mollit voluptate velit occaecat elit proident fugiat pariatur. Fugiat sint Lorem dolor dolor officia consequat ex magna ullamco incididunt.




# Summary

Deserunt veniam proident minim enim enim reprehenderit pariatur pariatur aliqua. Ex ad irure nisi elit. Dolor non proident ad nostrud officia occaecat esse culpa ut consequat laboris.


<!-- Usage: -->
<!-- https://www.quora.com/What-is-the-real-life-application-of-tree-data-structures -->

<!-- http://www.stoimen.com/blog/2012/07/03/computer-algorithms-balancing-a-binary-search-tree/ -->

<!-- https://stackoverflow.com/questions/8015630/definition-of-a-balanced-tree -->