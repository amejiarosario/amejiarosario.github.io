---
layout: post
title: Update Drupal sites
created: 1320386664000
updated: 1320386664000
comments: true
pageviews__total: 21
pageviews__recent: 1
pageviews__avg_time: 8
tutorial__order: 0
tags:
  - drupal
categories:
  - Technologies
#categories: [drupal]
---
The better way to learn is by a concrete example. I update a site called "heyshuga" from Drupal 7.8 to 7.9. Here are the steps

<!--More-->

1. Download the latest version of drupal

$ wget http://drupal.org/files/projects/drupal-x.y.tar.gz
$ tar -zxvf drupal-x.y.tar.gz

-or using drush-

$ drush dl drupal

2. Copy the new files to the old directory

$ cp -R drupal-x.y/* drupal-x.y/.htaccess /path/to/your/installation


3. Run the drupal update

www.yousite.com/update.php
