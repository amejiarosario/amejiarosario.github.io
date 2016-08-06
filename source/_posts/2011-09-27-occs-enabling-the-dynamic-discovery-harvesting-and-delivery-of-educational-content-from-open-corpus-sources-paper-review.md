---
layout: post
title: "OCCS: Enabling the Dynamic Discovery, Harvesting and Delivery of Educational Content from Open Corpus Sources - Paper Review"
created: 1317137156000
updated: 1317137156000
comments: true
pageviews__total: 0
pageviews__recent: 0
pageviews__avg_time: 0
tutorial__order: 0
#categories: [paper review, e-learning, web semantics, focused crawling]
---
S. Lawless, V. Wade et al. (2008) [1] introduces the Open Corpus Content Service (OCCS), which is a system to discover, harvest, classify and index educational content from the Internet. It aims to provide a dynamic learning object generation based on the background of the learner. The OCCS employs Heritrix (open source, web-scale, archival web crawler) for discovery educational content available in the WWW. Heritrix uses languages guessers (JTCL) and text classifier (Rainbow) to classify the extracted data. All the content is indexed in ARC files with NutchWAX and Hadoop. Finally the data is presented to the users using WERA (WEb aRchive Access). Additionally, the OCCS system is evaluated using a specific topic and the results are shown in [1].
<!--More-->

Something that I like about this paper is that it mentions most of the tool used to implement the OCCS in all this stages. All these tools can be used by the reader to implement similar projects.

This paper seem to be the one of the earliest of a series of papers about the same topic by the same authors:
[2] S. Lawless, L. Hederman, and V. Wade, “Enhancing Access to Open Corpus Educational Content : Learning in the Wild,” HT  ’08 Proceedings of the nineteenth ACM conference on Hypertext and hypermedia, pp. 167-174, 2008.
[3] <a href="http://www.adrianmejiarosario.com/content/dynamic-hypertext-generation-reusing-open-corpus-content-paper-review">B. Steichen, S. Lawless, A. O’Connor, and V. Wade, “Dynamic Hypertext Generation for Reusing Open Corpus Content,” Proceedings of the 20th ACM conference on Hypertext and hypermedia HT 09, pp. 119-128, 2009.</a>

Reference
[1] S. Lawless, L. Hederman, and V. Wade, “OCCS: Enabling the Dynamic Discovery, Harvesting and Delivery of Educational Content from Open Corpus Sources,” 2008 Eighth IEEE International Conference on Advanced Learning Technologies, pp. 676-678, 2008.
