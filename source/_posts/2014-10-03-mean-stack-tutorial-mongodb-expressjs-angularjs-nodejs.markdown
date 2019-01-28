---
layout: post
title: "MEAN Stack Tutorial MongoDB ExpressJS AngularJS NodeJS (Part III)"
date: 2014-10-03 06:59:34 -0400
updated: 2016-08-06 21:47:53 -0400
comments: true
pageviews__total: 246570
pageviews__recent: 502
pageviews__avg_time: 242
toc: true
#categories: [angularjs, javascript, nodejs, mongodb, mean stack]
photos:
  - /images/mean_small.png
  - /images/mean_large.png
photos__background_color: '#7EBE42'
tutorial__order: 3
tags:
  - angularjs
  - angular 1.x
  - mean stack
  - javascript
  - Tutorial_MEAN-Stack
categories:
  - Technologies
  - Web Development
---
We are going to build a full stack Todo App using the MEAN (MongoDB, ExpressJS, AngularJS and NodeJS). This is the last part of [three-post series tutorial](/tags/Tutorial-MEAN-Stack/).

<!--More-->

MEAN Stack tutorial series:

1. [AngularJS tutorial for beginners (Part I)](/blog/2014/09/28/angularjs-tutorial-for-beginners-with-nodejs-expressjs-and-mongodb/)
1. [Creating RESTful APIs with NodeJS and MongoDB Tutorial (Part II)](/blog/2014/10/01/creating-a-restful-api-tutorial-with-nodejs-and-mongodb/)
1. MEAN Stack Tutorial: MongoDB, ExpressJS, AngularJS and NodeJS (Part III) **👈 you are here**

Before completing the app, let's cover some background about the this stack. If you rather jump to the hands-on part click here to <a href="#start">get started</a>.

# Why MEAN stack?

