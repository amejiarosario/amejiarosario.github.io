---
layout: post
title: On line Course Organization - Paper Review
created: 1316299024000
updated: 1316299024000
comments: true
pageviews__total: 292
pageviews__recent: 1
pageviews__avg_time: 177
tutorial__order: 0
# categories: [paper review, focused crawling, metadata extraction, learning object management, ontology, e-learning]
---
<p>This paper [1] proposed a specialized search engine, called Fusion, which index meta-information about available courses. Google can be used to perform this search, but the result will be too broad. Fusion provides specialized results only. In order to accomplish this task, Fusion used the web crawler Nutch, which is used to extract the content of courses. The crawler does real-time decisions to parse and store only the necessary data instead of the whole content. The extraction of the metadata is done using the following technologies: NekoHTML (HTML document parser), Xalan (XSLT for transforming XML to HTML), XPath (used to navigate through elements in the XML). After all the course metadata is extracted, the information is classified according to the IEEE-LTSC LOM (Learning Object Metadata). Finally all the data is stored and used for the web portal.</p>
<!--More-->
<div>
<!-- <img alt="architecture online course crawler" src="http://www.adrianmejiarosario.com/sites/default/files/pictures/architecture-online-course-crawler.png" style="width: 500px; height: 236px; "> -->
</div>
<div style="text-align: left; ">Source: [1]</div>
<div style="text-align: right; ">&nbsp;</div>
<div>I like the amount of specialized tools used to develop the Fusion (shown below). However, as they said in their conclusion this extraction could be extended to support eLearning 2.0 features: personal spaces, user contributions, user feedbacks, user tags, and user comments.</div>
<div>&nbsp;</div>
<div>
	<div>This paper [1] proposed a specialized search engine, called Fusion, which index meta-information about available courses. Google can be used to perform this search, but the result will be too broad. Fusion provides specialized results only. In order to accomplish this task, Fusion used the web crawler Nutch, which is used to extract the content of courses. The crawler does real-time decisions to parse and store only the necessary data instead of the whole content. The extraction of the metadata is done using the following technologies: NekoHTML (HTML document parser), Xalan (XSLT for transforming XML to HTML), XPath (used to navigate through elements in the XML). After all the course metadata is extracted, the information is classified according to the IEEE-LTSC LOM (Learning Object Metadata). Finally all the data is stored and used for the web portal.</div>
	<div>&nbsp;</div>
	<div>I like the amount of specialized tools used to develop the Fusion (shown below). However, as they said in their conclusion this extraction could be extended to support eLearning 2.0 features: personal spaces, user contributions, user feedbacks, user tags, and user comments.</div>
	<div>&nbsp;</div>
	<div><strong>Highlighted Mentions:</strong></div>
	<ul>
		<li>Web crawlers: JSpider, Wget and Nutch. Preferred: Nutch.</li>
		<li>Online courses resources: MIT OCW, UIUC, GreatLearning</li>
		<li>Commercial elearning: BlackBoard, WebCT, and Desire2Learn. Open-source: Moodle</li>
		<li>Metadata extraction: Dom-tree approaches: HMM (Hidden Markov Model), CRF (Conditional Random Fields) and SVM (Support Vector Machine)</li>
		<li>HTML Scanner: NekoHTML, XPath</li>
		<li>XSLT processor: “Xalan”</li>
		<li>Glossary: SCORM (Sharable Content Object Reference Model), LOM (Learning Object Management), IEEE-LTSC LOM (Learning Object Metadata), which is developed upon IMS metadata.</li>
		<li>Crawling approaches:&nbsp;Intelligent Crawling with keywords,&nbsp;OPIC algorithm com- puting the importance value of websites,&nbsp;Learnable Crawler using URL seeds, topic keywords and URL prediction,&nbsp;Decision Tree method,...</li>
	</ul>
	<div>&nbsp;</div>
	<div>References:</div>
	<div>[1] Zhang, M., W. Wang, et al. "On Line Course Organization", Advances in Web Based Learning – ICWL 2007. H. Leung, F. Li, R. Lau and Q. Li, Springer Berlin / Heidelberg. 4823: 148-159. 2008</div>
</div>
<p>&nbsp;</p>
<ul style="border-style: initial; border-color: initial; ">
	<li style="border-style: initial; border-color: initial; ">ChinaGrid GreatLearning project, http://greatlearning.grids.cn</li>
	<li style="border-style: initial; border-color: initial; ">MIT’s Open Courseware (OCW), http://ocw.mit.edu/index.html</li>
	<li style="border-style: initial; border-color: initial; ">BlackBoard, http://www.blackboard.com/</li>
	<li style="border-style: initial; border-color: initial; ">WebCT, http://www.webct.com/</li>
	<li style="border-style: initial; border-color: initial; ">Desire2Learn, http://www.desire2learn.com/</li>
	<li style="border-style: initial; border-color: initial; ">Nutch, http://lucene.apache.org/nutch/</li>
	<li style="border-style: initial; border-color: initial; ">LOM, WG12: Learning Object Metadata, http://ltsc.ieee.org/wg12/</li>
	<li style="border-style: initial; border-color: initial; ">SCRORM, http://www.adlnet.org/index.cfm?fuseaction=scormabt</li>
	<li style="border-style: initial; border-color: initial; ">Jena – A Semantic Web Framework for Java, http://jena.sourceforge.net/</li>
</ul>
<p>&nbsp;</p>
