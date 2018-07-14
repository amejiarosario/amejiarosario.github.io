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

In the [previous post](/blog/2018/05/14/Data-Structures-for-Beginners-Graphs-Time-Complexity-tutorial/), we explored the Graph data structures which is a generalized cased of trees. Let's get started learning what are tree data structures!

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

Tree is a data structure where a nodes can zero ore more children. Each node contains a **value**. Similar to graphs, the connection between nodes are called **edges**. Tree is a type of graph, but not all graphs are trees (only the acyclic undirected graph are trees).

They are called "trees" because the data structure resembles a tree 🌳. It starts with a **root** node and **branch off with its decendants and finally there are **leave**.

{% img https://www.tutorialspoint.com/data_structures_algorithms/images/binary_tree.jpg Tree %}

{% img http://www.i-programmer.info/images/stories/BabBag/trees/Tree1.jpg Tree elements %}

Here are some properties of trees:
- The top-most node is called **root**.
- A node without children is called **leaf** node or terminal node.
- **Height** (*h*) of the tree is the distance (node count) between the farthest leaf to the root.
- **Depth** or **level** of a node is the distance between the root and the node in question.

## Implementing a simple tree data structure

As we saw earlier a tree node is just a data structure that has a value and has links to their descendants.

Here's an example of a tree node:

```js
class TreeNode {
  constructor(value) {
    this.value = value;
    this.descendents = [];
  }
}
```

We can create a tree with 3 descendents as follows:

```js
// create nodes with values
const abe = new TreeNode('Abe');
const homer = new TreeNode('Homer');
const bart = new TreeNode('Bart');
const lisa = new TreeNode('Lisa');
const maggie = new TreeNode('Maggie');

// associate root with is descendents
abe.descendents.push(homer);
homer.descendents.push(bart, lisa, maggie);
```

That's all, we have a tree data structure!

{% img /images/simpson-tree.jpg "Simpson tree data structure" %}

`abe` is the **root** and `bart`, `lisa` and `maggie` are the **leaf** nodes of the tree. Notice that tree's node can different number of descendents: 0, 1, 3 and any number really.

# Binary Trees

Trees nodes can have zero or many children (3, 4, ...). However, when a tree has at most 2 children then it's called **binary tree**.

Image of Binary tree vs non-binary Tree

A binary tree is one of the most common form of trees and has many applications such as:

- Searching in a time complexity of *O(log n)*.
- Cryptography: [Generate pseudorandom numbers](https://www.cs.princeton.edu/courses/archive/fall07/cos433/prf_goldreich.pdf)
- Implement peformant [Maps](https://adrianmejia.com/blog/2018/04/28/data-structures-time-complexity-for-beginners-arrays-hashmaps-linked-lists-stacks-queues-tutorial/#HashMaps) and [Sets](https://adrianmejia.com/blog/2018/04/28/data-structures-time-complexity-for-beginners-arrays-hashmaps-linked-lists-stacks-queues-tutorial/#Sets) data structures.
- Implement priority queues

## Full, Complete and Perfect binary trees

Depending on how nodes are arranged in a binary tree, it can be **full**, **complete** and **perfect**:

- **Full binary tree**: each node has exctly 0 or 2 children (never 1).
- **Complete binary tree**: when all levels except the last one are **full** with nodes.
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

# Binary Search Tree (BST)

Binary Search Trees or BST for short are a special application of binary trees. BST has at most two nodes (like all binary trees), however, the values are in such a way that the left children value must be less than the parent and the right children is must be higher.

<!-- ---BST vs non-BST--- -->

**Duplicates:** Some BST doesn't allow duplicates while others put it the right. Other implementations might just keep a count on case of duplicates.

Let's implement a Binary Search Tree!

## BST Implementation

BST are very similar to our previous [implementation of a tree](#Implementing-a-simple-tree-data-structure). However, there are some difference:
- Nodes can have at most only two children: left and right.
- Nodes values has be ordered: `left < parent < right`.

Here's the tree node. Very similar to what we did before, but we added some nice getters and setters for left and right children. Notice that are also keeping a reference to the parent and we update it every time add children. That will come handy later.

{% codeblock TreeNode.js lang:js mark:1-2,8,12,16,18,23,27,29 linkUrl linkText %}
const LEFT = 0;
const RIGHT = 1;

class TreeNode {
  constructor(value) {
    this.value = value;
    this.descendents = [];
    this.parent = null;
  }

  get left() {
    return this.descendents[LEFT];
  }

  set left(node) {
    this.descendents[LEFT] = node;
    if (node) {
      node.parent = this;
    }
  }

  get right() {
    return this.descendents[RIGHT];
  }

  set right(node) {
    this.descendents[RIGHT] = node;
    if (node) {
      node.parent = this;
    }
  }
}
{% endcodeblock %}

Ok, so far we can add a left and right child. Now, let's do the BST class that enforces the `left < parent < right` rule.

{% codeblock BinarySearchTree.js lang:js linkUrl linkText %}

class BinarySearchTree {
  constructor() {
    this.root = null;
    this.size = 0;
  }

  add(value) { /* ... */ }
  find(value) { /* ... */ }
  remove(value) { /* ... */ }
  getMax() { /* ... */ }
  getMin() { /* ... */ }
}
{% endcodeblock %}

Let's implementing insertion.

## BST Node Insertion

To insert a node in a binary tree we do the following:
1. If tree is empty, the first node becomes the **root** and you are done.
1. Compare root/parent's value if is *higher* go **right**, if is *lower* go **right**. If is the same, then the value already exists so you can increase the duplicate count (multiplicity).
1. Repeat #2 until we found an empty slot to insert the new node.

Let's do an illustration how to insert 30, 40, 10, 15, 12, 50:
{% img /images/bst2.gif "Inserting nodes on a Binary Search Tree (BST)" %}

We can implement insert as follows:

{% codeblock BinarySearchTree.prototype.add lang:js mark:5,7 https://github.com/amejiarosario/algorithms.js/blob/master/src/data-structures/trees/binary-search-tree.js#L11 Full Code %}
  add(value) {
    const newNode = new TreeNode(value);

    if (this.root) {
      const { found, parent } = this.findNodeAndParent(value);
      if (found) { // duplicated: value already exist on the tree
        found.meta.multiplicity = (found.meta.multiplicity || 1) + 1;
      } else if (value < parent.value) {
        parent.left = newNode;
      } else {
        parent.right = newNode;
      }
    } else {
      this.root = newNode;
    }

    this.size += 1;
    return newNode;
  }
{% endcodeblock %}

We are using a helper function called `findNodeAndParent`. If we found that the node already exist in the tree, then we just increase the `multiplicity` counter. Let's see how this function is implemented:

{% codeblock BinarySearchTree.prototype.findNodeAndParent lang:js mark:2,10 https://github.com/amejiarosario/algorithms.js/blob/master/src/data-structures/trees/binary-search-tree.js#L44 Full Code %}
  findNodeAndParent(value) {
    let node = this.root;
    let parent;

    while (node) {
      if (node.value === value) {
        break;
      }
      parent = node;
      node = ( value >= node.value) ? node.right : node.left;
    }

    return { found: node, parent };
  }
{% endcodeblock %}

`findNodeAndParent` goes through the tree searching for the value. It starts at the root (line 2) and then go left or right based on the value (line 10). If the value already exists it will return the node `found` and also the parent. In case that the node doesn't exists, we still return the `parent`.

## BST Node Deletion

We know how to insert and search for value. We are going to implement the delete operation. It's a little trickier than inserting, so let's explain it with the following tree:


We have the following cases:

**Deleting a leaf node (0 children)**

```
    30                             30
 /     \         remove(12)     /     \
10      40       --------->    10      40
  \    /  \                      \    /  \
  15  35   50                    15  35   50
  /
12*
```
We just remove the reference from node's parent (15) to be null.

**Deleting a node with one child.**

```
    30                              30
 /     \         remove(10)      /     \
10*     40       --------->     15      40
  \    /  \                            /  \
  15  35   50                         35   50
```

In this case we go to the parent (30) and replace child (10), with childs' child (15).


**Deleting a node with two children**

```
    30                              30
 /     \         remove(40)      /     \
15      40*      --------->     15      50
       /  \                            /
      35   50                         35
```

We are removing node 40 that has 2 children (35 and 50). We replace the parent's (30) child (40) with the child's right child (50). Then we keep the left child (35) in the same place it was before, so we have to make it the left child of 50.

**Deleting the root.**

```
    30*                            50
  /     \       remove(30)      /     \
 15      50     --------->     15      35
        /
       35
```
Deleting the root is very similar to deleting nodes with 0, 1, or 2 children that we discussed earlier. The only difference is that afterwards we need to update the reference of root of the tree.


Here's an animation of what we discussed.

{% img /images/bst-remove.gif Removing a node with 0, 1, 2 children from a binary search tree %}

In the animation, ended up with a slighly different result because it moves up the left child/subtree instead of the right child/subtree. That's ok either way as long as we maintain: `left < parent < right`.

Now that we have a good idea how it should work, let's implement it:

{% codeblock BinarySearchTree.prototype.remove lang:js mark:3,6,10,16 https://github.com/amejiarosario/algorithms.js/blob/master/src/data-structures/trees/binary-search-tree.js#L89 Full Code %}
  remove(value) {
    const found = this.find(value);
    if (!found) return false;

    // Combine left and right children into one subtree.
    const newSubtree = this.combineLeftIntoRightSubtree(found);

    if (found === this.root) {
      // Replace (root) node to delete with the combined subtree.
      this.root = newSubtree;
      this.root.parent = null; // clearing up old parent
    } else {
      const side = found.isParentLeftChild ? 'left' : 'right';
      const { parent } = found; // get parent
      // Replace node to delete with the combined subtree.
      parent[side] = newSubtree;
    }

    this.size -= 1;
    return true;
  }
{% endcodeblock %}

Here are some hightlights of the implementation:
- First we search if the node exist. If doesn't we return false and we are done!
- Combine left and right children into one subtree.
- Replace node to delete with the combined subtree.

The function that combines left into right subtree is the following:

{% codeblock BinarySearchTree.prototype.remove lang:js mark:3,6,10,16 https://github.com/amejiarosario/algorithms.js/blob/master/src/data-structures/trees/binary-search-tree.js#L89 Full Code %}
  combineLeftIntoRightSubtree(node) {
    if (node.right) {
      const leftmost = this.getLeftmost(node.right);
      leftmost.left = node.left;
      return node.right;
    }
    return node.left;
  }
{% endcodeblock %}

For instace let's say that we want to combine the following tree and we are about to delete node 30. We would like to combine the left subtree into the right one. The result is this:

```
      30*                             40
    /     \                          /  \
   10      40    combined(30)       35   50
     \    /  \   ----------->      /
     15  35   50                  10
                                   \
                                    15
```
Now, node 30 is no more!


## Balanced vs Non-balanced Trees

You can find elements **balanced** tree in a *O(log n)* instead of going through each node. Let's talk about what balanced tree means

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
