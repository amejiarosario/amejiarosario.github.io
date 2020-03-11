---
layout: draft
title: Modern MEAN Stack Tutorial (Angular, Node, Typescript and Mongodb)
comments: true
pageviews__total: 0
pageviews__recent: 0
pageviews__avg_time: 0
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

Eiusmod minim consequat culpa proident mollit mollit eu adipisicing do culpa. In mollit ipsum in amet labore est ad ad ex. Labore deserunt proident non ut. Elit ex ea incididunt mollit magna. Nostrud magna sunt deserunt elit nulla quis culpa voluptate veniam velit culpa tempor voluptate nostrud. Do qui Lorem voluptate culpa aliquip eu fugiat non duis qui ad culpa.

https://adrianmejia.com/creating-a-restful-api-tutorial-with-nodejs-and-mongodb/


# Installing the MEAN stack (Node, MongoDb, ExpressJS and Angular)

## Installing MongoDB

You can install MongoDB following the instructions on the [official website](https://docs.mongodb.com/manual/administration/install-community/), or you can use the command line to get it.

Installing MongoDB on MacOS:

```sh
brew install mongodb
```

Installing MongoDB on Ubuntu / Windows Subsystem for Linux (WSL):

```sh
# update and install mongodb
sudo apt update
sudo apt install -y mongodb

# check mongo is working
mongod --version

# create default data directoy
sudo mkdir -p /data/db

# start mongo
sudo mongod
```

Make sure you have mongo up and running on a new command line:

```sh
mongo
```

You should see something like this:

```sh
# MongoDB shell version v3.6.3
# connecting to: mongodb://127.0.0.1:27017
```

Note: if it's version 4+, it's fine as well.

## Installing Node.js

You can install Node.js by following the instructions on:
- Official website: [nodejs.org](https://nodejs.org/)
- If you want to have multiple Node.js versions you can use package managers such as [NVM](https://github.com/nvm-sh/nvm) or [asdf-nodejs](https://github.com/asdf-vm/asdf-nodejs)

You can verify that you have Node.js installed by typing:

```sh
node -v
# v12.13.1
```

## Installing ExpressJS

You can install Express generator from you command line as follow:

```sh
npm install -g express-generator
```


# Creating a REST API using Node and ExpressJS

Culpa duis aliqua magna laboris veniam consequat. Duis commodo mollit excepteur et nisi veniam aliqua eu dolore labore irure. Proident sit voluptate aute dolor mollit exercitation velit labore. Ea do ut ea ad. Commodo ullamco in sint quis excepteur esse labore id.

## Getting server up and running

Generate scafolded express app and call it "server"
```sh
express server -e
```

Install dependencies
```sh
cd server
npm i
```

Run server
```sh
env DEBUG="server:*" PORT="3131" npm start
```
With the environmental variables you can specify what port you want to run your application and if you want debug logs.

Go to http://localhost:3131. - You should see the "Welcome to Express" message.

## Rendering JSON instead of HTML

By default, the Express generator assume that you are going to render HTML and have some default views. We won't be needing that.  We are using Angular to handle the HTML part. The main purpose of our server is to render JSON instead. Let's make that change.

Go to the main `routes/index.js` and change the `res`ponse to `json`:

```js server/routes/index.js
/* GET home page. */
router.get('/', function(req, res, next) {
  res.json([{ title: 'setup server', isDone: false }]);
});
```

If you stop and start the server and refresh the browser. You will that http://localhost:3131 has our new data.

## Running Node.js from inside the Angular

https://angular.io/guide/build#proxying-to-a-backend-server
see 6d650a2

## Update Angular service to read data from server

In the first post, we created the angular app using a hardcoded data. Now, we are going to replace it with the API calls.

### Replacing Promises with Observables

see c3726df

### Use HTTP Client to talk to server API

Replace the `get` method to serve data from the Node.js API instead of the hard coded values:

```js todo.service.ts (exerpt)
import { HttpClient } from '@angular/common/http';

export class TodoService {
  constructor(private http: HttpClient) { }

  get(query = '') {
    return this.http.get('/api/todos');
  }
```

If you run `npm run server` and `npm run start` on different terminals, you can test that it's no getting the task from the API. Great success! :)

The next step is to improve the API. It's returning a hard coded value, so it will be nice to have serve data from the database instead. So, let's work on MongoDB.

see b3271bd


# Using MongoDb on NodeJS through Mongoose

## Connecting to MongoDB with Mongoose

We are going to use mongoDB on Node.js using the library mongoose.
You can install it by running:

```sh
npm i mongoose --save
```

Connecting to MongoDB should be one of the first thing we do when the server loads.
Let's add the connection on `app.js`:

```js app.js (exerpt)
const mongoose = require('mongoose');

// connect to db
const DB_STRING = 'mongodb://localhost/todos';
const config = { useNewUrlParser: true, useUnifiedTopology: true};
mongoose.connect(DB_STRING, config)
  .then(() => console.log(`Connected to ${DB_STRING}`))
  .catch(console.error);
```

If you run `npm run server` again you might get an error:

```
MongoNetworkError: failed to connect to server [localhost:27017] on first connect [Error: connect ECONNREFUSED 127.0.0.1:27017
    at TCPConnectWrap.afterConnect [as oncomplete] (net.js:1129:14) {
  name: 'MongoNetworkError',
```

That's just saying that MongoDB is not running. Let's open yet another terminal and have it run:

```sh
sudo mongod
```

Now, if we restart the server it should be fine and you should see a:

```
Connected to mongodb://localhost/todos
```

## Defining the schema

```sh
mkdir -p server/schemas
touch server/schemas/todo.js
```

```js server/schemas/todo.js
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

see 32c09e4

## Creating CRUD operations with mongoose and REST

### List all data with GET method

```js
const todo = require('../schemas/todo');

/* GET todos list. */
router.get('/', async (req, res) => {
  try {
    const list = await todo.find();
    res.json(list);
  } catch (error) {
    res.json(500, { error });
  }
});
```


You can test the server is working by typing:

```sh
curl localhost:3131/api/todos
# []¶
```

### Create data with POST method

```js
/* POST /api/todos */
router.post('/', async (req, res) => {
  try {
    console.log({body: req.body})
    const todo = await Todo.create(req.body);
    res.json(todo);
  } catch (error) {
    res.json(500, { error });
  }
});
```

```sh
curl -XPOST localhost:3131/api/todos -H "Content-Type: application/json" -d '{"title": "CRUD API", "isDone": false}'
```

Now, you can verify that the data has been indeed saved on the DB.
```sh
curl -XGET localhost:3131/api/todos
#[{"_id":"5e6801cf59053808840f6c83","title":"CRUD API","isDone":false,"updated_at":"2020-03-10T21:08:31.093Z","__v":0}]¶
```

### Update data with PUT method


```js
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

```sh
curl -XPUT localhost:3131/api/todos/5e6801cf59053808840f6c83 -H "Content-Type: application/json" -d '{"title": "Finish PUT API", "isDone": true, "note": "New Field"}'
# {"_id":"5e6801cf59053808840f6c83","title":"Finish PUT API","isDone":true,"updated_at":"2020-03-10T21:08:31.093Z","__v":0}¶
```

As you can see in the last update, we can modified existing field and also add new values like the `note` field.

### Erasing data with DELETE method


```js
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


```sh
curl -XDELETE localhost:3131/api/todos/5e6801cf59053808840f6c83
# {"_id":"5e62d6be06b22c24ac02cdae","name":"Finish PUT API","completed":false,"updated_at":"2020-03-06T23:42:28.514Z","__v":0}
```

# Creating Services in Angular to connect with API

## Changing Angular service to work with Node.js API

### Get service

We can get all services using the following:

```js src/app/todo/todo.service.ts (exerpt)
  getTodos(query = ''){
    return this.todoService
      .get(query)
      .subscribe(todos => {
        this.todos = todos;
        this.activeTasks = this.todos.filter(todo => !todo.isDone).length;
      });
  }
```

We `this.todoService.get` will issue an HTTP get and retrive all the tasks from database. Try it out on the UI! If you tested it well enough, you might notice that the button `All`, `Active` and `Completed` are not working. We are going to fix that after getting all other actions working :)

### Creating data using HTTP post

```js src/app/todo/todo.service.ts (exerpt)
  add(data) {
    return this.http.post(API, data);
  }
```

### Updating data using HTTP put

Since changing the title or toggling a todo task on/off are both update, we are going to use the same `put` method.

```js src/app/todo/todo.service.ts (exerpt)
  put(changed) {
    return this.http.put(`${API}/${changed._id}`, changed);
  }

  toggle(selected) {
    selected.isDone = !selected.isDone;
    return this.put(selected);
  }
```

### Sending Queries with HTTP GET

Now that our CRUD (Create-Read-Update-Delete) operations are working, let's fix the buttons for `All`, `Active` and `Completed`.

To recap, this button uses the routing. So, every time you click on them, they will change the URL.

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

In the component we listen for these event changes:

```js recap: src/app/todo/todo.component.ts (exerpt)
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.path = params['status'];
      this.getTodos(this.path);
    });
  }
