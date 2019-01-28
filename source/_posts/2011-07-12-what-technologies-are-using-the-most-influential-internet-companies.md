---
layout: post
title: What technologies are using the most influential Internet companies?
created: 1310520950000
updated: 1310520950000
comments: true
pageviews__total: 261
pageviews__recent:  279
pageviews__avg_time: 111
tutorial__order: 0
tags:
  - startups
categories:
  - Technologies
---
<div>Google, Facebook, YouTube, Yahoo, Wikipedia, Hotmail (Windows Live), Twitter, LinkedIn, Amazon.com, WordPress.com, eBay, Bing... You may know probably all these companies; we use some on our daily basis. They bring services to around 2 billion people! And influence our lives everyday. The most influential Internet companies are in the search engine and social media category, so I will focus the analysis in these two. &nbsp;</div>
<div>&nbsp;</div>
<!--More-->
<div><u><strong>Search Engines</strong></u></div>
<ol>
	<li>
		<div>Google -&gt;&nbsp;<strong>1,000</strong>,000,000 = 1 billion unique visitors /month</div>
	</li>
	<li>
		<div>Yahoo! Sites -&gt;&nbsp;<strong>689</strong>,000,000 unique visitors /month</div>
	</li>
	<li>
		<div>Bing/Microsoft Sites -&gt;&nbsp;<strong>905</strong>,000,000 unique visitors /month</div>
	</li>
</ol>
<div>&nbsp;</div>
<div><u><strong>Social Media</strong></u></div>
<ol>
	<li>
		<div>Facebook: <strong>750</strong>,000,000+ users</div>
	</li>
	<li>
		<div>Twitter: <strong>200</strong>,000,000 users</div>
	</li>
	<li>
		<div>Gmail: <strong>193</strong>,000,000 users</div>
	</li>
	<li>
		<div>LinkedIn: <strong>100</strong>,000,000+ users</div>
	</li>
	<li>
		<div>Flickr: <strong>32</strong>,000,000 users</div>
	</li>
	<li>
		<div>Google+: unknown yet, but growing quickly!</div>
	</li>
</ol>
<div>&nbsp;</div>
<div>All these websites have something in common: huge amount of traffic! So, there technologies should scale, support high concurrency and easy to maintain. All these features are a good measure to know what programming language you should focus next. Learn from what is already working. All right! Now comes the interesting part! Let see what is happening behind the scenes!&nbsp;</div>
<div>&nbsp;</div>
<div><strong style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; border-top-width: 0px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-style: initial; border-color: initial; vertical-align: baseline; "><img alt="facebook logo" src="https://t1.gstatic.com/images?q=tbn:ANd9GcSsGcRk_O0ncOMinYTG4K1Lle--Ot4ShY4Oc1fDtw5pd_i6qxkoXg" style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; border-top-width: 0px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-style: initial; border-color: initial; vertical-align: baseline; cursor: default; width: 64px; height: 64px; "></strong></div>
<div><strong>Facebook &nbsp;</strong></div>
<div>Technologies used:</div>
<ul>
	<li>
		<div>PHP&nbsp;(main programming language)</div>
	</li>
	<li>
		<div>HipHop&nbsp;for PHP (translate PHP to C++)</div>
	</li>
	<li>
		<div>MySQL&nbsp;(database)</div>
	</li>
	<li>
		<div>Cassandra&nbsp;(distributed database management system)</div>
	</li>
	<li>
		<div>Memcached&nbsp;(distributed memory cache)</div>
	</li>
	<li>
		<div>Thrift&nbsp;(integration between many programming languages)</div>
	</li>
	<li>
		<div>Other languages: Java, Erlang, C++, …</div>
	</li>
	<li>
		<div>A lot of tweaks for optimization, custom extensions. For instance, they used modified a Linux distribution to optimized it for Memcached.</div>
	</li>
