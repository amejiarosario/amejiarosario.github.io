---
layout: post
title: Focused Crawling for Automatic Service Discovery, Annotation, and Classification in Industrial Digital Ecosystems - Paper Review
created: 1317758695000
updated: 1317758695000
comments: true
pageviews__total: 47
pageviews__recent: 2
pageviews__avg_time: 125
tutorial__order: 0
#categories: [paper review, e-learning, focused crawling, web semantics]
---
H. Dong et al. (2011) [1] introduce an approach to enhance disperse and heterogeneous industrial digital ecosystem for e-Learning. Its target is to discover and classify the industrial information automatically using focused crawlers. The focused crawler perform 5 operations: webpage fetcher (multithreading web crawling given a URL list), policy center  (fetching boundaries, max. depth, multithreading priority), webpage pool (store data as plain text), webpage parser (use heuristics rules on website layouts to extract desired data), service metadata generator (produce metadata and in ontology markup language), and service metadata classifier (used structured domains of knowledge to classify the data). [4] also explain in detail the Ontology Markup Language (OML) and perform several test and performance measures, such as harvest rate, precision, recall, harmony, f-measure, fallout rate, and more.
<!--More-->

This paper provides a detailed methodology to perform focused web crawling of educational content. It also provides great details about the classification of the content using web semantics and ontology services. Examples of Web Ontology Language (OWL) are shown. Another thing that I like is the amount of metrics they have to measure the performance of the system. However, this project doesn't explain how the user is going to interact with the recollected data and the presentation layer.

[1] H. Dong and F. K. Hussain, “Focused Crawling for Automatic Service Discovery, Annotation, and Classification in Industrial Digital Ecosystems,” IEEE Transactions on Industrial Electronics, vol. 58, no. 6, pp. 2106-2116, Jun. 2011.
