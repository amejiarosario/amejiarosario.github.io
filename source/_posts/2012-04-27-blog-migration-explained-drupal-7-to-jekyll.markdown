---
layout: post
title: "Blog migration explained: Drupal 7 to Jekyll"
date: 2012-04-27 22:00
comments: true
categories: [blogs, drupal, ruby, jekyll, octopress, migration, scripts, how-to, mysql, gems]
---
This post is a guide on how to extract your blog posts information from Drupal 7 to other systems. And also automatically create a redirect files from the old blog to the new one. In this case, I migrated to Jerkyll/Octopress blog but from the data extracted in with my script you can migrate any other blog system. Hopefully, this will save you a lot of time if you need to do the same task. If you run into troubles go to last section of the post it has some suggestions.

## Extract data from Drupal 7 site

### SQL extraction

You need to extract the data from your Drupal 7, there are several ways. You can connect to your web host via ssh and generate SQL dump.

{% codeblock lang:sql %}
mysqldump –uUSERNAME –pPASSWORD DATABASE > FILENAME.sql
{% endcodeblock %}

(replace the UPPERCASE letters with your settings)

You can download the file *.sql to your computer and run the following command to install to upload the data in your local database.

{% codeblock lang:sql %}
mysql –uUSERNAME –pPASSWORD DATABASE < FILENAME.sql
{% endcodeblock %}

If you have a access to you phpmyadmin in your host server you can download your sql dump file through that also. Other method is to use a local port fordwarding using SSH… anyways, get access to your database.

### Run the script

The 2nd and final step is to run the script that does all the magic. Below I will explain how it works in case that you want to customize.

{% gist 2515239 drupal2jekyll.rb %}


Replace the place holders with your actual values:

* OLD_DOMAIN
* NEW_DOMAIN
* ENV['DRUPAL_DATABASE']
* ENV['DB_USER']
* ENV['DB_PASSWORD']


After you run it, it will generate 3 folders:

* _post: has all your post in the Jekyll style (categories and tags and everything)
* _draft: not published posts if any
* drupal_redirect: for each url of your posts it has a folder with a redirect index.php file to your new domain.

Copy each of this folder to their respective places. Copy the content to your drupal_redirect to the root of your old blog and that's it. It will redirect all your all blog URLs to your new site.
### Behind the scenes…

First, you need to extract the data from your Drupal site. I reversed engineer the database in order to extract the post, title, url alias (slug), tags, publish info, format and the last version of the post. The query that does all the magic is the following one:

{% codeblock Drupal 7 Query to extract all the post info lang:sql %}
SELECT 
n.nid, 
n.title, 
n.created, 
n.changed, 
b.body_value AS 'body', 
b.body_summary, 
b.body_format, 
n.status, 
l.alias AS 'slug', 
GROUP_CONCAT( d.name SEPARATOR ', ' ) AS 'tags'

FROM url_alias l, node n
JOIN field_data_body b ON b.entity_id = n.nid
JOIN taxonomy_index t ON t.nid = n.nid
JOIN taxonomy_term_data d ON t.tid = d.tid

WHERE n.type = 'blog'
AND b.revision_id = n.vid
AND l.source = CONCAT( 'node/', n.nid ) 

GROUP BY n.nid
{% endcodeblock %}

As might notice, it concatenates all the tags separated by comma and also finds the alias of the url if is called node. Also you can also find the url alias for other pages such as terms or taxonomies. But let’s keep it simple and get the posts urls.

Finally, the script will use the data from this query to generate the new posts files and also to create the redirect files.

As might notice, it concatenates all the tags separated by comma and also finds the alias of the url if is called node. Also you can also find the url alias for other pages such as terms or taxonomies. But let’s keep it simple and get the posts urls.

Finally, the script will use the data from this query to generate the new posts files and also to create the redirect files.

### Troubleshooting

I had a hard time having the mysql gem work with seqel in my Mac OS X 10.7 (Lion) and ruby 1.9.2. 

I got the following errors:

* Library not loaded: libmysqlclient.18.dylib (LoadError)
Sequel::DatabaseConnectionError: Mysql::ClientError::ServerGoneError: The MySQL server has gone away mysql2 ruby
* "LoadError: require 'mysql' did not define Mysql::CLIENT_MULTI_RESULTS!" 
* "You are probably using the pure ruby mysql.rb driver, which Sequel does not support. You need to install the C based adapter, and make sure that the mysql.so file is loaded instead of the mysql.rb file."
* Sequel::AdapterNotFound: LoadError: require 'mysql' did not define Mysql::CLIENT_MULTI_RESULTS! You are probably using the pure ruby mysql.rb driver, which Sequel does not support. You need to install the C based adapter, and make sure that the mysql.so file is loaded instead of the mysql.rb file.
* And others…

#### Solution:

The mysql gem have been abandoned, so you also need mysql2 to work propery with sequel

{% codeblock  bash Install MySQL gems lang:bash %}
$ sudo gem install sequel
$ sudo gem install mysql -- --with-mysql-config=/usr/local/mysql/bin/mysql_config
$ sudo gem install mysql2 -- --with-mysql-config=/usr/local/mysql/bin/mysql_config
{% endcodeblock %}

also  you need to copy the following lib:

{% codeblock Reference needed libs lang:bash %}
$ sudo ln -s /usr/local/mysql/lib/libmysqlclient.18.dylib /usr/lib/libmysqlclient.18.dylib
{% endcodeblock %}

That should work.

Just if you are courious there is another gem called ruby-mysql, with which you can connect to mysql. But it doesn’t work with sequel

{% codeblock Alternative gem to connect to mysql (ruby-mysql) lang:bash %}
$ gem install ruby-mysql -- --with-mysql-config=/usr/local/mysql/bin/mysql_config
$ irb
> require 'mysql'
> db = Mysql.real_connect("SERVER","USER","PASSWORD","DATABASE")
{% endcodeblock %}
