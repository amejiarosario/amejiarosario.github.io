---
layout: post
title: C#'s GetManifestResourceStream Gotcha
created: 1311000171000
updated: 1311000171000
comments: true
pageviews__total: 28396
pageviews__recent: 368
pageviews__avg_time: 574
# categories: [tips, c#, gotchas, .net, how-to]
tutorial__order: 0
tags:
  - c#
categories:
  - Technologies
  - Troubleshooting
---
<p>In the .NET framework, the method Assembly -&gt; Get Manifest Resource Stream has a gotcha that could take some time to figure out why is not working as intented. I was working in a piece of code (show below), and the GetManifestResourceStream always returned NULL exception error. Even though the file was there...</p>
<!--More-->
<p>C# example:</p>
<div>
	<pre>public XmlTextReader GetSyntaxModeFile(SyntaxMode syntaxMode)
{
&nbsp;&nbsp; &nbsp;Assembly assembly = typeof(SyntaxMode).Assembly;
&nbsp;&nbsp; &nbsp;var stream = assembly.GetManifestResourceStream("ICSharpCode.TextEditor.Resources." + syntaxMode.FileName);
&nbsp;&nbsp; &nbsp;if(stream == null)
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;throw new Exception("The resource "+syntaxMode.FileName+" was not loaded properly.");
&nbsp;&nbsp; &nbsp;return new XmlTextReader(stream);
}</pre>
</div>
<p><strong>Solution:</strong></p>
<p>The GetManifestResourceStream method will always returns NULL if the resource '<strong>built action</strong>' property is not set to '<strong>embedded resource</strong>'</p>
<p>

<!--
<!-- <img alt="Build action property set to embedded resource" src="http://adrianmejiarosario.com/sites/default/files/pictures/GetManifestResourceStream.JPG" style="width: 488px; height: 332px;"> -->

</p>
<p>After setting this property with all the needed files assembly.<u><strong>GetManifestResourceStream</strong></u> starts returning the corrent stream instead of NULL</p>
