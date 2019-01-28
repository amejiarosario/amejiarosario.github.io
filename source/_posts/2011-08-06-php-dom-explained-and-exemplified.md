---
layout: post
title: "PHP DOM: explained and exemplified"
created: 1312663045000
updated: 1312663045000
comments: true
pageviews__total: 1687
pageviews__recent: 48
pageviews__avg_time: 411
tutorial__order: 0
tags:
  - php
categories:
  - Technologies
# categories: [php, dom, xml]
---
<p>This is guide to get started with PHP DOM or a quick reminder to those who have a little while since the last time they used it.&nbsp;The extended documentation is in&nbsp;<a href="http://www.php.net/manual/en/book.dom.php" onclick="window.open(this.href, '', 'resizable=no,status=no,location=no,toolbar=no,menubar=no,fullscreen=no,scrollbars=no,dependent=no'); return false;" style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; border-top-width: 0px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-style: initial; border-color: initial; vertical-align: baseline; color: rgb(0, 116, 189); text-decoration: none; ">PHP.net</a>, but it is quite long. Here you might found a quick reference to get started in no time.</p>
<!--More-->
<p>Purpose of the DOM (Docuement Object Model): It is a convention used to represent and manipulate objects in XML, XHTML and HTML documents. Parsing XML and HTML files is very useful. It allows to manipulate RSS Feeds, interact with APIs and web services through XML (e.g. Google Maps, Facebook and Twitter APIs, etc.), extract information from websites (web crawling) and more.&nbsp;</p>
<h2>Getting Started</h2>
<p>The DOM implementation in PHP have more than 15 classes! But don't get afraid, for most cases, you might just end up using these ones: DOMNode, DOMDocument, DOMNodeList and DOMElement. In the following UML class diagram of PHP's DOM&nbsp;you will see how these classes are related to each other and them the explanation of each one.</p>
<p>
<!-- <img alt="PHP DOM UML Class Diagram (lean)" src="http://www.adrianmejiarosario.com/sites/default/files/pictures/PHP_DOM__UML_%28lean%29_Class_Diagram.gif" style="width: 541px; height: 345px; "> -->
</p>
<div>Fig 1.&nbsp;&nbsp;PHP DOM: UML Class Diagram</div>
<div>&nbsp;</div>
<h3>Loading and Saving DOM Documents</h3>
<p><a href="http://www.php.net/manual/en/class.domdocument.php">DOMDocument</a>&nbsp;— The DOMDocument class which exteds from DOMNode. This class contains the XML (or HTML) elements and configurations. It has configurations attributes, such as format output, preserve white spaces, versions, etc.</p>
<p><u>DOMDocument must-know methods (part 1: load and save)</u></p>
<ul>
	<li><strong>Load</strong>: load XML (or HTML) documents. There are different types of loads (quite self-explanatories)
		<ul>
			<li>mixed&nbsp;<a href="http://us.php.net/manual/en/domdocument.load.php">DOMDocument::load</a>&nbsp;(&nbsp;string&nbsp;$filename&nbsp;)&nbsp;— Load XML from a file</li>
			<li>bool&nbsp;<a href="http://us.php.net/manual/en/domdocument.loadhtml.php">DOMDocument::loadHTML</a>&nbsp;(&nbsp;string&nbsp;$source&nbsp;)&nbsp;— Load HTML from a string</li>
			<li>bool&nbsp;<a href="http://us.php.net/manual/en/domdocument.loadhtmlfile.php">DOMDocument::loadHTMLFile</a>&nbsp;(&nbsp;string&nbsp;$filename&nbsp;)&nbsp;— Load HTML from a file</li>
			<li>mixed&nbsp;<a href="http://us.php.net/manual/en/domdocument.loadxml.php">DOMDocument::loadXML</a>&nbsp;(&nbsp;string&nbsp;$source&nbsp;)&nbsp;— Load XML from a string</li>
		</ul>
	</li>
	<li><strong>Save</strong>:&nbsp;it is used to present (screen or file) the whole DOM document.
		<ul>
			<li>int&nbsp;<a href="http://us.php.net/manual/en/domdocument.save.php">DOMDocument::save</a>&nbsp;(&nbsp;string&nbsp;$filename&nbsp;)&nbsp;— Dumps the internal XML tree back into a file</li>
			<li>string&nbsp;<a href="http://us.php.net/manual/en/domdocument.savehtml.php">DOMDocument::saveHTML</a>&nbsp;(&nbsp;)&nbsp;— Dumps the internal document into a string using HTML formatting</li>
			<li>int&nbsp;<a href="http://us.php.net/manual/en/domdocument.savehtmlfile.php">DOMDocument::saveHTMLFile</a>&nbsp;(&nbsp;string&nbsp;$filename&nbsp;)&nbsp;— Dumps the internal document into a file using HTML formatting</li>
			<li>string&nbsp;<a href="http://us.php.net/manual/en/domdocument.savexml.php">DOMDocument::saveXML</a>&nbsp;(&nbsp;)&nbsp;— Dumps the internal XML tree back into a string</li>
		</ul>
	</li>
