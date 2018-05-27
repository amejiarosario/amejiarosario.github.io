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

<!-- http://ccicada.org/wp-content/uploads/2017/06/Community-Detection-with-Hierarchical-Clustering-Algorithms-Feb-3-2017.pdf -->

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

Let's explain it with the following digraph as an example:


{% img /images/digraph.png "digraph" %}

We a directed graph with 4 nodes. When a vertex has link to itself (e.g. `a`) is called **self-loop**.
<!-- Notice that `a` has **self-loop**. -->
<!-- img https://www.ida.liu.se/opendsa/OpenDSA/Books/TDDD86_2014/html/_images/GraphRep.png Graph representation: Adjacency list and matrix  -->

**Adjacency List**

Adjacency List is one of the most common way to represent graphs. Eeach node has a list of all the nodes connected to it.

Following the example in the previous digraph:
{% codeblock Adjacency List %}
a -> { a b }
b -> { c }
c -> { d }
d -> { b c }
{% endcodeblock %}

As you can imaging if you want to know if a node is connected to another node, you would have to go through the list.

> Querying if two nodes are connected in an adjacency list is *O(n)*, where n is the number of vertices. Also represented as *O(|V|)*

**Adjacency Matrix**

Adjacency matrix is another way of representing graph with a two-dimmesional array. Where if a node is connected to another the weight is added (or 1 by default).

{% codeblock Adjacency Matrix %}
/ a b c d e
a 1 1 - - -
b - - 1 - -
c - - - 1 -
d - 1 1 - -
{% endcodeblock %}

As you can see the matrix waste some space if the graph is **

> Querying if two nodes are connected in an adjacency list is *O(1)*.

## Adjacency List Graph Implementation

Adjacency list is the most common way of representing graphs.

## Adjacency Matrix Graph Implementation

Adjacency list is the most common way of representing graphs.

## Breadth-frirst search (BFS)

Incididunt labore aliquip id consectetur ut pariatur anim esse. Laboris laboris velit et ipsum irure nostrud aliquip fugiat ullamco officia in aliqua do elit. Quis magna nostrud elit minim nisi aliquip exercitation. Fugiat magna aute aliqua labore ea dolor nostrud voluptate. Esse aute anim minim velit qui est quis est id id nisi incididunt in pariatur. Incididunt sunt minim in non nostrud ullamco tempor.


## Depth-frirst search (DFS)

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

<!-- https://dreampuf.github.io/GraphvizOnline/ -->
<!-- http://www.webgraphviz.com/ -->
<!-- http://graphviz.readthedocs.io/en/stable/examples.html -->