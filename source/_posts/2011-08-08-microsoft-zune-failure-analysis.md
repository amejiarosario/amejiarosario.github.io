---
layout: post
title: Microsoft Zune Failure Analysis
created: 1312810976000
updated: 1312810976000
comments: true
pageviews__total: 1606
pageviews__recent: 8
pageviews__avg_time: 304
tutorial__order: 0
tags:
  - startups
categories:
  - Technologies
# categories: [product lines, bug, testing, microsoft, freescale, zune]
---
All the Zune 30 froze, precisely at 12:01 A.M. on December 31, 2008. These devices got stuck with an irresponsive Zune logo. This bug that didn’t allow users to use the device was cause by a bug in the internal clock driver that handled improperly the last day of a year leap. The Zune 30 model 2006 was the only one affected by this bug; all the other models keep working ok, such as the Zune: 80 and 120 GB with hard drive, and 4, 8, 16 GB with flash drive, because they did not have the component with the error.

<!--More-->

At the core of the Zune 30 music players, there is the Freescale iMX31L Multimedia processor and the MC13783 Power Management Chip. These components are also used in many other products like GPS, cellphones, pace makers, etc. Also the bug froze up the Toshiba Gigabeat S media players, since it was using the MC13783 chip. The driver written by Freescale for their MC13783 caused all of the problems in all the devices that were using it. The official solution from Microsoft to this bug was to let the Zune run out of battery completely, and reset it on January 1st. This bug was dissolved successfully by itself the first day of the 2009.

SUGGESTED PRACTICES

The error occurred with the Microsoft’s Zune 30 could be avoided with effective test coverage. Microsoft and Toshiba relied in the correctness of the components of their supplier Freescale. But, all the components should not be considered reliable until they are properly tested.

Even though, it is not practical to test all the possible alternatives, good unit testing should test representative input values using equivalent partitioning and boundary-value analysis. Equivalence partitioning is the testing technique that divides the possible inputs into different equivalent classes. All the possible inputs are classified and grouped in equivalent classes, which are a reduced representation of all the kinds of inputs possible and have produce similar outputs. After, the equivalent classes are identified; the cases are generated applying the boundary-value analysis. Since most of the errors in software are located in the boundaries, the boundary-value analysis is an effective technique for testing. Boundary testing is test cases where the inputs are generated from the maximum and minimum input domain, such as typical values, error values, special values, values just inside and outside the boundaries.

Another good practice that might have detected this problem is the use of peer reviews. The purpose of the peer review is to detect and correct defects in software artifacts, and prevent leakage into final product. In peer reviews, the author examined his own code and one or more developers also examined it. The colleges evaluate and make recommendations to author’s code. This not only favors error detection, but also the college’s suggestion might helps to refactor code and increase performance and quality. The described combination of testing techniques might have revealed the leap-year bug on time.

ENSURING PRODUCT LINES QUALITY

The Zune 30 was not the only product affected by the MC13783 Freescale’s driver’s bug. Also all the devices using this chip experienced the same problem. For instance, the Toshiba’s Gigabeat product line was affected as well. The bug also froze up their Toshiba Gigabeat S due the leap year.

Microsoft Zune’s product line has the following products: Zune: 30, 80 and 120 GB with hard drive, and Zune 4, 8, 16 GB with flash drive.  The only one affected was the Zune 30, because it was the only one using the MC13783 component, which driver happen to had a bug. This individual variability in the product line was not correctly managed.

Software product lines have the purposes of reduce costs, improve quality, and reduce time to market. These goals will be achieved only if the quality attributes are present since the beginning of the project. Testing product lines is one way for assuring quality attributes. Product lines tests vary in scope from involving the entire product line (common components) to specific product variabilities.

This study case reveals the importance of performing proper testing to the all the variables in a product line. A proper variability management is necessary to ensure the quality of all the products in a product line. All the variabilities, components and features that are varied, should be individually be tested, as well as the common components.

CONCLUSION

There are some lessons that can be learnt from the study case of the Zune 30 Failure. One is the importance of the unit tests coverage. Even 3rd-party component interfaces should be tested properly to verify its correctness. Testing techniques such as boundary-value analysis and equivalence classes can improve the quality of unit test and will increase the likelihood of catching bugs. The correct product line management is important too. Software product lines reduce costs, time to market and increase quality. Also, test to should be adapted to product lines. All the common components in a product line should be tested as well as the individual variabilities.
