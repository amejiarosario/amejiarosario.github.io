---
layout: post
title: "Backbone.js for Absolute Beginners - Getting started (Part 1: Intro)"
date: 2012-09-11 22:50
updated: 2021-04-14 17:38
comments: true
pageviews__total: 358046
pageviews__recent: 326
pageviews__avg_time: 342
photos__background_color: 'white'
bitly: 'http://bit.ly/backbone-1'
alias: /blog/2012/09/11/backbone-dot-js-for-absolute-beginners-getting-started/
photos:
  - /images/Backbonesforbeginners_small.png
  - /images/BackbonesforBeginners_large.png
toc: true
##categories: [backbonejs, javascript]
tutorial__order: 1
tags:
  - backbonejs
  - tutorial_backbonejs
categories:
  - Coding
  - Web Development
  - Backbone
---

Backbone.js is a JavaScript library, among many others, that is gaining special attention in the web development community because of its ease of use and the structure that it provides to JavaScript applications.

Notice that BackboneJS is not a framework but a library. The difference is who is in control. Using a library, YOU are in control, but there is an inversion of control using a framework: the framework calls you. Libraries give you a lot of flexibility, while frameworks have opinionated ways of doing things but can save you from writing boilerplate code. Follow my [AngularJS](/tags/angularjs/) tutorial series for a framework solution.

Let's dive into BackboneJS! And see how this flexible library can bring order to your Javascript!

<!--More-->

BackboneJS Tutorial series:

1. Backbone.js for Absolute Beginners - Getting started (Part 1: Intro) **👈 you are here**
1. [Backbone.js for absolute beginners - getting started (part 2: Models, Collections and Views)](/backbone-js-for-absolute-beginners-getting-started-part-2/)
1. [Backbone.js for absolute beginners - getting started (part 3: CRUD)](/backbonejs-for-absolute-beginners-getting-started-part-3/)
1. [Backbone.js for absolute beginners - getting started (part 4: Routers)](/backbone-js-for-absolute-beginners-getting-started-part-4/)

## Brief Background

<a href="#start">TL; DR</a>: You need to use JavaScript heavily in order to make responsive and interactive web applications. <a href="#start">Jump to this and get started.</a>

The web application development process has been evolving over the years. In the beginning, web applications were just static HTML pages, which required programmers to change the code (HTML, CSS, JS) to change the content. Later, in web 2.0, developers started using server-side programming languages (like PHP, Ruby, Java, …) to generate HTML pages dynamically based on user input and data stored in a database. That was a considerable improvement, and most of the pages served today use this approach. However, providing the website with even more responsiveness, speed, and enhanced user interaction requires bringing the page generation closer to the users (in the browser rather than a remote server).  A couple of languages can run in the browsers besides JS, using Web Assembly techniques or using deprecated Java Applets or Flash. However, these require extra plugins and are not as ubiquitous as JavaScript.

Web applications nowadays require heavy use of JavaScript to generate content on the fly. The user doesn't need to wait between requests and page refreshes. Many of the logic/code that used to be on the server-side is now on the client-side. JS allows websites to render only content that changes without reloading the entire page on every request (e.g., AJAX). Examples of this kind of web application are Gmail, Pandora, Pinterest, Nokia Maps 3D, etc.

A common problem with extensive JS web applications developed is that they can become pretty messy quickly. The lack of structure makes the code hard to maintain. Enters Backbone.js! It provides structure to organize the code and increase maintainability. Backbone is not the only framework like this; in fact, many JS frameworks offer similar benefits, like Ember.js, Angular.js, RectJS, etc. However, I chose (in 2012) Backbone because it's one of the most widely used frameworks in its category. It has a vibrant community. It’s also fully used in production for many big companies like Wal-Mart mobile, Groupon, Khan Academy, Pandora, WordPress, Foursquare, etc.

Edit 2021: ReactJS, [Vue.js](/tags/vuejs/) and [Angular](/tags/angular/) are very popular nowadays.

<a id="start"></a>

## BackboneJS Overview

**Just enough to get started with Backbone.js**

Backbone.js has a hard dependency on underscore.js and a soft dependency on jQuery. It’s made up of the following modules:

   * Views
   * Events
   * Models
   * Collections
   * Routers

**Shut up and show me the code!**

Alright! the way we are going to explore all of these modules is through examples. This is a practical tutorial that I wished I had it when I started learning. This is a fat-free walkthrough of Backbone.js, as simple as possible, with all the code in one file for didactical purposes (no hidden magic tricks, all cards are on the table).

