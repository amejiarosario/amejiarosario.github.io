---
layout: draft
title: Modern MEAN Stack Tutorial with Docker (Angular, Node, Typescript and Mongodb)
comments: true
pageviews__total: 973
pageviews__recent: 92
pageviews__avg_time: 141
tutorial__order: 0
toc: true
photos:
  - /images/modern-mean-small.png
  - /images/modern-mean-large.png
photos__background_color: '#1F77B4'
tags:
  - angular
  - mean stack
categories:
  - Coding
  - Web Development
  - Angular
date: 2020-02-27 18:51:28
updated: 2020-02-27 18:51:28
---


The <abbr title="MongoDB, Express, Angular and Node.js">MEAN</abbr> stack allows you to build complete applications using one programming language: JavaScript. In this tutorial, we built upon the first part ([Creating an Angular app](/angular-2-tutorial-create-a-crud-app-with-angular-cli-and-typescript/)) which built the front-end, and this part builds the backend with a RESTful API and Database.


<!-- more -->

# REST API with Node.js

We are going to use express generator and create a folder called `server`.

First install the generator packages:

```js
npm i -g express-generator
```

Note: You should have Node and NPM/Yarn installed.

## REST API using ExpressJS

Now let's scaffold the app using the generator:

```sh
express server -e
```

Let's install all its dependencies on the server folder:

```sh
cd server && npm i
```

and now let's make sure it's working:

```sh
npm start
```
<!-- env DEBUG="server:*" npm start -->

Go to localhost on port 3000 and make sure you can see a "Welcome to Express"

http://localhost:3000/


