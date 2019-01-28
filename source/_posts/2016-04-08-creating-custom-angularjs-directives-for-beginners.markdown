---
layout: post
title: "Creating custom AngularJS directives for beginners"
date: 2016-04-08 16:41:32 -0400
updated: 2016-04-08 16:41:32 -0400
comments: true
toc: true
pageviews__total: 30395
pageviews__recent: 669
pageviews__avg_time: 343
photos:
  - /images/angularjs_directives_small.png
  - /images/angularjs_directives_large.png
photos__background_color: '#B12928'
tutorial__order: 0
tags:
  - angularjs
  - angular 1.x
  - javascript
categories:
  - Technologies
  - Web Development
---

Directives are one of the most important concepts to understand Angular. This tutorial takes through the basics and beyond. We will cover how to build your own HTML extensions through directives.

<!-- More -->

Angular framework relies heavily on them to teach the browser new HTML tags. Directives are a powerful tool to create reusable web components. Directives not only could be defined as new HTML tags but also as attributes, CSS classes or even HTML comments. Angular comes with many built-in (core) directives that offer numerous functionalities to your web applications right away. Furthermore, it also allows us to define our own through custom directives. We are going to focus on the later.

Let's say we want to create a new HTML component that the browsers doesn’t support yet, like a To-do list:

```html
<my-todo list="todo" title="Angular Todo"></my-todo>
```

If you paste that code in any browser, it will not do much. We need to use Angular to teach the browser how to interpret this new HTML element called “my-todo”. We do this by defining a new directive with its attributes.

Let’s initialize our app and define our new directive:

Create a new file called “script.js”

```javascript script.js
var app = angular.module('myApp', []);

app.directive('myTodo', function(){
    return {
      restrict: 'EA',
      templateUrl: 'todo.tpl.html',
      scope: {
        list: '=',
        title: '@'
      }
    };
  });
```

Don’t get scared if you don’t understand what’s going on right now. By the end of this tutorial, you will be able to know what each line is doing.

In the first line, we initialize an angular module called “myApp”.  That will return an “app” instance where we can start defining our Angular app.

We start by adding a directive called “myTodo”, notice that is different from “my-todo” that we used in the HTML code above. That’s because, by convention in HTML, tags names words are separated by a hyphen like “my-todo”. On the other hand, in Angular they match the same element with words joint together and capitalizing the beginning of each word, except the first one “myTodo”. This style of joining words is known as “camelCase”.

You will notice that a directive, takes a name “myTodo” and function. The later returns an object with a number of attributes depending on what we would like to accomplish.  In our case, we have three attributes: restrict, templateUrl, and scope. Let’s explain each one in that exact order.

# Restrict

The "restrict" attribute tells Angular, with one letter, how are we going to create our new directive. It can take four different values 'E', 'A', 'C', 'M' or combination of them like ‘EA’. Each one has it’s own meaning:

| Restrict | Meaning                                                                                                                | Example |
|----------|------------------------------------------------------------------------------------------------------------------------|---------|
| E        | Implies we are going to use our directive as a new HTML element.                                                       |`<my-todo list="todo" title="Element"> </my-todo>`     |
| A        | Means that our directive is going to take over any HTML element that has an attribute that matches our directive name. |`<div my-todo list="todo" title="Attr"> </div>`         |
| C        | Indicates that our directive will be found in CSS classes.                                                             |`<div class="my-todo" list="todo" title="Class"> </div>`         |
| M        | Matches HTML comments.                                                                                                 |`<!--directive:my-todo attributes goes here-->`         |

Taking our To-do example, with the combined value ‘EA’, means that will match any element with our directive as an attribute, and also, it will match any element defined as “<my-todo>”

It is a good practice only to use restrict to either 'E' or 'A' or both. Classes 'C' and comments 'M' could be easily misinterpreted. That’s why we are using just EA.



# Template

Templates are just HTML code that could be reuse multiple times with different values or text. In order to be generic enough, they use placeholders tied to variables that could be easily replaced. Let’s create the “todo.tpl.html” with the following content:

```html todo.tpl.html
  <h1>{{title}}</h1>
  <div ng-repeat="todo in list">
    <input type="checkbox" ng-model="todo.completed"> {{todo.name}}
  </div>
```


Notice that our template contains placeholders with a variable such as {{title}}, which is going, to be replaced by real title text. Similarly, {{todo.name}} is going to be replaced with a task name.

We just used our first built-in Angular directive, in this tutorial, “ng-repeat”. This directive is going to take an array of elements, like our list and repeat itself for each one of elements and refer to them as “todo”. In other words, if the list contains 4 tasks, we are going to see 4 checkboxes each one with the name of the individual tasks. We are going to explain where “title” and “list” comes in the next section.

