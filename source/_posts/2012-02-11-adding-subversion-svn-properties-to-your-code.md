---
layout: post
title: Adding Subversion (SVN) Properties to your code
created: 1329003331000
updated: 1329003331000
comments: true
pageviews__total: 2150
pageviews__recent: 13
pageviews__avg_time: 382
tutorial__order: 0
#categories: [subversion, eclipse]
---
<p>When you are coding in a team enviroment it&#39;s good to have the subversion properties in your files, that way any other developer can see quickly who made the last changes and when.</p>
<p>You can add the following lines at the bottom of your code:</p>
<!--More-->
<div>
	//-----------------------------------------------------------------------------</div>
<div>
	// &nbsp;REVISION HISTORY</div>
<div>
	// &nbsp;$LastChangedDate: $</div>
<div>
	// &nbsp;$Revision: $</div>
<div>
	// &nbsp;$LastChangedBy: $</div>
<div>
	// &nbsp;$Id: $</div>
<div>
	//-----------------------------------------------------------------------------</div>
<div>
	&nbsp;</div>
<div>
	And when you perform your svn commit will be automatically populated something like this:</div>
<div>
	//-----------------------------------------------------------------------------</div>
<div>
	// &nbsp;REVISION HISTORY</div>
<div>
	// &nbsp;$LastChangedDate: 2012-02-11 18:24:39 -0500 (Sat, 11 Feb 2012) $</div>
<div>
	// &nbsp;$Revision: 61 $</div>
<div>
	// &nbsp;$LastChangedBy: adriansky $</div>
<div>
	// &nbsp;$Id: Heap.java 61 2012-02-11 23:24:39Z adriansky $</div>
<div>
	//-----------------------------------------------------------------------------</div>
<div>
	&nbsp;</div>
<div>
	Also you need to set the SVN properties for that file. The Properties that you need are the following:</div>
<ul>
	<li>
		svn:eol-style &nbsp;---&gt; LF</li>
	<li>
		svn:keywords ---&gt; LastChangedDate Revision LastChangedBy Id</li>
</ul>
<div>
	If you are using Eclipse you can edit it following this steps:</div>
<ol>
	<li>
		right click file you want to add svn properties</li>
	<li>
		Menu team &gt; set properties (image below)</li>
	<li>
		Select the Property name from the combobox&nbsp;(image below)</li>
	<li>
		Add the text property in the text box&nbsp;(image below)</li>
	<li>
		You can also use files to avoid all the typing every time. right click and &#39;save as...&#39; to &lt;<a href="http://adrianmejiarosario.com/sites/default/files/svn-keywords.txt" target="_blank">svn-keywords</a>&gt; and&nbsp;&lt;<a href="http://adrianmejiarosario.com/sites/default/files/svn-eol-style.txt" onclick="window.open(this.href, '', 'resizable=no,status=no,location=no,toolbar=no,menubar=no,fullscreen=no,scrollbars=no,dependent=no'); return false;">svn-eol-property</a>&gt;.</li>
	<li>
		Commit and you are all set.</li>
</ol>
<p>Eclipse Menu to add svn properties</p>
<p>
<!-- <img alt="Eclipse SVN Property Menu" src="http://adrianmejiarosario.com/sites/default/files/svnprop1.png" style="width: 600px; height: 564px; " /> -->
</p>
<p>Adding SVN properties typing</p>
<p>
<!-- <img alt="" src="http://adrianmejiarosario.com/sites/default/files/svnprop2.png" style="width: 525px; height: 520px; " /> -->
</p>
<p>Adding SVN property from file</p>
<p>
<!-- <img alt="SVN property from file" src="http://adrianmejiarosario.com/sites/default/files/svnprop3.png" style="width: 525px; height: 520px; " /> -->
</p>
