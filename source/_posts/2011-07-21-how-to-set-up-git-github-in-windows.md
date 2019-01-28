---
layout: post
title: How to set up Git / github in windows
created: 1311267147000
updated: 1311267147000
comments: true
pageviews__total: 359
pageviews__recent: 1
pageviews__avg_time: 292
tutorial__order: 0
tags:
  - git
categories:
  - Technologies
# categories: [git, github, how-to]
---
<p>Installing Git in Windows is not as straight forward as in a *nix machine like Linux and Mac. This guide help you to get started quickly.</p>
<!--More-->
<p>You will need the following tools:</p>
<ul>
	<li><strong>Putty</strong>: download <a href="http://the.earth.li/~sgtatham/putty/latest/x86/putty.zip">latest version here</a>.</li>
	<li><strong>TortoiseGit</strong>: download the <a href="http://code.google.com/p/tortoisegit/downloads/list" onclick="window.open(this.href, '', 'resizable=no,status=no,location=no,toolbar=no,menubar=no,fullscreen=no,scrollbars=no,dependent=no'); return false;">latest version here</a>. &nbsp;(e.g.&nbsp;<a href="http://code.google.com/p/tortoisegit/downloads/detail?name=Tortoisegit-1.6.5.0-32bit.msi&amp;can=2&amp;q=" style="color: rgb(0, 0, 204); text-decoration: underline; white-space: nowrap; ">Tortoisegit-1.6.5.0-32bit.msi</a>)</li>
	<li><strong>msysgit</strong>: As today the <a href="http://code.google.com/p/msysgit/downloads/list" onclick="window.open(this.href, '', 'resizable=no,status=no,location=no,toolbar=no,menubar=no,fullscreen=no,scrollbars=no,dependent=no'); return false;">latest version</a>&nbsp;(e.g.&nbsp;<a href="http://code.google.com/p/msysgit/downloads/detail?name=Git-1.7.6-preview20110708.exe&amp;can=2&amp;q=" style="color: rgb(0, 0, 204); text-decoration: underline; white-space: nowrap; ">Git-1.7.6-preview20110708.exe</a>)</li>
</ul>
<p><u>Setting up Putty</u></p>
<ol>
	<li>Unzip the folder.&nbsp;</li>
	<li>Generate the ssh key using the&nbsp;PUTTYGEN.EXE from the putty folder. After genete it, click "save private key" to save the *.ppk</li>
</ol>
<p><u>Setting up Git / TortoiseGIT on Windows</u></p>
<ol>
	<li>Install msysgit</li>
	<li>Install TortoiseGit</li>
	<li>Config TortoiseGit: do right click and in the contextual menu: TortoiseGit -&gt; Settings -&gt; Git -&gt; config (set your name and password)</li>
	<li>Set remote git server: Settings -&gt; Git -&gt; Remote. Fill it up with your Git server info (e.g. Github, Google code, ...)</li>
</ol>
<p>


<!-- <img alt="GitTortoise Remote Configuration" src="http://adrianmejiarosario.com/sites/default/files/pictures/gitTortoise-RemoteConfig.JPG"> -->
