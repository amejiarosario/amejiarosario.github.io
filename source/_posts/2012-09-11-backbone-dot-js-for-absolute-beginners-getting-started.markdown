---
layout: post
title: "Backbone.js for Absolute Beginners - Getting started (Part 1: Intro)"
date: 2012-09-11 22:50
updated: 2012-09-11 22:50
comments: true
pageviews__total: 340975
pageviews__recent: 964
pageviews__avg_time: 1037
photos__background_color: 'white'
bitly: 'http://bit.ly/backbone-1'
photos:
  - /images/Backbonesforbeginners_small.png
  - /images/BackbonesforBeginners_large.png
toc: true
#categories: [backbonejs, javascript]
tutorial__order: 1
tags:
  - backbonejs
  - javascript
  - tutorial_backbonejs
categories:
  - Technologies
  - Web Development
---

Backbone.js is a JavaScript library, among many others, that is gaining special attention in the web development community because it's ease of use and the structure that it provides to JavaScript applications.

Notice that BackboneJS is not a framework but a library. The difference is who is in control. Using a library YOU are in control, but using a framework there is an inversion of control: the framework calls you. Libraries give you a lot of flexibility, while frameworks has opinionated ways of doing things but can save you writing boiler plate code. Follow my [AngularJS](/blog/categories/angularjs/) tutorial series for a framework solution.

Let's dive into BackboneJS! and see how this flexible library can bring order to your Javascript!

<!--More-->

BackboneJS Tutorial series:

1. Backbone.js for Absolute Beginners - Getting started (Part 1: Intro) **👈 you are here**
1. [Backbone.js for absolute beginners - getting started (part 2: Models, Collections and Views)](/blog/2012/09/13/backbone-js-for-absolute-beginners-getting-started-part-2/)
1. [Backbone.js for absolute beginners - getting started (part 3: CRUD)](/blog/2012/09/13/backbonejs-for-absolute-beginners-getting-started-part-3/)
1. [Backbone.js for absolute beginners - getting started (part 4: Routers)](/blog/2012/09/13/backbone-js-for-absolute-beginners-getting-started-part-4/)

# Brief Background

<a href="#start">TL; DR</a>: You need to use JavaScript heavily in order to make responsive and interactive web applications. <a href="#start">Jump to this and get started.</a>

The web application development process has been evolving over the years. In the beginning web applications were just static HTML pages, which required programmers to change the code (HTML, CSS, JS) in order to change the content. Later, in web 2.0, server side programming languages (like PHP, Ruby, Java, …) were added to generate HTML pages dynamically based on user input and data stored in database. That was a huge improvement, and most of the pages served today use this approach. However, to provide the web site with even more responsiveness, speed, and enhanced user interaction, it requires bringing the logic closer to the client (browser).  There are a couple of languages that can run in the browsers besides JS, such as Java, Flash and others. However, these require extra plugins and are not as ubiquitous as JavaScript.

Web applications nowadays require heavy use of JavaScript to generate content on the fly. The user needn't wait between requests and page refreshes. A lot of the logic/code that used to be on the server side is being moved to the client side. JS allows web sites to render only content that changes without needing to reload the full-page on every request. Examples of this kind of web applicqtion are Gmail, Pandora, Pinterest, Nokia Maps 3D and others.

A common problem with large JS web application developed is that they can become pretty messy really quickly. The lack of structure makes the code hard to maintain. This is where Backbone comes into play. It provides structure to organize the code and increase maintainability. Backbone is not the only framework like this; in fact, there are many JS frameworks that attempt to offer similar benefits, like Ember.js, Angular.js and so on. However, I choose Backbone because it's one of the most widely used frameworks in its category. It has a vibrant community and it’s also being fully used in production for a considerable number of big companies like: Wal-Mart mobile, Groupon, Khan Academy, Pandora, Wordpress, Foursquare, and so on.

<a id="start"></a>

# BackboneJS Overview

**Just enough to get started with Backbone.js**

Backbone.js has hard dependency on underscore.js and a soft dependency on jQuery. It’s made up of the following modules:

   * Views
   * Events
   * Models
   * Collections
   * Routers

**Shut up and show me the code!**

Alright! the way we are going to explore all of these modules is through examples. This is a practical tutorial that I wished I had it when I stared learning. This is a fat-free walkthrough of Backbone.js, as simple as possible, with all the code in one file for didactical purposes (no hidden magic tricks, all cards are on the table).

The first example is a ‘Hello World’ app in Backbone and the second is a 'to do' app. After working through these two example apps, you’ll see every Backbone module and have a practical understanding about them.


# Hello World in Backbone.js

You can follow along with this tutorial's code in this [repository](https://github.com/amejiarosario/Backbone-tutorial/commits/). Each feature implemented is a new commit, so you can easily see what changed in every step.

**Simple HTML5 and Backbone boilerplate**

To get started, download [this simple html file](https://raw.github.com/amejiarosario/Backbone-tutorial/439ff34409dfc01adca7f9f96efcd726295f1aac/backbone-tutorial.html). This file  contains the libraries that you'll need (jQuery, Underscore.js, Backbone.js and Backbone-localStorage.js) and the placeholders for your HTML and JS code. Don't worry about the libraries, we are going to explain them as we need them.

After downloading the aformentioned file, notice the HTML where your entire page will be built using Backbone.Views!

Your entire js app will be loaded here:

`<div id="container">Loading...</div>`

## Backbone's Views

Backbone's Views are the equivalent of ‘controllers’ on MVC frameworks (like Ruby on Rails), if you are not familiar with MVC frameworks, that's okay. Backbone's Views glue together user events (clicks, pressed keys, etc.), render HTML views and templates, and interact with models which contains the data of the application.

Here is an example of a Backbone.view: READ THE CODE AND COMMENTS, then insert this code in the javascript block of the HTML file you downloaded.

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

## Test the app

After copying the code, open the html file by typing this in terminal: `open <your file name>.html` , refresh the browser and you should see the 'Hello World' message, right? Wait, if you're just seeing the 'Loading…' it's because you need to initialize the view first.

`var appView = new AppView();`

Yay! You have your "Hello Wold" in Backbone and an introduction to the View module. (Full code is [here](https://raw.github.com/amejiarosario/Backbone-tutorial/0bf69185f4463a75cb2d5553f8d1ea197323ccff/backbone-tutorial.html))

## Backbone's Templates

Backbone has a utility/helper library called [underscore.js](http://underscorejs.org/?utm_source=adrianmejia.com) and you can use their template solution out of box. You can also use any other template solution that you want like [mustache](https://github.com/janl/mustache.js) or [handlebars](https://github.com/wycats/handlebars.js). Let's stick with _.js for simplicity's sake.

_.js templates have the following syntax,

`_.template(templateString, [data], [settings])`

where in the `templateString` you use the place holder `<%= %>` and `<%- %>` to dynamically insert data. The later allows for HTML escape while the first one doesn't. Moreover, you can use `<% %>` to run any javascript code.

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

Run the app again and verify that it's working with the template.

# What's next?
Continue with the [2nd part](/blog/2012/09/13/backbone-js-for-absolute-beginners-getting-started-part-2/) and learn more about Backbone's Models, Collections, View and Events!