> Changes: [a3fcacd](https://github.com/amejiarosario/angular-todo-app/commit/a3fcacd) - REST API using ExpressJS: scaffold

## Creating a host alias for the server

We want to run the server to work regarless of the enviroment where we run it. (It will be useful for Docker later on)

For that we can create an alias by editing the `hosts`:

- Windows: `c:\windows\system32\drivers\etc\hosts`
- Linux/Mac: `/etc/hosts`

Once you can open the file, you drop the following line at the end:

```
127.0.0.1 server
```

Now you should be able to access the server by visiting:

http://server:3000/

(If you have trouble editing the host file take a look [here](https://www.howtogeek.com/howto/27350/beginner-geek-how-to-edit-your-hosts-file/))

## Creating API routes and responding to requests

Now we are going to create a new route:

```
/api/todos[/:id]
```

This route will get all our todos, update, and delete them.

Create a new router file called todos in the following path:

```
touch server/routes/todos.js
```

and add this initial content:

```js server/routes/todos.js
const express = require('express');
const router = express.Router();

const TODOS = [
  { title: 'Create API to get this list', isDone: true },
  { title: 'Connect API with Angular', isDone: true },
  { title: 'Connect server with mongo', isDone: false },
  { title: 'Publish app', isDone: false },
];

/* GET /api/todos */
router.get('/', async (req, res) => {
  try {
    res.json(TODOS);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
```

All this doing is replying to the GET comamnds and returning a hard-coded list of todos.
We are replace it later, to get data from mongo instead.

Then we need to register the route as follows:

```js server/app.js
var todosRouter = require('./routes/todos');

// ...

app.use('/api/todos', todosRouter);
```

This register the new path `/api/todos`. When we get any call on this path, our `todosRouter` will handle it.


You can run restart your server, or use nodemon to pick up changes and refresh browser.

```sh
# npm i -g nodemon
nodemon server/bin/www
```

That should get running your server, now you can see it in action using CURL:


```sh
curl -XGET server:3000/api/todos
# curl -XGET localhost:3000/api/todos
```

This command should get you all the lists in JSON format!

In the next step, we are going to query the server using Angular intead of `curl`.
After that, we are going complete the rest of operations (update, delete, create).

> [6f8a502](https://github.com/amejiarosario/angular-todo-app/commit/6f8a502) - Creating API routes and responding to requests

# Connecting REST API with Angular App.

Let's now prepare our angular App to use the server API that just created.

As you might now, when you run `ng serve`, it will trigger a development server.
However, out API is a completely different server. To be able to connect the two, we need create a proxy.


## Creating a proxy in Angular to talk to the API server

Let's create a new file, that will tell Angular when to look for certain HTTP paths.
In this case, we are going to defer all `/api` to our express server.

```js src/proxy.conf.json
{
  "/api": {
    "target": "http://server:3000",
    "secure": false
  }
}
```

(This will need the [host alias](#Creating-a-host-alias-for-the-server) from the step before)

Then, we have to tell Angular to load this file when we are serving the app.
We are going to do that in the `angular.json` file.

If you are using the same version of angular CLI, you need to insert this on line 71:

```
"proxyConfig": "src/proxy.conf.json"
```

For some context, here are the surrounding elements:

```js angular.json > projects > Todos > architect > serve > options
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  // ...
  "projects": {
    "Todos": {
      // ...
      "architect": {
        // ...
        "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "options": {
            "browserTarget": "Todos:build",
            "proxyConfig": "src/proxy.conf.json"  // <-- Insert this line
          },
          // ...
        },
        // ...
      }
    }},
  "defaultProject": "Todos"
}
```

Now our app, will pass all requests that starts with `/api` to `http://localhost:3000` (or whatever path you specified on the proxy.conf).

Next, we are going to make use of this new routes!


> [e81ddb8](https://github.com/amejiarosario/angular-todo-app/commit/e81ddb8) - Creating a proxy in Angular to talk to the API server


## Using HTTP Client to talk to server

To talk to the server we are going to use the `HttpClient` module.

Let's go to the app.module and let's import it:

```js src/app/app.module.ts
import { HttpClientModule } from '@angular/common/http';

// ...

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule, // <---- import module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Now that the HttpClient is available in our app, let's add it to the service and make use of it.

```ts src/app/todo/todo.service.ts
import { HttpClient } from '@angular/common/http';

//...

const API = '/api/todos';

//...

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  get(params = {}) {
    return this.http.get(API, { params });
  }

  // ...
```

We change the `TodoService.get` to use http client. However, the component was reponding to a Promise and the http.get returns an Observable. So, let's change it.


Change the getTodos method from the old one, to use this one that handles an observable.

```ts src/app/todo/todo.component.ts
  getTodos(query = '') {
    return this.todoService.get(query).subscribe(todos => {
      this.todos = todos;
      this.activeTasks = this.todos.filter(todo => !todo.isDone).length;
    });
  }
```

The main difference is that instad of a `.then`, we are using `.subscribe`. Everything else remains the same (for now).

That's it, let's test it out!

Run this commands on your terminal:

```sh
# run node server
nodemon server/bin/www
```

on another terminal session run also:

```sh
# run angular app
ng serve
```

Once you have both running, you can go to http://localhost:4200/all and you can verify that it's coming from your server!

If you are running `nodemon`, you can change the TODOS on `server/routes/todos.js` and refresh the browser and see how it changes.

But, we don't want to have hard-coded tasks. Let's create a proper DB with Mongo.

# Setting up MongoDB

It's time to get MongoDB up and running. If don't have it install, you have a couple of options:

<details>
 <summary>Docker (Windows/macOS/Linux) [Preferred]</summary>

 1. Download the [docker engine](https://docs.docker.com/engine/install/)
 2. Pull Mongo image

 ```sh
 docker pull mongo
 ```

 NOTE: More details in the rest of the post.

</details>

<details>
 <summary>Official Website (Windows/macOS/Linux)</summary>

 You can download it from here:

 https://docs.mongodb.com/manual/administration/install-community/

</details>


<details>
 <summary>Brew (macOS)</summary>

 ```sh
 brew tap mongodb/brew
 brew install mongodb-community
 ```

</details>

We are going to use docker since it's a nice way to have everything running together with one command.
Also, you can deploy it to the cloud and scale it easily.

## Dockerizing the MEAN stack

Let's get everything running (Node Server, Angular and Mongo).
We are going to create a docker-compose file, where is going to list all our services and we can run them all at once.

```yml docker-compose.yml
version: "3.7"

services:
  app:
    image: node:lts-alpine
    working_dir: /app
    volumes:
      - ./:/app
    ports:
      - 4200:4200
    # --host 0.0.0.0 to listen to all the interfaces from the container (dev env)
    command: >
      sh -c "npm install &&
             npx ng serve --host 0.0.0.0"

  server:
    image: node:lts-alpine
    working_dir: /server
    volumes:
      - ./server:/server
    # port 3000 has to match src/proxy.conf.json
    ports:
      - 3000:3000
    depends_on:
      - mongo
    environment:
      MONGO_HOST: mongo
    command: >
      sh -c "npm i -g nodemon && npm install && nodemon ./bin/www"

  mongo:
    image: mongo
```

All right, now we can get all full-stack app running with one command:

```sh
docker-compose up --build
```

NOTE: close other terminals running node or angular, so the ports don't conflict.

This will create 3 containers for our Angular App, Node Server and Mongo DB. You can also see all the logs in one place.

After you wait a minute or so you should be able to open the app on http://localhost:4200/.

Now we can make use of mongo. Keep docker-compose running and now let's remove the hard-coded tests and use the database.

> [0763db0](https://github.com/amejiarosario/angular-todo-app/commit/0763db0) - docker compose

## Creating MongoDB schema with Mongoose

Let's install Mongoose, which is a library for managing MongoDB from Node.js.

```sh
cd server && npm i mongoose@5.9.18
```

NOTE: make sure you installed it on the `./server/package.json`, rather than the client side packages `./packages.json`.


The first thing we need to do is to connect to Mongo when our server starts. Go to `server/app.js` and add the following code:

```js server/app.js
const mongoose = require('mongoose');

// connect to db
const user = process.env.MONGO_USER;
const mongoPort = process.env.MONGO_PORT || 27017;
const mongoHost = process.env.MONGO_HOST || 'localhost';
const auth = user ? `${user}:${process.env.MONGO_PASS}@` : '';
const DB_STRING = `mongodb://${auth}${mongoHost}:${mongoPort}/todos`;

console.log(`Running node ${process.version}...`);
console.log(`Connecting to DB... ${DB_STRING}`);

const config = { useNewUrlParser: true, useUnifiedTopology: true};
mongoose.connect(DB_STRING, config)
  .then(() => console.log(`Connected!`))
  .catch(console.error);
```

> [15f6e25](https://github.com/amejiarosario/angular-todo-app/commit/15f6e25) - add db string to connect to mongo


We can pass some ENV variables like `MONGO_HOST`. If we run it locally, it will use localhost, but if run it on docker we want to pass a hostname. You can see that in the `docker-compose.yml` file.

Now, let's define our data model for Mongo. Let's create a folder `models` inside `server` and add file called "todos.js".

```js server/models/todo.js
const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const TodoSchema = new Schema({
  title: String,
  isDone: Boolean,
  notes: String,
  updated_at: { type: Date, default: Date.now },
});

module.exports = model('Todo', TodoSchema);
```

This is basically defining what fields we want to store and what are the types.
The `updated_at` will update automatically when we create a new todo.


> [436b0ad](https://github.com/amejiarosario/angular-todo-app/commit/436b0ad) - npm i mongoose

> [b2674f3](https://github.com/amejiarosario/angular-todo-app/commit/b2674f3) - Creating MongoDB schema with Mongoose

## Adding all all the API routes to modify data in DB

Let's all the routes to be able to create, read, update and delete data from Mongo.

The Mongoose library provide some convenience methods to do CRUD operations:
- **Todo.find**: find data matching a given query. (`{}`, get all, while `{isDone: true}` get only completed tasks).
- **Todo.create**: Create a new todo
- **Todo.findByIdAndUpdate**: Find todo by given id and update its content.
- **Todo.findByIdAndDelete**: Find todo by given id and delete it.
- **Todo.deleteMany**: Delete everything matching a given query.


Here's the routes by their matching HTTP verb (GET, PUT, POST, DELETE). In the next sections we are going to tests all these routes and go over some more details.

```js server/routes/todos.js
const express = require('express');
const router = express.Router();

const Todo = require('../models/todo');

/* GET /api/todos */
router.get('/', async (req, res) => {
  try {
    const list = await Todo.find(req.query);
    res.json(list);
  } catch (error) {
    res.status(500).json({ error });
  }
});

/* POST /api/todos */
router.post('/', async (req, res) => {
  try {
    const todo = await Todo.create(req.body);
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error });
  }
});

/* PUT /api/todos/:id */
router.put('/:id', async (req, res) => {
  try {
    const options = { new: true };
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, options);
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error });
  }
});

/* DELETE /api/todos/:id */
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// Beaware: it can delete all data from db if body is empty (DON'T expoose deleteMany in PRODUCTION!)
/* DELETE /api/todos */
router.delete('/', async (req, res) => {
  try {
    const todo = await Todo.deleteMany(req.body);
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
```

We many routes on this step, take your time to go through them.
In the next section, we are going to tests them using `curl` and then integrated with Angular.

> [f4f2281](https://github.com/amejiarosario/angular-todo-app/commit/f4f2281) - Adding all all the API routes to modify data in DB

## Testing the API CRUD operations

Since we install a new package `mongoose`, we have to run `npm install` in the docker containers. Otherwise, file changes are pick up automatically and you don't need to restart.

Stop `docker-compose` and start it again `docker-compose up --build`.

### Creating a new task and getting lists

You can create a new taks using the following command:

```sh
curl -XPOST server:3000/api/todos -H "Content-Type: application/json" -d '{"title": "CRUD API", "isDone": false}'
```

Now, let's see if it's there:

```sh
curl -XGET server:3000/api/todos
```

You should have got soemthing like this:

```
[{"_id":"5edc2a6d0c41d60054ad715f","title":"CRUD API","isDone":false,"updated_at":"2020-06-06T23:44:45.966Z","__v":0}]⏎
```

You can also check Angular on http://localhost:4200/all. The new task should be there!

### Update data with PUT method

If you remember from your routes file, we are using the method PUT to update tasks.

```js server/routes/todos.js
/* PUT /api/todos */
router.put('/:id', async (req, res) => {
  try {
    const options = { new: true };
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, options);
    res.json(todo);
  } catch (error) {
    res.json(500, { error });
  }
});
```

By default `findByIdAndUpdate` returns the original document.
We are passing `{ new: true }` so we can return the updated document.

For updating a task you need the `_id`. You can get it from the previous step, when we listed all the tasks. For my case the _id is `5edc2a6d0c41d60054ad715f`, find yours and replace it in the next command:

```sh
curl -XPUT server:3000/api/todos/5edc2a6d0c41d60054ad715f -H "Content-Type: application/json" -d '{"title": "Finish PUT API", "isDone": true, "note": "New Field"}'
```

As you can see in the last update, we can modified existing field and also add new values like the `note` field.

### Erasing data with DELETE method

For our todo route, we also defined the DELETE method. Similar to update, we need to pass and `id`.

```js server/routes/todos.js
/* DELETE /api/todos */
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error });
  }
});
```

Again, remember to replace the next call with yout `_id`:

```sh
curl -X DELETE server:3000/api/todos/5edc2a6d0c41d60054ad715f
```

If you check the UI, all tasks will be gone: http://localhost:4200/all.

As much fun as `curl` is, let's move on an complete all these functionalities in Angular.

# Angular Service to talk to server

There are two main changes that we need to make, in other to use the API server.

1) We need to change the `TodoService` service to use HTTP client.
2) Change the `TodoComponent` compoenent to use the methods.

## Angular service using HTTP client

In the following code, we using the HTTP client to make the appropiate calls:

```js src/app/todo/todo.service.ts
iimport { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface ITodo {
  _id?: string;
  title: string;
  isDone: boolean;
  notes: string;
  update_at: string;
  editing ?: boolean;
}

const API = '/api/todos';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private http: HttpClient) { }

  get(params = {}) {
    return this.http.get(API, { params });
  }

  add(data: ITodo) {
    return this.http.post(API, data);
  }

  put(changed: ITodo) {
    return this.http.put(`${API}/${changed._id}`, changed);
  }

  toggle(selected: ITodo) {
    selected.isDone = !selected.isDone;
    return this.put(selected);
  }

  delete(selected: ITodo) {
    return this.http.delete(`${API}/${selected._id}`);
  }

  deleteCompleted(body = { isDone: true }) {
    return this.http.request('delete', `${API}`, { body });
  }
}
```

This basically, matches the HTTP verbs that we used in curl and pass the payloads.

Let's now change the TodoComponent that goes along with these changes.


> [a93291c](https://github.com/amejiarosario/angular-todo-app/commit/a93291c) - Angular service using HTTP client


## Angular TodoComponet updates

Here's what your component should look like this:

```ts src/app/todo/todo.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TodoService, ITodo } from './todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {
  public todos: ITodo[];
  public activeTasks: number;
  public newTodo: string;
  public path: string;
  public mapToQuery = {
    all: {},
    active: { isDone: false },
    completed: { isDone: true },
  };
  constructor(private todoService: TodoService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.path = params.status;
      this.getTodos(this.path);
    });
  }

  addTodo() {
    this.todoService
      .add({ title: this.newTodo, isDone: false } as unknown as ITodo)
      .subscribe(() => {
        this.getTodos();
        this.newTodo = ''; // clear input form value
      });
  }

  getTodos(route = 'all') {
    const query = this.mapToQuery[route];
    return this.todoService
      .get(query)
      .subscribe((todos: ITodo[]) => {
        this.todos = todos;
        this.activeTasks = this.todos.filter(todo => !todo.isDone).length;
      });
  }

  updateTodo(todo: ITodo, newValue: string) {
    todo.title = newValue;
    return this.todoService.put(todo).subscribe(() => this.getTodos());
  }

  destroyTodo(todo: ITodo) {
    this.todoService.delete(todo).subscribe(() => this.getTodos());
  }

  toggleTodo(todo: ITodo) {
    this.todoService.toggle(todo).subscribe(() => this.getTodos());
  }

  clearCompleted() {
    this.todoService.deleteCompleted().subscribe(() => this.getTodos());
  }
}
```

Let's go over each part on the next sections.

### Sending Queries with HTTP GET

In the component, one the first thing we do is check the route params (path):

```js recap: src/app/todo/todo.component.ts (exerpt)
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.path = params['status'];
      this.getTodos(this.path);
    });
  }
