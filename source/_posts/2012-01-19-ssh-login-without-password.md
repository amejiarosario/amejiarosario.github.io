---
layout: post
title: SSH login without password
created: 1327004823000
updated: 1327004823000
comments: true
pageviews__total: 661
pageviews__recent: 5
pageviews__avg_time: 82
tutorial__order: 0
alias: /blog/2012/01/19/ssh-login-without-password/
#categories: [ssh, ubuntu, linux, cli, command line]
tags:
  - productivity
categories:
  - Coding
---
<p>If you want to login to a remote server using SSH and don&#39;t have to type the password again and again, here is a little trick</p>

<!--More-->

<p>$&nbsp;cat ~/.ssh/id_rsa.pub | ssh &lt;user&gt;@&lt;server.domain&gt; &#39;cat &gt;&gt; .ssh/authorized_keys&#39;</p>
<p>After you run this and enter your password (for the last time), you can login to your server just typing:</p>
<p>$ ssh &lt;user&gt;@&lt;server.domain&gt;</p>
<p>You are all set.</p>
