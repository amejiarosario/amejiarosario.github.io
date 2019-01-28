---
layout: post
title: Determining granularity of independent tasks for reengineering a legacy system into an OO system - Paper Review
created: 1316015015000
updated: 1316015015000
comments: true
pageviews__total: 47
pageviews__recent: 1
pageviews__avg_time: 116
tutorial__order: 0
# categories: [paper review, wide spectrum language (wsl), unified  modelling language (uml), reverse engineering, cobol  legacy systems, reengineering]
---
In this work [1] the authors explain the process of reengineering a legacy system in COBOL for object-oriented. Reengineering is a multi-step process to convert sequential and procedural-driven system into object-oriented and event-driven system. The proposed method [1] to accomplish this task is to transform the legacy system source code into an intermediary language: Wide Spectrum Language (WSL). The WSL code is used to apply an algorithm to identify the optimal granular unit for independent tasks taking into consideration factors as size, dependencies, and coupling. The detailed techniques used to determine the level of granularity are the following four: Determining Data and Control Dependencies (determine the dependency, if any, between data, variables, and controls), Program Block Identification (identify logical unit of execution of the legacy system), Individual Code line Evaluation (is the minimal granular unit of the legacy system: an code statement), and Procedure Granularity (is the largest self-contained granular units possible).
<!--More-->

In my opinion, It’s a good idea to transform legacy system into an intermediary language. This way the process will be language independent. However, they should explain in more detail about the WSL intermediary language. And also, give more details in the transformation from COBOL to WSL and how it can be transform to OO systems.

Reference:
[1] Millham, R.; Ward, M.; Hongji Yang; , "Determining granularity of independent tasks for reengineering a legacy system into an OO system," Computer Software and Applications Conference, 2003. COMPSAC 2003. Proceedings. 27th Annual International , vol., no., pp. 342- 347, 3-6 Nov. 2003
