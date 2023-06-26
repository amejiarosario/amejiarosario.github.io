---
layout: post
title: 'Graph Data Structures in JavaScript for Beginners'
comments: true
pageviews__total: 80431
pageviews__recent: 1398
pageviews__avg_time: 825
tutorial__order: 5
toc: true
photos:
  - /images/graph-data-structures-time-complexity-small.jpg
  - /images/graph-data-structures-time-complexity-large.jpg
photos__background_color: '#F4F0EF'
alias: /blog/2018/05/14/Data-Structures-for-Beginners-Graphs-Time-Complexity-tutorial/
tags:
  - algorithms
  - tutorial_algorithms
categories:
  - Coding
  - Data Structures and Algorithms (DSA)
date: 2018-05-14 05:19:22
updated: 2020-12-15 19:36:22
---

In this post, we are going to explore non-linear data structures like graphs. Also, we'll cover the central concepts and typical applications.

You are probably using programs with graphs and trees. For instance, let's say that you want to know the shortest path between your workplace and home. You can use graph algorithms to get the answer! We are going to look into this and other fun challenges.

<!-- more -->

In the previous post, we explore linear data structures like arrays, linked lists, sets, stacks, etc. This one builds on top of what we learned.

You can find all these implementations and more in the Github repo:
[https://github.com/amejiarosario/dsa.js](https://github.com/amejiarosario/dsa.js)

---
This post is part of a tutorial series:

**Learning Data Structures and Algorithms (DSA) for Beginners**
1. [Intro to algorithm's time complexity and Big O notation](/blog/2018/04/04/how-you-can-change-the-world-learning-data-structures-algorithms-free-online-course-tutorial/)
<!-- 1. Intro to Algorithm's Time Complexity and Big O Notation **👈 you are here** -->

1. [Eight time complexities that every programmer should know](/blog/2018/04/05/most-popular-algorithms-time-complexity-every-programmer-should-know-free-online-tutorial-course/)
<!-- 1. Eight time complexities that every programmer should know **👈 you are here** -->

1. [Data Structures for Beginners: Arrays, HashMaps, and Lists](/blog/2018/04/28/Data-Structures-Time-Complexity-for-Beginners-Arrays-HashMaps-Linked-Lists-Stacks-Queues-tutorial/)
<!-- 1. Data Structures for Beginners: Arrays, HashMaps, and Lists **👈 you are here** -->

1. Graph Data Structures for Beginners **👈 you are here**
<!-- 1. [Graph Data Structures for Beginners](/blog/2018/05/14/Data-Structures-for-Beginners-Graphs-Time-Complexity-tutorial/) -->

1. [Trees Data Structures for Beginners](/blog/2018/06/11/Data-Structures-for-Beginners-Trees-binary-search-tree-tutorial/)
<!-- 1. Trees Data Structures for Beginners **👈 you are here** -->

1. [Self-balanced Binary Search Trees](/blog/2018/07/16/Self-balanced-Binary-Search-Trees-with-AVL-tree-Data-Structure-for-beginners/)
<!-- 1. Self-balanced Binary Search Trees  **👈 you are here** -->

1. [Appendix I: Analysis of Recursive Algorithms](/blog/2018/04/24/Analysis-of-Recursive-Algorithms/)
---

Here is the summary of the operations that we are going to cover on this post:

&nbsp; | Adjacency List | Adjacency Matrix
-|-|-
Space | [O(&#124;V&#124; + &#124;E&#124;)](#List.space) | [O(&#124;V&#124;<sup>2</sup>)](#Matrix.space)
addVertex | [O(1)](#Graph.addVertex) | [O(&#124;V&#124;<sup>2</sup>)](#Matrix.addVertex)
removeVertex | [O(&#124;V&#124; + &#124;E&#124;)](#Graph.removeVertex) | [O(&#124;V&#124;<sup>2</sup>)](#Matrix.addVertex)
addEdge | [O(1)](#Graph.addEdge) | [O(1)](#Matrix.addVertex)
removeEdge (using Array) | [O(&#124;E&#124;)](#Graph.removeEdge) | [O(1)](#Matrix.addVertex)
removeEdge (using HashSet) | O(1) | [O(1)](#Matrix.addVertex)
getAdjacents | [O(&#124;E&#124;)](#Node.getAdjacents) | [O(&#124;V&#124;)](#Matrix.getAdjacents)
isAdjacent (using Array) | [O(&#124;E&#124;)](#Node.getAdjacents) | [O(1)](#Matrix.getAdjacents)
isAdjacent (using HashSet) | O(1) | [O(1)](#Matrix.getAdjacents)



## Graphs Basics

<!-- http://ccicada.org/wp-content/uploads/2017/06/Community-Detection-with-Hierarchical-Clustering-Algorithms-Feb-3-2017.pdf -->

Before we dive into interesting graph algorithms, let's first clarify the naming conventions and graph properties.

A graph is a data structure where a **node** can have zero or more adjacent elements.

The connection between two nodes is called **edge**. Nodes can also be called **vertices**.


{% img /images/graph-parts.jpg Graph is composed of vertices and edges %}
<!-- { img http://btechsmartclass.com/DS/images/Graph%201.png Graph is composed of vertices and edges } -->

The **degree** is the number of edges connected to a vertex. E.g., the `purple` vertex has a degree of 3 while the `blue` one has a degree of 1.

If the edges are bi-directional, then we have an **undirected graph**. If the edges have a direction, then we have a **directed graph** or **di-graph** for short. You can think of it as a one-way street (directed) or two-way street (undirected).

<!-- image of graph behind a map: edges is POI and edges are the streets -->
<!-- { img https://koenig-media.raywenderlich.com/uploads/2017/01/graph6.png "Directed and Undirected graphs" } -->
{% img /images/directed-vs-undirected-graph.jpg "Directed vs Undirected graph" %}

Vertex can have edges that go to itself (e.g., `blue` node). This is called **self-loop**.

A graph can have **cycles**, which means you could get the same node more than once. The graph without cycles is called **acyclic graph**.

<!-- { img http://apprize.info/php/hadoop_1/hadoop_1.files/image190.jpg Acyclic vs Cyclic Graphs } -->
{% img /images/cyclic-vs-acyclic-directed-graph.jpg "Cyclic vs Acyclic directed graph" %}

Also, acyclic undirected graphs are called **tree**. We are going to cover trees in-depth in the next post.

Not all vertices have to be connected in the graph. You might have isolated nodes or even separated subgraphs. If all nodes have at least one edge, then we have a **connected graph**. When all nodes are connected to all other nodes, then we have a **complete graph**.

<!-- { img /images/digraph-subgraph.png digraph with isolated subgraphs } -->
{% img /images/connected-vs-complete-graph.jpg Complete vs Connected graph %}

For a complete graph, each node should have `#nodes - 1` edges. In the previous example, we have seven vertices, so each node has six edges.


## Graph Applications

When edges have values/cost assigned to them, we say we have a **weighted graph**. If the weight is absent, we can assume it's 1.

{% img /images/airports-weighted-graph.jpg Airports weighted graph %}

Weighted graphs have many applications depending on the domain where you need to solve a problem. To name a few:

- Airline Traffic (image above)
  - Node/vertex = Airport
  - Edges = direct flights between two airports
  - Weight = miles between two airports

- GPS Navigation
  - Node = road intersection
  - Edge = road
  - Weight = time required to go from one intersection to another

- Networks routing
  - Node = server
  - Edge = data link
  - Weight = connection speed

In general, graphs have many real-world applications like:
  - Electronic circuits
  - Flight reservations
  - Driving directions
  - Telcom: Cell tower frequency planning
  - Social networks. E.g., Facebook uses a graph for suggesting friends
  - Recommendations: Amazon/Netflix uses graphs to make suggestions for products/movies
  - Graphs help to plan the logistics of delivering goods

{% img /images/map-graph.jpg Graph applications: pathfinder %}

We just learned the basics of graphs and some applications. Let's cover how to represent graphs in JavaScript.

## Representing graphs

There are two primary ways of representing a graph:

1. Adjacency list
2. Adjacency Matrix

Let's explain it with the following directed graph (digraph) as an example:

{% img /images/digraph.png "digraph" %}

We digraph with 4 nodes. When a vertex has a link to itself (e.g. `a`) is called **self-loop**.
<!-- Notice that `a` has **self-loop**. -->
<!-- img https://www.ida.liu.se/opendsa/OpenDSA/Books/TDDD86_2014/html/_images/GraphRep.png Graph representation: Adjacency list and matrix  -->

### Adjacency Matrix

The adjacency matrix is one way of representing a graph using a two-dimensional array (NxN matrix). In the intersection of nodes, we add 1 (or other weight) if they are connected and `0` or `-` if they are not connected.

Using the same example as before, we can build the following adjacency matrix:

{% codeblock Adjacency Matrix %}
  a b c d e
a 1 1 - - -
b - - 1 - -
c - - - 1 -
d - 1 1 - -
{% endcodeblock %}

As you can see, the matrix list all nodes horizontally and vertically. If there are a few connections, we call it a **sparse graph**. If there are many connections (close to the max number of links), we call it a **dense graph**. If all possible connections are reached, then we have a **complete graph**.

It's important to notice that the adjacency matrix will **always** be symmetrical by the diagonal for undirected graphs. However, that's not always the case on a digraph (like our example).

What is the time complexity of finding connections of two vertices?

> Querying if two nodes are connected in an adjacency matrix takes a constant time or *O(1)*.

<a id="Matrix.space"></a>

What is the space complexity?

> Storing a graph as an adjacency matrix has a space complexity of *O(n<sup>2</sup>)*, where `n` is the number of vertices. Also, represented as *O(|V|<sup>2</sup>)*

<a id="Matrix.addVertex"></a>

What is the runtime to add a vertex?

The vertices are stored as a *`V`*x*`V`* matrix. So, every time a vertex is added, the matrix needs to be reconstructed to a *`V+1`*x*`V+1`*.

> Adding a vertex on an adjacency matrix is *O(|V|<sup>2</sup>)*

<a id="Matrix.getAdjacents"></a>

What about getting the adjacent nodes?

Since the matrix has a VxV matrix, we would have to go to the node row to get all the adjacent nodes to a given vertex and get all its edges with the other nodes.

In our previous example, let's say we want all the adjacent nodes to `b`. We have to get the full row where b is with all the other nodes.
```
  a b c d e
b - - 1 - -
```

We have to visit all nodes so,

> Getting adjacent nodes on an adjacency matrix is *O(|V|)*

Imagine that you need to represent the Facebook network as a graph. You would have to create a matrix of 2 billion x 2 billion, where most of it would be empty! Nobody would know everybody else, just a few thousand at most.

In general, we deal with sparse graphs so that the matrix will waste a lot of space. That's why, in most implementations, we would use an adjacency list rather than the matrix.

### Adjacency List

Adjacency List is one of the most common ways to represent graphs. Each node has a list of all the nodes connected to it.

Graphs can be represented as an adjacency list using an Array (or HashMap) containing the nodes. Each node includes a list (Array, linked list, set, etc.) that lists its adjacent nodes.

For instance, in the graph above we have that `a` has a connection to `b` and also a self-loop to itself. In turn, `b` has a connection to `c` and so on:

{% codeblock Adjacency List %}
a -> { a b }
b -> { c }
c -> { d }
d -> { b c }
{% endcodeblock %}

As you can imagine, if you want to know if a node is connected to another node, you would have to go through the list.

> Querying if two nodes are connected in an adjacency list is *O(n)*, where `n` is the number of vertices. Also represented as *O(|V|)*

<a id="List.space"></a>

What about space complexity?

> Storing a graph as an adjacency list has a space complexity of *O(n)*, where `n` is the sum of vertices and edges. Also, represented as *O(|V| + |E|)*

## Adjacency List Graph HashMap Implementation

The adjacency list is the most common way of representing graphs. There are several ways to implement the adjacency list:

One of them is using a HashMap. The `key` is the node's value, and the `value` is an array of adjacency.

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

Let's say that we want to remove the vertex `b`. We could do `delete graph['b'];`. However, we still have to remove the references on the adjacency list on `d` and `a`.

Every time we remove a node, we would have to iterate through all the nodes' list *O(|V| + |E|)*.  Can we do better? We will answer that soon, but first, let's *implement our list in a more object-oriented way to swap implementations easily.

## Adjacency List Graph OO Implementation

Let's start with the `Node` class that holds the vertex's value and adjacent vertices. We can also have helper functions for adding and removing adjacent nodes from the list.

<a id="Node.getAdjacents"></a>

{% codeblock Node lang:js mark:8,14 https://github.com/amejiarosario/dsa.js/blob/master/src/data-structures/graphs/node.js Commented Code %}
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

  isAdjacent(node) {
    return this.adjacents.indexOf(node) > -1;
  }
}
{% endcodeblock %}

Notice that `adjacent` runtime is *O(1)*, while `remove adjacent` is *O(|E|)*. What if, instead of an array, use a HashSet 🧐? It could be *O(1)*. But, let first get it working, and later we can make it faster.

> Make it work. Make it right. Make it faster.

Ok, now that we have the `Node` class, let's build the Graph class to perform operations such as adding/removing vertices and edges.

**Graph.constructor**

{% codeblock Graph.constructor lang:js mark:2,4,9,10 https://github.com/amejiarosario/dsa.js/blob/master/src/data-structures/graphs/graph.js  Full Code %}
class Graph {
  constructor(edgeDirection = Graph.DIRECTED) {
    this.nodes = new Map();
    this.edgeDirection = edgeDirection;
  }
  // ...
}

Graph.UNDIRECTED = Symbol('undirected graph'); // two-ways edges
Graph.DIRECTED = Symbol('directed graph'); // one-way edges
{% endcodeblock %}

The first thing that we need to know is if the graph is directed or undirected. That makes a difference when we are adding edges.

<a id="Graph.addEdge"></a>

**Graph.addEdge**

To add an edge, we need two nodes. One is the source, and the other is the destination.

{% codeblock Graph.addEdge lang:js mark:7 https://github.com/amejiarosario/dsa.js/blob/master/src/data-structures/graphs/graph.js  Full Code %}
  addEdge(source, destination) {
    const sourceNode = this.addVertex(source);
    const destinationNode = this.addVertex(destination);

    sourceNode.addAdjacent(destinationNode);

    if(this.edgeDirection === Graph.UNDIRECTED) {
      destinationNode.addAdjacent(sourceNode);
    }

    return [sourceNode, destinationNode];
  }
{% endcodeblock %}

We add an edge from the source vertex to the destination. If we have an undirected graph, we also add from target node to source since it's bidirectional.

> The runtime of adding an edge from a graph adjacency list is: *O(1)*

If we try to add an edge and the nodes don't exist, we need to create them first. Let's do that next!

<a id="Graph.addVertex"></a>

**Graph.addVertex**

<!-- If you look at the constructor, you will notice that we created a HashMap to hold all the nodes in the graph. We use the hashMap to know if the vertex already exists and get it quickly. -->

The way we create a node is that we add it to the `this.nodes` Map. The map store a key/value pair, where the `key` is the vertex's value while the map `value` is the instance of the node class. Take a look at line 5-6:

{% codeblock Graph.addVertex lang:js mark:5-6 https://github.com/amejiarosario/dsa.js/blob/master/src/data-structures/graphs/graph.js  Full Code %}
  addVertex(value) {
    if(this.nodes.has(value)) {
      return this.nodes.get(value);
    } else {
      const vertex = new Node(value);
      this.nodes.set(value, vertex);
      return vertex;
    }
  }
{% endcodeblock %}

If the node already exists, we don't want to overwrite it. So, we first check if it already exists, and if it doesn't, then we create it.

> The runtime of adding a vertex from a graph adjacency list is: *O(1)*

<a id="Graph.removeVertex"></a>

**Graph.removeVertex**

Removing a node from the graph, it's a little bit more involved. We have to check if the node to be deleted is in use as an adjacent node.

{% codeblock Graph.removeVertex lang:js mark:5,8 https://github.com/amejiarosario/dsa.js/blob/master/src/data-structures/graphs/graph.js  Full Code %}
  removeVertex(value) {
    const current = this.nodes.get(value);
    if(current) {
      for (const node of this.nodes.values()) {
        node.removeAdjacent(current);
      }
    }
    return this.nodes.delete(value);
  }
{% endcodeblock %}

We have to go through each vertex and then each adjacent node (edges).

> The runtime of removing a vertex from a graph adjacency list is *O(|V| + |E|)*

Finally, let's implement removing an edge!

<a id="Graph.removeEdge"></a>

**Graph.removeEdge**

Removing an edge is pretty straightforward and similar to `addEdge`.

{% codeblock Graph.removeVertex lang:js mark:6,9 https://github.com/amejiarosario/dsa.js/blob/master/src/data-structures/graphs/graph.js  Full Code %}
  removeEdge(source, destination) {
    const sourceNode = this.nodes.get(source);
    const destinationNode = this.nodes.get(destination);

    if(sourceNode && destinationNode) {
      sourceNode.removeAdjacent(destinationNode);

      if(this.edgeDirection === Graph.UNDIRECTED) {
        destinationNode.removeAdjacent(sourceNode);
      }
    }

    return [sourceNode, destinationNode];
  }
{% endcodeblock %}

The main difference between `addEdge` and `removeEdge` is that:
- If the vertices don't exist, we won't create them.
- We use `Node.removeAdjacent` instead of `Node.addAdjacent`.

Since `removeAdjacent` has to go through all the adjacent vertices, we have the following runtime:

> The runtime of removing an edge from a graph adjacency list is *O(|E|)*

We are going to explore how to search for values from a node.

## Breadth-first search (BFS) - Graph search

Breadth-first search is a way to navigate a graph from an initial vertex by visiting all the adjacent nodes first.

{% img https://upload.wikimedia.org/wikipedia/commons/5/5d/Breadth-First-Search-Algorithm.gif Breadth-First Search in a graph %}

Let's see how we can accomplish this in code:

{% codeblock Graph.bfs lang:js mark:3 https://github.com/amejiarosario/dsa.js/blob/master/src/data-structures/graphs/graph.js  Full Code %}
  *bfs(first) {
    const visited = new Map();
    const visitList = new Queue();

    visitList.add(first);

    while(!visitList.isEmpty()) {
      const node = visitList.remove();
      if(node && !visited.has(node)) {
        yield node;
        visited.set(node);
        node.getAdjacents().forEach(adj => visitList.add(adj));
      }
    }
  }
{% endcodeblock %}

As you can see, we are using a `Queue` where the first node is also the first node to be visited (FIFO). You can find the [Queue implementation here](https://github.com/amejiarosario/dsa.js-data-structures-algorithms-javascript/blob/5628a2772513a05ceb3f088976b81914c9951fd2/src/data-structures/queues/queue.js#L47).

We are using [JavaScript generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator), notice the `*` in front of the function. This generator iterates one value at a time. That's useful for large graphs (millions of nodes) because you don't need to visit every single node in most cases.

This an example of how to use the BFS that we just created:

```js
  const graph = new Graph(Graph.UNDIRECTED);

  const [first] = graph.addEdge(1, 2);
  graph.addEdge(1, 3);
  graph.addEdge(1, 4);
  graph.addEdge(5, 2);
  graph.addEdge(6, 3);
  graph.addEdge(7, 3);
  graph.addEdge(8, 4);
  graph.addEdge(9, 5);
  graph.addEdge(10, 6);

  bfsFromFirst = graph.bfs(first);

  bfsFromFirst.next().value.value; // 1
  bfsFromFirst.next().value.value; // 2
  bfsFromFirst.next().value.value; // 3
  bfsFromFirst.next().value.value; // 4
  // ...
```

You can find more illustrations of usage in the [test cases](https://github.com/amejiarosario/dsa.js/blob/master/src/data-structures/graphs/graph.spec.js). Let's move on to the DFS!

## Depth-first search (DFS)  - Graph search

Depth-first search is another way to navigate a graph from an initial vertex by recursively the first adjacent node of each vertex found.

{% img https://upload.wikimedia.org/wikipedia/commons/7/7f/Depth-First-Search.gif Depth First Search in a graph %}

The iterative implementation of a DFS is identical to the BFS, but instead of using a `Queue` you use a `Stack`:

NOTE: [stack implementation](https://github.com/amejiarosario/dsa.js-data-structures-algorithms-javascript/blob/master/src/data-structures/stacks/stack.js)

{% codeblock Graph.dfs lang:js mark:3 https://github.com/amejiarosario/dsa.js/blob/master/src/data-structures/graphs/graph.js  Full Code %}
  *dfs(first) {
    const visited = new Map();
    const visitList = new Stack();

    visitList.add(first);

    while(!visitList.isEmpty()) {
      const node = visitList.remove();
      if(node && !visited.has(node)) {
        yield node;
        visited.set(node);
        node.getAdjacents().forEach(adj => visitList.add(adj));
      }
    }
  }
{% endcodeblock %}

We can test our graph as follow.

```js
  const graph = new Graph(Graph.UNDIRECTED);

  const [first] = graph.addEdge(1, 2);
  graph.addEdge(1, 3);
  graph.addEdge(1, 4);
  graph.addEdge(5, 2);
  graph.addEdge(6, 3);
  graph.addEdge(7, 3);
  graph.addEdge(8, 4);
  graph.addEdge(9, 5);
  graph.addEdge(10, 6);

  dfsFromFirst = graph.dfs(first);
  visitedOrder = Array.from(dfsFromFirst);
  const values = visitedOrder.map(node => node.value);
  console.log(values); // [1, 4, 8, 3, 7, 6, 10, 2, 5, 9]
```

As you can see, the graph is the same on BFS and DFS. However, the order of how the nodes were visited is very different. BFS went from 1 to 10 in that order, while DFS went as deep as it could on each node.

<!--Let's see some applications where DFS and BFS can be useful.

### Find the path in a Graph

Let's say you are exploring your social network, and you want to know who can introduce you to Mark Zuckerberg.

{ img /images/you-mark-connections-graph2.png "Friends graph between you and Mark Zuckerberg" %}

Your code uses a DFS or BFS and iterates until you find the vertex you are looking for (e.g., Mark). It will indicate to us if two vertices are **connected**. Let's start with that.

{ codeblock Graph.areConnected lang:js mark:6 https://github.com/amejiarosario/dsa.js/blob/master/src/data-structures/graphs/graph.js Full Code }
  areConnected(source, destination) {
    const sourceNode = this.nodes.get(source);
    const destinationNode = this.nodes.get(destination);

    if(sourceNode && destinationNode) {
      const bfsFromFirst = this.bfs(sourceNode);
      for (const node of bfsFromFirst) {
        if(node === destinationNode) {
          return true;
        }
      }
    }

    return false;
  }
{ endcodeblock }

With this function, we get if two nodes are connected or not. However, they don't give us a path.-->

## Graph Time and Space Complexity

We have seen some of the basic operations of a Graph. How to add and remove vertices and edges. Here's a summary of what we have covered so far:

<!-- Implementation | Space | addVertex | removeVertex | addEdge | removeEdge | getAdjacents | areConnected -->
<!-- - | - | - | - | - | - | - | - &#124; -->
<!-- Adjacency List | -->

&nbsp; | Adjacency List | Adjacency Matrix
-|-|-
Space | [O(&#124;V&#124; + &#124;E&#124;)](#List.space) | [O(&#124;V&#124;<sup>2</sup>)](#Matrix.space)
addVertex | [O(1)](#Graph.addVertex) | [O(&#124;V&#124;<sup>2</sup>)](#Matrix.addVertex)
removeVertex | [O(&#124;V&#124; + &#124;E&#124;)](#Graph.removeVertex) | [O(&#124;V&#124;<sup>2</sup>)](#Matrix.addVertex)
addEdge | [O(1)](#Graph.addEdge) | [O(1)](#Matrix.addVertex)
removeEdge (using Array) | [O(&#124;E&#124;)](#Graph.removeEdge) | [O(1)](#Matrix.addVertex)
removeEdge (using HashSet) | O(1) | [O(1)](#Matrix.addVertex)
getAdjacents | [O(&#124;E&#124;)](#Node.getAdjacents) | [O(&#124;V&#124;)](#Matrix.getAdjacents)
isAdjacent (using Array) | [O(&#124;E&#124;)](#Node.getAdjacents) | [O(1)](#Matrix.getAdjacents)
isAdjacent (using HashSet) | O(1) | [O(1)](#Matrix.getAdjacents)

<!-- areConnected | | -->

As you can see, an adjacency list is faster in almost all operations. The only action that the adjacency matrix will outperform the adjacency list is checking if a node is adjacent to another. However, if we change our implementation from Array to a HashSet, we can get it in constant time.


## Summary

As we saw, Graphs can help to model many real-life scenarios such as airports, social networks, the internet, and so on. We covered some of the most fundamental algorithms, such as Breadth-First Search (BFS) and Depth-First Search (DFS). Also, we studied implementation trade-offs such as adjacency lists and matrix. Subscribe to my newsletter and don't miss any of my posts because there are many other applications that we will learn soon, such as finding the shortest path between nodes and different exciting graph algorithms!


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


<!-- https://github.com/trekhleb/javascript-algorithms/tree/master/src/data-structures/graph -->
<!-- https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/graph/breadth-first-search -->

<!-- Backlinks

  https://betterdev.link/issues/54
-->
