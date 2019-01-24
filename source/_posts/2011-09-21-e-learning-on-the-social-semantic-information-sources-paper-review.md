---
layout: post
title: E-Learning on the Social Semantic Information Sources - Paper Review
created: 1316620227000
updated: 1316620227000
comments: true
pageviews__total: 26
pageviews__recent: 1
pageviews__avg_time: 4
tutorial__order: 0
#categories: [paper review, e-learning]
---
<p>The paper [1] is proposing a social bookmarking system called Social Semantic Collaborative Filtering (SSCF). It presents how digital libraries can be combined with social semantic information sources and it exemplifies how these techniques can improve e-Learning. The goal of the SSCF is to enhance individual bookmarks with shared knowledge of the community. The Fig. 1 shows the dificulty (or time-consumptions) of bookmarking all the interested links and then share all of them in a blog for other users.</p>
<!--More-->
<p>
<!-- <img alt="Use Case Scenario for SSCF" src="http://www.adrianmejiarosario.com/sites/default/files/pictures/Screen%20shot%202011-09-21%20at%201.24.35%20PM.png" style="width: 600px; height: 222px; "> -->
</p>
<p>Source: [1]</p>
<p>In order to solve this problem, they [1] proposed a SSCF bookmarking system, which is based on JeremeDL. This platform joins 3 separated applications: blog, Digital Library, and bookmarking application (Fig. 3), to solve the problems above-mentioned.</p>
<
<!-- <img alt="SSCF solution" src="http://www.adrianmejiarosario.com/sites/default/files/pictures/Screen%20shot%202011-09-21%20at%201.26.20%20PM.png" style="width: 600px; height: 442px; "> -->
"></p>
<p>Source: [1]</p>
<p>JeromeDL can be use to reduce the time of login in 3 different applications as show in the Fig. 5</p>
<!-- <img alt="JeromeDL time comparison with other systems" src="http://www.adrianmejiarosario.com/sites/default/files/pictures/Screen%20shot%202011-09-21%20at%201.26.39%20PM.png" style="width: 600px; height: 196px; "> -->
; "></p>
<p>Source: [1]</p>
<p>The process that includes SOIC ontology support and alignment is the following:</p>
<ol>
	<li>Users can bookmark blog post, forums, or URL site.</li>
	<li>Extract metadata from the bookmarked site using SOIC browser (<a href="http://sparql.captsolo.net/browser/browser.py?url=URL" target="_blank">http://sparql.captsolo.net/browser/browser.py?url=URL</a>).</li>
	<li>All relevant information is saved to the SSCF RDF repository.</li>
	<li>SSCF module generates bookmark trees and also displays SIOC information.</li>
	<li>Ontology alignment: creating some content using SIOC metadata and delivery mediation mechanism for other SSCF/JeromeDL content.</li>
</ol>
<p>I like the idea of organizing and categorizing URL sites using existing ontologies and web semantics. This allow to group similar content together and enhance navigability of the information. It’s also interesting the way they join multiple applications (library, bookmarks and blog) in other to reduce the time as shown in the Fig. 5. However, it’s not clear to me how if the SSCF is an addon to the JeremeDL system or if is a fork of this project.</p>
<p><strong>Mentions</strong>:</p>
<ul>
	<li>Semantic Web,&nbsp;<a href="http://en.wikipedia.org/wiki/Semantic_Web" target="_blank">http://en.wikipedia.org/wiki/Semantic_Web</a>,</li>
	<li>Ping Semantic Web,&nbsp;<a href="http://pingthesemanticweb.com/" target="_blank">http://pingthesemanticweb.com/</a>, repository for RDF documents</li>
	<li>SIOC (Semantically-Interlinked Online Communities),&nbsp;<a href="http://sioc-project.org/" target="_blank">http://sioc-project.org/</a>, aims to enable the integration of online community information</li>
	<li>Connotea,&nbsp;<a href="http://www.connotea.org/" target="_blank">http://www.connotea.org/</a>, Free online reference management for all researchers, clinicians and scientists.</li>
	<li>Open directory, dmoz.org, uses a hierarchical ontology scheme for organizing site listings.</li>
	<li>RDF (Resource Description Framework),<a href="http://en.wikipedia.org/wiki/Resource_Description_Framework" target="_blank">http://en.wikipedia.org/wiki/Resource_Description_Framework</a>, description or modeling of information that is implemented in web resources</li>
	<li>JeromeDL,&nbsp;<a href="http://www.jeromedl.org/" target="_blank">http://www.jeromedl.org/</a>, Social Semantic Digital Library. As a digital library, it allows institutions to easily publish documents on the Web. It supports a variety of document formats and allows to store and query a rich bibliographic description of each document</li>
</ul>
<p><strong>Ideas</strong>:</p>
<ul>
	<li>Uses a hierarchical ontology scheme for organizing site listings and also uses web semantics to categorize information.</li>
	<li>Join multiple applications to reduce time user's time performing common tasks.</li>
</ul>
<p><strong>Reference</strong>:<br>
	[1] Sebastian Ryszard Kruk, Adam Gzella, Jaros law Dobrzanski,Bill McDaniel, and Tomasz Woroniecki; "E-Learning on the Social Semantic Information&nbsp;Sources"; EC-TEL 2007, LNCS 4753, pp. 172–186, 2007. Springer-Verlag Berlin Heidelberg 2007.</p>
