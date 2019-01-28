---
layout: post
title: "AngularJS tutorial for beginners with NodeJS ExpressJS and MongoDB (Part I)"
date: 2014-09-28 23:50:24 -0400
updated: 2016-08-06 19:31:57 -0400
comments: true
toc: true
pageviews__total: 623940
pageviews__recent: 2191
pageviews__avg_time: 1042
photos__background_color: '#25A9DD'
bitly: 'http://bit.ly/angular-4-beginners'
photos:
  - /images/AngularJSTutorial_small.png
  - /images/AngularJSTutorial_large.png
tutorial__order: 1
tags:
  - angular
  - angular 1.x
  - javascript
  - Tutorial_MEAN-Stack
alias: /blog/2014/09/28/angularjs-tutorial-for-begineers-with-nodejs-expressjs-and-mongodb/
categories:
  - Technologies
  - Web Development
---

This tutorial is meant to be as clear as possible. At the same time, we are going to cover the concepts that you will need most of the time. All the good stuff without the fat :)

<!--More-->

MEAN Stack tutorial series:

1. AngularJS tutorial for beginners (Part I) **👈 you are here**
1. [Creating RESTful APIs with NodeJS and MongoDB Tutorial (Part II)](/blog/2014/10/01/creating-a-restful-api-tutorial-with-nodejs-and-mongodb/)
1. [MEAN Stack Tutorial: MongoDB, ExpressJS, AngularJS and NodeJS (Part III)](/blog/2014/10/03/mean-stack-tutorial-mongodb-expressjs-angularjs-nodejs/)

We are going to start building all the examples in a single HTML file! It embedded JavaScript and NO styles/CSS for **simplicity**. Don't worry, in the next tutorials, we will learn how to split use Angular modules. We are going to break down the code, add testing to it and styles.


# What is Angular.js?

Angular.js is a MVW (Model-View-Whatever) open-source JavaScript web framework that facilitates the creation of single-page applications (SPA) and data-driven apps.

## AngularJS vs jQuery vs BackboneJS vs EmberJS

<a href="#start">TL; DR</a>: AngularJS is awesome for building testable single page applications (SPA). Also, excel with data-driven and CRUD apps. <a href="#start">Show me the code!.</a>

AngularJS motto is

> HTML enhanced for web apps!

It extends standard HTML tags and properties to bind events and data into it using JavaScript. It has a different approach to other libraries. jQuery, Backbone.Js, Ember.js and similar… they are more leaned towards “Unobtrusive JavaScript”.

Traditional JavaScript frameworks, use IDs and classes in the elements. That gives the advantage of separating structure (HTML) from behavior (Javascript). Yet, it does not do any better on code complexity and readability. Angular instead declares the event handlers right in the element that they act upon.

Times have changed since then. Let’s examine how AngularJS tries to ease code complexity and readability:


* **Unit testing** ready: JavaScript is, usually, hard to unit test. When you have DOM manipulations and business logic together (e.g. jQuery based code). AngularJS keeps DOM manipulation in the HTML and business logic separated. Data and dependencies are `$injected` as needed.
* **DOM manipulation** where they are used. It decouples DOM manipulation from application logic.
* AngularJS is also excellent for **single-page applications (SPA)**.
* Different **browsers implement** features differently, but fret not. Angular's directive (or HTML extensions) take care of the differences for you.
* **Global namespace** expressions and methods definitions are scoped within controllers. So, they do not pollute the global namespace.
* **Data models** are plain old JavaScript objects (POJO).
* Write less code: AngualarJS features save you from much boilerplate code.
* AngularJS provides solutions for writing modular code and dependencies management.

Without further ado, let’s dive in!

<a id="start"></a>

# AngularJS Main Components

AngularJS has an <a href="https://docs.angularjs.org/api" target="_blank">extensive API</a> and components. In this tutorial we are going to focus on the most important ones, such as directives, modules, services, controllers and related concepts.

