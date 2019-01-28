---
layout: post
title: "git+ftp: Publish Git repository over FTP "
created: 1320896098000
updated: 1320896098000
comments: true
pageviews__total: 2839
pageviews__recent: 1
pageviews__avg_time: 435
tutorial__order: 0
# categories: [git, ftp, web development, drupal, gitignore]
---
<p>I have been working with websites for a while and also with different web hosts. The default way to upload content is through FTP but it takes a lot of time because upload the entire site each time. Some web hosts &nbsp;have ssh and git, which is great for deployement because you can keep track of the versions and also upload only the files that changes.</p>
<!--More-->
<div>
	&nbsp;</div>
<div>
	In order to use git for local development and ftp (for hosting that doesn&#39;t support git/ssh) there are some options:</div>
<div>
	&nbsp;</div>
<div>
	<a href="https://github.com/resmo/git-ftp">https://github.com/resmo/git-ftp</a> - Git powered FTP client written as shell script.</div>
<div>
	<a href="https://github.com/ezyang/git-ftp">https://github.com/ezyang/git-ftp</a> - A quick and efficient way of pushing changed files to a website via FTP using python.</div>
<div>
	&nbsp;</div>
<div>
	I have use ezyang/git-ftp to deploy my drupal websites with good results.</div>
<div>
	&nbsp;</div>
<div>
	1. Install &#39;git-python&#39; first from <a href="http://gitorious.org/git-python">http://gitorious.org/git-python</a> -or- using `easy_install gitpython`</div>
<div>
	2. git clone <a href="https://github.com/ezyang/git-ftp.git">https://github.com/ezyang/git-ftp.git</a></div>
<div>
	3. You can create an alias for easy access in `~/.bash_profile` such as `alias git-ftp=&quot;python ~/git-ftp/git-ftp.py &quot;`</div>
<div>
	4. Just run the command `python ~/git-ftp/git-ftp.py ` where is your git repository that you want to upload. I will prompt all the ftp details and also will create the config file for you.</div>
<div>
	&nbsp;</div>
<div>
	You might want to setup files to ignore. If you are using drupal you should create a .gitignore file with a content similar to this:</div>
<div>
	&nbsp;</div>
<div>
	<pre>
.DS_Store*


# Ignore configuration files that may contain sensitive information.

sites/*/settings*.php


# Ignore paths that contain user-generated content.

sites/*/files

sites/*/private</pre>
</div>
<div>
	&nbsp;</div>
