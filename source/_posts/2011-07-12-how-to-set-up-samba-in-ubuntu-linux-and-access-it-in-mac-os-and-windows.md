---
layout: post
title: How to set up Samba in Ubuntu/Linux, and access it in Mac OS and Windows
created: 1310520455000
updated: 1310520455000
comments: true
pageviews__total: 33632
pageviews__recent: 3031
pageviews__avg_time: 817
tutorial__order: 0
photos:
 - /images/samba-filesharing-with-windows-ubuntu-mac-small.jpg
 - /images/samba-filesharing-with-windows-ubuntu-mac-large.jpg
photos__background_color: '#4A4A4A'
tags:
  - samba
  - windows
  - mac
categories:
  - Technologies
  - Troubleshooting
---
<p>Samba allows to share files and printers with other computers remotely, regardless their operating system (linux, windows, Mac, ...).&nbsp;This guide show how to intall and configure the Samba service in a Ubuntu machine and access it through windows and mac.</p>
<!--More-->
<p><strong><u>Setting up the Samba File Server on Ubuntu/Linux:</u></strong></p>
<ol>
	<li>Open the terminal</li>
	<li>Install samba with the following command: &nbsp; <code>sudo apt-get install samba smbfs</code></li>
	<li>Configure samba typing: <code>vi /etc/samba/smb.conf</code></li>
	<li>Set your workgroup (if necesary). Go down in the file, until you see :
		<div>
			<br>
				<pre># Change this to the workgroup/NT-domain name your Samba server will part of
   workgroup = WORKGROUP</pre>
			<br>
		</div>
	</li>
	<li>Set your share folders. Do something like this (change your path and comments)
		<div>
			<br>
				<pre># Adrian's share
[MyShare]
  comment = YOUR COMMENTS
  path = /your-share-folder
  read only = no
  guest ok = yes
</pre>
			<br>
		</div>
	</li>
	<li>Restart samba. type:&nbsp;/etc/init.d/smbd restart</li>
	<li>Create the share folder: sudo mkdir /your-share-folder</li>
	<li>Set the&nbsp;permissions: sudo chmod 0777 /your-share-folder</li>
	<li>you are all set in ubuntu</li>
</ol>
<div><strong style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; border-top-width: 0px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-style: initial; border-color: initial; vertical-align: baseline; "><u style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; border-top-width: 0px; border-right-width: 0px; border-bottom-width: 0px; border-left-width: 0px; border-style: initial; border-color: initial; vertical-align: baseline; text-decoration: underline; ">Accessing Samba Server Files from:</u></strong></div>
<div><span style="text-decoration: underline;">Mac OS</span></div>
<div>
	<ol>
		<li>Open finder</li>
		<li>Menu Go -&gt; Connect to server (command-k)</li>
		<li>In the "Server Address" textbox, type: smb://&lt;your-ip-address-to-ubuntu&gt;</li>
		<li>Connect</li>
		<li>Select guest and OK</li>
		<li>Your all set, you'll be able to see /&lt;your-share-folder&gt; from here.</li>
	</ol>
	<div><span style="text-decoration: underline;">Windows</span></div>
	<div>
		<ol>
			<li>Start button -&gt; Run</li>
			<li>Type: \\&lt;your-ip-address-to-ubuntu&gt;\&lt;your-share-folder&gt;</li>
			<li>All set</li>
		</ol>
	</div>
</div>
<div>If you need to enable the samba ports in your firewall these are the ports:</div>
<div>
	<br>
		<pre>port type	port no
udp		137
udp		138
tcp		139
tcp		445</pre>
	<br>
</div>
<p>&nbsp;</p>
