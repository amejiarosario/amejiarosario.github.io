---
layout: post
title: "Backbone.js for absolute beginners - getting started (part 4: Routers)"
date: 2012-09-13 14:41
updated: 2012-09-13 14:41
comments: true
pageviews__total: 68340
pageviews__recent: 153
pageviews__avg_time: 376
toc: true
#categories: [backbonejs, javascript]
photos:
- /images/Backbone_for_beginners_part4_small.png
- /images/BackbonesforBeginners_large.png
tutorial__order: 4
tags:
  - backbonejs
  - javascript
  - tutorial_backbonejs
categories:
  - Technologies
  - Web Development
---

This tutorial is about BackboneJS Routes.

<!--More-->

BackboneJS Tutorial series:

1. [Backbone.js for Absolute Beginners - Getting started (Part 1: Intro)](/blog/2012/09/11/backbone-dot-js-for-absolute-beginners-getting-started/)
1. [Backbone.js for absolute beginners - getting started (part 2: Models, Collections and Views)](/blog/2012/09/13/backbone-js-for-absolute-beginners-getting-started-part-2/)
1. [Backbone.js for absolute beginners - getting started (part 3: CRUD)](/blog/2012/09/13/backbonejs-for-absolute-beginners-getting-started-part-3/)
1. Backbone.js for absolute beginners - getting started (part 4: Routers) **👈 you are here**

# Backbone.Router

You could build web application without using the routers.  However, if you want to make reference to certain ‘state’ or location of the web application, you need a reference (link/URL) to it. This is where routers come to rescue.

Routing in most of JS application are achieved by hash-tags. E.g. If you take a look of Gmail URL you will see something like:

` https://mail.google.com/mail/u/0/#inbox/139c0d48e11d986b`

where the `#inbox/139c0d48e11d986b ` is the hash-tag which reference some email location.

In backbone, routes are hash maps that match URL patterns to functions. You can use parameter parts, such as `todos/:id`, or using splats `file/*path` you will match all the parameters from the splat on. For that reason, the splat parameter should be always the last matcher.

## Initializing the Router

In our Todo app, we are going to use routers to filter between the tasks that are pending and the ones that have been completed. So, let's initialize the routes this way:

{% codeblock Define Router  lang:js https://raw.github.com/amejiarosario/Backbone-tutorial/327ac4fc4657e73fdf7157e230b1ed7cd1519667/backbone-tutorial.html Full Code %}

    app.Router = Backbone.Router.extend({
      routes: {
        '*filter' : 'setFilter'
      },
      setFilter: function(params) {
        console.log('app.router.params = ' + params); // just for didactical purposes.
        window.filter = params.trim() || '';
        app.todoList.trigger('reset');
      }
    });

{% endcodeblock %}

Now, you need to initialize it, adding this lines:

{% codeblock Initialize router  lang:diff https://raw.github.com/amejiarosario/Backbone-tutorial/327ac4fc4657e73fdf7157e230b1ed7cd1519667/backbone-tutorial.html Full Code %}

     //--------------
     // Initializers
     //--------------

+    app.router = new app.Router();
+    Backbone.history.start();
     app.appView = new app.AppView();

{% endcodeblock %}

You can test that you router is working just typing `#anything/that/you/want` and seeing the parameter in you browser's console.

## 2.6.1 Processing the routes

Before rendering the list of items, you need to check the parameters to wether show only the pending ones, or the completed or show them all. As shown in the code snipet below.

{% codeblock Processing the routes in app.AppView  lang:diff https://raw.github.com/amejiarosario/Backbone-tutorial/327ac4fc4657e73fdf7157e230b1ed7cd1519667/backbone-tutorial.html Full Code %}

@@ -164,7 +177,18 @@
       },
       addAll: function(){
         this.$('#todo-list').html(''); // clean the todo list
-        app.todoList.each(this.addOne, this);
+        // filter todo item list
+        switch(window.filter){
+          case 'pending':
+            _.each(app.todoList.remaining(), this.addOne);
+            break;
+          case 'completed':
+            _.each(app.todoList.completed(), this.addOne);
+            break;
+          default:
+            app.todoList.each(this.addOne, this);
+            break;
+        }
       },
       newAttributes: function(){
         return {


{% endcodeblock %}

If you try adding the words `#/pending` or `#/completed` at the end of the URL you'll get an error!. That's a good sign, it means the routes are working, but we haven't implemented the `app.todoList.remaining()` and `app.todoList.completed()`. So, that's next:

{% codeblock Defining 'completed' and 'remaining' functions in app.TodoList  lang:diff https://raw.github.com/amejiarosario/Backbone-tutorial/327ac4fc4657e73fdf7157e230b1ed7cd1519667/backbone-tutorial.html Full Code %}

@@ -85,7 +90,15 @@
     //--------------
     app.TodoList = Backbone.Collection.extend({
       model: app.Todo,
-      localStorage: new Store("backbone-todo")
+      localStorage: new Store("backbone-todo"),
+      completed: function() {
+        return this.filter(function( todo ) {
+          return todo.get('completed');
+        });
+      },
+      remaining: function() {
+        return this.without.apply( this, this.completed() );
+      }
     });

{% endcodeblock %}

Now, if you try again adding the hash-tags it will work! But, it will be better if the user can have links to that instead of typing URLs. So, let's add them.


{% codeblock Show routes' links  lang:diff https://raw.github.com/amejiarosario/Backbone-tutorial/327ac4fc4657e73fdf7157e230b1ed7cd1519667/backbone-tutorial.html Full Code %}

@@ -32,6 +32,11 @@
     <header id="header">
       <h1>Todos</h1>
       <input id="new-todo" placeholder="What needs to be done?" autofocus>
+      <div>
+        <a href="#/">show all</a> |
+        <a href="#/pending">show pending</a> |
+        <a href="#/completed">show completed</a>
+      </div>
     </header>
     <section id="main">
       <ul id="todo-list"></ul>


{% endcodeblock %}

Well, that's all! If completed these 4 parts tutorial you will be familiar with the main Backbone modules (Models, Collections, Views, Events, and Routes). To increase you knowledge you can follow the following resources:

  * [Backbone's Source code - it's the ultimate source of true](https://github.com/documentcloud/backbone/blob/master/backbone.js)
  * [Official documentation](http://backbonejs.org/?utm_source=adrianmejia.com)

# What's next?

Write a server API in NodeJS to apply the learned here:

* <a href="/blog/2014/10/01/creating-a-restful-api-tutorial-with-nodejs-and-mongodb/" target="_blank">Creating a RESTful API with NodeJS and MongoDB</a>

Now, do a Todo app in AngularJS:

* <a href="/blog/2014/09/28/angularjs-tutorial-for-beginners-with-nodejs-expressjs-and-mongodb/" target="_blank">AngularJS tutorial for beginners with NodeJS ExpressJS and MongoDB</a>


Hope it was helpful!