```

When you click on the buttons `All`, `Active` and `Completed`, that will trigger a route change.

To recap, these buttons use the router link. So, every time you click on them, they will change the URL.

```html recap: src/app/todo/todo.component.html (exerpt)
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
```
After we change the url, the next thing we do is to call `getTodos`. Let's see that next.

### Get all todos

We can get all services using the following:

```js src/app/todo/todo.component.ts (exerpt)
  getTodos(route = 'all') {
    const query = this.mapToQuery[route];
    return this.todoService
      .get(query)
      .subscribe((todos: ITodo[]) => {
        this.todos = todos;
        this.activeTasks = this.todos.filter(todo => !todo.isDone).length;
      });
  }
```

We `this.todoService.get` will issue an HTTP get and retrive all the tasks from database and update todos. It also update the number of active tasks (the ones that are not done).

The `getTodos` receives an argument (`route`) with the path which will be one of these: `all`, `active` or `complete`. However, MongoDb doesn't understand these words. We have to map it (`mapToQuery`) to something a proper query like `{ isDone: true }`. That MongoDB will understand.

> [e33d540](https://github.com/amejiarosario/angular-todo-app/commit/e33d540) - Angular TodoComponet updates

### Modifying the todos

All the other operations, like update, clear, toggle are very similar. They trigger an action and then call `getTodos` so the UI is up to date with the latest changes.

That's all!
