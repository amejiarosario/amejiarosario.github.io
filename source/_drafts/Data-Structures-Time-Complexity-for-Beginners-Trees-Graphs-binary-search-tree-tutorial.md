---
layout: draft
title: 'Data Structures for Beginners: Trees & Graphs'
comments: true
pageviews__total: 0
pageviews__recent: 0
pageviews__avg_time: 0
tutorial__order: 5
toc: true
photos:
  - /images/data-structures-time-complexity-trees-graphs-binary-search-tree-small.jpg
  - /images/data-structures-time-complexity-trees-graphs-binary-search-tree-large.jpg
  - /images/data-structures-time-complexity-small.jpg
  - /images/data-structures-time-complexity-large.jpg
photos__background_color: '#F4F0EF'
tags:
  - big-o notation
  - algorithms
  - tutorial_algorithms
categories:
  - Programming
  - Data Structures and Algorithms (DSA)
date: 2018-05-14 05:19:22
updated: 2018-05-14 05:19:22
---


In this post we are going to explore non-linear structures like trees and graphs. We are going to cover their main applications and commong aplications.

You are probably using programs every day that uses graphs and trees. Let's say for instance that you want to know the shortest path between your workplace and home you can use graph algorithms to get the answer! We are going to explore this and other fun challenges.

<!-- more -->

In the previous post we explore linear data structures like arrays, linked lists, stacks and so on. This post builds on top of what we learned.

# Graphs

<!-- http://ccicada.org/wp-content/uploads/2017/06/Community-Detection-with-Hierarchical-Clustering-Algorithms-Feb-3-2017.pdf -->

A graph is a data structure where a **node** can have zero or more adjacent elements.

The connection between two nodes is called **edge**. Nodes can also be called **vertices**.

