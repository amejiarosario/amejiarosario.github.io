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

The connection between two nodes is called **edge**. Nodes can also be called **vertices**

<!-- Redo -->
{% img http://btechsmartclass.com/DS/images/Graph%201.png Graph is composed of vertices and edges %}

When edges has values assigned to them we say we have a **weighted graph**.
In the image below, you can see that:

- Nodes are airports
- Edges are airports with direct flights
- Weight number of miles between the airport

{% img /images/airports-weighted-graph.jpg Airports weighted graph %}

Weighted graphs has many applications depending on the domain where you need to solve a problem:

- GPS Navigation
  - Node/Vertex = road insersection
  - Edge = road
  - Edge weigth = time required to go from one intersection to another
- Airline Traffic
  -


If the edges are bi-directional then we have an **undirected graph**. But, if the edges has a direction then we have a **directed graph**. You can think as it as one-way street (directed) or two-way street (undirected).

<!-- image of graph behind a map: edges is POI and edges are the streets -->
{% img https://koenig-media.raywenderlich.com/uploads/2017/01/graph6.png "Directed and Undirected graphs" %}

Graph can have **cycles** which means that if you traverse through the node you could get to the same node more than once. The graph without cycles are called **acyclic graph** or **tree**.

{% img http://apprize.info/php/hadoop_1/hadoop_1.files/image190.jpg Acyclic vs Cyclic Graphs %}

## Graph Applications

Graphs has many real-world applications like:

  - Shortest path between nodes
    - Flight reservations
    - Driving directions
    - Internet packet routing
    - Social networks
  - Amazon uses graphs to make suggestions about future shopping
  - Facebook uses graph for suggesting friends
  - Graphs helps to plan logistics of delivering goods

{% img /images/map-graph.jpg Graph applications: path finder %}



# Trees

Tree is a data structure where a node can zero ore more children.

If each node has only two children (left and right) we call it **Binary Tree**. If the tre


## Binary Trees

Ipsum consequat labore exercitation aute non. Nisi tempor cupidatat consequat excepteur nulla est aute. Anim labore qui aliquip veniam. Esse in cupidatat consectetur consectetur excepteur non adipisicing ad deserunt ex amet irure. Mollit voluptate velit occaecat elit proident fugiat pariatur. Fugiat sint Lorem dolor dolor officia consequat ex magna ullamco incididunt.

## Binary Search Trees

Ipsum consequat labore exercitation aute non. Nisi tempor cupidatat consequat excepteur nulla est aute. Anim labore qui aliquip veniam. Esse in cupidatat consectetur consectetur excepteur non adipisicing ad deserunt ex amet irure. Mollit voluptate velit occaecat elit proident fugiat pariatur. Fugiat sint Lorem dolor dolor officia consequat ex magna ullamco incididunt.

## Heaps

Ipsum consequat labore exercitation aute non. Nisi tempor cupidatat consequat excepteur nulla est aute. Anim labore qui aliquip veniam. Esse in cupidatat consectetur consectetur excepteur non adipisicing ad deserunt ex amet irure. Mollit voluptate velit occaecat elit proident fugiat pariatur. Fugiat sint Lorem dolor dolor officia consequat ex magna ullamco incididunt.

# Graph

Ipsum consequat labore exercitation aute non. Nisi tempor cupidatat consequat excepteur nulla est aute. Anim labore qui aliquip veniam. Esse in cupidatat consectetur consectetur excepteur non adipisicing ad deserunt ex amet irure. Mollit voluptate velit occaecat elit proident fugiat pariatur. Fugiat sint Lorem dolor dolor officia consequat ex magna ullamco incididunt.

## Cyclic and Acyclic Graph

Ipsum consequat labore exercitation aute non. Nisi tempor cupidatat consequat excepteur nulla est aute. Anim labore qui aliquip veniam. Esse in cupidatat consectetur consectetur excepteur non adipisicing ad deserunt ex amet irure. Mollit voluptate velit occaecat elit proident fugiat pariatur. Fugiat sint Lorem dolor dolor officia consequat ex magna ullamco incididunt.

## Breadth-frirst search (BFS)

Incididunt labore aliquip id consectetur ut pariatur anim esse. Laboris laboris velit et ipsum irure nostrud aliquip fugiat ullamco officia in aliqua do elit. Quis magna nostrud elit minim nisi aliquip exercitation. Fugiat magna aute aliqua labore ea dolor nostrud voluptate. Esse aute anim minim velit qui est quis est id id nisi incididunt in pariatur. Incididunt sunt minim in non nostrud ullamco tempor.


## Depth-frirst search (DFS)

Incididunt labore aliquip id consectetur ut pariatur anim esse. Laboris laboris velit et ipsum irure nostrud aliquip fugiat ullamco officia in aliqua do elit. Quis magna nostrud elit minim nisi aliquip exercitation. Fugiat magna aute aliqua labore ea dolor nostrud voluptate. Esse aute anim minim velit qui est quis est id id nisi incididunt in pariatur. Incididunt sunt minim in non nostrud ullamco tempor.



# Summary

Deserunt veniam proident minim enim enim reprehenderit pariatur pariatur aliqua. Ex ad irure nisi elit. Dolor non proident ad nostrud officia occaecat esse culpa ut consequat laboris.