The first example is a ‘Hello World’ app in Backbone, and the second is a 'to do' app. After working through these two example apps, you’ll see every Backbone module and have a practical understanding of them.


## Hello World in Backbone.js

You can follow along with this tutorial's code in this [repository](https://github.com/amejiarosario/Backbone-tutorial/commits/). Each feature implemented is a new commit, so you can easily see what changed in every step.

**Simple HTML5 and Backbone boilerplate**

To get started, download [this simple HTML file](https://raw.github.com/amejiarosario/Backbone-tutorial/439ff34409dfc01adca7f9f96efcd726295f1aac/backbone-tutorial.html). This file contains the libraries that you'll need (jQuery, Underscore.js, Backbone.js, and Backbone-localStorage.js) and the placeholders for your HTML and JS code. Don't worry about the libraries. We are going to explain to them as we need them.

After downloading the file mentioned above, notice the HTML where your entire page will be built using Backbone.Views!

Your entire js app will be loaded here:

`<div id="container">Loading...</div>`

### Backbone's Views

Backbone's Views are the equivalent of ‘controllers’ in MVC frameworks (like [Ruby on Rails](/ruby-on-rails-architectural-design/)). If you are not familiar with MVC frameworks, that's okay. Backbone's Views glue together user events (clicks, pressed keys, etc.), rendering HTML views and templates, and interact with models that contain the application's data.

Here is an example of a Backbone.View: READ THE CODE AND COMMENTS, then insert this code in the javascript block of the HTML file you downloaded.

{% codeblock Simple Backbone.View lang:js https://raw.github.com/amejiarosario/Backbone-tutorial/0bf69185f4463a75cb2d5553f8d1ea197323ccff/backbone-tutorial.html Full Code %}
    var AppView = Backbone.View.extend({
      // el - stands for element. Every view has a element associate in with HTML
      //      content will be rendered.
      el: '#container',
      // It's the first function called when this view it's instantiated.
      initialize: function(){
        this.render();
      },
      // $el - it's a cached jQuery object (el), in which you can use jQuery functions
      //       to push content. Like the Hello World in this case.
      render: function(){
        this.$el.html("Hello World");
      }
    });
{% endcodeblock %}

### Test the app

After copying the code, open the HTML file by typing this in terminal: `open <your file name>.html`, refresh the browser, and you should see the 'Hello World' message, right? Wait, if you only see 'Loading…', it's because you need to initialize the view first.

`var appView = new AppView();`

Yay! You have your "Hello Wold" in Backbone and an introduction to the View module. (Full code is [here](https://raw.github.com/amejiarosario/Backbone-tutorial/0bf69185f4463a75cb2d5553f8d1ea197323ccff/backbone-tutorial.html))

### Backbone's Templates

Backbone has a utility/helper library called [underscore.js](http://underscorejs.org/?utm_source=adrianmejia.com), and you can use their template solution out of the box. You can also use any other template solution that you want, like [mustache](https://github.com/janl/mustache.js) or [handlebars](https://github.com/wycats/handlebars.js). Let's stick with _.js for simplicity's sake.

_.js templates have the following syntax,

`_.template(templateString, [data], [settings])`

In the `templateString`, you use the place holder `<%= %>` and `<%- %>` to dynamically insert data. The latter allows for HTML escape while the former doesn't. Moreover, you can use `<% %>` to run any javascript code.

Let’s see it in action and rewrite our "Hello World" using a _.js template instead.

{% codeblock Simple Backbone.View and Templates lang:js https://raw.github.com/amejiarosario/Backbone-tutorial/c5b131278ecde92f33882c9a2c22ee4119e57d77/backbone-tutorial.html Full Code %}
    var AppView = Backbone.View.extend({
      el: $('#container'),
      // template which has the placeholder 'who' to be substitute later
      template: _.template("<h3>Hello <%= who %></h3>"),
      initialize: function(){
        this.render();
      },
      render: function(){
        // render the function using substituting the varible 'who' for 'world!'.
        this.$el.html(this.template({who: 'world!'}));
        //***Try putting your name instead of world.
      }
    });

    var appView = new AppView();
{% endcodeblock %}

Rerun the app and verify that it's working with the template.

## What's next?
Continue with the [2nd part](/backbone-js-for-absolute-beginners-getting-started-part-2/) and learn more about Backbone's Models, Collections, View and Events!
