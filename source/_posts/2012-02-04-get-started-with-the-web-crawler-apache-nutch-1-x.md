---
layout: post
title: "Get Started with the web crawler Apache Nutch 1.x "
created: 1328337152000
updated: 1328337152000
comments: true
toc: true
pageviews__total: 9177
pageviews__recent: 71
pageviews__avg_time: 825
# categories: [how-to, apache, nutch, search engines, web crawlers]
photos:
  - /images/apache_nutch_web_crawler_small.png
  - /images/apache_nutch_web_crawler_large.png
photos__background_color: '#E08300'
tutorial__order: 0
tags:
  - web crawlers
categories:
  - Technologies
---
<p>Apache Nutch is an open source <strong>scalable</strong> Web crawler written in Java and based on Lucene/Solr for the indexing and search part.&nbsp;It has a highly modular architecture, allowing developers to create plug-ins for media-type parsing, data retrieval, querying and clustering. [<a href="http://en.wikipedia.org/wiki/Nutch">*</a>]</p>
<!--More-->

# Motivation

<div>
	By using Nutch, we can find web page hyperlinks in an automated manner, reduce lots of maintenance work, for example checking broken links, and create a copy of all the visited pages for searching over. That&rsquo;s where Apache Solr comes in. Solr is an open source full text search framework, with Solr we can search the visited pages from Nutch. Luckily, integration between Nutch and Solr is pretty straightforward.</div>
<div>
	&nbsp;</div>
<div>
	Whole-web crawling is designed to handle very large crawls which may take weeks to complete, running on multiple machines. This also permits more control over the crawl process, and incremental crawling. It is important to note that whole web crawling does not necessarily mean crawling the entire world wide web. We can limit a whole web crawl to just a list of the URLs we want to crawl. This is done by using a filter just like we the one we used when we did the crawl command. [<a href="http://wiki.apache.org/nutch/NutchTutorial">*</a>]</div>
<div>
	&nbsp;</div>
<div>
	Some of the advantages of Nutch, when compared to a simple Fetcher</div>
<ul>
	<li>
		highly scalable and relatively feature rich crawler</li>
	<li>
		features like politeness which obeys robots.txt rules</li>
	<li>
		robust and scalable - you can run Nutch on a cluster of 100 machines</li>
	<li>
		quality - you can bias the crawling to fetch &ldquo;important&rdquo; pages first</li>
</ul>

## Basics about Nutch

First you need to know that, Nutch data is composed of:

*   The crawl database, or **crawldb**. This contains information about every url known to Nutch, including whether it was fetched, and, if so, when.
*   The link database, or **linkdb**. This contains the list of known links to each url, including both the source url and anchor text of the link.
*   A set of **segments**. Each segment is a set of urls that are fetched as a unit. Segments are directories with the following subdirectories:

1.  **crawl_generate** names a set of urls to be fetche
2.  **crawl_fetch** contains the status of fetching each url
3.  **content** contains the raw content retrieved from each url
4.  **parse_text** contains the parsed text of each url
5.  **parse_data** contains outlinks and metadata parsed from each url
6.  **crawl_parse** contains the outlink urls, used to update the crawldb


## Nutch and Hadoop

As of the official Nutch 1.3 release the source code architecture has been greatly simplified to allow us to run Nutch in one of two modes; namely local and deploy. By default, Nutch no longer comes with a Hadoop distribution, however when run in local mode e.g. running Nutch in a single process on one machine, then we use Hadoop as a dependency. This may suit you fine if you have a small site to crawl and index, but most people choose Nutch because of its capability to run on in deploy mode, within a Hadoop cluster. This gives you the benefit of a distributed file system (HDFS) and MapReduce processing style. &nbsp;If you are interested in deployed mode <a href="http://wiki.apache.org/nutch/NutchHadoopTutorial" target="_blank">read here</a>.


# Getting hands dirt with Nutch

## Setup Nutch from binary distribution

<ol>
	<li>
		Unzip your binary Nutch package to $HOME/nutch-1.3</li>
	<li>
		cd $HOME/nutch-1.3/runtime/local</li>
	<li>
		From now on, we are going to use ${NUTCH_RUNTIME_HOME} to refer to the current directory.</li>
</ol>
<div>
	&nbsp;</div>
<div>

## Verify your Nutch installation

<ol>
	<li>
		run &quot;bin/nutch&quot;</li>
	<li>
		You can confirm a correct installation if you seeing the following: &nbsp;Usage: nutch [-core] COMMAND</li>
</ol>
<div>
	<u>Some troubleshooting tips:</u></div>
<div>
	Run the following command if you are seeing &quot;Permission denied&quot;:</div>
<div>
	chmod +x bin/nutch</div>
<div>
	Setup JAVA_HOME if you are seeing JAVA_HOME not set. On Mac, you can run the following command or add it to ~/.bashrc:</div>
<div>
	export JAVA_HOME=/System/Library/Frameworks/JavaVM.framework/Versions/1.6/Home #mac</div>
