---
layout: post
title: 'Angular 2 Tutorial: Create a CRUD App with Angular CLI and TypeScript'
comments: true
toc: true
pageviews__total: 70902
pageviews__recent:  478
pageviews__avg_time: 288
tutorial__order: 0
photos__background_color: '#DD3229'
photos:
  - /images/angular-2-tutorial-angular-cli-small.png
  - /images/angular-2-tutorial-angular-cli-large.png
tags:
  - angular 2
  - javascript
categories:
  - Programming
  - Web Development
date: 2016-10-01 17:16:03
updated: 2016-10-01 17:16:03
---

This tutorial gets you off the ground with Angular 2. We are going to use the official CLI (command line) tool to generate boilerplate code.


# Prerequisites

This tutorial is targeted to people familiar with JavaScript and HTML/CSS. You also will need:

- Node.js up and running.
- NPM (Node package manager) or Yarn installed.

You can verify by typing:
```bash
node --version
npm --version
```

If you get the versions Node 4.x.x and NPM 3.x.x. or higher you are all set. If not you have to get the latest versions.

Let's move on to Angular. We are going to create a Todo app. We will be able to CRUD (create-read-update-delete) tasks:

- Live Demo: [Angular 2 Todo app preview](http://adrianmejia.com/angular2-todo-app/all)
- Repository [angular2-todo-app](https://github.com/amejiarosario/angular2-todo-app)

# Understanding ng new

Angular CLI is the best way to get us started. We can download the tool and create a new project by running:

```bash
# install angular-cli globally
npm i -g angular-cli@1.0.0-beta.17

# create a new project
ng new Todos2 --style=scss
```

**Note** The last command takes some minutes. Leave it running and continue reading this tutorial.

The command `ng new` will do a bunch of things for us:

 1. Initialize a git repository
 1. Creates an `package.json` files with all the Angular dependencies.
 1. Setup TypeScript, Webpack, Tests (Jasmine, Protractor, Karma). Don't worry if you don't what they are. We are going to cover them later.
 1. It creates the `src` folder with the bootstrapping code to load our app into the browser
 1. Finally, it does an `npm install` to get all the packages into `node_modules`.

Let's run the app!

```bash
# builds the app and run it on port 9000
ng serve ---port 9000
```

Open your browser on http://localhost:9000/ and you should see "Loading..." and then it should switch to "app works!". Awesome!

Now let's dive into the `src` folder and get familiarized with the structure.

## package.json

Open the `package.json` file and take a look at the dependencies. We have all the angular dependencies with the prefix `@angular/...`. There are other dependencies that are needed for Angular 2 to run, such as RxJS, Zone.js, and some others. We are going to cover them in their own posts.

## src/index.html

We are building a SPA (single page application) so everything is going to be loaded into the `index.html`. Let's take a look in the `src/index.html`. It's pretty standard HTML5 code, except for two elements that are specific for our app:

1. `<base href="/">`
1. `<app-root>Loading...</app-root>`

`base href` is needed for Angular 2 routing to work properly. We are going to cover Routing in its own chapter.

`<app-root>` this is not a standard HTMl tag. It's actually defined by our Angular App. It's an Angular **component**. More on this later.

## src/main.ts

This is the part where our application starts bootstrapping (loading). Angular 2 can be used not just in browsers, but also on other platforms such as mobile apps or even desktop apps. So, when we start our application we have to specify what platform we want to target. That's why we import: `platform-browser-dynamic`. Notice that we are also importing the `AppModule` from `./app`.

The most important line is:

```javascript
platformBrowserDynamic().bootstrapModule(AppModule);
```

We are loading our `AppModule` into browser platform. Now, let's take a look at the `./app/index.ts` directory.

## App directory

Every time we import from a directory (e.g. `./app/`). The `index` file will be loaded. In our case `./app/index.ts`. This file only loads up other modules from our app directory such as `app.component` and `app.module`. Let's go to each of them in turn.

### app.module.ts

We are going to be using this file often. The most important part is the metadata inside the `@NgModule`. There we have `declarations`, `imports`, `providers` and `bootstrap`.

- Declarations: goes all your components (e.g. AppComponent, TodoComponent)
- Imports: routes and modules go here.
- Bootstrap: list the component you want to load when the app starts. In our case is `AppComponent`.

### app.component.ts

This looks a little similar to the app module, but instead of `@NgModule` we have `@Component`. Again, the most important part is the value of the attributes (metadata). We have `selector`, `templateUrl` and `styleUrls`. This what they mean:

-  `selector`: is the name of the component. Remember that we had `<app-root>Loading...</app-root>`? This is where is defined.
`templateUrl`: This is where the HTML code is. `<app-root>` will be replaced for whatever you have in the template.
- `styleUrls`: You can have styles that only applies to this component. This is pretty neat! You can change the styles with confidence knowing that it won't bleed to other parts of the website.

Inside the `AppComponent` class you can define variables (e.g. `title`) that are used in the templates (e.g. `{{title}}`).

> Let's change the title from `app works!` to `Todo`.

Test your changes running:

```bash
ng serve ---port 9000
```

You should see `Todo`.

<a target="_blank" href="https://github.com/amejiarosario/angular2-todo-app/commit/879e347fab40d8a42c4d315ba5b04680b6190391">[changes diff]</a>

# Creating a new Component with Angular CLI

Let's create a new component to display the tasks. We can easily create by typing:

```bash
ng generate component todo
```

This command will create a new folder with 4 files:

```
create src/app/todo/todo.component.css
create src/app/todo/todo.component.html
create src/app/todo/todo.component.spec.ts
create src/app/todo/todo.component.ts
```

Go ahead and inspect each one. It will look similar to the app components.
Actually, let's add our new component to the App component.

<a target="_blank" href="https://github.com/amejiarosario/angular2-todo-app/commit/6fb0d24649dcb34541faa36241940f6781216555">[changes diff]</a>

Go to `src/app/app.component.html`, and remove the `<h1>{{title}}</h1>` and replace it with:

```html src/app/app.component.html
<app-todo></app-todo>
```

If you have `ng serve` running, it should automatically update and show `todo works!`

<a target="_blank" href="https://github.com/amejiarosario/angular2-todo-app/commit/02f0c1d38d605d4e979537cff6792a5dea7095b4">[changes diff]</a>

# Todo Template

"todo works!" is not useful. Let's change that by adding some HTML code to represent our todo tasks. Go to the `src/app/todo/todo.component.html` file and copy-paste this HTML code:

```html TodoTemplate src/app/todo/todo.component.html
<section class="todoapp">

  <header class="header">
    <h1>Todo</h1>
    <input class="new-todo" placeholder="What needs to be done?" autofocus>
  </header>

  <!-- This section should be hidden by default and shown when there are todos -->
  <section class="main">

    <label for="toggle-all">Mark all as complete</label>
    <input id="toggle-all" class="toggle-all" type="checkbox">

    <ul class="todo-list">
      <!-- These are here just to show the structure of the list items -->
      <!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
      <li class="completed">
        <div class="view">
          <input class="toggle" type="checkbox" checked>
          <label>Install angular-cli</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
      </li>
      <li>
        <div class="view">
          <input class="toggle" type="checkbox">
          <label>Understand Angular2 apps</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="Rule the web">
      </li>
    </ul>
  </section>

  <!-- This footer should hidden by default and shown when there are todos -->
  <footer class="footer">
    <!-- This should be `0 items left` by default -->
    <span class="todo-count"><strong>0</strong> item left</span>
    <!-- Remove this if you don't implement routing -->
    <ul class="filters">
      <li>
        <a class="selected" href="#/">All</a>
      </li>
      <li>
        <a href="#/active">Active</a>
      </li>
      <li>
        <a href="#/completed">Completed</a>
      </li>
    </ul>
    <!-- Hidden if no completed items are left ↓ -->
    <button class="clear-completed">Clear completed</button>
  </footer>
</section>
```

This has the general structure about how we want to represent our tasks. Right now it has hard-coded tasks. We are going to slowly turn it into a dynamic app using Angular 2 data bindings. But before that let's add some styling so things look better.

<a target="_blank" href="https://github.com/amejiarosario/angular2-todo-app/commit/2bdc6187d78a1ddc65e3caf6238acb3c94342468">[changes diff]</a>

# Styling the todo app

We are going to use a community maintained CSS for Todo apps. We can go ahead and download the CSS:

```bash
npm install --save todomvc-app-css
```

This will install a CSS file that we can use to style our Todo app and make it look nice. In the next section, we are going to explain how to use it with the `angular-cli.json`.

# Adding global styles to angular-cli.json

`angular-cli.json` is a special file that tells the Angular CLI how to build your application. You can define how to name your root folder, tests and much more. What we care right now, is telling the angular CLI to use our new CSS file from the node modules. You can do it by adding the following line into the `styles` array:

```javascript
      "styles": [
        "styles.scss",
        "../node_modules/todomvc-app-css/index.css"
      ],
```

If you stop and start `ng serve`, you will see that now it looks much better.

{% img /images/angular2-todo-app-preview.png 'Angular 2 Todo App' %}

We have the skeleton so far. Now we are going to make it dynamic and allow users to add/remove/update/sort tasks. We are going to do two versions one serverless and another one using a Node.js/Express server. We are going to be using promises all the time, so when we use a real API, the service is the only one that has to change.

<a target="_blank" href="https://github.com/amejiarosario/angular2-todo-app/commit/7e78e828e5ee7bd3c4c2775ffaeff444edf1e552">[changes diff]</a>

# Todo Service

Let's first start by creating a service that contains an initial list of tasks that we want to manage. We are going to use a `service` to manipulate the data. Let's create the service with the CLI by typing:

```bash
ng g service todo/todo
```

This will create two files:

```
create src/app/todo/todo.service.spec.ts
create src/app/todo/todo.service.ts
```

<a target="_blank" href="https://github.com/amejiarosario/angular2-todo-app/commit/1f389a33a1bf59b011a58838fcd87450951f2987">[changes diff]</a>

# CRUD Functionality

For enabling the create-read-update-delete functionality, we are going to be modifying three files:

- src/app/todo/todo.**service**.ts
- src/app/todo/todo.**component**.ts
- src/app/todo/todo.component.**html**

Let's get started!

## READ: Get all tasks

Let's modify the `todo.service` to be able to get tasks:

{% codeblock lang:js mark:3-8,15-17 TodoService src/app/todo/todo.service.ts %}
import { Injectable } from '@angular/core';

let todos = [
  { title: 'Install Angular CLI', isDone: true },
  { title: 'Style app', isDone: true },
  { title: 'Finish service functionality', isDone: false },
  { title: 'Setup API', isDone: false },
];

@Injectable()
export class TodoService {

  constructor() { }

  get(){
    return new Promise(resolve => resolve(todos));
  }
}
{% endcodeblock %}

Now we need to change our todo component to use the service that we created.

{% codeblock lang:js mark:3,8-9,12-22,25 TodoComponent src/app/todo/todo.component.ts %}
import { Component, OnInit } from '@angular/core';

import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {
  private todos;
  private activeTasks;

  constructor(private todoService: TodoService) { }

  getTodos(){
    return this.todoService.get().then(todos => {
      this.todos = todos;
      this.activeTasks = this.todos.filter(todo => todo.isDone).length;
    });
  }

  ngOnInit() {
    this.getTodos();
  }
}
{% endcodeblock %}


The first change is importing our `TodoService` and adding it to the providers. Then we use the constructor of the component to load the `TodoService`. While we inject the service we can hold a private instance of it in the variable `todoService`. Finally, we use it in the `getTodos` method. This will make a variable `todos` available in the template where we can render the tasks.

Let's change the template so we can render the data from the service. Go to the `todo.component.html` and change what is inside the `<li></li>` for this one:

```html TodoTemplate src/app/todo/todo.component.html
<li *ngFor="let todo of todos" [ngClass]="{completed: todo.isDone}" >
  <div class="view">
    <input class="toggle" type="checkbox" [checked]="todo.isDone">
    <label>{{todo.title}}</label>
    <button class="destroy"></button>
  </div>
  <input class="edit" value="{{todo.title}}">
</li>
```



Also change the 32 in the template from:

```html Line 32 (before) src/app/todo/todo.component.html
<span class="todo-count"><strong>0</strong> item left</span>
```

replace it with:

```html Line 32 (after) src/app/todo/todo.component.html
<span class="todo-count"><strong>{{activeTasks}}</strong> item left</span>
```

When your browser updates you should have something like this:

{% img /images/angular2-todo-app-service.png 'Todo app rendering tasks from service' %}

Now, let's go over what we just did. We can see that we added new data-binding into the template:

- `*ngFor`: iterates through the `todos` array that we defined in the component and assigned in the `let todo` part.
- `[ngClass]`: applies a class when the expression evaluates to true. In our case, it uses class `completed` when `isDone` is true.
- `[checked]`: applies the `checked` attribute when the expression evaluates to true (`todo.isDone`).
- `{{teodo.title}}`: render the todo title. The same happened with `{{activeTasks}}`.


<a target="_blank" href="https://github.com/amejiarosario/angular2-todo-app/commit/9b13f6b2f9096fabe15eef5f282be03242a32bc1">[changes diff]</a>

## CREATE: using input form

Let's start with the template this time. We have an input element for creating new tasks. Let's listen to changes in the input form and when we click enter it creates the tasks.

```html Line 5 src/app/todo/todo.component.html
<input class="new-todo"
       placeholder="What needs to be done?"
       [(ngModel)]="newTodo"
       (keyup.enter)="addTodo()"
       autofocus>
```

Notice that we are using a new variable called `newTodo` and method called `addTodo()`. Let's go to the controller and give it some functionality:

```javascript src/app/todo/todo.component.ts
private newTodo;

addTodo(){
  this.todoService.add({ title: this.newTodo, isDone: false }).then(() => {
    return this.getTodos();
  }).then(() => {
    this.newTodo = ''; // clear input form value
  });
}
```

First, we created a private variable that we are going to use to get values from the input form. Then we created a new `todo` using the todo service method `add`. It doesn't exist yet, so we are going to create it next:

```javascript src/app/todo/todo.service.ts
add(data) {
  return new Promise(resolve => {
    todos.push(data);
    resolve(data);
  });
}
```

This adds the new element into the `todos` array and resolve the promise. That's all. Go ahead a test it out creating a new todo element.


<a target="_blank" href="https://github.com/amejiarosario/angular2-todo-app/commit/049b52b4d823c62f922e5d6e5f386fa96cc6b0fe">[changes diff]</a>

## UPDATE: on double click

Let's add an event listener to double click on each todo. That way, we can change the content. Editing is a tricky since we need to display an input form. Then when the user clicks enter it should update the value. Finally, it should hide the input and display the label with the updated value. Let's do that by keeping a temp variable called `editing` which could be true or false.

```html src/app/todo/todo.component.html
<li *ngFor="let todo of todos" [ngClass]="{completed: todo.isDone, editing: todo.editing}" >
  <div class="view">
    <input class="toggle" type="checkbox" [checked]="todo.isDone">
    <label (dblclick)="todo.editing = true">{{todo.title}}</label>
    <button class="destroy"></button>
  </div>
  <input class="edit"
         #updatedTodo
         [value]="todo.title"
         (blur)="updateTodo(todo, updatedTodo.value)"
         (keyup.escape)="todo.editing = false"
         (keyup.enter)="updateTodo(todo, updatedTodo.value)">
</li>
```
Notice that we are adding a local variable in the template `#updateTodo`. Then we use it to get the value like `updateTodo.value` and pass it to a function.
We want to update the variables on `blur` (when you click somewhere else) or on `enter`. Let's add the function that actually updates the value in the component.

Also, notice that we have a new CSS class applied to the element called `editing`. This is going to take care through CSS to hide and show the input element when needed.

```javascript src/app/todo/todo.component.ts
updateTodo(todo, newValue) {
  todo.title = newValue;
  return this.todoService.put(todo).then(() => {
    todo.editing = false;
    return this.getTodos();
  });
}
```

We update the new todo's title and after the service has process the update we set editing to false. Finally, we reload all the tasks again. Let's add the `put` action on the service. But we have an issue. We actually need a unique `id` to identify each task. When we hook up the service with a real backend we will get that from the database. Let's add it manually for now. We will call it `_id` since that's how MongoDB call it and will be easier to replace later.

```javascript src/app/todo/todo.service.ts
put(data) {
  return new Promise(resolve => {
    let index = todos.findIndex(todo => todo._id === data._id);
    todos[index].title = data.title;
    resolve(data);
  });
}
```
Here we look for the todo with the matching `_id` and update the title.



<a target="_blank" href="https://github.com/amejiarosario/angular2-todo-app/commit/2664150bdad13f2c5666b0a5031703383446a041">[changes diff]</a>

## DELETE: clicking X

This is like the other actions. We add an event listenter on the destroy button:

```html src/app/todo/todo.component.html
<button class="destroy" (click)="destroyTodo(todo)"></button>
```

Then we add the funtion in the component:

```javascript src/app/todo/todo.component.ts
destroyTodo(todo){
  this.todoService.delete(todo._id).then(() => {
    return this.getTodos();
  });
}
```

and finally, we add the method in the servie:

```javascript src/app/todo/todo.service.ts
delete(id) {
  return new Promise(resolve => {
    let index = todos.findIndex(todo => todo._id === id);
    todos.splice(index, 1);
    resolve(true);
  });
}
```

Now test it out in the browser!

<a target="_blank" href="https://github.com/amejiarosario/angular2-todo-app/commit/161be3b1a0e59ea41442d7be99d61fb9bb81b8b5">[changes diff]</a>

# Routing and Navigation

It's time to activate the routing. When we click on the `active` button we want to show only the ones that are active. Similarly, we want to filter by `completed`. Additionally, we want to the filters to change the route `/active` or `/completed` URLs.

In `AppComponent`, we need to add the `router` library and define the routes as follows:

{% codeblock lang:js mark:5,10-13,24 AppModule src/app/app.module.ts %}
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';

const routes: Routes = [
  { path: ':status', component: TodoComponent },
  { path: '**', redirectTo: '/all' }
];

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
{% endcodeblock %}

First, we import the routing library. Then we define the routes that we need. We could have said `path: 'active', component: TodoComponent` and the repeat the same for `completed`. But instead, we define a parameter called `:status` that could take any value (`all`, `completed`, `active`). Any other value path we are going to redirect it to `/all`. That's what the `**` means.

Finally, we add it to the imports. So the app module uses it. Since the AppComponent is using routes. Now we need to define the `<router-outlet>`. That's the place there the routes are going to render the component based on the path (in our case `TodoComponent`).

Let's go to `app/app.component.html` and replace `<app-todo></app-todo>` for `<router-outlet></router-outlet>`:

```html app/app.component.html
<router-outlet></router-outlet>
```

Test the app in the browser and verify that now the URL is by default `http://localhost:9000/all`.

<a target="_blank" href="https://github.com/amejiarosario/angular2-todo-app/commit/4a7f71516264e21b5b03e281d68b508492bbcc19">[changes diff]</a>

## Using routerLink and ActivatedRoute

`routerLink` is the replacement of `href` for our dynamic routes. We have set it up to be `/all`, `/complete` and `/active`. Notice that the expression is an array. You can pass each part of the URL as an element of the array.

{% codeblock lang:html mark:3,6,9 src/app/todo/todo.component.html %}
<ul class="filters">
  <li>
    <a [routerLink]="['/all']" [class.selected]="path === 'all'">All</a>
  </li>
  <li>
    <a [routerLink]="['/active']" [class.selected]="path === 'active'">Active</a>
  </li>
  <li>
    <a [routerLink]="['/completed']" [class.selected]="path === 'completed'">Completed</a>
  </li>
</ul>
{% endcodeblock %}

The second part we are doing is applying the `selected` class if the path matches the button. Yet, we haven't populate the the `path` variable yet. So let's do that:

{% codeblock lang:js mark:2,16,18,21-24 TodoComponent src/app/todo/todo.component.ts %}
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {
  private todos;
  private activeTasks;
  private newTodo;
  private path;

  constructor(private todoService: TodoService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.path = params['status'];
      this.getTodos();
    });
  }

  /* ... */
}
{% endcodeblock %}

