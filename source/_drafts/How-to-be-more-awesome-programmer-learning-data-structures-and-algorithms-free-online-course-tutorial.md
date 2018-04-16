---
layout: draft
title: >-
  How you can change the world by learning Data Structures and Algorithms
comments: true
toc: true
pageviews__total: 0
pageviews__recent: 0
pageviews__avg_time: 0
tutorial__order: 0
tags:
  - big-o notation
  - algorithms
categories:
  - Programming
  - Data Structures and Algorithms (DSA)
date: 2018-04-04 16:16:07
---

As a developer you have the power to change the world! You can write programs that enables new technologies. You might work in software to find earlier disease diagnosis. Or write programs to make people's life easier and save them time. Whatever you do it has an impact either directly or indirectly for people around you.

Yet, these accomplishment are only possible if we write code that is optimized and can scale for such needs. That made the difference between companies like Google and "Alta Vista". Let's see one more example.

# Why should you learn Data Structures and Algorithms (DSA)?

In the War World II, the Germans were attacking England and many other countries. The Nazi's troops used AM signals to communicate with troops on other countries. Anybody with a AM radio and some knowledge of Morse code could intercept the message. But, the message was encoded! So, it will seem like rubbish until the message is decoded. All attacked countries tried to decoded with large team of mathematicians. Sometimes they got lucky and were able to make sense of a couple of messages at the end of the day. But also, the Germans changed the encoding setup every single day!

Alan Turing was working for the British military as a mathematician. He knew that army will never get ahead if they keep doing the calculations by pen and paper. It will be more far more efficient to develop a machine that can do all the decoding. After many months of hard work, they finished the machine. Yet, there was one problem: it took more than a day to decode a message. The machine way useless if they cannot make it compute faster.

Alan and his team found out that every encrypted message ended with the same string: “Hail Hitler”. Aha! They changed the algorithms. Instead of decoding the whole message, they decode the last two words. This new algorithm to decode the Nazi’s messages saved millions of lives during the war!

> The same machine that was going to get shut down as a failure, became a live saver by changing the way it processed things. Likewise, you can do way more with your computing resources when you write efficient code.

That's what we are going to learn in this course.

So, why should you learn to write efficient algorithms?
* Crush interview questions and land the tech job of your dreams.
* You would become a much better developer.
* Spend less time debugging, optimizing and re-writing code.
* Your code will run faster with the same hardware.
* Your code might be use to aid a discovery that save millions of lives

Without further ado, Let’s save the world!

# What are algorithms?

Algorithms are steps of how to do some task. When you cook, you follow a recipe (or algorithms) to prepare a dish. If you play a game, you are devising strategies (or algorithms) to help you win. Likewise, algorithms in computers are a set of instructions used to solve a problem. There are "good" algorithms and "bad" algorithms. The good ones are fast, the bad ones are slow. Slow algorithms cost more money and make some calculations impossible in our lifespan!

We are going to explore the basic concepts of algorithms. Also, we are going learn how to distinguish “fast” algorithms from “slow” ones. Or even better, you will be able to “measure” the performance of your own algorithms and improve them!

# How to improve your coding skills?

The first step to improve something is to measure it...

{% blockquote H. James Harrington %}
Measurement is the first step that leads to control and eventually to improvement. If you can’t measure something, you can’t understand it. If you can’t understand it, you can’t control it. If you can’t control it, you can’t improve it.
{% endblockquote %}

But, how do you do that with code? Would you time "how long" it takes to run? What if you are running the same program on a mobile or in a quantum computer? The same code will give you different results, right?

To answer these questions we need to nail some concepts first, like time complexity!

## Time complexity

Time complexity (or running time) is the estimated time taken by running an algorithms. However, it's not mesure in fractions of seconds but it is estimated by counting the number of elementary operations performed by a function or program. The real time the program takes to execute and the time complexity will be corelated by a constant factor under the following assumptions:

* The elementary operation takes a fixed amount of time to performed.
* The CPU is only executing the program in question (as other programs/OS might defer CPU resources and change the time taken).

So, recaping, the time complexity is not about timing how long the algorithm takes to complete but rather how many instructions it will execute given an input. The running time of an algorithm depends on the size of the input and how the input elements are arranged.

For instance, if we are sorting numbers and the elements are already sorted some algorithms won't perform as operations many operations as if they were unsorted. For each algorithm we can have the following running times:

* Worst-case time complexity
* Best-case time complexity
* Average-case time complexity

We usually care more about the **worst-case time complexity**, since we are hoping for the best but preparing for the worst.

Let's do an example of how you can calculate the time complexity. Let's say we have this function to get the smallest numbre from an array:

{% codeblock lang:js mark:6-7,10-11,15 %}
/**
 * Get the smallest number on an array of numbers
 * @param {Array} n array of numbers
 */
function getMin(n) {
  const array = Array.from(n);
  let min;

  array.forEach(element => {
    if(!min || element < min) {
      min = element;
    }
  });

  return min;
}

// average case: random order
console.log(getMin([9,20,4,21,49,39]));
// => 4

// best case: sorted array
console.log(getMin([4, 9, 20, 21, 39, 49]));
// => 4

// worst case: reversed sorted array
console.log(getMin([49, 39, 21, 20, 9, 4]));
// => 4

{% endcodeblock %}

We can represent `getMin` as a function of the size of the input `n` based on the number of operations it has to perform. For simplicity, let's assume that each line of code takes the same amount of time in the CPU. Let's make the sum:

* Line 6: 1 operation
* Line 7: 1 operation
* Line 9-13: it's a loop that executes size of `n` times
* Line 10: 1 operation
* Line 11: this one it's tricky since it is inside a conditional. Let's assume the worst case where the array is on ascending order so the condition is met each time. Thus, 1 operation
* Line 15: 1 operation

All in all, we have 3 opertions outside the loop and 2 operation inside the loop. Since the loop goes for the size of `n`, this leave us with `2(n) + 3`. But, this expression is rather too especific and hard to compare algorithms with it. We are going to apply the asymptotic analysis to simplify this expression further.


## Asymptotic analysis

Asymptotic analysis is just evaluating functions as their value approximate to the infinite. In our previous example `2(n) + 3`, we can generalize it as `k(n) + c`. As the value of `n` grows, the value `c` is less and less significant, as you can see in the following table:

| n (size) | operations | result |
| - | - | - |
| 1 | 2(1) + 3 | 5 |
| 10 | 2(10) + 3 | 23 |
| 100 | 2(100) + 3 | 203 |
| 1,000 | 2(1,000) + 3 | 2,003 |
| 10,000 | 2(10,000) + 3 | 20,003 |

Belive it or not also `k` wouldn't make too much of a difference. Using this kind of asymptotic anylisis we just take the higher order element, in this case `n`.

Let's do another example, so we can make this concept clearer. Let's say we have the following function: `3 n^2 + 2n + 20`. What would be the end result using the asymptotic anaylis?

> `3 n^2 + 2n + 20` as n grows bigger and bigger, the expression will become more like `n^2`.


Going back to our example with `getMin`. We can say that function has a time complexity of `n`. As you can see, we could approximate it as `2(n)` and drop the `+3` since it doesn't add too much value as n keep getting bigger.

We are interested in the big picture here and we are going to use the asymptotic analysis to help use with that. With this framework, comparing algorithms it's much easier since we can just compare them by their most significan term: `n^2` or `n` or `2^n`


## Big-O notation and Growth rate of Functions

The Big O notation combines what we learned in the previous sections about **worst-case time complexity** and **asymtotic analysis**.

> The letter `O` referes to the **order** of a function or the growth rate of a function.

The Big O notation is used to classify algorithms by their worst running time or also refered as the upper bound of the growth rate of a function.

In our previous example with `getMin` function we can say it has a running time of `O(n)`. There are many different running times. Let's see the most common running times that we are going to cover in the next post and their relationship with time:

Growth rates vs n size
<div style="overflow-x:auto;">

<table>
<thead>
<tr>
<th>n</th>
<th>O(1)</th>
<th>O(log n)</th>
<th>O(n)</th>
<th>O(n log n)</th>
<th>O(n^2)</th>
<th>O(2^n)</th>
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

<small>Assuming: 1 Ghz CPU and that it can execute on average one instruction in 1 nanosecond (usually takes more time). It also depends how the programming language gets translated into assymbly. This is just to give you an idea.</small>

As you can see some algorithms are very time consuming. Even with an input size as little as 100 it's imposible to compute even if we have a 1 million GHz (1 PHz) CPU. Hardware doesn't really scale as well as software.

In the next post, we are going to explore all of these time complexities with an code example or two! Are you ready to become a super programmer and scale your code?!