<a href="#start">TL; DR</a>: NodeJS has been built from bottom up a non-blocking I/O paradigm, which gives you more efficiency per CPU core than using threads in other languages like [Java](http://strongloop.com/strongblog/node-js-is-faster-than-java/).

LAMP (Linux-Apache-MySQL-PHP) has dominated web application stack for many years now. Well-known platforms such as Wikipedia, Wordpress, and even Facebook uses it or started with it. Enterprise, usually, used go down the Java path: Hibernate, Spring, Struts, JBoss. More agile frameworks also have been used such as Ruby on Rails and for Python Django and Pylon.

{% img /images/mean_vs_lamp_stack.png 'LAMP vs MEAN stack' %}

**Ubiquitous**

Well, it turns out, that JavaScript it is everywhere. It used to be limited to browsers. But, now you can found it in smartphones, servers, robots, Arduino, RaspberryPi... Thus, it does not matter what technology you use to build web applications, you need to be familiar with Javascript. In that case, then, it is a time saver to use wherever it fits, especially for building web applications. MEAN stack is embracing that, using Javascript to create end-to-end web applications.
​
**Non-blocking architecture**

JavaScript is a dynamic, object-oriented, and functional scripting language. One of the features that make it win over Java Applets decades ago, it was its lightness and non-blocking event loop.
Blocking means that when one line of code is executing, the rest of it is locked waiting to finish. On the other hand, non-blocking gives to each line of code a shot and then through callbacks it can come back when an event happens.
Programming languages that are blocking (Java, Ruby, Python, PHP, ...) overcomes concurrency using many threads of execution while JavaScript handles it using non-blocking event loop in a single thread.

{% img /images/blocking_vs_non_blocking_io.png  %}

As you can see, a single thread of execution in Node can handle perform multiple tasks vs a non-blocking style that execute each one sequentially. You can read more about it in <a href="[strongloop.com](http://strongloop.com/strongblog/node-js-is-faster-than-java/)" target="_blank">NodeJS faster than Java</a> article.

Some companies like [Paypal](https://www.paypal-engineering.com/2013/11/22/node-js-at-paypal/) moved from Java backend to NodeJS and reported a increased performance, lower average response times, and development speed gains.  Similarly happens to [Groupon](https://engineering.groupon.com/2013/misc/i-tier-dismantling-the-monoliths/) that came from Java/Rails monoliths.

**Agile and vibrant community**

The community behind Javascript is quite vibrant. It has permeated in almost all the fields of technology: data visualization, server-side, databases, robotics, building tools and many more.

<a id="start"></a>
# TODO app with MEAN

In this section are going to put together everything that we learnt in the [two](/blog/2014/09/28/angularjs-tutorial-for-beginners-with-nodejs-expressjs-and-mongodb/) [previous](/blog/2014/10/01/creating-a-restful-api-tutorial-with-nodejs-and-mongodb/) tutorials.

## MEAN Backend with MongoDB, ExpressJS and NodeJS

In the [previous post](/blog/2014/10/01/creating-a-restful-api-tutorial-with-nodejs-and-mongodb/), we have gone through the process of building a RESTful API and we are going to be building on top of that. [Repository here](https://github.com/amejiarosario/todoAPIjs).


```bash Getting the back-end code build on Part II
git clone https://github.com/amejiarosario/todoAPIjs.git
```

## MEAN stack front-end with AngularJS

Similarly, we have build a very lean todoApp in the [first part](/blog/2014/09/28/angularjs-tutorial-for-beginners-with-nodejs-expressjs-and-mongodb/) of this tutorial. You can [download the file](https://gist.githubusercontent.com/amejiarosario/068143b53e54db43ef38/raw/ngTodo.html) to follow along and see it in action [here](https://cdn.rawgit.com/amejiarosario/068143b53e54db43ef38/raw/ngTodo.html). You might notice the angularJS app is very simple and even it is entirely in one file for simplicity sake. In further tutorials, we are going to make it more modular, split in files, add tests and stylesheets.

Let's go first to the ExpressJS app (todoAPIjs) and review the default routing system:

1. `app.js` loads the all the routes.
2. The root path (`/`) is mounted on the `routes/index.js`
3. `routes/index.js` sets the variable title and renders `index.ejs`.

```javascript Tracing ExpressJS index route
// app.js
var routes = require('./routes/index');
app.use('/', routes);

// ./routes/index.js
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

// ./views/index.ejs
    <h1><%= title %></h1>
    <p>Welcome to <%= title %></p>
```

The best place to load our `./views/index.ejs`. So let's copy the body content from ngTodo.html content in there and change in `./routes/index.js` title to "ngTodo App". Don't forget to add ng-app on the top. `<html ng-app="app">`.

[diff](https://github.com/amejiarosario/todoAPIjs/commit/ebf20f4093aa20c867777b4b3db825429b54a20d)

# Wiring up the App

## AngularJS Read with $http

As you might notice, in the factory, we have a fixed array. We need to change it to communicate with the API that we just build.

`$http` is Anguar core sevice that allow to make `XMLHttpRequest` or `jsonp` request. You can either pass an object with http verb and url or call call $http.verb (`$http.get`, `$http.post`).


`$http` returns a promise which has a `success` and `error` function.

```javascript AngularJS $HTTP Usage Example
$http({method: 'GET', url: '/todos'}).
  success(function(data, status, headers, config) {
    // this callback will be called asynchronously
    // when the response is available.
    console.log('todos: ', data );
  }).
  error(function(data, status, headers, config) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    console.log('Oops and error', data);
  });
```

Let's try it out in our app. Go to `views/index.ejs` and do this changes:

```javascript Using $http to retrieve data from database
        // Service
        .factory('Todos', ['$http', function($http){
          return $http.get('/todos');
        }])

        // Controller
        .controller('TodoController', ['$scope', 'Todos', function ($scope, Todos) {
          Todos.success(function(data){
            $scope.todos = data;
          }).error(function(data, status){
            console.log(data, status);
            $scope.todos = [];
          });
        }])
```

[diff](https://github.com/amejiarosario/todoAPIjs/commit/0221aebd62e88445629debe4f132684686cf48ec)

`$http.get` will request data using the `GET` method.

> Try it in your browser!s If you have data from the [previous tutorial](http://adrianmejia.com/blog/2014/10/01/creating-a-restful-api-tutorial-with-nodejs-and-mongodb/#browser-and-postman) you should be able to see it.

To **start the server**, you can use
```bash
npm start
```

or if you have it installed

```bash
nodemon
```

## AngularJS Read with $resource

If you click in one of the Todo elements and get redirected to the detail page, you will not see anything yet. We need to update the `TodoDetailCtrl` first. Even though we already have the GET verb working. We have a different URL requirement for `/todos/:id` for the other methods. There’s an Angular service that has a higher level of abstraction of $http to deal with RESTful requests. It is called `$resource`.

Initialize as:
`$resource(url, [paramDefaults], [actions], options);`

It comes with the following actions already defined; it is missing one though… Can you tell?

```javascript $resource actions
{ 'get':    {method:'GET'},  // get individual record
  'save':   {method:'POST'}, // create record
  'query':  {method:'GET', isArray:true}, // get list all records
  'remove': {method:'DELETE'}, // remove record
  'delete': {method:'DELETE'} }; // same, remove record
```

The instances are used in the following way (examples will come later):

* GET: `Resource.get([parameters], [success], [error])`
* Non-GET: `Resource.action([parameters], postData, [success], [error])`
* Non-GET: `resourceInstance.$action([parameters], [success], [error])`

`$resource` is not part of the Angular core, so it requires to `ngResource` and the dependency. We can get it from the CDN:

```html ngResource dependency
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.25/angular-resource.min.js"></script>
```

This is what need to set it up:

```Javascript $resource.query()
  // add ngResource dependency
  angular.module('app', ['ngRoute', 'ngResource'])

  // ...

        .factory('Todos', ['$resource', function($resource){
          return $resource('/todos/:id', null, {
            'update': { method:'PUT' }
          });
        }])
// ...
        .controller('TodoController', ['$scope', 'Todos', function ($scope, Todos) {
          $scope.todos = Todos.query();
        }])

```

Angular will render an empty `$scope.todos`. but, when `Todos.query()` comes with the data from the server it will re-render the UI.

[diff](https://github.com/amejiarosario/todoAPIjs/commit/2aff6fe004bf7f7b2cd1b91d53e6958c3b158a20)

## AngularJS Create

We will need to create a new text box, a button to send a `POST` request to server and add it to the `$scope`.

> We are using inline templates with `id="/todos.html"` and `id="/todoDetails.html"`. They are not physical files. Just `ng-template` that we create in the [part I](/blog/2014/09/28/angularjs-tutorial-for-beginners-with-nodejs-expressjs-and-mongodb/) of these [tutorial series](/tags/Tutorial-MEAN-Stack/).

Add this code at the bottom of the `id="/todos.html"` template:

```html New textbox for adding Todos
New task <input type="text" ng-model="newTodo"><button ng-click="save()">Create</button>
```

Notice that we are using a new directive `ng-click`, this one executes a function when it clicked. Angular makes sure that the behaviour is consistent across different browsers.


```javascript Save function $resource.$save(...)
.controller('TodoController', ['$scope', 'Todos', function ($scope, Todos) {
  $scope.todos = Todos.query();

  $scope.save = function(){
    if(!$scope.newTodo || $scope.newTodo.length < 1) return;
    var todo = new Todos({ name: $scope.newTodo, completed: false });

    todo.$save(function(){
      $scope.todos.push(todo);
      $scope.newTodo = ''; // clear textbox
    });
  }
}])
```


[diff](https://github.com/amejiarosario/todoAPIjs/commit/46dd14023e2d9eff72d1366dbba9c9c8c872e07b)

## Show Todo details

Every time you click a todo link, it is showing an empty fields. Let's fix that. First we need set the real `_id` to the links instead of `$index`.

```html Change the ID link in the `id="/todos.html"` template (fragment)
<li ng-repeat="todo in todos | filter: search">
  <input type="checkbox" ng-model="todo.completed">
  <a href="#/{{todo._id}}">{{todo.name}}</a>
</li>
```

```javascript Update TodoDetailCtrl with $resource.get
.controller('TodoDetailCtrl', ['$scope', '$routeParams', 'Todos', function ($scope, $routeParams, Todos) {
  $scope.todo = Todos.get({id: $routeParams.id });
}])
```

Notice the change from
`$scope.todo = Todos[$routeParams.id];`
to
`$scope.todo = Todos.get({id: $routeParams.id });`

Now you should be able to see the details :)

[diff](https://github.com/amejiarosario/todoAPIjs/commit/2484107294163a25621fba3785601adb32229ae9)

## AngularJS Update (in-line editing)

This is going to be a very cool feature. Let's meet these new directives:

* **ng-show**: this directive shows the element if the expression evaluates to true. Otherwise, the content is hidden.

* **ng-change**: directive for input elements that evaluates the expression after any change.


Replace the template with `id="/todos.html"` with the following:

```html  Template todos.html
<!-- Template -->
<script type="text/ng-template" id="/todos.html">
  Search: <input type="text" ng-model="search.name">
  <ul>
    <li ng-repeat="todo in todos | filter: search">
      <input type="checkbox" ng-model="todo.completed" ng-change="update($index)">
      <a ng-show="!editing[$index]" href="#/{{todo._id}}">{{todo.name}}</a>
      <button ng-show="!editing[$index]" ng-click="edit($index)">edit</button>

      <input ng-show="editing[$index]" type="text" ng-model="todo.name">
      <button ng-show="editing[$index]" ng-click="update($index)">Update</button>
      <button ng-show="editing[$index]" ng-click="cancel($index)">Cancel</button>
    </li>
  </ul>
  New task <input type="text" ng-model="newTodo"><button ng-click="save()">Create</button>
</script>
```


Now let's change the controller to handle the inline editing:

```javascript Todo Controller
.controller('TodoController', ['$scope', 'Todos', function ($scope, Todos) {
  $scope.editing = [];
  $scope.todos = Todos.query();

  $scope.save = function(){
    if(!$scope.newTodo || $scope.newTodo.length < 1) return;
    var todo = new Todos({ name: $scope.newTodo, completed: false });

    todo.$save(function(){
      $scope.todos.push(todo);
      $scope.newTodo = ''; // clear textbox
    });
  }

  $scope.update = function(index){
    var todo = $scope.todos[index];
    Todos.update({id: todo._id}, todo);
    $scope.editing[index] = false;
  }

  $scope.edit = function(index){
    $scope.editing[index] = angular.copy($scope.todos[index]);
  }

  $scope.cancel = function(index){
    $scope.todos[index] = angular.copy($scope.editing[index]);
    $scope.editing[index] = false;
  }
}])
```

We added a new variable `$scope.editing` which shows or hides the form to edit the values. Furthermore, notice ng-click functions: edit, update and cancel.

> Let's see what they do. Try it out!

While were are editing notice that we copy the original todo task into the editing variable. This server for two purposes:

1. It evaluates to `true` and show the forms with `ng-show`

2. It holds a copy of the original value in case we press cancel.

Now, going to the Todo Details. We would like that to be updated as well and add notes.

```html Todo Details
<script type="text/ng-template" id="/todoDetails.html">
  <h1>{{ todo.name }}</h1>
  completed: <input type="checkbox" ng-model="todo.completed"><br>
  note: <textarea ng-model="todo.note"></textarea><br><br>

  <button ng-click="update()">Update</button>
  <a href="/">Cancel</a>
</script>
```

Similarly, we added an update method. However, this time we do not need to pass any index, since it is just one todo at a time. After it has been saved, it goes back to root path `/`.

```javascript TodoDetailCtrl controller
.controller('TodoDetailCtrl', ['$scope', '$routeParams', 'Todos', '$location', function ($scope, $routeParams, Todos, $location) {
  $scope.todo = Todos.get({id: $routeParams.id });

  $scope.update = function(){
    Todos.update({id: $scope.todo._id}, $scope.todo, function(){
      $location.url('/');
    });
  }
}])
```

> Awesome! Time to check it out in the browser!

`$location.url([url])` is a getter/setter method that allows us to change url, thus routing/view.

[diff](https://github.com/amejiarosario/todoAPIjs/commit/b6394448e1e1e8384815877df764507d6562dc4d)

## AngularJS Delete

These are the changes added to perform the remove functionality:

A. Add removes button in the `li` element:
```html todos.html Template
<button ng-show="!editing[$index]" ng-click="remove($index)">remove</button>
```
Do the same for the details Template

```html todoDetails.html Template
<button ng-click="remove()">Remove</button>
```

B. Add remove functionality in the controllers
```javascript TodoController
$scope.remove = function(index){
  var todo = $scope.todos[index];
  Todos.remove({id: todo._id}, function(){
    $scope.todos.splice(index, 1);
  });
}
```
And also in the details controllers

```javascript todoDetails controller
$scope.remove = function(){
  Todos.remove({id: $scope.todo._id}, function(){
    $location.url('/');
  });
}
 ```


When we remove elements from the todos array `$scope.todos.splice(index, 1)` they also disappear from the DOM. Very cool, huh?

[diff](https://github.com/amejiarosario/todoAPIjs/commit/b9ff3a863c78d72e71b5cc9eb573bb3cb9d87179)

> **Congratulations! You are now a MEAN developer!**

# What's next?

Learn how to use GruntJS to automate repetitive tasks in your MEAN Stack workflow.

[GruntJS Tutorial](/blog/2014/10/07/grunt-js-tutorial-from-beginner-to-ninja/)

Also, you can learn more about full-stack framework solutions.

## Full-Stack Javascript Web Frameworks

What we did in these three series tutorial could have been done with just few keystrokes in the comamnd line ;). However, it's good to know what's going on. But at this point you do. So, I will introduce you to some frameworks that can save you a lot of time.

**Using MEAN.io**

[MeanIO](http://mean.io) uses a customized CLI tool: ‘mean’. Its approach for modularity is leaned towards self-contained packages that have code for both client and server files. At moment of writing this, it has nine packages ranging from MEAN-Admin, Translation, file uploads, image crop and more.

**Using MEAN.js**

[MeanJS](http://meanjs.org/) it is a fork from the creator of MEAN.IO, it uses Yeoman generators to generate Angular’s CRUD modules, routes, controllers, views, services, and more. Also has generators for Express: models, controllers, routes and tests. It has excellent documentation.

## Others Frameworks to look at

* [Meteor](https://www.meteor.com/) - Meteor is an open-source platform for building top-quality web apps in a fraction of the time, whether you're an expert developer or just getting started.
* [Sails](http://sailsjs.org/) - The web framework of your dreams.
for your next web application.
* [Yahoo! Mojito](https://developer.yahoo.com/cocktails/mojito/) - A JavaScript MVC framework for mobile applications, one of the Yahoo! Cocktails.
* [Tower.js](http://towerjs.org) - Small components for building apps, manipulating data, and automating a distributed infrastructure.