Going back to our directive definition, we could have used "template" attribute instead of “templateUrl” and take inline html code directly, but often is hard to read and we would prefer to use “templateUrl” and defined as a separated file.

As you might figure it out, “templateUrl” takes the name of the file containing the template. If all templates and code are in the same directory just the name of the file will do. If they are in a different folder you will need to specify the full path to reach it. To keep it simple, we are going to have all files in a single directory.

# Scope

Scopes are key concept to understand Angular. Scope is what glues JavaScript code with HTML and allow us to replace placeholders from templates with real values.

In our directive definition, we are creating a new “isolated scope” with two elements:

```javascript Isolated scope
  scope: {
    list: '=',
    title: '@'
  }
```

If you remember from our template, these are exactly the two placeholders that we had “title” and “list”. The symbols = and @ looks a little mysterious but they are not too cryptic once we know what they mean.

  - `@` Implies that the value of the attribute with the same name in the HTML element will be passed as a string. For instance, <my-todo title="The Directive"></my-todo>, will replace {{title}} in our template for “The Directive”.
  - `=` Binds to the value of the expression and to the literal value. This means that if we have an attribute list=“todo” and “todo” is equal to 5, then it will be replaced to 5 and not to the literal text “todo”. In our case, "todo" is going to be an array of tasks.

Bear in mind, that in Angular we can have multiple scopes. So, our directives could be influenced by outer scopes. For instance, another scope could define “todo” as an array of elements. Here is where we introduce another important concept: controllers.


# Controllers
The main purpose of controllers is to set initial values the scope and also add behavior through functions. We are going to use a controller to define the “todo” list that we want to render with our newly created directive.

The way we create controllers is by attaching the controller to our Angular app instance. Let’s go back to script.js and append the following:

```javascript script.js
  app.controller('main', function($scope){
    $scope.todo = [
      {name: 'Create a custom directive', completed: true},
      {name: 'Learn about restrict', completed: true},
      {name: 'Master scopes', completed: false}
    ];
  });
```

Noticed that we defined our controller with the name “main” and pass along a function with the “$scope” parameter. This is important since, whatever we attach to the “$scope” variable it will become available in templates and other directives. We just defined our todo list as an array of objects with two properties name and completed.

# To-do directive

So far, we have been preparing the grounds for our directive. We have created:
  - “myApp” module
  - “myTodo” directive
  - “todo.tpl.html” template
  - “main” controller

Now, is the time to put everything together and make it work!

Let’s create an index.html page with the following:

```html index.html
  <!DOCTYPE html>
  <html>

    <head>
      <script data-require="angular.js@1.5.0" data-semver="1.5.0" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.0/angular.js"></script>
     <script src="script.js"></script>
    </head>

    <body ng-app="myApp">

      <div ng-controller="main">
    <my-todo list="todo" title="Angular To-do"></my-todo>
      </div>

    </body>
  </html>
```

We add the AngularJS library first and then initialize the app using the built-in directive “ng-app”. Notice that this must match to module that we created “myApp” or it won’t work.

Later, we reference our controller using another core directive called “ng-controller”. Similarly to ng-app, it also takes a value that should match the one we defined, in this case “main” controller.  This main controller defines our “todo” as an array of tasks with names and whether they have been completed or not.

Finally, we start using our new directive! It takes two attributes the title and a list. If you remember, we defined a template inside the directive definition, so it knows how to render the content.

That’s all you need to make it work. Now try it!

<iframe style="width: 100%; height: 400px;" src="//embed.plnkr.co/7ZDRclRJaJyTtRBKjIa3/" frameborder="0" allowfullscren="allowfullscren"></iframe>


# Next steps

By now you should be looking at our new To-do list. We can reuse this new directive with new to-do lists as many times as we want. Just passing different values to “list” in our “my-todo” the browser will be able to render it for us. We can also define another controller with a different $scope.todo and our directive will respond accordantly.

We just walked through the main attributes to create directives and discuss how to use them. We learnt how to isolate the scope of our directive and just allow certain parameters into our templates such as “list” and “title”. Also, used the “restrict” attribute to allow our directive be created either as a new HTML element or as an attribute. Finally, we explore how to use templates and bind it with our scope variables.

## Related Posts

  - [AngularJS Tutorial for Beginners](/blog/2014/09/28/angularjs-tutorial-for-beginners-with-nodejs-expressjs-and-mongodb/)
  - [Angular and Node tutorial](/blog/2014/10/03/mean-stack-tutorial-mongodb-expressjs-angularjs-nodejs/)
