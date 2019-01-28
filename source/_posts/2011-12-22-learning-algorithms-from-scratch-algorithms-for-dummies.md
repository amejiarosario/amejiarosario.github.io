---
layout: post
title: Learning Algorithms from Scratch / Algorithms for Dummies
created: 1324582027000
updated: 1324582027000
comments: true
pageviews__total: 42678
pageviews__recent: 37
pageviews__avg_time: 387
tutorial__order: 0
tags:
  - big-o notation
  - algorithms
categories:
  - Programming
  - Data Structures and Algorithms (DSA)
---

<p>When you are programming you face challenges all the way. Getting the problems solved is just the tip of the iceberg, getting it done efficiently is the rest.</p>

<!--More-->
<hr>
**Update**

Graphs are gone in this post. I re-made this post and added more information and images. Checkout it out clicking here: <a href="/blog/2018/04/04/how-you-can-change-the-world-learning-data-structures-algorithms-free-online-course-tutorial/">Data Structures and Algorithms (DSA) for Beginners</a>
<hr>

<p class="p1"><b>Why should you care for efficiency?</b></p>
<p class="p1">Solutions to the same problem might take years with certain algorithm, and just minutes using efficient algorithms. For instance, if you have applications that are used for thousands of people over internet, every fraction of second counts. Therefore, efficient algorithms is a must.</p>
<p class="p1"><b>How I do my algorithms more efficient?</b></p>
<p class="p1">To improve something you first need to know the actual state. In this case you need to measure the actual effectiveness of your algorithm in other to improve it. It&#39;s very common to use running time analysis to measure the speed of algorithms independently from the hardware used (old pc, supercomputer it doesn&#39;t matter).&nbsp;</p>
<p class="p1"><b>Run-time analysis</b></p>
<p class="p1">A common way to analyze the algorithms is using the big-O notation. The good thing about this notation is that is independent from the computer used to run the algorithm. You know that if you use a very slow computer (e.g. pentium I) v.s. a supercomputer use in NASA, the latter will run the program much faster. Big-O notation abstract the hardware and just focus in the algorithm per se. The only variable in the big-O notation gives the relative time needed to process an algorithm in function of the input n. Let&#39;s clarify this with an example.</p>
<p class="p1"><strong>Ex.1</strong> - You want to sort an array A of n integers.&nbsp;</p>
<p class="p1">Depending in the algorithm used to do that you may have:</p>
<ul>
	<li class="p1">
		<b>selection</b> sort has a running time of O(n^2);</li>
	<li class="p1">
		<b>merge sort</b> --&gt; O(n log n)</li>
</ul>
<p class="p1">Right now, it doesn&#39;t matter if are not familiar with these algorithms (we will cover this the next lessons), the point here is that we have n integer and big-O notations give us a mathematical expression that is in function of the input n. If you&nbsp;<a href="http://fooplot.com/index.php?&amp;type0=0&amp;type1=0&amp;type2=0&amp;type3=0&amp;type4=0&amp;y0=x%5E2&amp;y1=x*log%28x%29&amp;y2=&amp;y3=&amp;y4=&amp;r0=&amp;r1=&amp;r2=&amp;r3=&amp;r4=&amp;px0=&amp;px1=&amp;px2=&amp;px3=&amp;px4=&amp;py0=&amp;py1=&amp;py2=&amp;py3=&amp;py4=&amp;smin0=0&amp;smin1=0&amp;smin2=0&amp;smin3=0&amp;smin4=0&amp;smax0=2pi&amp;smax1=2pi&amp;smax2=2pi&amp;smax3=2pi&amp;smax4=2pi&amp;thetamin0=0&amp;thetamin1=0&amp;thetamin2=0&amp;thetamin3=0&amp;thetamin4=0&amp;thetamax0=2pi&amp;thetamax1=2pi&amp;thetamax2=2pi&amp;thetamax3=2pi&amp;thetamax4=2pi&amp;ipw=0&amp;ixmin=-5&amp;ixmax=5&amp;iymin=-3&amp;iymax=3&amp;igx=1&amp;igy=1&amp;igl=1&amp;igs=0&amp;iax=1&amp;ila=1&amp;xmin=-5&amp;xmax=5&amp;ymin=-3&amp;ymax=3"><span class="s1">plot in a graph n^2 and n log n</span></a>. You&#39;ll see that n^2 grows much faster than n log(n). That means that the algorithm n^2 will take longer than n*log(n) to process as the size of the array n increases.</p>
<p class="p1"><b>Common order of Growth</b></p>
<p class="p1">To give you an idea of the common order of growth of runtime expressions. Take a look at the following graph and table. The slower the function growth the better is the algorithm. In order from better performance to worst is:</p>
<p class="p1">1 -- log n -- n -- n log n -- n^2 -- n^3 -- 2^n -- n! ...</p>
<p class="p2">


<!-- <img alt="" src="http://adrianmejiarosario.com/sites/default/files/Screen%20Shot%202011-12-22%20at%203.22.12%20PM.png"  /> -->


</p>
<p class="p2">


<!-- <img alt="" src="http://adrianmejiarosario.com/sites/default/files/Screen%20Shot%202011-12-22%20at%203.23.45%20PM.png"  /> -->


</p>
<p class="p1"><b>Approximate growth rate from code.</b></p>
<p class="p1">There are a whole theory and math behind the Big-O notation and other notations related. At this time, just take a look of the typical code and its growth order.</p>
<p class="p1">


<!-- <img alt="" src="http://adrianmejiarosario.com/sites/default/files/Screen%20Shot%202011-12-22%20at%204.51.48%20PM.png"  /> -->


</p>
<p><strong>Cases (the good, the bad, and the ugly)</strong></p>
<p>Remember that n is the number of elements in the input. All this runtime growth rate are in function of the input elements. There is another important thing to consider about the input elements: the order! The order of the input elements matters, and that&#39;s why algorithms are analyzed in 3 different cases:</p>
<ol>
	<li>
		Worst-case performance: the input is distributed as worst as it could be for an algorithm. &nbsp;&nbsp;</li>
	<li>
		Average-case scenario: approximation of the most common arrange of inputs.</li>
	<li>
		Best-case scenario: most favorable distribution of the inputs.</li>
	<li>
		One more: Space. this is how much space the algorithm cosume to execute.&nbsp;</li>
</ol>
<p class="p2">If you want more depth in these topic read here:&nbsp;</p>
<ul>
	<li class="p2">
		<span >Analysis (</span><a href="http://gcu.googlecode.com/files/02Analysis.pdf" >pdf</a><span >) (</span><a href="http://gcu.googlecode.com/files/02Analysis.key.zip" >keynote</a><span >)</span></li>
	<li class="p2">
		<span >Algorithm @&nbsp;</span>ocw.mit.edu: lectures <a href="http://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-046j-introduction-to-algorithms-sma-5503-fall-2005/video-lectures/lecture-1-administrivia-introduction-analysis-of-algorithms-insertion-sort-mergesort">1 </a>and <a href="http://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-046j-introduction-to-algorithms-sma-5503-fall-2005/video-lectures/lecture-2-asymptotic-notation-recurrences-substitution-master-method">2</a></li>
	<li class="p2">
		http://algs4.cs.princeton.edu/home/</li>
</ul>
<p class="p2">&nbsp;</p>