```

So, every time the URL changes we call the `getTodos` with the path which is all, active or complete. However, MongoDb doesn't understand this words. We have to map it to something a proper query like `{ isDone: true }`. That MongoDB will understand.

Let's create a map from url path to MongoDB query:

```js src/app/todo/todo.component.ts (exerpt)
export class TodoComponent implements OnInit {
  //...
  public mapToQuery = {
    all: {},
    active: { isDone: false },
    completed: { isDone: true },
  };

  //...
  getTodos(route = 'all'){
    const query = this.mapToQuery[route];
    return this.todoService
      .get(query)
      .subscribe(todos => {
        this.todos = todos;
        this.activeTasks = this.todos.filter(todo => !todo.isDone).length;
      });
  }
```

Lastly, we need to also make changes on the servie and backend API, so it can pass the query down to the database.

```js src/app/todo/todo.service.ts (exerpt)
export class TodoService {
  constructor(private http: HttpClient) { }

  get(params = {}) {
    return this.http.get(API, { params });
  }
```

and finally we need to change the route and restart the server:

```js server/routes/todos.js (exerpt)
/* GET /api/todos */
router.get('/', async (req, res) => {
  try {
    const list = await Todo.find(req.query);
    res.json(list);
  } catch (error) {
    res.status(500).json({ error });
  }
});
```

Now, you should be able to get the filter working!

### Deleting by query

To finish 100% of the functionalities. Let's all clear all completed tasks.

NOTE: This one is potential dangerous operation because it can delete all data from db if the body is empty.

```js server/routes/todos.js (exerpt)
/* DELETE /api/todos */
router.delete('/', async (req, res) => {
  try {
    const todo = await Todo.deleteMany(req.body);
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error });
  }
});
```

Let's go back to the service and implement the client side change:

```js src/app/todo/todo.service.ts (exerpt)
  deleteCompleted(body = { isDone: true }) {
    return this.http.request('delete', `${API}`, { body });
  }
```

Take notice that we are not using `this.http.delete` because Angular doesn't accept a body as you can see in this [open issue](https://github.com/angular/angular/issues/19438).


# Summary

Deserunt veniam proident minim enim enim reprehenderit pariatur pariatur aliqua. Ex ad irure nisi elit. Dolor non proident ad nostrud officia occaecat esse culpa ut consequat laboris.