## AngularJS Directives

The first concept you need to know about AngularJS is what are directives.

**Directives** are extensions of HTML markups. They could take the form of attributes, element names, CSS class and or even HTML comments. When the AngularJS framework is loaded, everything inside `ng-app` it’s compiled. The directives are bound to data, events, and DOM transformations.

Notice in the following example that there are two directives: ng-app and ng-model.

Notice in the following example that there are two directives: `ng-app` and `ng-model`.

```html Hello World in AngularJS http://codepen.io/amejiarosario/pen/KdLaq
<html ng-app>
<head>
  <title>Hello World in AngularJS</title>
</head>
<body>

<input ng-model="name"> Hello {{ name }}

<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.25/angular.min.js"></script>
</body>
</html>
```

We going to learn about some of the main built-in directives as we go:

* **ng-app**: is a directive that bootstraps AngularJS. It designates the caller element as the root. It’s usually placed on `<html>` or `<body>`.

* **ng-model**: is a directive that binds usually form elements. For instance, `input`, `select`, `checkboxes`, `textarea`. They keep data (model) and visual elements (HTML) in sync.

* **{% raw  %}{{ name }}{% endraw %}** `{% raw  %}{{ }}{% endraw %}` are a way of binding models to elements in HTML. In the example above, the `ng-model` name is bound to the placeholder `{% raw  %}{{ name }}{% endraw %}`. Play with the example below to see how the placeholder is updated real-time to whatever you type in the textbox.

Data binding AngularJS example:

