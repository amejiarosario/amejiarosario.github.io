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
date: 2018-07-16 15:43:11
updated: 2018-07-16 15:43:11
---


Sunt commodo enim magna ex sint reprehenderit sunt proident reprehenderit. Pariatur sint est proident ullamco id cillum proident Lorem officia et commodo incididunt. Incididunt esse irure fugiat anim aliqua anim. Id enim commodo labore ad aliqua. Adipisicing non aliqua nisi anim nisi consequat dolore nulla deserunt minim aliquip veniam fugiat.

<!-- more -->

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
