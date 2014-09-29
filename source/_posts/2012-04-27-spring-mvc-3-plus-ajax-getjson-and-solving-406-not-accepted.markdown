---
layout: post
title: "Spring MVC 3 + AJAX (getJSON) and solving 406 Not Accepted"
date: 2012-04-27 02:17
comments: true
categories: [spring mvc, j2ee, jquery, ajax]
---
<p>I wanted to add AJAX to Spring MVC application. So, I did what most us do, go through the documentation or blog of the Spring Source. But, after playing around I didn't get it to work properly so here are some details that might save you some time.</p>
<p>After I follow the instructions in <a href="http://blog.springsource.org/2010/01/25/ajax-simplifications-in-spring-3-0/%20" target="_blank">AJAX in Spring 3.0</a> I got some error "406 Not Accepted", so let's explain how to make it work:</p>
<h2>Server Side</h2>
<p>First you need to setup the actions/methods that the ajax client will call and provide that data in a request. In the server side we are going to use Spring MVC and reply using a JSON format.</p>
<p>1. You need the annotation <strong>&lt;mvc:annotation-driven /&gt;</strong> in your spring.xml or servelet-web-context.xml<br />2. Then, you need to create your controller action that will reply to the AJAX invocation. Let's see the following example. E.g. ProductController.java&nbsp;</p>
<pre>@RequestMapping (value="/itemdescription", method=RequestMethod.GET, headers="Accept=application/json")<br />public <strong>@ResponseBody</strong> Product getItemDescription(@RequestParam String id){ <br />// code... <br />return yourProduct<br />}</pre>
<p>There are a couple of things to point out here. Notice the return @ResponseBody Product type. So, you need to create create a POJO (Plain java class with the data that you want to send along with it's getters and setters). E.g. Product.java.&nbsp;</p>
<p>Also, notice the @ResponseBody annotation. This annotation allow you to translate the Product object into a JSON representation. But, this is not magic! and you need a couple of JARs to make it work (additionally to the annotation metined in step (1):</p>
<ol>
<li>http://mvnrepository.com/artifact/org.codehaus.jackson/jackson-core-asl</li>
<li>http://mvnrepository.com/artifact/org.codehaus.jackson/jackson-mapper-asl</li>
</ol>
<p>Use maven or download and place this JARs in the lib manually.</p>
<h2>Client Side</h2>
<p>On the client side, I'm using jQuery and the code looks like this:</p>
<pre>var jqxhr = $.getJSON("/&lt;your-servlet-name&gt;/itemdescription?id="+ itemId, function(result) {<br />&nbsp; //res=jQuery.stringify(result);<br /><br />&nbsp; if(result != null){<br />&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; $.each(result, function(key, value) {<br />&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; if(key==="descr"){ <br />&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; descr.val(value);<br />&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; userdescr.val(value);<br />&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; }<br />&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; });<br />&nbsp;&nbsp;&nbsp; } else {<br />&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; descr.val("");<br />&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; userdescr.val("");<br />&nbsp;&nbsp;&nbsp; }&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp; <br />})<br />// .success(function() { console.log("2nd function second success"); })<br />.error(function(XMLHttpRequest, textStatus, errorThrown) { console.log("error "+textStatus+": "+errorThrown); })<br />// .complete(function() { console.log("complete"); });</pre>
<p>There are some function there that are useful for debugging like printing out errors to the console and complete function. Notice also that $.getJSON is expenting the reponse in of a appplication/json type. So be sure that you have the "Accept=application/json" in your controller on the server side.</p>
<p>Finally you can customize the javascript fragment shown above and place it in your webpage (JSP, HTML,...) in a ready document. (Also, It was also useful for me to add a delay after the document ready function because otherwise it conflicted with dojo framework apply to the same component. But remove the timeout if you want to)</p>
<pre>&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; $(document).ready(function() {<br />&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; console.log("document.ready");<br />&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; setTimeout(function(){<br />&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; $(_itemId).keyup(function(){checkItemId($(_itemId).val(), $(_descr), $(_userdescr));});<br />&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; $(_itemId).blur(function(){checkItemId($(_itemId).val(), $(_descr), $(_userdescr));});&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <br />&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; },100);<br />&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; });</pre>
<p>&nbsp;</p>
<p>&nbsp;That's all you need.</p>
<h2>Troubleshooting</h2>
<p>As mentioned before the spring mvc blog explain more in details each of the steps but lack some minor details that are key to make it work. I was getting "406 Not Accepted" because I didn't have the jackson jars that the @ResponseBody needs to convert java objects to JSON. And also you need to add the Accept Request header in the controller.</p>
<p>Using Firebug in Firefox is very tab Net &gt; XHR you can see all your ajax request and reponses. Very useful for debugging. Hope this save you some time and frustration. Any question or suggestion fee free to comment below or contact me.</p>