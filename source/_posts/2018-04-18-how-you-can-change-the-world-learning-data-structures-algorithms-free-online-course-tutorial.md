---
layout: post
title: >-
  How you can change the world by learning Data Structures and Algorithms
comments: true
toc: true
pageviews__total: 76772
pageviews__recent: 656
pageviews__avg_time: 915
tutorial__order: 1
photos:
- /images/data-structures-algorithms-time-complexity-big-o-notation-small.jpg
- /images/data-structures-algorithms-time-complexity-big-o-notation-large.jpg
photos__background_color: '#F4F0EF'
alias: /blog/2018/04/04/how-you-can-change-the-world-learning-data-structures-algorithms-free-online-course-tutorial/
tags:
  - algorithms
  - tutorial_algorithms
categories:
  - Coding
  - Data Structures and Algorithms (DSA)
date: 2018-04-04 16:16:07
updated: 2019-04-05 16:12:00
---

<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-MML-AM_CHTML" async></script>

As a developer, you have the power to change the world! You can write programs that enable new technologies. For instance, develop software to find an earlier diagnosis of diseases. But that's not the only way. You might do it indirectly by creating projects that make people more productive and help them free up time to do other amazing things. Whatever you do, it has the potential to impact the community who use it.

However, these accomplishments are only possible if we write software that is fast and can scale. Learning how to measure your code performance is the goal of this post.

<!-- more -->

---
This post is part of a tutorial series:

