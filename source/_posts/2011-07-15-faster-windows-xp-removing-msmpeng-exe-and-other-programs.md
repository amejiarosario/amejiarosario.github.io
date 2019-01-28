---
layout: post
title: Faster Windows XP removing Msmpeng.Exe and other programs
created: 1310735883000
updated: 1310735883000
comments: true
pageviews__total: 40749
pageviews__recent: 481
pageviews__avg_time: 561
# categories: [windows, tips, how-to]
tutorial__order: 0
tags:
  - windows
categories:
  - Technologies
  - Troubleshooting
---
<p>At work, I use an Windows XP machine and it some times get really slowly. I noticed from the task manager (ctrl+shift+esc) that the process MsMpEng.exe is consuming most of my CPU time!</p>
<p><strong>MsMpEng.exe</strong> is a process associated to <em>Windows Defender</em> that help you to "<em>protected</em>" the computer, but sometimes it requires too much resources. So, if eating up your available CPU it is better to disable it.</p>
<!--More-->
<p>Disable <strong>MsMpEng.exe</strong>:</p>
<ol>
	<li>start menu -&gt; <strong>run&nbsp; </strong>(windows key + r)</li>
	<li>write <strong>services.msc</strong> and enter</li>
	<li><strong>Stop </strong>the following services: "Microsoft Forefront Client Security Antimalware Service" and "Microsoft Forefront Client Security State Assessment Service" doing a right click.</li>
	<li>Set the "Startup Type"&nbsp; to "Manual" of both services doing double click on them.</li>
	<li>You can repeate the same steps 1-4 to remove safely services, like "Indexing Service" which slow down your computer, too. And memory consuming processes.&nbsp;</li>
	<li>Enjoy a faster computer!</li>
</ol>
<!-- <p>&nbsp;</p> -->
<!-- <p>Here is a screenshot of how the serivices are disabled:</p> -->
<!-- <p>
<!-- <img alt="windows services" src="http://www.adrianmejiarosario.com/sites/default/files/pictures/MsMpEngEXE.PNG" style="width: 594px; height: 52px; "> -->
<!--</p> -->
<p>&nbsp;</p>
<p>Note: &nbsp;You can find other programs/processes that are slowing down you computer doing the following:</p>
<ol>
	<li>Open Task Manager (Ctrl+shift+Esc)</li>
	<li>Click in the "Processes" tab.</li>
	<li>Menu "View", click "Select Columns...", check "CPU Time", click OK. (figure below)</li>
	<li>Click on CPU time, and you will see the process that consume most of your CPU (and make your PC slower)</li>
	<li>Search on internet what are this process used for, before removing them.</li>
	<li>Use the steps above to remove them if they are not really needed (be careful).</li>
</ol>

<!-- <img alt="Selecting CPU Time from Task Manager" src="http://www.adrianmejiarosario.com/sites/default/files/viewCPUTime.JPG" style="width: 586px; height: 550px; "> -->
