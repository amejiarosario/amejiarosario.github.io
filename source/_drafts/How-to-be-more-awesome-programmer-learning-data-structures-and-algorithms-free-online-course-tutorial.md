---
layout: draft
title: >-
  How to be more awesome programmer learning data structures and algorithms
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

Algorithms are steps of how to do some task. When you cook, you follow a recipe (or algorithms) to prepare a dish. If you play a game, you are devising strategies (or algorithms) to help you win. Likewise, algorithms in computers are a set of instructions used to solve a problem. There are "good" algorithms and "bad" algorithms. The good ones are fast, the bad ones are slow. Slow algorithms cost more money and make some calculations impossible in our lifespan!

We are going to explore the basic concepts of algorithms. Also, we are going learn how to distinguish “fast” algorithms from “slow” ones. Or even better, you will be able to “measure” the performance of your own algorithms and improve them!

# Why should you learn Data Structures and Algorithms (DSA)?

Optimized algorithms can save lives! For real, let me tell you a true story.

In the War World II, the Nazis were attacking England and many other countries. The German troops used AM signals to communicate with troops on other countries. Anybody with a AM radio and some knowledge of Morse code could intercept the message. But, the message was encoded! So, it will seem like rubbish until the message is decoded. All attacked countries tried to decoded with large team of mathematicians. Sometimes they got lucky and were able to make sense of a couple of messages at the end of the day. But also, the Germans changed the encoding setup every single day!

Alan Turing was working for the British military as a mathematician. He knew that army will never get ahead if they keep doing the calculations by pen and paper. It will be more far more efficient to develop a machine that can do all the decoding. After many months of hard work, they finished the machine. Yet, there was one problem: it took more than a day to decode a message. The machine way useless if they cannot make it compute faster.

Alan and his team found out that every encrypted message ended with the same string: “Hail Hitler”. Aha! They changed the algorithms. Instead of decoding the whole message, they decode the last two words. This new algorithm to decode the Nazi’s messages saved millions of lives during the war!

> The same machine that was going to get shut down as a failure, became a live saver by changing the way it processed things. Likewise, you can do way more with your computing resources when you write efficient code.

That's what we are going to learn in this course.

So, why should you learn to write efficient algorithms?
* Crush interview questions and land the tech job of your dreams.
* You would become a much better developer and get better jobs
* Spend less time debugging, optimizing and re-writing code
* Your code will run faster with the same hardware
* Your code might be use on medical fields and save millions of lives


Without further ado, Let’s save the world!

# How to improve your coding skills?

The first step to improve something is to measure it...

{% blockquote H. James Harrington %}
Measurement is the first step that leads to control and eventually to improvement. If you can’t measure something, you can’t understand it. If you can’t understand it, you can’t control it. If you can’t control it, you can’t improve it.
{% endblockquote %}

But, how do you do that with code? Would you time "how long" it takes to run? What if you are running the same program on a mobile or in a quantum computer? The same code will give you different results, right?

To answer these questions we need to nail some concepts first. We are going to represent programs as a function of the input. Let's say we have this function to get the smallest numbre from an array:

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

console.log(getMin([9,20,4,21,49,39]));
// => 4
{% endcodeblock %}

We can represent `getMin` as a function of the size of the input `n` based on the number of operations it has to perform. For simplicity let's assume that each line of code is 1 CPU instruction. Let's make the sum:

* Line 6: 1 operation
* Line 7: 1 operation
* Line 9-13: it's a loop that executes size of `n` times
* Line 10: 1 operation
* Line 11: this one it's tricky since it is inside a conditional. Let's assume the worst case where the array is on ascending order has to execute each time. Thus, 1 operation
* Line 15: 1 operation

All in all, we have 3 opertions outside the loop and 2 operation inside the loop, this leave us with `3 + 2(n)`. With that function we can predict the number of operations depending size of `n`:

| n (size) | operations | result |
| - | - | - |
| 1 | 3 + 2(1) | 5 |
| 10 | 3 + 2(10) | 23 |
| 100 | 3 + 2(100) | 203 |
| 1,000 | 3 + 2(1,000) | 2,003 |
| 10,000 | 3 + 2(10,000) | 20,003 |

As you can see, we could approximate it as `2(n)` and drop the `+3` since it doesn't add too much value as n keep getting bigger. We are interested in the big picture here. We can even go a little further and just take the higher order elment and drop all constants and live it with just `n`

We can say that the function `getMin` has a growth rate of `n`. This might look odd that we are droping constants but for large enough `n` it's a good enough approximation. In the next section let's explore what other growth rates can algorithms have.

## Growth of Functions
  Summary table: http://cooervo.github.io/Algorithms-DataStructures-BigONotation/
  http://www.cs.dartmouth.edu/~ac/Teach/CS19-Winter06/SlidesAndNotes/CLRS-3.1.pdf

  Algorithms can be represented as a function of their growth rate. In this section, we are going how this could translate to time.

| n (size) | 1 | log(n) | n |
| - | - | - |
| 1 | 3 + 2(1) | 5 |
| 10 | 3 + 2(10) | 23 |
| 100 | 3 + 2(100) | 203 |
| 1,000 | 3 + 2(1,000) | 2,003 |
| 10,000 | 3 + 2(10,000) | 20,003 |


  This table has the following assumptions:
  * A CPU executes one million instructions per seconds

##  Asymptotic analysis

Asymtotic analysis refers to functions with variables which values tend to go to the infinite.

Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam ea, quas ratione maxime culpa suscipit assumenda voluptates, porro rem in eligendi enim et, quae iusto reprehenderit nemo. Deserunt, hic voluptatum.

## Time complexity

Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit aspernatur suscipit perspiciatis atque expedita tempore eaque dicta, corporis odit iure cumque, maiores a voluptatem earum modi vero dolorem dolorum? Voluptas?

## Big-O notation
  * https://www.interviewcake.com/article/python/big-o-notation-time-and-space-complexity?collection=dsa
  * https://www.interviewcake.com/data-structures-and-algorithms-guide
  * Worst-case, Best-case performance