</ul>
<div>&nbsp;</div>
<div>Who else uses&nbsp;PHP&nbsp;as main language?&nbsp;</div>
<div>Facebook, Wikipedia, Digg, CMS, and many more…&nbsp;</div>
<div>Who else uses&nbsp;Memcached?&nbsp;</div>
<div>YouTube, Facebook, Twitter, Reddit, Zynga. CMS (Drupal, Joomla, WordPress)</div>
<div>&nbsp;</div>
<div><img alt="Twitter" src="https://t0.gstatic.com/images?q=tbn:ANd9GcQkxJl0nu584FrSblIknohzw0tAMtmGSSs9hAnxRS6kFOpzPYmvXQ" style="width: 64px; height: 64px; "></div>
<div><strong>Twitter</strong></div>
<div>Technologies used:</div>
<div>(Be aware that Twitter keeps changing their technologies as they scale. So the list will be kinda chronologically)</div>
<div>&nbsp;</div>
<ul>
	<li>
		<div>Ruby&nbsp;(initially 2006). Ruby on Rails for the web interface and an enhanced Ruby Enterprise Edition.</div>
	</li>
	<li>
		<div>Memcached&nbsp;(distributed memory cache)</div>
	</li>
	<li>
		<div>MySQL&nbsp;&nbsp;(database)</div>
	</li>
	<li>
		<div>Starling&nbsp;(2007-2008): lightweight persistent message queue server written in Ruby.</div>
	</li>
	<li>
		<div>Outages: (it’s not a technology, duh. But, gives an idea why they make some changes later) In 2007, Twitter had been down 2% (equivalent to 6 full days). Especially in big events.</div>
	</li>
	<li>
		<div>Scala&nbsp;(in 2009): is multi-paradigm object-oriented programming language. In April 2009, Twitter changes large portions of their backend from Ruby to Scala.</div>
	</li>
	<li>
		<div>Lucene&nbsp;(in 2011): for their real-time search engine they are change it from MySQL to Lucene.</div>
	</li>
	<li>
		<div>Java&nbsp;(In 2011): They are replacing Ruby on Rails for Java in their search infrastructure. They announce performance improvements in their search engine 3x and 10x throughput.</div>
	</li>
	<li>
		<div>What’s the next change? …Stay tune ;)</div>
	</li>
</ul>
<div>Who else use Scala?&nbsp;</div>
<div>Foursquare, Twitter, …&nbsp;</div>
<div>&nbsp;</div>
<div><img alt="Google Logo" src="https://t1.gstatic.com/images?q=tbn:ANd9GcTWsBtMltVQT9FqsL9zNTKIu-8-7uazpjrnb_6AWnsQ8p8xsbiRYQ" style="width: 64px; height: 62px; "></div>
<div><strong>Google</strong></div>
<div>It’s a mystery what they really use, but here are some hints:</div>
<ul>
	<li>
		<div>C++: for high-performance applications and search engine capabilities.</div>
	</li>
	<li>
		<div>They use a lot of&nbsp;Java&nbsp;and&nbsp;Python.</div>
	</li>
	<li>
		<div>Python: is an interpreted, general-purpose high-level programming language whose design philosophy emphasizes code readability (wikipedia).</div>
	</li>
	<li>
		<div>Big Table: is a compressed, high performance, and proprietary database system.</div>
	</li>
	<li>
		<div>Google File System: Google’s distributed file system to access data efficiently using large clusters.</div>
	</li>
	<li>
		<div>Google Closure Tools: JavaScript tool for rich web applications. It’s used in Gmail, Google Maps and Google Docs.</div>
	</li>
	<li>
		<div>Google Web Toolkit: &nbsp;used to create complex JavaScript front-end in Java. The Java code is “compiled” in JavaScript it’s the general idea.</div>
	</li>
	<li>
		<div>Ajax&nbsp;(Asynchronous JavaScript and XML). &nbsp;It’s used in Google Maps, Google.com and many other Google apps.</div>
	</li>
</ul>
<div>Who else use Python?&nbsp;</div>
<div>YouTube, BitTorrent client, Google, Yahoo, NASA… Used for Artificial Intelligence too…&nbsp;</div>
<div>&nbsp;</div>
<div>In a next post, I’ll continue with the other ones…</div>
