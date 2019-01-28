---
layout: post
title: Automated Reverse Engineering Java-Swing GUI - Paper Review
created: 1315369148000
updated: 1315369148000
comments: true
pageviews__total: 373
pageviews__recent: 1
pageviews__avg_time: 27
tutorial__order: 0
tags:
  - java
categories:
  - Technologies
# categories: [software engineering, reverse engineering, gui, aspect oriented programming, aspectj, dynamic analysis, paper review]
---
The extraction of Java-Swing GUI information using AspectJ seems like an way to do Reverse Engineering. The extracted information could be use later to migrate applications Java-Swing applications to the web, enhance program understating, generate UML diagrams and a myriad of other uses. This article will be summary of the paper about this topic [1].
<!--More-->

The authors of the paper [1] are using aspect oriented programming (AOP) to intercept the application while is running and extract desired information. The information wanted in this case is the following ones: user events, windows and widgets. This type of reverse engineering is performed dynamically. The information is gathered while the user is using the application as usual. The more time the user use the application the more information is gathered. For this task, AspectJ is used. AspectJ is aspect-oriented extension created for Java programming language. AspectJ can interact with java-compiled code (bytecode) and it intercepts specific function calls.  For instance to extract windows and widget the aspect code will detect the Java-Swing calls of: “showFrame()”, “setVisible()”, “show()” in the JFrames, JPanels and widgets. In order to extract the user events, the aspect code intercepts the calls to “JTextField.setText()” for user input in text fields and so forth. Finally, all the information extracted is stored in XML and then can be used for different uses: migration of java-swing applications to web, generate UML design diagrams, you name it!

Something about the title of the paper [1], it's that it mention web migration; however, in the content of the paper there are not depth in that topic. It only explain in detail how to extract information needed for the reverse engineering, but there is no detail in how to use the extracted information to do it web-enabled.

Reference
[1] Samir, H.; Kamel, A.; , "Automated reverse engineering of Java graphical user interfaces for web migration," Information and Communications Technology, 2007. ICICT 2007. ITI 5th International Conference on , vol., no., pp.157-162, 16-18 Dec. 2007