</ul>
<p>&nbsp;Example using DOMDocument for loading and showing HTML:</p>
<div><code>&lt;?php</code></div>
<div><code>&nbsp; $dom = new DOMDocuement;</code></div>
<div><code>&nbsp; $dom-&gt;loadHTML('http://www.adrianmejiarosario.com'); &nbsp;// load website content to DOM&nbsp;</code></div>
<div><code>&nbsp; echo $dom-&gt;save(); &nbsp;// print to screen</code></div>
<div><code>?&gt;</code></div>
<div>&nbsp;</div>
<h3>Iterating through DOM Elements</h3>
<p>The first thing you need to do after loading the XML that you want to process, it's to select the data that you are intereted in. To search for you data you need to iterate through the DOM elements and you need to know what methods and objects are using in this process.</p>
<p><u>DOMDocument must-know methods (part 2: get data)</u></p>
<ul>
	<li>DOMElement&nbsp;<a href="http://us.php.net/manual/en/domdocument.getelementbyid.php">DOMDocument::getElementById</a>&nbsp;(&nbsp;string&nbsp;$elementId&nbsp;)&nbsp;— Searches for an element with a certain id.</li>
	<li>DOMNodeList&nbsp;<a href="http://us.php.net/manual/en/domdocument.getelementsbytagname.php">DOMDocument::getElementsByTagName</a>&nbsp;(&nbsp;string&nbsp;$elementName&nbsp;)— Searches for all elements with given tag name.</li>
</ul>
<div>&nbsp;</div>
<div>You may notice that the above methods returns DOMElement and DOMNodeList objects. Now we will explore the properties and attributes that you need to know in order to get the data.</div>
<div>&nbsp;</div>
<div><a href="http://www.php.net/manual/en/class.domnodelist.php">DOMNodeList</a>&nbsp;— class that contains DOMNodes collection.</div>
<div>&nbsp;</div>
<div><u style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; border-top-width: 0px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-style: initial; border-color: initial; vertical-align: baseline; text-decoration: underline; "><u style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; border-top-width: 0px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-style: initial; border-color: initial; vertical-align: baseline; text-decoration: underline; border-style: initial; border-color: initial; ">DOMNodeList must-know elements (part 3: get data from nodes collection)</u></u></div>
<div>&nbsp;</div>
<ul>
	<li><a href="http://us.php.net/manual/en/domnodelist.item.php">DOMNodelist::item</a>&nbsp;(&nbsp;int&nbsp;$index&nbsp;)&nbsp;— Retrieves a node specified by index</li>
	<li>int&nbsp;<a href="http://us.php.net/manual/en/class.domnodelist.php#domnodelist.props.length">$DOMNodeList-&gt;length</a>&nbsp;- Node list length</li>
</ul>
<div>&nbsp;</div>
<div><a href="http://www.php.net/manual/en/class.domelement.php" style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; border-top-width: 0px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-style: initial; border-color: initial; vertical-align: baseline; color: rgb(0, 116, 189); text-decoration: none; ">DOMElement</a>&nbsp;— class that extends DOMNode and add new methods but we don't need those for iterating through nodes.</div>
<div><a href="http://www.php.net/manual/en/class.domnode.php">DOMNode</a>&nbsp;— The DOMNode class is the pillar class and it is used by all others classes directly or indirectly by one of its children classes.</div>
<div>&nbsp;</div>
<div><u style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; border-top-width: 0px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-style: initial; border-color: initial; vertical-align: baseline; text-decoration: underline; border-style: initial; border-color: initial; "><u style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; border-top-width: 0px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-style: initial; border-color: initial; vertical-align: baseline; text-decoration: underline; border-style: initial; border-color: initial; border-style: initial; border-color: initial; ">DOMNode must-know properties (part 4: get node data)</u></u></div>
<ul>
	<li>string&nbsp;<a href="http://us.php.net/manual/en/class.domnode.php#domnode.props.nodename">$DOMNode-&gt;nodeName</a>&nbsp;&nbsp;— Returns node name</li>
	<li>string&nbsp;<a href="http://us.php.net/manual/en/class.domnode.php#domnode.props.nodevalue">$</a><a href="http://us.php.net/manual/en/class.domnode.php#domnode.props.nodename" style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; border-top-width: 0px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-style: initial; border-color: initial; vertical-align: baseline; color: rgb(0, 116, 189); text-decoration: none; ">DOMNode-&gt;nodeValue</a>&nbsp;&nbsp;— Returns node name</li>
	<li><a href="http://us.php.net/manual/en/class.domnodelist.php">DOMNodeList</a>&nbsp;<a href="http://us.php.net/manual/en/class.domnode.php#domnode.props.childnodes">$</a><a href="http://us.php.net/manual/en/class.domnode.php#domnode.props.nodename" style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; border-top-width: 0px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-style: initial; border-color: initial; vertical-align: baseline; color: rgb(0, 116, 189); text-decoration: none; ">DOMNode-&gt;childNodes</a>&nbsp;&nbsp;— Returns list of nodes</li>
</ul>
<div>&nbsp;</div>
<div>Example using DOMDocument for loading and showing HTML</div>
<div><code>&lt;?php</code></div>
<div><code>&nbsp; //TODO</code></div>
<div><code>?&gt;</code></div>
<div>(status: not finished yet)</div>
<div>&nbsp;</div>