**Learning Data Structures and Algorithms (DSA) for Beginners**
1. Intro to Algorithm's Time Complexity and Big O Notation **👈 you are here**
<!-- 1. [Intro to algorithm's time complexity and Big O notation](/blog/2018/04/04/how-you-can-change-the-world-learning-data-structures-algorithms-free-online-course-tutorial/) -->

1. [Eight-time complexities that every programmer should know](/blog/2018/04/05/most-popular-algorithms-time-complexity-every-programmer-should-know-free-online-tutorial-course/)
<!-- 1. Eight time complexities that every programmer should know **👈 you are here** -->

1. [Data Structures for Beginners: Arrays, HashMaps, and Lists](/blog/2018/04/28/Data-Structures-Time-Complexity-for-Beginners-Arrays-HashMaps-Linked-Lists-Stacks-Queues-tutorial/)
<!-- 1. Data Structures for Beginners: Arrays, HashMaps, and Lists **👈 you are here** -->

1. [Graph Data Structures for Beginners](/blog/2018/05/14/Data-Structures-for-Beginners-Graphs-Time-Complexity-tutorial/)
<!-- 1. Graph Data Structures for Beginners **👈 you are here** -->

1. [Trees Data Structures for Beginners](/blog/2018/06/11/Data-Structures-for-Beginners-Trees-binary-search-tree-tutorial/)
<!-- 1. Trees Data Structures for Beginners **👈 you are here** -->

1. [Self-balanced Binary Search Trees](/blog/2018/07/16/Self-balanced-Binary-Search-Trees-with-AVL-tree-Data-Structure-for-beginners/)
<!-- 1. Self-balanced Binary Search Trees  **👈 you are here** -->

1. [Appendix I: Analysis of Recursive Algorithms](/blog/2018/04/24/Analysis-of-Recursive-Algorithms/)
<!-- 1. Appendix I: Analysis of Recursive Algorithms **👈 you are here** -->
---

We will explore how you can measure your code performance using analysis of algorithms: **time complexity** and **big O notation**.

First, let’s see a real story to learn why this is important.

## An algorithm that saved millions of lives


During World War II, the Germans used <abbr title="AM broadcasting is a radio broadcasting technology, which employs amplitude modulation transmissions.">AM</abbr> radio signals to communicate with troops around Europe. Anybody with an AM frequency radio and some knowledge of Morse code could intercept the message. However, the information was encoded! All the countries that were under attack tried to decode it. Sometimes, they got lucky and could make sense of a couple of messages at the end of the day. Unfortunately, the Nazis changed the encoding every single day!

A brilliant mathematician called Alan Turing joined the British military to crack the German "Enigma" code. He knew they would never get ahead if they keep doing the calculations by pen and paper. So after many months of hard work, they built a machine. Unfortunately, the first version of the device took too long to decode a message! So, it was not very useful.

Alan's team found out that every encrypted message ended with the same string: "Heil Hitler" Aha! After changing the algorithm, the machine was able to decode transmissions a lot faster! They used the info to finish the war quicker and save millions of lives!

_The same machine that was going to get shut down as a failure became a live saver. Likewise, you can do way more with your computing resources when you write efficient code. That is what we are going to learn in this post series!_

Another popular algorithm is `PageRank` developed in 1998 by Sergey Brin and Larry Page (Google founders). This algorithm was (and is) used by a Google search engine to make sense of trillions of web pages. Google was not the only search engine. However, since their algorithm returned better results, most of the competitors faded away. Today it powers most of 3 billion daily searches very quickly. That is the power of algorithms that scale! 🏋🏻‍

## So, why should you learn to write efficient algorithms?

There are many advantages; these are just some of them:

* You would become a much better software developer (and get better jobs/income).
* Spend less time debugging, optimizing, and re-writing code.
* Your software will run faster with the same hardware (cheaper to scale).
* Your programs might be used to aid discoveries that save lives (maybe?).

Without further ado, let’s step up our game!

## What are algorithms?

<iframe width="560" height="315" src="https://www.youtube.com/embed/y0kt0BI5IZ0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Algorithms (as you might know) are steps of how to do some task. For example, when you cook, you follow a **recipe** to prepare a dish. If you play a game, you are devising **strategies** to help you win. Likewise, algorithms in computers are a set of instructions used to solve a problem.

> Algorithms are instructions to perform a task

There are "good" and "bad" algorithms. The good ones are fast; the bad ones are slow. Slow algorithms cost more money and make some calculations impossible in our lifespan!

We are going to explore the basic concepts of algorithms. Also, we are going to learn how to distinguish “fast” from “slow” ones. Even better, you will be able to “measure” your algorithms' performance and improve them!

## How to improve your coding skills?

The first step to improving something is to measure it.

{% blockquote H. J. Harrington %}
Measurement is the first step that leads to control and eventually to improvement. If you can’t measure something, you can’t understand it. If you can’t understand it, you can’t control it. If you can’t control it, you can’t improve it.
{% endblockquote %}

How do you do "measure" your code? Would you clock "how long" it takes to run? What if you are running the same program on a mobile device or a quantum computer? The same code will give you different results.

To answer these questions, we need to nail some concepts first, like **time complexity**!

### Time complexity

Time complexity (or **running time**) is the estimated time an algorithm takes to run. However, you do not measure time complexity in seconds, but as a **function** of the input.  (I know it's weird but bear with me).

> The **time complexity** is not about timing how long the algorithm takes. Instead, *how many operations* are executed. The number of instructions executed by a program is affected by the input's size and how their elements are arranged.

Why is that the time complexity is expressed as a function of the input? Well, let's say you want to sort an array of numbers. If the elements are already sorted, the program will perform fewer operations. On the contrary, if the items are in reverse order, it will require more time to get them sorted. The time a program takes to execute is directly related to the input size and its arrangement.

We can say for each algorithm have the following running times:

* Worst-case time complexity (e.g., input elements in reversed order)
* Best-case time complexity (e.g., already sorted)
* Average-case time complexity (e.g., elements in random order)

We usually care more about the **worst-case time complexity** (We hope for the best but preparing for the _worst_).

## Calculating time complexity

Here's a code example of how you can calculate the time complexity: *Find the smallest number in an array*.

{% codeblock lang:js mark:6-7,10-11,14 %}
/**
 * Get the smallest number on an array of numbers
 * @param {Array} n array of numbers
 */
function getMin(n) {
  const array = Array.from(n);
  let min;

  array.forEach(element => {
    if(min === undefined || element < min) {
      min = element;
    }
  });
  return min;
}
{% endcodeblock %}

We can represent `getMin` as a function of the size of the input `n` based on the number of operations it has to perform. For simplicity, let's assume that each line of code takes the same amount of time in the CPU to execute. Let's make the sum:

* Line 6: 1 operation
* Line 7: 1 operation
* Line 9-13: it is a loop that executes `n` times
  * Line 10: 1 operation
  * Line 11: this one is tricky. It is inside a conditional. We will assume the worst case where the array is sorted in descending order. The condition (`if` block) will be executed each time. Thus, one operation
* Line 14: 1 operation

All in all, we have `3` operations outside the loop and `2` inside the `forEach` block. Since the loop goes for the size of `n`, this leaves us with `2(n) + 3`.

However, this expression is somewhat too specific, and hard to compare algorithms with it. We are going to apply the **asymptotic analysis** to simplify this expression further.

### Asymptotic analysis

Asymptotic analysis is just evaluating functions as their value approximate to the infinite. In our previous example `2(n) + 3`, we can generalize it as `k(n) + c`. As the value of `n` grows, the value `c` is less and less significant, as you can see in the following table:

| n (size) | operations | result |
| - | - | - |
| 1 | 2(1) + 3 | 5 |
| 10 | 2(10) + 3 | 23 |
| 100 | 2(100) + 3 | 203 |
| 1,000 | 2(1,000) + 3 | 2,003 |
| 10,000 | 2(10,000) + 3 | 20,003 |

Believe it or not, the constant `k` wouldn't make too much of a difference. Using this kind of asymptotic analysis, we take the higher-order element, in this case: `n`.

Let's do another example so we can get this concept. Let's say we have the following function: \`3 n^2 + 2n + 20\`. What would be the result of using the asymptotic analysis?

> \`3 n^2 + 2n + 20\` as \`n\` grows bigger and bigger; the term that will make the most difference is \`n^2\`.

Going back to our example, `getMin`, we can say that this function has a time complexity of `n`. As you can see, we could approximate it as `2(n)` and drop the `+3` since it does not add too much value as \`n\` keep getting bigger.

We are interested in the big picture here, and we are going to use the asymptotic analysis to help us with that. With this framework, comparing algorithms is much more comfortable. We can compare running times with their most crucial term: \`n^2\` or \`n\` or \`2^n\`.

### Big-O notation and Growth rate of Functions

The Big O notation combines what we learned in the last two sections about **worst-case time complexity** and **asymptotic analysis**.

> The letter \`O\` refers to the **order** of a function.

The Big O notation is used to classify algorithms by their worst running time. Also known as the upper bound of the growth rate of a function.

In our previous example with `getMin` function, we can say it has a running time of `O(n)`. There are many different running times. Here are the most common that we are going to cover in the next post and their relationship with time:

Growth rates vs. `n` size:

<div class="table--responsive">

<table>
<thead>
<tr>
<th>n</th>
<th>O(1)</th>
<th>O(log n)</th>
<th>O(n)</th>
<th>O(n log n)</th>
<th>O(n<sup>2</sup>)</th>
<th>O(2<sup>n</sup>)</th>
<th>O(n!)</th>
</tr>
</thead>
<tbody>
<tr>
<td>1</td>
<td class="green">&lt; 1 sec</td>
<td class="green">&lt; 1 sec</td>
<td class="green">&lt; 1 sec</td>
<td class="green">&lt; 1 sec</td>
<td class="green">&lt; 1 sec</td>
<td class="green">&lt; 1 sec</td>
<td class="green">&lt; 1 sec</td>
</tr>
<tr>
<td>10</td>
<td class="green">&lt; 1 sec</td>
<td class="green">&lt; 1 sec</td>
<td class="green">&lt; 1 sec</td>
<td class="green">&lt; 1 sec</td>
<td class="green">&lt; 1 sec</td>
<td class="green">&lt; 1 sec</td>
<td class="orange">4 sec</td>
</tr>
<tr>
<td>100</td>
<td class="green">&lt; 1 sec</td>
<td class="green">&lt; 1 sec</td>
<td class="green">&lt; 1 sec</td>
<td class="green">&lt; 1 sec</td>
<td class="green">&lt; 1 sec</td>
<td class="red">40170 trillion years</td>
<td class="red">&gt; vigintillion years</td>
</tr>
<tr>
<td>1,000</td>
<td class="green">&lt; 1 sec</td>
<td class="green">&lt; 1 sec</td>
<td class="green">&lt; 1 sec</td>
<td class="green">&lt; 1 sec</td>
<td class="green">&lt; 1 sec</td>
<td class="red">&gt; vigintillion years</td>
<td class="red">&gt; centillion years</td>
</tr>
<tr>
<td>10,000</td>
<td class="green">&lt; 1 sec</td>
<td class="green">&lt; 1 sec</td>
<td class="green">&lt; 1 sec</td>
<td class="green">&lt; 1 sec</td>
<td class="orange">2 min</td>
<td class="red">&gt; centillion years</td>
<td class="red">&gt; centillion years</td>
</tr>
<tr>
<td>100,000</td>
<td class="green">&lt; 1 sec</td>
<td class="green">&lt; 1 sec</td>
<td class="green">&lt; 1 sec</td>
<td class="orange">1 sec</td>
<td class="orange">3 hours</td>
<td class="red">&gt; centillion years</td>
<td class="red">&gt; centillion years</td>
</tr>
<tr>
<td>1,000,000</td>
<td class="green">&lt; 1 sec</td>
<td class="green">&lt; 1 sec</td>
<td class="orange">1 sec</td>
<td class="orange">20 sec</td>
<td class="orange">12 days</td>
<td class="red">&gt; centillion years</td>
<td class="red">&gt; centillion years</td>
</tr>
</tbody>
</table>

</div>

<figcaption class="figcaption">Assuming: 1 GHz CPU and that it can execute on average one instruction in 1 nanosecond (usually takes more time). Also, bear in mind that each line might be translated into dozens of CPU instructions depending on the programming language</figcaption>

As you can see, some algorithms are very time-consuming. It is impossible to compute an input size as little as 100 even if we had a supercomputer!! Hardware does not scale as well as software.

In the next post, we will explore all of these time complexities with a code example or two!
Are you ready to become a super programmer and scale your code?! <img src="/images/superman_shield.svg" width="25" height="25" alt="superman shield" style="display:inline-block;">

**Continue with the next part 👉** [Eight running times that every programmer should know](/blog/2018/04/05/most-popular-algorithms-time-complexity-every-programmer-should-know-free-online-tutorial-course/)


<!--

Improvement ideas:

- https://www.reddit.com/r/compsci/comments/8elqsc/algorithms_tutorial_series_for_beginners/dxwb2n6/
Overall a good introduction. You could go into a bit more detail about why the constant is ignored. Perhaps a plot of a few linear functions next to a quadratic one illustrates that for different values of all the linear functions are the same compared to the quadratic function.
I like your table of runtimes. It gives a proper perspective about why this matters :)

https://news.ycombinator.com/item?id=16941645

Titles:
23 Algorithms tutorial series for beginners - https://www.reddit.com/r/compsci/comments/8elqsc/algorithms_tutorial_series_for_beginners/
0 How you can change the world by learning Data Structures and Algorithms -


-->
