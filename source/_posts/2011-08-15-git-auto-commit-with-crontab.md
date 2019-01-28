---
layout: post
title: Git auto-commit with Crontab
created: 1313420094000
updated: 1313420094000
comments: true
pageviews__total: 8311
pageviews__recent: 209
pageviews__avg_time: 1202
#categories: [unix, crontab, git, drupal, drush, how-to]
tutorial__order: 0
tags:
  - git
categories:
  - Technologies
  - Troubleshooting
---
You might want to commit from a git repository from time to time for several purposes (backup, control version, continuous integration, etc). One way to accomplish that is using the CronTab (Cron is used to run periodic task in Unix-like systems).
<!--More-->

Here is an example.

1.- Create an script. e.g. baskitup.sh with:
<pre>
<code># MySQL-dump: save a copy of the actual content in the database. (this is for a Drupal site, the backup is done using drupal's drush)
php -c ~/www/php.ini  ~/drush/drush.php -r /home/adrimej0/www -u 1 sql-dump --result-file=latest.sql

# Git: add and commit changes
cd /home/adrimej0/www && /home/adrimej0/opt/bin/git commit -a -m "weekly crontab backup `date`"

# send data to Git server
cd /home/adrimej0/www && /home/adrimej0/opt/bin/git push origin master</code>
</pre>

2.- Set up the cron. In the shell write the following
<pre>
<code>$ crontab -e</code>
</pre>
add the following command line for weekly auto-commits:
<pre>
<code>MAILTO="youremail@domain.com"
0 0 * * 0 /home/adrimej0/www/backitup.sh</code>
</pre>

Done. Now your (drupal) site will be backed up every week automatically (every Sunday at midnight).