<!-- Redo -->
{% img http://btechsmartclass.com/DS/images/Graph%201.png Graph is composed of vertices and edges %}

The **degree** is the number of edges connected to a vertex. E.g. `D` has a degree of 4 while `C` has a degree of 2.

If the edges are bi-directional then we have an **undirected graph**. But, if the edges has a direction then we have a **directed graph** or **di-graph** for short. You can think as it as one-way street (directed) or two-way street (undirected).

<!-- image of graph behind a map: edges is POI and edges are the streets -->
{% img https://koenig-media.raywenderlich.com/uploads/2017/01/graph6.png "Directed and Undirected graphs" %}

Graph can have **cycles** which means that if you traverse through the node you could get to the same node more than once. The graph without cycles are called **acyclic graph**.

{% img http://apprize.info/php/hadoop_1/hadoop_1.files/image190.jpg Acyclic vs Cyclic Graphs %}

Also, acyclic undirected graphs are called **tree**. We are going to cover trees in depth later.

Not all vertices has be connected in graph. You might have isolated nodes or even isolated subgraphs.

{% img /images/digraph-subgraph.png digraph with isolated subgraphs %}

If all nodes are has a least one edge then we have a **connected graph**.

## Graph Applications

When edges has values/cost assigned to them we say we have a **weighted graph**. If the weight is absent we can assume is 1.

{% img /images/airports-weighted-graph.jpg Airports weighted graph %}

Weighted graphs has many applications depending on the domain where you need to solve a problem. To name a few:

- Airline Traffic (image above)
  - Node/vertex = Airport
  - Edges = direct flights between two airports
  - Weight = miles between two airports
- GPS Navigation
  - Node = road insersection
  - Edge = road
  - Weigth = time required to go from one intersection to another
- Networks routing
  - Node = server
  - Edge = data link
  - Weight = connection speed

In general, graphs has many real-world applications like:
  - Electronic circuits
  - Flight reservations
  - Driving directions
  - Telcom: Cell tower frequency planning
  - Social networks. E.g. Facebook uses graph for suggesting friends
  - Recommendations: Amazon/Netflix uses graphs to make suggestions products/movies
  - Graphs helps to plan logistics of delivering goods

{% img /images/map-graph.jpg Graph applications: path finder %}

We just learnt about the basics of graphs and some applications. Let's learn now how to represent graphs in code.

## Representing graphs

Thre are two basic ways of representing graph:

1. Adjacency list
2. Adjacency Matrix

Let's explain it with the following directed graph (digraph) as an example:

{% img /images/digraph.png "digraph" %}

We a digraph with 4 nodes. When a vertex has link to itself (e.g. `a`) is called **self-loop**.
<!-- Notice that `a` has **self-loop**. -->
<!-- img https://www.ida.liu.se/opendsa/OpenDSA/Books/TDDD86_2014/html/_images/GraphRep.png Graph representation: Adjacency list and matrix  -->

**Adjacency List**

Adjacency List is one of the most common way to represent graphs. Eeach node has a list of all the nodes connected to it.

Graphs can be represented as an adjacency list using an Array (or HashMap) containing the nodes. Each of this node entries contains a list (array, linked list, set, ...) that list its adjacent nodes.

For instance in the graph above we have that `a` has an connection to `b` and also a self-loop to itself. In turn, `b` has a connection to `c` and so on:

{% codeblock Adjacency List %}
a -> { a b }
b -> { c }
c -> { d }
d -> { b c }
{% endcodeblock %}

As you can imaging if you want to know if a node is connected to another node, you would have to go through the list.

> Querying if two nodes are connected in an adjacency list is *O(n)*, where `n` is the number of vertices. Also represented as *O(|V|)*

What about the space complexity?

> Storing a graph as an adjacency list has a space complexity of *O(n)*, where `n` is the sum of vertices and edges. Also, represented as *O(|V| + |E|)*

**Adjacency Matrix**

Adjacency matrix is another way of representing graph using a two-dimmesional array (NxN matrix). Each node that is connected to another the weight is added (or 1 by default).

Using the same example as before, we can build the following adjacency matrix:

{% codeblock Adjacency Matrix %}
  a b c d e
a 1 1 - - -
b - - 1 - -
c - - - 1 -
d - 1 1 - -
{% endcodeblock %}

As you can see, the matrix list all nodes horizontally and vertically. If there a few connections we called **sparse graph**, if there are many connections (close to the max number of connections) we called it **dense graph**. If all possible connections are reached then we have a **complete graph**.

Is importat to notice, that for undirected graphs the adjacency matrix will **always** be symmetric. However, that's not always the case on a digraph (like our example).

What is the time complexity of finding connections of two vertices?

> Querying if two nodes are connected in an adjacency list is *O(1)*.

What is the space complexity?

> Storing a graph as an adjacency list has a space complexity of *O(n<sup>2</sup>)*, where `n` is the number of vertices. Also, represented as *O(|V|<sup>2</sup>)*

Imagine that you need to represent Facebook network as a graph. You would have to create a matrix of 2 billion x 2 billion, where most of it would be empty! Nobody would know everybody else just a few thousands at most.

In general, we deal with sparse graphs so the matrix will waste a lot of space. That's why in most implementation we would use an adjacency list rather than the matrix.

## Adjacency List Graph HashMap Implementation

Adjacency list is the most common way of representing graphs. There are several ways to implement the adjacency list:

One of the most simple is using a HashMap. The `key` is the value of the node and the `value` is an array of adjacency.

{% codeblock Adjacency List as a Hashmap lang:js%}
const graph = {
  a: ['a', 'b'],
  b: ['c'],
  c: ['d'],
  d: ['b', 'c']
}
{% endcodeblock %}

Graph usually needs the following operations:
 - Add and remove vertices
 - Add and remove edges

Adding and removing vertices involves updating the adjacency list.

Let's say that we want to remove the vertex `b`. We could do `delete graph['b'];`, however, we still have to remove the references on the adjacency list on `d` and `a`.

Everytime we remove a node, we would have to iterate through all the nodes' list *O(|V| + |E|)*.  Can do better? We will answer that later, first let's *implement our list in a more object oriented way so we can swap implementations easily.

## Adjacency List Graph OO Implementation

Let's start with the Node that holds the value and the adjacent nodes to ifself.

{% codeblock Node lang:js mark:8,14 https://github.com/amejiarosario/algorithms.js/blob/master/lib/data-structures/graphs/node.js Commented Code %}
class Node {
  constructor(value) {
    this.value = value;
    this.adjacents = []; // adjacency list
  }

  addAdjacent(node) {
    this.adjacents.push(node);
  }

  removeAdjacent(node) {
    const index = this.adjacents.indexOf(node);
    if(index > -1) {
      this.adjacents.splice(index, 1);
      return node;
    }
  }

  getAdjacents() {
    return this.adjacents;
  }
}
{% endcodeblock %}

Notice that `addAdjacent` runtime is *O(1)*, while `removeAdjacent` is *O(|E|)*. If we instead of an array use a map.....


## Breadth-frirst search (BFS) - Graph search

Incididunt labore aliquip id consectetur ut pariatur anim esse. Laboris laboris velit et ipsum irure nostrud aliquip fugiat ullamco officia in aliqua do elit. Quis magna nostrud elit minim nisi aliquip exercitation. Fugiat magna aute aliqua labore ea dolor nostrud voluptate. Esse aute anim minim velit qui est quis est id id nisi incididunt in pariatur. Incididunt sunt minim in non nostrud ullamco tempor.


## Depth-frirst search (DFS)  - Graph search

Incididunt labore aliquip id consectetur ut pariatur anim esse. Laboris laboris velit et ipsum irure nostrud aliquip fugiat ullamco officia in aliqua do elit. Quis magna nostrud elit minim nisi aliquip exercitation. Fugiat magna aute aliqua labore ea dolor nostrud voluptate. Esse aute anim minim velit qui est quis est id id nisi incididunt in pariatur. Incididunt sunt minim in non nostrud ullamco tempor.

## Bidirectional Search

Incididunt labore aliquip id consectetur ut pariatur anim esse. Laboris laboris velit et ipsum irure nostrud aliquip fugiat ullamco officia in aliqua do elit. Quis magna nostrud elit minim nisi aliquip exercitation. Fugiat magna aute aliqua labore ea dolor nostrud voluptate. Esse aute anim minim velit qui est quis est id id nisi incididunt in pariatur. Incididunt sunt minim in non nostrud ullamco tempor.


# Trees

Tree is a data structure where a node can zero ore more children. Tree is a type of graph, but not all graphs are trees. Only the acyclic undirected graph are trees.

{% img https://www.tutorialspoint.com/data_structures_algorithms/images/binary_tree.jpg Tree %}

{% img http://www.i-programmer.info/images/stories/BabBag/trees/Tree1.jpg Tree elements %}

If each node has only two children (left and right) we call it **Binary Tree**. If the tre


## Binary Trees

Ipsum consequat labore exercitation aute non. Nisi tempor cupidatat consequat excepteur nulla est aute. Anim labore qui aliquip veniam. Esse in cupidatat consectetur consectetur excepteur non adipisicing ad deserunt ex amet irure. Mollit voluptate velit occaecat elit proident fugiat pariatur. Fugiat sint Lorem dolor dolor officia consequat ex magna ullamco incididunt.

## Binary Search Trees

Ipsum consequat labore exercitation aute non. Nisi tempor cupidatat consequat excepteur nulla est aute. Anim labore qui aliquip veniam. Esse in cupidatat consectetur consectetur excepteur non adipisicing ad deserunt ex amet irure. Mollit voluptate velit occaecat elit proident fugiat pariatur. Fugiat sint Lorem dolor dolor officia consequat ex magna ullamco incididunt.

## Heaps

Ipsum consequat labore exercitation aute non. Nisi tempor cupidatat consequat excepteur nulla est aute. Anim labore qui aliquip veniam. Esse in cupidatat consectetur consectetur excepteur non adipisicing ad deserunt ex amet irure. Mollit voluptate velit occaecat elit proident fugiat pariatur. Fugiat sint Lorem dolor dolor officia consequat ex magna ullamco incididunt.

## Tries



# Summary

Deserunt veniam proident minim enim enim reprehenderit pariatur pariatur aliqua. Ex ad irure nisi elit. Dolor non proident ad nostrud officia occaecat esse culpa ut consequat laboris.


<!-- https://www.slideshare.net/hafsakomal/graphs-49204527 -->
<!-- https://www.slideshare.net/Abrish06/graph-48747573?next_slideshow=1 -->

<!-- http://ccicada.org/wp-content/uploads/2017/06/Community-Detection-with-Hierarchical-Clustering-Algorithms-Feb-3-2017.pdf -->

<!-- https://dreampuf.github.io/GraphvizOnline/ -->
<!-- http://www.webgraphviz.com/ -->
<!-- http://graphviz.readthedocs.io/en/stable/examples.html -->

<!-- https://www.python.org/doc/essays/graphs/ -->

<!-- Social Network Visualizations -->
<!-- http://socilab.com/#home -->
<!-- http://blog.stephenwolfram.com/2012/08/wolframalpha-personal-analytics-for-facebook/ -->