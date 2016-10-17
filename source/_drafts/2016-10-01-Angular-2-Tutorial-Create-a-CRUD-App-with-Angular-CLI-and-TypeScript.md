---
layout: post
title: 'Angular 2 Tutorial: Create a CRUD App with Angular CLI and TypeScript'
comments: true
toc: true
pageviews__total: 0
pageviews__recent: 0
pageviews__avg_time: 0
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
This tutorial get you off the ground with Angular 2. We are going to use the official CLI (command line) tool to generate boilerplate code.

This is the first, of "Learn Angular 2 tutorial" series:

1. Angular 2 Tutorial: Create a CRUD App with Angular CLI and TypeScript [this one]
1. Angular 2 Tutorial: Modules, Components, Templates, Services and Pipes  [coming soon]
1. Angular 2 Tutorial: Directives vs Components [coming soon]
1. Angular 2 Tutorial: Routing and navigation [coming soon]
1. Angular 2 Tutorial: HTTP and Websockets [coming soon]
1. Angular 2 Tutorial: Upgrading from Angular 1 [coming soon]


# Prerequisites

This tutorial is targeted to people familiar with JavaScript and HTMl/CSS. You also will need:

- Node.js up and running
- NPM (Node package manager) install

You can verify by typing:
```bash
node --version
npm --version
```

If you get the versions Node 4.x.x and NPM 3.x.x. or higher you are all set. If not you have to get the latest versions.

Let's move on to Angular. We are going to create a popular Todo app, where we can CRUD (create-read-update-delete) tasks.

# Intro

Angular 2 CLI is the best way to get us started. We can download the tool and create a new project by running:

```bash
# install angular-cli globally
npm i -g angular-cli@1.0.0-beta.16

# create a new project
ng new Todos --style=scss
```
**Note** The last command takes some minutes, so leave it running and continue reading this tutorial.

`ng new ngTodo` will do a bunch of stuff for us:

 1. Initialize a git repository
 1. Creates an `package.json` files with all the Angular dependencies.
 1. Setup TypeScript, Webpack, Tests (Jasmine, Protractor, Karma). Don't worry if you don't what they are. We are going to cover them later.
 1. It creates the `src` folder with the bootstraping code to load our app into the browser
 1. Finally, it does an `npm install` to get all the packages into `node_modules`.

Let's run the app!

```bash
# builds the app and run it on port 9000
ng serve ---port 9000
```

Open your browser on http://localhost:9000/ and you should see "Loading..." and then it should switch to "app works!". Awesome!

Now let's dive into the `src` folder and get familiarized with the structure.

## index.html

We are building a SPA (single page application) so everything is going to be loaded into the `index.html`. Let's take a look in the `src/index.html`. It's pretty standard HTML5 code, except for two elements that are specific for our app:

1. `<base href="/">`
1. `<app-root>Loading...</app-root>`

`base href` is needed for Angular 2 routing to work properly. We are going to cover Routing on its own chapter.

`<app-root>` this is not an standard HTMl tag. It's actually defined by our Angular App. It's an Angular **component**. More on this later.

## main.ts

This is the part where our application starts loading (bootstraping). Angular 2 can be use not just in browsers, but also in other platforms such as mobile apps or even desktop apps. So, when we start our application we have to specify what platform we want to target. That's way we importing `platform-browser-dynamic`. Notice that we are also importing the `AppModule` from `./app`.

The most important line is:

```javascript
platformBrowserDynamic().bootstrapModule(AppModule);
```

We are loading our `AppModule` into browser platform. Now, let's take a look at the `./app/index.ts` directory.  

## App directory

Every time we import from a directory (e.g. `./app/`). The `index` file will be loaded. In our case `./app/index.ts`. This file only loads up other modules from our app directory such as `app.component` and `app.module`. Let's go to each of them in turn.

### app.module.ts

We are going to be using this file a lot. The most important part is the content inside the `@NgModule`, where we have `declarations`, `imports` `providers` and `bootstrap`. We are going to explain in each on later. For now focus on the `AppComponent` references. Let's see what's going on there.

### app.component.ts

This looks a little similar to module, but instead of `@NgModule` we have `@Component`. Again, the most imporant part is the value of the attributes. We have `selector`, `templateUrl` and `styleUrls`. This wha they mean:

-  `selector`: is the name of the component. Remember that we had `<app-root>Loading...</app-root>`? This is where is defined.
- `templateUrl`: This is where the HTML code is. `<app-root>` will be replace to whatever you have on the template.
- `styleUrls`: You can have styles that only applies to this component. This is pretty neat! You can change the styles with confidence knowing that it won't bleed to other pars of the website.

Inside the `AppComponent` class you can define variables (e.g. `title`) that are used in the templates (e.g. `{{title}}`). Let's change the title from `app works!` to `todos`.

Test your changes running:
```bash
ng serve ---port 9000
```
You should see todos.

# Creating a new Component with Angular CLI

Let's create a new component to display the tasks. We can easily created by typing:

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

Go ahead and inspect each one. It will look similar to the app components. Actually, let's add our new component to the `app.component.ts`. Just below the `<h1>title</h1>`:

```html
<app-todo></app-todo>
```

If you have `ng serve` running, it should automatically update and show todo works!

# Styling the todo app

We are going to use a community maintained CSS for todos. We can go ahead and download the css:

```bash
npm install --save todomvc-app-css
```

Let's add to the index.html file the following line:

```html
<link rel="stylesheet" href="node_modules/todomvc-app-css/index.css">
```

npm i -g nodemon
npm install mongoose -S

# Create task
curl -XPOST http://localhost:3000/api/todos -d 'title=Master%20Angular2&isDone=false&note=soon...'

# List tasks
curl -XGET http://localhost:3000/api/todos

ng g service todo/todo


Angular CLI Cheatsheet commands:

```bash
ng new Todos --style=scss
ng serve --port 9000

ng lint
ng test
ng e2e

ng init # regenerate files when new CLI version comes up
```
