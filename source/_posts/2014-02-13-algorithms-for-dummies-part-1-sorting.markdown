---
layout: post
title: "Algorithms for dummies (Part 1): Big-O Notation and Sorting"
date: 2014-02-13 09:28:51 -0400
updated: 2014-02-13 09:28:51 -0400
comments: true
toc: true
pageviews__total: 88392
pageviews__recent: 381
pageviews__avg_time: 509
#categories: [algorithms, big-o, sorting, merge sort]
photos:
  - /images/AlgorithmsForDummies_small.png
  - /images/AlgorithmsForDummies_large.png
photos__background_color: '#F2ED5B'
tutorial__order: 0
tags:
  - big-o notation
  - algorithms
categories:
  - Programming
  - Data Structures and Algorithms (DSA)
---

After being developing software for a while,  I realized that there is a couple of ways to become better at it. One it's through your experience: writing code, working on projects, getting hands dirty... Other one it's learning algorithms and design patterns. In other words through leveraging the experience of other computer scientists. Learning to use algorithms efficiently can instantly add to you the equivalent of 10 years of experience or more. Let's get started and add new tools to our arsenal!

<!--More-->

How do you know a piece of code that you just wrote is good enough?  When you modify a program, how do you know if it is better as you found it? How do scale programs to handle huge amount of data? In fact, You cannot improve what you can't measure.

How to measure them? We could count the number of seconds it takes to execute and compare it with other one. However, it's not just troublesome to timers around code but if we run it in different hardware (e.g. supercomputer) it will seem like more efficient when indeed it's exactly the same program. Let's illustrate a better way with an example. Let's say you want to sort an array of n integers.

# Sorting Algorithms

``` java
  void sort(int[] arr){
    for(int x=1; x < arr.length; x++)
      for(int y=x; y > 0 && arr[y-1] > arr[y]; y--){
          int t = arr[y];
          arr[y] = arr[y-1];
          arr[y-1] = t;
        }
  }
```
Do you recognize this algorithm? It's called Insertion sort. It has two nested loops, which means that as the number of elements n in the array `arr` grows it will take approximately n * n longer to perform the sorting. In big-O notation, this will be represented like O(n^2). More on this notation later.

What would happen if the array arr is already sorted? That would be the best-case scenario. The inner for loop will never go through all the elements in the array then (because `arr[y-1] > arr[y]`  won't be met). So the algorithm in run in O(n).

We are not living in an ideal world. So O(n^2) will be probably the average time complexity. Can you think a better way of sorting an array of elements?

Take some minutes to think and come back...

## Merge Sort

A more efficient algorithm is the Merge sort. It uses the principle of divide and conquer to solve the problem faster. The idea is the follows:

{% img /images/mergesort.gif %}

  - Divide the array in half
  - Divide the halves by half until 2 or 3 elements are remaining
  - Sort each of these halves
  - Merge them back together


Can you determine the time complexity of mergesort?

```java
  void sort(int[] arr){
    int[] helper = new int[arr.length];
    mergesort(arr, helper, 0, arr.length-1);
  }

  void mergesort(int[] arr, int[] helper, int low, int high){
    if(low < high){
      int middle = (high+low)/2;
      mergesort(arr, helper, low, middle);
      mergesort(arr, helper, middle+1, high);
      merge(arr, helper, low, middle, high);
    }
  }

  void merge(int[] arr, int[] helper, int low, int middle, int high){
    for (int x=low; x <= high; x++) {
      helper[x] = arr[x];
    }

    int left = low;
    int curr = low;
    int right = middle+1;

    while(left <= middle && right <= high) {
      if(helper[right] > helper[left])
        arr[curr++] = helper[left++];
      else
        arr[curr++] = helper[right++];
    }

    while(left <= middle)
      arr[curr++] = helper[left++];
  }
```

Even though the code is much longer, the algorithm is much more efficient.

{% img /images/insertion_vs_mergsort.png %}

It would take some more knowledge to derive the running time mathematically, and we haven't covered that yet. However, bear with me, it's O(n log(n)). Let's sum up:

Algorithm | best | average | worst | space complexity
Insertion Sort | O(n) | O(n^2) | O(n^2) | O(1)
Merge sort | O(n log(n)) | O(n log(n)) | O(n log(n)) | O(n)

Notice that the table has also the space complexity. How much space does the algorithms take is also an important parameter to compare algorithms. The merge sort uses an additional array that's way its space complexity is `O(n)`, however, the insertion sort uses `O(1)` because it does the sorting in-place.

# Big O Notation

Big O is defined as the asymptotic upper limit of a function. In plain english, it means that is a function that cover the maximum values a function could take. As we saw a little earlier this notation help us to predict performance and compare algorithms.



| Growth Rate | Name         |
|-------------|--------------|
| 1           | Constant     |
| log(n)      | Logarithmic  |
| n           | Linear       |
| n log(n)    | Linearithmic |
| n^2         | Quadratic    |
| n^3         | Cubic        |
| 2^n         | Exponential  |


This is kinda abstract let's see what it means in code:

<table>
  <tr>
    <th>Growth Rate</th>
    <th>Name</th>
    <th>Code Example</th>
    <th>description</th>
  </tr>
  <tr>
    <td>1</td>
    <td>Constant</td>
    <td><pre>a= b + 1;</pre></td>
    <td>statement (one line of code)</td>
  </tr>
  <tr>
    <td>log(n)</td>
    <td>Logarithmic</td>
    <td>
      <pre>
      while(n>1){
        n=n/2;
      }
      </pre>
    </td>
    <td>Divide in half (binary search)</td>
  </tr>
  <tr>
    <td>n</td>
    <td>Linear</td>
    <td>
      <pre>
for(c=0; c&lt;n; c++){
  a+=1;
}
</pre></td>
    <td>Loop</td>
  </tr>
  <tr>
    <td>n*log(n)</td>
    <td>Linearithmic</td>
    <td>Mergesort, Quicksort, ...</td>
    <td>Effective sorting algorithms</td>
  </tr>
  <tr>
    <td>n^2</td>
    <td>Quadratic</td>
    <td>
      <pre>
for(c=0; c&lt;n; c++){
  for(i=0; i&lt;n; i++){
    a+=1;
  }
}
</pre>
    </td>
    <td>Double loop</td>
  </tr>
  <tr>
    <td>n^3</td>
    <td>Cubic</td>
    <td>
      <pre>
for(c=0; c&lt;n; c++){
  for(i=0; i&lt;n; i++){
    for(x=0; x&lt;n; x++){
      a+=1;
    }
  }
}
</pre>
    </td>
    <td>Triple loop</td>
  </tr>
  <tr>
    <td>2^n</td>
    <td>Exponential</td>
    <td>Trying to braeak a password generating all possible combinations</td>
    <td>Exhaustive search</td>
  </tr>
</table>

That's all for this first part 1. I will continue publishing this tutorials every week or so. Stay tune!

<hr>
**Update**

 Checkout out the next post clicking here: <a href="/blog/2018/04/04/how-you-can-change-the-world-learning-data-structures-algorithms-free-online-course-tutorial/">Data Structures and Algorithms (DSA) for Beginners</a>
<hr>