We added `ActivatedRoute` as a dependency and in the constructor. This gives us access to the all the `route` params such as `path`. Notice that we are using it in the `NgOnInit` and set the path accordantly.

Go to the browser and check out that the URL matches the active button. But, it doesn't filter anything yet. Let's fix that.

<a target="_blank" href="https://github.com/amejiarosario/angular2-todo-app/commit/bd3cc91ae8aed975c7d6e64ad76c53e985726364">[changes diff]</a>

## Filtering data based on route

To filter todos by active and completed, we need to pass a parameter to the `todoService.get`.

{% codeblock lang:js mark:4,8-9 TodoComponent src/app/todo/todo.component.ts %}
ngOnInit() {
  this.route.params.subscribe(params => {
    this.path = params['status'];
    this.getTodos(this.path);
  });
}

getTodos(query = ''){
  return this.todoService.get(query).then(todos => {
    this.todos = todos;
    this.activeTasks = this.todos.filter(todo => todo.isDone).length;
  });
}
{% endcodeblock %}

We added a new parameter `query`, which takes the `path` (active, completed or all). Then, we pass that parameter to the service. Let's handle that in the service:

{% codeblock lang:js mark:1,5-10 TodoService src/app/todo/todo.service.ts %}
get(query = ''){
  return new Promise(resolve => {
    var data;

    if(query === 'completed' || query === 'active'){
      var isCompleted = query === 'completed';
      data = todos.filter(todo => todo.isDone === isCompleted);
    } else {
      data = todos;
    }

    resolve(data);
  });
}
{% endcodeblock %}