<p data-height="268" data-theme-id="0" data-slug-hash="KdLaq" data-default-tab="result" data-user="amejiarosario" class='codepen'>See the Pen <a href='http://codepen.io/amejiarosario/pen/KdLaq/'>KdLaq</a> by Adrian Mejia (<a href='http://codepen.io/amejiarosario'>@amejiarosario</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

You can create your own directives. Checkout the this tutorial for more: [creating-custom-angularjs-directives-for-beginners](/blog/2016/04/08/creating-custom-angularjs-directives-for-beginners/). It will go deeper into directives.

## AngularJS Data Binding

**Data binding** is an AngularJS feature that synchronizes your model data with your HTML. That’s great because models are the "single source of truth". You do not have to worry about updating them. Here’s a graph from <a href="http://docs.angularjs.org" target="_blank">docs.angularjs.org</a>.

{% img /images/Two_Way_Data_Binding.png Two Data Binding in Angular Templates %}

Whenever the HTML is changed, the model gets updated. Wherever the model gets updated it is reflected in HTML.

## AngularJS Scope

`$scope` it is an object that contains all the data to which HTML is bound. They are the glue your javascript code (controllers) and the view (HTML). Everything that is attached to the `$scope`, it is  `$watch`ed by AngularJS and updated.

Scopes can be bound to javascript functions. Also, you could have more than one `$scope` and inherit from outer ones. More on this, in the controller's section.

## AngularJS Controllers

Angular.js **controllers** are code that "controls" certain sections containing DOM elements. They encapsulate the behavior, callbacks and glue `$scope` models with views. Let's see an example to drive the concept home:

```html AngularJS Controller Example http://codepen.io/amejiarosario/pen/spuCm
<body ng-controller="TodoController">
  <ul>
    <li ng-repeat="todo in todos">
      <input type="checkbox" ng-model="todo.completed">
      {% raw  %}{{ todo.name }}{% endraw %}
    </li>
  </ul>

  <script>
    function TodoController($scope){
      $scope.todos = [
        { name: 'Master HTML/CSS/Javascript', completed: true },
        { name: 'Learn AngularJS', completed: false },
        { name: 'Build NodeJS backend', completed: false },
        { name: 'Get started with ExpressJS', completed: false },
        { name: 'Setup MongoDB database', completed: false },
        { name: 'Be awesome!', completed: false },
      ]
    }
  </script>
</body>
```

AngularJS controller interactive example:

<p data-height="268" data-theme-id="0" data-slug-hash="spuCm" data-default-tab="result" data-user="amejiarosario" class='codepen'>See the Pen <a href='http://codepen.io/amejiarosario/pen/spuCm/'>spuCm</a> by Adrian Mejia (<a href='http://codepen.io/amejiarosario'>@amejiarosario</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

As you might notice we have new friends: `ng-controller`, `ng-repeat` and `$scope`.

* **`ng-controller`** is a directive that tells angular what function controller to use for a particular view. Every time AngularJS loads, it reads the `ng-controller` argument (in this case "TodoController"). Then, it will look for a function in plain old javascript object (POJO) with the same name or for `angular.controller` matching name.

* **`$scope`** As mentioned earlier `$scope`'s are the glue between the data models in the controllers and the views. Take a look to our "TodoController" it has a parameter named `$scope`. AngularJS is going to pass (`$inject`) that parameter, and whatever you attach to it, it will be available in the view. In this example is the particular is the `todos` array of objects.

* **`ng-repeat`** as its name implies, it is going to “repeat” the element and sub-elements where this directive is declared. It is going to iterate for each element in the `$scope.todos` array.

* **`ng-model`** notice that the checkbox is bound to the `todo.completed`. If `todo.completed` is true, then the checkbox is going to be checked and vice versa.

## AngularJS Modules

Modules are a way to encapsulate different parts of your application. They allow reusing code in other places.  Here's an example of how to rewrite our controller using modules.

```javascript AngularJS Module Example http://codepen.io/amejiarosario/pen/spuCm
angular.module('app', [])
  .controller('TodoController', ['$scope', function ($scope) {
    $scope.todos = [
      { title: 'Learn Javascript', completed: true },
      { title: 'Learn Angular.js', completed: false },
      { title: 'Love this tutorial', completed: true },
      { title: 'Learn Javascript design patterns', completed: false },
      { title: 'Build Node.js backend', completed: false },
    ];
  }]);
```

Notice the `<html ng-app="app">` in the example below

<p data-height="268" data-theme-id="0" data-slug-hash="uFfqG" data-default-tab="result" data-user="amejiarosario" class='codepen'>See the Pen <a href='http://codepen.io/amejiarosario/pen/uFfqG/'>uFfqG</a> by Adrian Mejia (<a href='http://codepen.io/amejiarosario'>@amejiarosario</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

Using modules brings many advantages. They can be loaded in any order, and parallel dependency loading. Also, tests can only load the required modules and keep it fast, clear view of the dependencies.

## AngularJS Templates

Templates contain HTML and Angular elements (directives, markup, filters or form controls). They can be cached and referenced by an id.

Here's an example:

```html AngularJS Template Example https://gist.github.com/amejiarosario/eebd176cb1796769ec2b download
  <script type="text/ng-template" id="/todos.html">
    <ul>
      <li ng-repeat="todo in todos">
        <input type="checkbox" ng-model="todo.completed">
        {{ todo.name }}
      </li>
    </ul>
  </script>
```

Does the code inside looks familiar? ;)

Notice they are inside the `script` and has a type of `text/ng-template`.

## AngularJS Routes (ngRoutes)

ngRoutes module allows changing what we see in the app depending on the URL (route). It, usually, uses templates to inject the HTML into the app.

It does not come with AngularJS core module, so we have to list it as a dependency. We are going to get it from Google CDN:

`<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.25/angular-route.min.js"></script>`

**NEW FEATURE**: add notes to the todo tasks. Let's start with the routes!

```javascript
angular.module('app', ['ngRoute'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/todos.html',
        controller: 'TodoController'
      });
  }]);
```


<p data-height="268" data-theme-id="0" data-slug-hash="CmnFH" data-default-tab="result" data-user="amejiarosario" class='codepen'>See the Pen <a href='http://codepen.io/amejiarosario/pen/CmnFH/'>CmnFH</a> by Adrian Mejia (<a href='http://codepen.io/amejiarosario'>@amejiarosario</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

* First notice that we removed `ng-controller="TodoController"` from the body tag. The controllers are now called based on the route.

* `ngView` is a directive used by `$routeProvider` to render HTML into it. Every time the URL changes, it will inject a new HTML template and controller into ngView.

## AngularJS Services (Factories)

Notice that if you want to create a 2nd controller and share $scope.todos it is not possible right now. That is when services become handy. Services are a way to inject data dependencies into controllers. They are created through factories. Let's see it in action:

```javascript AngularJS Service Factory Example
  angular.module('app', ['ngRoute'])

    .factory('Todos', function(){
      return [
        { name: 'AngularJS Directives', completed: true },
        { name: 'Data binding', completed: true },
        { name: '$scope', completed: true },
        { name: 'Controllers and Modules', completed: true },
        { name: 'Templates and routes', completed: true },
        { name: 'Filters and Services', completed: false },
        { name: 'Get started with Node/ExpressJS', completed: false },
        { name: 'Setup MongoDB database', completed: false },
        { name: 'Be awesome!', completed: false },
      ];
    })

    .controller('TodoController', ['$scope', 'Todos', function ($scope, Todos) {
      $scope.todos = Todos;
    }])
```

We are now injecting the data dependency `Todo` into the controllers. This way we could reuse the data to any controller or module that we need to. This is not only used for static data like the array. But we could also do server calls using `$http` or even RESTful  `$resource`.

Let's say we want to show the details of the task when we click on it. For that, we need to create a 2nd controller, template, and route that uses this service:

<p data-height="268" data-theme-id="0" data-slug-hash="pGkhg" data-default-tab="result" data-user="amejiarosario" class='codepen'>See the Pen <a href='http://codepen.io/amejiarosario/pen/pGkhg/'>pGkhg</a> by Adrian Mejia (<a href='http://codepen.io/amejiarosario'>@amejiarosario</a>) on <a href='http://codepen.io'>CodePen</a>.</p>


(NOTE: Click on the links and it will take you to the todo details. Use backspace key to go back to the main menu)


This is what is happening:

1. In the `HTML` tab, we created a second template `/todoDetails.html` which contains the todo details we want to show.
2. Also, in our previous template `/todos.html` we want to have a link that points to the `todo` detail. We are using the `$index` which is the corresponding order number in a `ng-repeat`.
2. In the `JS` tab, we created a new `$routeProvider` . It points to a new controller `TodoDetailCtrl` and the template that we created on #1. The `:id` parameter it is accessible in the controllers through `$routeParams`.
3. We Created the new controller `TodoDetailCtrl`. Also, we injected the dependencies which are `$scope`, `Todos` (factory), and `$routeParams` which will have the `id` param.
4. Set the `$scope` in the new controller. Instead of using the whole array, we are going to select only the one that we need using the `id` that we set in step #2.

NOTE: in codepen, you will not see the URL. If you want to see it changing, you can download the whole example an open it from <a href="https://gist.github.com/amejiarosario/f0a82c7a0eec4786f1c9" target="_blank">here</a>.

## AngularJS Filters

Filters allow you to format and transform data. They change the output of expressions inside the curly braces. AngularJS comes with a bunch of useful filters.

**Built-in Filters**:

* *filter*: search for a given string in an array and return matches.
* *Number*: adds comma-separated 1000's and two decimal places.
* *Currency*: the same as *Number* and adds a $ in front.
* *Date*: takes a Unix timestamp (e.g. 1288323623006) or date string and output it in the format that you specify (e.g. 'longDate' or fragments 'yyyy' for a four-digit year). For a full list see <a href="https://docs.angularjs.org/api/ng/filter/date" target="_blank">here</a>.
* *JSON*: converts javascript objects to JSON strings.
* *lowercase*/*uppercase*: converts strings to lowercase/uppercase.
* *limitTo*: number of elements from an array to show.
* *orderBy*: order array of objects by a key that you specify.

**Note** you can also chain many filters and also define your own filters.

<p data-height="268" data-theme-id="0" data-slug-hash="tyuDK" data-default-tab="result" data-user="amejiarosario" class='codepen'>See the Pen <a href='http://codepen.io/amejiarosario/pen/tyuDK/'>tyuDK</a> by Adrian Mejia (<a href='http://codepen.io/amejiarosario'>@amejiarosario</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

> **NEW FEATURE**: Search todo tasks by name. Let's use a filter to solve that problem.

```html
  <script type="text/ng-template" id="/todos.html">
    Search: <input type="text" ng-model="search.name">
    <ul>
      <li ng-repeat="todo in todos | filter: search">
        <input type="checkbox" ng-model="todo.completed">
        <a href="#/{{$index}}">{{todo.name}}</a>
      </li>
    </ul>
  </script>
```

Notice that we are using `search.name` in the `ng-model` for search. That will limit the search to the `name` attribute and `search.notes` will look inside the notes only. Guest what `search` would do then? Precisely! It searches in all the attributes. Fork the following example and try it out:

<p data-height="268" data-theme-id="0" data-slug-hash="ahwbz" data-default-tab="result" data-user="amejiarosario" class='codepen'>See the Pen <a href='http://codepen.io/amejiarosario/pen/ahwbz/'>ahwbz</a> by Adrian Mejia (<a href='http://codepen.io/amejiarosario'>@amejiarosario</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

# What's next?

Congrats! You have completed part 1 of this [3 part series](/tags/Tutorial-MEAN-Stack/). We are going to build upon the things learned in here, in the next post we are going to setup a backend in NodeJS and MongoDB and connect it to AngularJS to provide a full featured CRUD app. Continue with:

* Part II - [NodeJS/ExpressJS and MongoDB/Mongoose](/blog/2014/10/01/creating-a-restful-api-tutorial-with-nodejs-and-mongodb/)

* Part III - [MEAN Stack: Wiring all together](/blog/2014/10/03/mean-stack-tutorial-mongodb-expressjs-angularjs-nodejs/)

I also have created BackboneJS tutorials check it out:

* [BackboneJS Tutorials](/blog/categories/backbonejs)

### ng-test

Congrats, you have reached this far! It is time to test what you have learned. Test-Driven Learning (TDL) ;). Here's the challenge: open <a href="https://gist.githubusercontent.com/amejiarosario/26751cb85d088fd59c28/raw/c2dde0797c8d47d359c2137fc9a15a9228c272ca/index.html" target="_blank">this file</a> on your favorite code editor. Copy the boilerplate code and built the full app that we just build in the previous examples. Of course, you can take a peek from time to time if you get stuck ;)

Download this file as...:

[index.html](https://gist.githubusercontent.com/amejiarosario/26751cb85d088fd59c28/raw/c2dde0797c8d47d359c2137fc9a15a9228c272ca/index.html)

-OR-

Fork and edit online:

<p data-height="268" data-theme-id="0" data-slug-hash="degzC" data-default-tab="result" data-user="amejiarosario" class='codepen'>See the Pen <a href='http://codepen.io/amejiarosario/pen/degzC/'>degzC</a> by Adrian Mejia (<a href='http://codepen.io/amejiarosario'>@amejiarosario</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

### ng-solution

This is the full solution and you can see it <a href="https://cdn.rawgit.com/amejiarosario/068143b53e54db43ef38/raw/b703b591bc84f2d59a2a483169294e2fb232419d/ngTodo.html#/" target="_blank">live in here</a>.

{% gist 068143b53e54db43ef38 %}

<script async src="//codepen.io/assets/embed/ei.js"></script>