<div>
	Ubuntu:</div>
<div>
	export JAVA_HOME=/usr/lib/jvm/java-1.6.0-openjdk&nbsp;</div>
<div>
	export NUTCH_HOME=/var/www/nutch-1.3/runtime/local</div>
<div>
	&nbsp;</div>
<div>
	<u>Example of using Nutch to crawl wikipedia pages:</u></div>
<div>
	Here we are try to crawl&nbsp;<span class="s2"><a href="http://en.wikipedia.org/wiki/Collective_intelligence">http://en.wikipedia.org/wiki/Collective_intelligence</a>&nbsp;and sublinks in the same domain.</span></div>
<ol class="ol1">
	<li class="li1">
		$ cd NUTCH_HOME/runtime/local</li>
	<li class="li2">
		<span class="s1">$ echo &quot;<a href="http://en.wikipedia.org/wiki/Collective_intelligence"><span class="s2">http://en.wikipedia.org/wiki/Collective_intelligence</span></a>&quot; &gt; urls</span></li>
	<li class="li1">
		add: `+^http://([a-z0-9]*\.)*wikipedia.org/` in&nbsp;conf/regex-urlfilter.txt</li>
	<li class="li1">
		$ bin/nutch crawl urls -dir crawl-wiki-ci -depth 2</li>
	<li class="li1">
		<b>statistics associated with the crawldb</b>
		<ol class="ol1">
			<li class="li1">
				$ nutch readdb crawl-wiki-ci/crawldb/ -stats
				<ol class="ol1">
					<li class="li1">
						CrawlDb statistics start: crawl-wiki-ci/crawldb/Statistics for CrawlDb: crawl-wiki-ci/crawldb/<br />
						TOTAL urls:&nbsp;&nbsp;&nbsp;&nbsp; 2727<br />
						retry 0:&nbsp;&nbsp;&nbsp;&nbsp; 2727<br />
						min score:&nbsp;&nbsp;&nbsp;&nbsp; 0.0<br />
						avg score:&nbsp;&nbsp;&nbsp;&nbsp; 8.107811E-4<br />
						max score:&nbsp;&nbsp;&nbsp;&nbsp; 1.341<br />
						status 1 (db_unfetched):&nbsp;&nbsp;&nbsp;&nbsp; 2665<br />
						status 2 (db_fetched):&nbsp;&nbsp;&nbsp;&nbsp; 61<br />
						status 3 (db_gone):&nbsp;&nbsp;&nbsp;&nbsp; 1<br />
						CrawlDb statistics: done</li>
				</ol>
			</li>
		</ol>
	</li>
	<li class="li1">
		<b>Dump of the URLs from the crawldb</b>
		<ol class="ol1">
			<li class="li1">
				$ nutch readdb crawl-wiki-ci/crawldb/ -dump crawl-wiki-ci/stats
				<ol class="ol1">
					<li class="li1">
						<span class="s3"><a href="http://en.wikipedia.org/wiki/Special:RecentChangesLinked/MIT_Center_for_Collective_Intelligence"><span class="s2">http://en.wikipedia.org/wiki/Special:RecentChangesLinked/MIT_Center_for_Collective_Intelligence</span></a></span>&nbsp;&nbsp;&nbsp;&nbsp; Version: 7Status: 1 (db_unfetched)<br />
						Fetch time: Sat Feb 04 00:50:50 EST 2012<br />
						Modified time: Wed Dec 31 19:00:00 EST 1969<br />
						Retries since fetch: 0<br />
						Retry interval: 2592000 seconds (30 days)<br />
						Score: 1.9607843E-4<br />
						Signature: null<br />
						Metadata:<br />
						&hellip;.&nbsp;</li>
				</ol>
			</li>
		</ol>
	</li>
	<li class="li1">
		<b>Top 10 highest rate links</b>
		<ol class="ol1">
			<li class="li1">
				$ nutch readdb crawl-wiki-ci/crawldb/ -topN 10 crawl-wiki-ci/stats/top10/
				<ol class="ol1">
					<li class="li2">
						<span class="s1">1.3416613&nbsp;&nbsp;&nbsp;&nbsp; <a href="http://en.wikipedia.org/wiki/Collective_intelligence"><span class="s2">http://en.wikipedia.org/wiki/Collective_intelligence</span></a>0.030499997&nbsp;&nbsp;&nbsp;&nbsp; <a href="http://en.wikipedia.org/wiki/Howard_Bloom"><span class="s2">http://en.wikipedia.org/wiki/Howard_Bloom</span></a><br />
						0.02763889&nbsp;&nbsp;&nbsp;&nbsp; <a href="http://en.wikipedia.org/wiki/Groupthink"><span class="s2">http://en.wikipedia.org/wiki/Groupthink</span></a><br />
						0.02591739&nbsp;&nbsp;&nbsp;&nbsp; <a href="http://en.wikipedia.org/wiki/Wikipedia"><span class="s2">http://en.wikipedia.org/wiki/Wikipedia</span></a><br />
						0.024347823&nbsp;&nbsp;&nbsp;&nbsp; <a href="http://en.wikipedia.org/wiki/Pierre_L%C3%A9vy_(philosopher)"><span class="s2">http://en.wikipedia.org/wiki/Pierre_L%C3%A9vy_(philosopher)</span></a><br />
						0.023733648&nbsp;&nbsp;&nbsp;&nbsp; <a href="http://en.wikipedia.org/wiki/Wikipedia:Citation_needed"><span class="s2">http://en.wikipedia.org/wiki/Wikipedia:Citation_needed</span></a><br />
						0.017142152&nbsp;&nbsp;&nbsp;&nbsp; <a href="http://en.wikipedia.org/w/opensearch_desc.php"><span class="s2">http://en.wikipedia.org/w/opensearch_desc.php</span></a><br />
						0.016599996&nbsp;&nbsp;&nbsp;&nbsp; <a href="http://en.wikipedia.org/wiki/Artificial_intelligence"><span class="s2">http://en.wikipedia.org/wiki/Artificial_intelligence</span></a><br />
						0.016499996&nbsp;&nbsp;&nbsp;&nbsp; <a href="http://en.wikipedia.org/wiki/Consensus_decision_making"><span class="s2">http://en.wikipedia.org/wiki/Consensus_decision_making</span></a><br />
						0.015199998&nbsp;&nbsp;&nbsp;&nbsp; <a href="http://en.wikipedia.org/wiki/Group_selection"><span class="s2">http://en.wikipedia.org/wiki/Group_selection</span></a></span></li>
				</ol>
			</li>
		</ol>
	</li>
	<li class="li1">
		<b>Dump of a Nutch segment</b>
		<ol class="ol1">
			<li class="li1">
				$ nutch readseg -dump crawl-wiki-ci/segments/20120204004509/ crawl-wiki-ci/stats/segments
				<ol class="ol1">
					<li class="li1">
						CrawlDatum::Version: 7<br />
						Status: 1 (db_unfetched)<br />
						Fetch time: Sat Feb 04 00:45:03 EST 2012<br />
						Modified time: Wed Dec 31 19:00:00 EST 1969<br />
						Retries since fetch: 0<br />
						Retry interval: 2592000 seconds (30 days)<br />
						Score: 1.0<br />
						Signature: null<br />
						Metadata: _ngt_: 1328334307529</li>
					<li class="li1">
						<br />
						Content::<br />
						Version: -1<br />
						url: <a href="http://en.wikipedia.org/wiki/Collective_intelligence"><span class="s4">http://en.wikipedia.org/wiki/Collective_intelligence</span></a><br />
						base: <a href="http://en.wikipedia.org/wiki/Collective_intelligence"><span class="s4">http://en.wikipedia.org/wiki/Collective_intelligence</span></a><br />
						contentType: application/xhtml+xml<br />
						metadata: Content-Language=en Age=52614 Content-Length=29341 Last-Modified=Sat, 28 Jan 2012 17:27:22 GMT _fst_=33 nutch.segment.name=20120204004509 Connection=close X-Cache-Lookup=MISS from <a href="http://sq72.wikimedia.org/"><span class="s4">sq72.wikimedia.org:80</span></a> Server=Apache X-Cache=MISS from <a href="http://sq72.wikimedia.org/"><span class="s4">sq72.wikimedia.org</span></a> X-Content-Type-Options=nosniff Cache-Control=private, s-maxage=0, max-age=0, must-revalidate Vary=Accept-Encoding,Cookie Date=Fri, 03 Feb 2012 15:08:18 GMT Content-Encoding=gzip nutch.crawl.score=1.0 Content-Type=text/html; charset=UTF-8<br />
						Content:<br />
						&lt;!DOCTYPE html PUBLIC &quot;-//W3C//DTD XHTML 1.0 Transitional//EN&quot; &quot;<a href="http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><span class="s4">http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd</span></a>&quot;&gt;<br />
						&lt;html lang=&quot;en&quot; dir=&quot;ltr&quot; class=&quot;client-nojs&quot; xmlns=&quot;<a href="http://www.w3.org/1999/xhtml"><span class="s4">http://www.w3.org/1999/xhtml</span></a>&quot;&gt;<br />
						&lt;head&gt;<br />
						&lt;title&gt;Collective intelligence - Wikipedia, the free encyclopedia&lt;/title&gt;<br />
						&lt;meta &hellip;.<b>&nbsp;</b></li>
				</ol>
			</li>
		</ol>
	</li>
</ol>
<p class="li1">&nbsp;</p>
<p class="li1"><b>References:</b></p>
<ul>
	<li class="li1">
		http://wiki.apache.org/nutch/NutchTutorial</li>
	<li class="li1">
		http://en.wikipedia.org/wiki/Nutch</li>
</ul>