So we added a filter by `isDone` when we pass either `completed` or `active`. If the query is anything else, we return all the todos tasks. That's pretty much it, test it out!

<a target="_blank" href="https://github.com/amejiarosario/angular2-todo-app/commit/fd0a228c4768050b4dcae174f034ffa09931324d">[changes diff]</a>

# Clearing out completed tasks

One last UI functionality, clearing out completed tasks button. Let's first add the click event on the template:

```html src/app/todo/todo.component.html
<button class="clear-completed" (click)="clearCompleted()">Clear completed</button>
```

We referenced a new function `clearCompleted` that we haven't create yet. Let's create it in the TodoComponent:

{% codeblock lang:js mark:2 TodoComponent src/app/todo/todo.component.ts %}
clearCompleted() {
  this.todoService.deleteCompleted().then(() => {
    return this.getTodos();
  });
}
{% endcodeblock %}

In the same way we have to create `deleteCompleted` in the service:

{% codeblock lang:js mark:3 TodoService src/app/todo/todo.service.ts %}
deleteCompleted() {
  return new Promise(resolve => {
    todos = todos.filter(todo => !todo.isDone);
    resolve(todos);
  });
}
{% endcodeblock %}

We use the filter to get the active tasks and replace the `todos` array with it.

That's it we have completed all the functionality.

<a target="_blank" href="https://github.com/amejiarosario/angular2-todo-app/commit/333c0127f1fcc7949e0b0138933dc6aaf7044fe3">[changes diff]</a>

# Deploying the app

Angular CLI comes with a convenient command to deploy your app to Github pages.

```bash
# build assets + deploy
ng github-pages:deploy
```

If you want to build your app for production you can do:

```bash
ng build --prod
```

That's all folks!