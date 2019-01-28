---
layout: post
title: "Creating RESTful APIs with NodeJS and MongoDB Tutorial (Part II)"
date: 2014-10-01 17:26:42 -0400
updated: 2016-10-14 15:50:35 -0400
comments: true
pageviews__total: 559809
pageviews__recent: 777
pageviews__avg_time: 2195
photos:
  - /images/RESTfulAPIs_NodeJS__mongodb_small.png
  - /images/RESTfulAPIs_NodeJS__mongodb_large.png
photos__background_color: '#4C4D4E'
bitly: 'http://bit.ly/creating-node-api1'
toc: true
# tags: [nodejs, javascript, tutorials, mongodb, mean stack]
tutorial__order: 2
tags:
  - NodeJS
  - ExpressJS
  - MongoDB
  - javascript
  - Tutorial_MEAN-Stack
categories:
  - Technologies
  - Web Development
---

Welcome to this tutorial about RESTful API using Node.js (Express.js) and MongoDB (mongoose)! We are going to learn how to install and use each component individually and then proceed to create a RESTful API.

<!--More-->

MEAN Stack tutorial series:

1. [AngularJS tutorial for beginners (Part I)](/blog/2014/09/28/angularjs-tutorial-for-beginners-with-nodejs-expressjs-and-mongodb/)
1. Creating RESTful APIs with NodeJS and MongoDB Tutorial (Part II) **👈 you are here**
1. [MEAN Stack Tutorial: MongoDB, ExpressJS, AngularJS and NodeJS (Part III)](/blog/2014/10/03/mean-stack-tutorial-mongodb-expressjs-angularjs-nodejs/)

# What is a RESTful API?

REST stands for Representational State Transfer. It is an architecture that allows `client-server` communication through a uniform interface. REST is `stateless`, `cachable` and has property called `idempotence`. It means that the side effect of identical requests have the same side-effect as a single request.

HTTP RESTful API's are compose of:

* HTTP methods, e.g. GET, PUT, DELETE, PATCH, POST, ...
* Base URI, e.g. `http://adrianmejia.com`
* URL path, e.g. `/blog/2014/10/01/creating-a-restful-api-tutorial-with-nodejs-and-mongodb/`
* Media type, e.g. `html`, `JSON`, `XML`, `Microformats`, `Atom`, `Images`...

Here is a summary what we want to implement:

| Resource (URI)  |  POST (create) | GET (read)  | PUT (update)  | DELETE (destroy)  |
|---|---|---|---|---|
| /todos  | create new task  | list tasks  | N/A (update all)  |  N/A (destroy all) |
| /todos/1  |  error  | show task ID 1  | update task ID 1  |  destroy task ID 1 |

**NOTE** for this tutorial:

  - Format will be JSON.
  - Bulk updates and bulk destroys are not safe, so we will not be implementing those.
  - **CRUD** functionality: POST == **C**REATE, GET == **R**EAD, PUT == **U**PDATE, DELETE == **D**ELETE.

# Installing the MEAN Stack Backend

In this section, we are going to install the backend components of the MEAN stack: MongoDB, NodeJS and ExpressJS. If you already are familiar with them, then jump to <a href="#wiring-up-the-mean-stack">wiring the stack</a>. Otherwise, enjoy the ride!

## Installing MongoDB

MongoDB is a document-oriented NoSQL database (Big Data ready). It stores data in JSON-like format and allows users to perform SQL-like queries against it.

You can install MongoDB following the <a href="http://docs.mongodb.org/manual/installation/" target="_blank">instructions here</a>.

If you have a **Mac** and <a href="http://brew.sh/" target="_blank">brew</a> it's just:

```bash
brew install mongodb && mongod
```

In **Ubuntu**:

```bash
sudo apt-get -y install mongodb
```


After you have them installed, check version as follows:

```bash
# Mac
mongod --version
# => db version v2.6.4
# => 2014-10-01T19:07:26.649-0400 git version: nogitversion

# Ubuntu
mongod --version
# => db version v2.0.4, pdfile version 4.5
# => Wed Oct  1 23:06:54 git version: nogitversion
```

## Installing NodeJS

The Node official definition is:

{% blockquote Node.js Website https://nodejs.org %}
Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient. Node.js' package ecosystem, npm, is the largest ecosystem of open source libraries in the world.
{% endblockquote %}

In short, NodeJS allows you to run Javascript outside the browser, in this case, on the web server. <abbr title="Node Package Manager">NPM</abbr> allows you to install/publish node packages with ease.

To install it, you can go to the <a href="http://nodejs.org/" target="_blank">NodeJS Website</a>.

Since Node versions changes very often. You can use the <abbr title="Node Version Manager">NVM</abbr> (Node Version Manager) on **Ubuntu** and Mac with:

```bash
# download NPM
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.4/install.sh | bash

# load NPM
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm

# Install latest stable version
nvm install stable
```

Check out <a href="https://github.com/creationix/nvm" target="_blank">https://github.com/creationix/nvm</a> for more details.

Also, on **Mac** and <a href="http://brew.sh" target="_blank">brew</a> you can do:

```
brew install nodejs
```


After you got it installed, check node version and npm (node package manager) version:
```bash
node -v
# => v6.2.2

npm -v
# => 3.9.5
```

## Installing ExpressJS

ExpressJS is a web application framework that runs on NodeJS. It allows you to build web applications and API endpoints. (more details on this later).

We are going to create a project folder first, and then add `express` as a dependency.
Let's use <abbr title="Node Package Manager">NPM</abbr> init command to get us started.

```bash
# create project folder
mkdir todo-app

# move to the folder and initialize the project
cd todo-app
npm init .  # press enter multiple times to accept all defaults

# install express v4.14 and save it as dependency
npm install express@4.14 --save
```

Notice that after the last command, `express` should be added to package.json with the version `4.14.x`.

# Using MongoDB with Mongoose

Mongoose is an <abbr title="Node Package Manager">NPM</abbr> package that allows you to interact with MongoDB. You can install it as follows:

```bash
npm install mongoose@4.5.8 --save
```

If you followed the previous steps, you should have all you need to complete this tutorial. We are going to build an API that allow users to CRUD (Create-Read-Update-Delete) Todo tasks from database.

## Mongoose CRUD

CRUD == **C**reate-**R**ead-**U**pdate-**D**elete

We are going to create, read, update and delete data from MongoDB using Mongoose/Node. First, you need to have mongodb up and running:

```bash
# run mongo daemon
mongod
```

Keep mongo running in a terminal window and while in the folder `todoApp` type `node` to enter the node CLI. Then:

```javascript
// Load mongoose package
var mongoose = require('mongoose');

// Connect to MongoDB and create/use database called todoAppTest
mongoose.connect('mongodb://localhost/todoAppTest');

// Create a schema
var TodoSchema = new mongoose.Schema({
  name: String,
  completed: Boolean,
  note: String,
  updated_at: { type: Date, default: Date.now },
});

// Create a model based on the schema
var Todo = mongoose.model('Todo', TodoSchema);
```

Great! Now, let's test that we can save and edit data.

## Mongoose Create

```javascript

// Create a todo in memory
var todo = new Todo({name: 'Master NodeJS', completed: false, note: 'Getting there...'});

// Save it to database
todo.save(function(err){
  if(err)
    console.log(err);
  else
    console.log(todo);
});
```

If you take a look to Mongo you will notice that we just created an entry. You can easily visualize data using <a href="https://robomongo.org/" target="_blank">Robomongo</a>:

{% img https://i.imgur.com/DI6Vxwq.png Viewing data with Robomongo %}

You can also build the object and save it in one step using `create`:

```javascript
Todo.create({name: 'Create something with Mongoose', completed: true, note: 'this is one'}, function(err, todo){
  if(err) console.log(err);
  else console.log(todo);
});
```

## Mongoose Read and Query

So far we have been able to save data, now we are going explore how to query the information.
There are multiple options for reading/querying data:

* Model.find(conditions, [fields], [options], [callback])
* Model.findById(id, [fields], [options], [callback])
* Model.findOne(conditions, [fields], [options], [callback])

Some examples:

```javascript Find all
// Find all data in the Todo collection
Todo.find(function (err, todos) {
  if (err) return console.error(err);
  console.log(todos)
});
```

The result is something like this:
``` Todo.find results
[ { _id: 57a6116427f107adef36c2f2,
    name: 'Master NodeJS',
    completed: false,
    note: 'Getting there...',
    __v: 0,
    updated_at: 2016-08-06T16:33:40.606Z },
  { _id: 57a6142127f107adef36c2f3,
    name: 'Create something with Mongoose',
    completed: true,
    note: 'this is one',
    __v: 0,
    updated_at: 2016-08-06T16:45:21.143Z } ]
```

You can also add queries

```javascript Find with queries
// callback function to avoid duplicating it all over
var callback = function (err, data) {
  if (err) { return console.error(err); }
  else { console.log(data); }
}

// Get ONLY completed tasks
Todo.find({completed: true }, callback);

// Get all tasks ending with `JS`
Todo.find({name: /JS$/ }, callback);
```

You can chain multiple queries, e.g.:

```javascript Chaining queries
var oneYearAgo = new Date();
oneYearAgo.setYear(oneYearAgo.getFullYear() - 1);

// Get all tasks staring with `Master`, completed
Todo.find({name: /^Master/, completed: true }, callback);

// Get all tasks staring with `Master`, not completed and created from year ago to now...
Todo.find({name: /^Master/, completed: false }).where('updated_at').gt(oneYearAgo).exec(callback);
```

MongoDB query language is very powerful. We can combine regular expressions, date comparison and more!

## Mongoose Update

Moving on, we are now going to explore how to update data.

Each model has an `update` method which accepts multiple updates (for batch updates, because it doesn’t return an array with data).

* Model.update(conditions, update, [options], [callback])
* Model.findByIdAndUpdate(id, [update], [options], [callback])
* Model.findOneAndUpdate([conditions], [update], [options], [callback])

Alternatively, the method `findOneAndUpdate` could be used to update just one and return an object.

```javascript Todo.update and Todo.findOneAndUpdate

// Model.update(conditions, update, [options], [callback])
// update `multi`ple tasks from complete false to true

Todo.update({ name: /master/i }, { completed: true }, { multi: true }, callback);

//Model.findOneAndUpdate([conditions], [update], [options], [callback])
Todo.findOneAndUpdate({name: /JS$/ }, {completed: false}, callback);
```

As you might noticed the batch updates (`multi: true`) doesn't show the data, rather shows the number of fields that were modified.

```javascript
{ ok: 1, nModified: 1, n: 1 }
```

Here is what they mean:

- `n` means the number of records that matches the query
- `nModified` represents the number of documents that were modified with update query.

## Mongoose Delete

`update` and `remove` mongoose API are identical, the only difference it is that no elements are returned. Try it on your own ;)

* Model.remove(conditions, [callback])
* Model.findByIdAndRemove(id, [options], [callback])
* Model.findOneAndRemove(conditions, [options], [callback])

# ExpressJS and Middlewares

ExpressJS is a complete web framework solution. It has HTML template solutions (jade, ejs, handlebars, hogan.js) and CSS precompilers (less, stylus, compass). Through middlewares layers, it handles: cookies, sessions, caching, CSRF, compression and many more.

**Middlewares** are pluggable processors that runs on each request made to the server. You can have any number of middlewares that will process the request one by one in a serial fashion. Some middlewares might alter the request input. Others, might create log outputs, add data and pass it to the `next()` middleware in the chain.

We can use the middlewares using `app.use`. That will apply for all request. If you want to be more specific, you can use `app.verb`. For instance: app.get, app.delete, app.post, app.update, ...


![ExpressJS Middlewares](/images/express-middlewares.png)

Let's give some examples of middlewares to drive the point home.

Say you want to log the IP of the client on each request:

```javascript Log the client IP on every request
app.use(function (req, res, next) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log('Client IP:', ip);
  next();
});
```

Notice that each middleware has 3 parameters:

- `req`: contain all the requests objects like URLs, path, ...
- `res`: is the response object where we can send the reply back to the client.
- `next`: continue with the next middleware in the chain.

You can also specify a path that you want the middleware to activate on.

```javascript Middleware mounted on "/todos/:id" and log the request method
app.use('/todos/:id', function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});
```

And finally you can use `app.get` to catch GET requests with matching routes, reply the request with a `response.send` and end the middleware chain. Let's use what we learned on <a href="#mongoose-read-and-query">mongoose read</a> to reply with the user's data that matches the `id`.

```javascript Middleware mounted on "/todos/:id" and returns
app.get('/todos/:id', function (req, res, next) {
  Todo.findById(req.params.id, function(err, todo){
    if(err) res.send(err);
    res.json(todo);
  });
});
```

Notice that all previous middlewares called `next()` except this last one, because it sends a response (in JSON) to the client with the requested `todo` data.

Hopefully, you don't have to develop a bunch of middlewares besides routes, since ExpressJS has a bunch of middlewares available.

## Default Express 4.0 middlewares

* <a href="https://github.com/expressjs/morgan" target="_blank">morgan</a>: logger

* <a href="https://github.com/expressjs/body-parser" target="_blank">body-parser</a>: parse the body so you can access parameters in requests in `req.body`. e.g. `req.body.name`.

* <a href="https://github.com/expressjs/cookie-parser" target="_blank">cookie-parser</a>: parse the cookies so you can access parameters in cookies `req.cookies`. e.g. `req.cookies.name`.

* <a href="https://github.com/expressjs/serve-favicon" target="_blank">serve-favicon</a>: exactly that, serve favicon from route `/favicon.ico`. Should be call on the top before any other routing/middleware takes place to avoids unnecessary parsing.

## Other ExpressJS Middlewares

The following middlewares are not added by default, but it's nice to know they exist at least:

* <a href="https://github.com/expressjs/compression" target="_blank">compression</a>: compress all request. e.g. `app.use(compression())`

* <a href="https://github.com/expressjs/session" target="_blank">session</a>: create sessions. e.g. `app.use(session({secret: 'Secr3t'}))`

* <a href="https://github.com/expressjs/method-override" target="_blank">method-override</a>: `app.use(methodOverride('_method'))` Override methods to the one specified on the `_method` param. e.g. `GET /resource/1?_method=DELETE` will become `DELETE /resource/1`.

* <a href="https://github.com/expressjs/response-time" target="_blank">response-time</a>: `app.use(responseTime())` adds `X-Response-Time` header to responses.

* <a href="https://github.com/expressjs/errorhandler" target="_blank">errorhandler</a>: Aid development, by sending full error stack traces to the client when an error occurs. `app.use(errorhandler())`. It is good practice to surround it with an if statement to check `process.env.NODE_ENV === 'development'`.

* <a href="https://github.com/expressjs/vhost" target="_blank">vhost</a>: Allows you to use different stack of middlewares depending on the request `hostname`. e.g. `app.use(vhost('*.user.local', userapp))` and `app.use(vhost('assets-*.example.com', staticapp))` where `userapp` and `staticapp` are different express instances with different middlewares.

* <a href="https://github.com/expressjs/csurf" target="_blank">csurf</a>: Adds a **C**ross-**s**ite **r**equest **f**orgery (CSRF) protection by adding a token to responds either via `session` or `cookie-parser` middleware. `app.use(csrf());`

* <a href="https://github.com/expressjs/timeout" target="_blank">timeout</a>: halt execution if it takes more that a given time. e.g. `app.use(timeout('5s'));`. However you need to check by yourself under every request with a middleware that checks `if (!req.timedout) next();`.

# Wiring up the MEAN Stack

In the next sections, we are going to put together everything that we learn from and build an API. They can be consume by browsers, mobile apps and even other servers.
{% img /images/api_uses.png API Consumers %}

## Bootstrapping ExpressJS

After a detour in the land of Node, MongoDB, Mongoose, and middlewares, we are back to our express todoApp. This time to create the routes and finalize our RESTful API.

Express has a separate package called `express-generator`, which can help us to get started with out API.

```bash Install and run "express-generator"
# install it globally using -g
npm install express-generator -g

# create todo-app API with EJS views (instead the default Jade)
express todo-api -e

#   create : todo-api
#   create : todo-api/package.json
#   create : todo-api/app.js
#   create : todo-api/public
#   create : todo-api/public/javascripts
#   create : todo-api/routes
#   create : todo-api/routes/index.js
#   create : todo-api/routes/users.js
#   create : todo-api/public/stylesheets
#   create : todo-api/public/stylesheets/style.css
#   create : todo-api/views
#   create : todo-api/views/index.ejs
#   create : todo-api/views/layout.ejs
#   create : todo-api/views/error.ejs
#   create : todo-api/public/images
#   create : todo-api/bin
#   create : todo-api/bin/www
#
#   install dependencies:
#     $ cd todo-api && npm install
#
#   run the app on Linux/Mac:
#     $ DEBUG=todo-app:* npm start
#
#   run the app on Windows:
#     $ SET DEBUG=todo-api:* & npm start
```

This will create a new folder called `todo-api`. Let's go ahead and install the dependencies and run the app:

```bash
# install dependencies
cd todo-api && npm install

# run the app on Linux/Mac
PORT=4000 npm start

# run the app on Windows
SET PORT=4000 & npm start
```


Use your browser to go to http://0.0.0.0:4000, and you should see a message "Welcome to Express"


## Connect ExpressJS to MongoDB

In this section we are going to access MongoDB using our newly created express app. Hopefully, you have installed MongoDB in the <a href="#mongodb">setup section</a>, and you can start it by typing (if you haven't yet):

```bash
mongod
```

Install the MongoDB driver for NodeJS called mongoose:

```bash
npm install mongoose --save
```

Notice `--save`. It will add it to the `todo-api/package.json`

Next, you need to require mongoose in the `todo-api/app.js`

```javascript Add to app.js
// load mongoose package
var mongoose = require('mongoose');

// Use native Node promises
mongoose.Promise = global.Promise;

// connect to MongoDB
mongoose.connect('mongodb://localhost/todo-api')
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));
```

Now, When you run `npm start` or `./bin/www`, you will notice the message `connection successful`. Great!

You can find the repository [here](https://github.com/amejiarosario/todoAPIjs) and the diff code at this point:
[diff](https://github.com/amejiarosario/todoAPIjs/commit/948a32391d208dd1303d67b443456a377e93fb8d)

## Creating the Todo model with Mongoose

It's show time! All the above was setup and preparation for this moment. Let bring the API to life.

Create a `models` directory and a `Todo.js` model:

```bash
mkdir models
touch models/Todo.js
```

In the `models/Todo.js`:

```javascript
var mongoose = require('mongoose');

var TodoSchema = new mongoose.Schema({
  name: String,
  completed: Boolean,
  note: String,
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Todo', TodoSchema);
```

[diff](https://github.com/amejiarosario/todoAPIjs/commit/afc908027339b22f10de3b77518ac0728668d470)

What’s going on up there? Isn’t MongoDB suppose to be schemaless? Well, it is schemaless and very flexible indeed. However, very often we want bring sanity to our API/WebApp through validations and enforcing a schema to keep a consistent structure. Mongoose does that for us, which is nice.

You can use the following types:

* String
* Boolean
* Date
* Array
* Number
* ObjectId
* Mixed
* Buffer

# API clients (Browser, Postman and curl)

I know you have not created any route yet. However, in the next sections you will. These are just three ways to retrieve, change and delete data from your future API.

## Curl

```bash Create tasks
# Create task
curl -XPOST http://localhost:3000/todos -d 'name=Master%20Routes&completed=false&note=soon...'

# List tasks
curl -XGET http://localhost:3000/todos
```

## Browser and Postman

If you open your browser and type `localhost:3000/todos` you will see all the tasks (when you implement it). However, you cannot do post commands by default. For further testing let’s use a Chrome plugin called <a href="https://chrome.google.com/webstore/detail/postman-rest-client/fdmmgilgnpjigdojojpjoooidkmcomcm?hl=en" target="_blank">Postman</a>. It allows you to use all the HTTP VERBS easily and check `x-www-form-urlencoded` for adding parameters.

{% img /images/postman_post.png Postman POST example %}

> Don't forget to check `x-www-form-urlencoded` or it won't work ;)

## Websites and Mobile Apps

Probably these are the main consumers of APIs. You can interact with RESTful APIs using jQuery's `$ajax` and its wrappers, BackboneJS's Collections/models, AngularJS's `$http` or `$resource`, among many other libraries/frameworks and mobile clients.

In the end, we are going to explain how to use AngularJS to interact with this API.


# ExpressJS Routes

To sum up we want to achieve the following:

| Resource (URI)  |  POST (create) | GET (read)  | PUT (update)  | DELETE (destroy)  |
|---|---|---|---|---|
| /todos  | create new task  | list tasks  | error  |  error |
| /todos/:id  |  error  | show task :id  | update task :id  |  destroy task ID 1 |


Let's setup the routes

```bash Create a new route called `todos.js` in the `routes` folder or rename `users.js`
mv routes/users.js routes/todos.js
```

In `app.js` add new `todos` route, or just replace `./routes/users` for `./routes/todos`

``` javascript Adding todos routes
var todos = require('./routes/todos');
app.use('/todos', todos);
```

All set! Now, let's go back and edit our `routes/todos.js`.

## List: GET /todos

Remember <a href="#mongoose-read-and-query"> mongoose query api</a>? Here's how to use it in this context:

```javascript routes/todos.js
var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Todo = require('../models/Todo.js');

/* GET /todos listing. */
router.get('/', function(req, res, next) {
  Todo.find(function (err, todos) {
    if (err) return next(err);
    res.json(todos);
  });
});

module.exports = router;
```

Harvest time! We don't have any task in database but at least we verify it is working:

```bash Testing all together
# Start database
mongod

# Start Webserver (in other terminal tab)
npm start

# Test API (in other terminal tab)
curl localhost:3000/todos
# => []%
```

[diff](https://github.com/amejiarosario/todoAPIjs/commit/54ab912ea9aa2b6633ae12816beb6e6c3d2702e6)

If it returns an empty array `[]` you are all set. If you get errors, try going back and making sure you didn't forget anything, or you can comment at the end of the post for help.

## Create: POST /todos

Back in `routes/todos.js`, we are going to add the ability to create using <a href="#mongoose-create">mongoose create</a>. Can you make it work before looking at the next example?

```javascript routes/todos.js (showing just create route)

/* POST /todos */
router.post('/', function(req, res, next) {
  Todo.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
```

[diff](https://github.com/amejiarosario/todoAPIjs/commit/28b60c4bf9c6d8b08c3351f725e17c7f40a077be)

A few things:

* We are using the `router.post` instead of `router.get`.
* You have to stop and run the server again: `npm start`.

Everytime you change a file you have to stop and start the web server. Let's fix that using `nodemon` to refresh automatically:

```bash Nodemon
# install nodemon globally
npm install nodemon -g

# Run web server with nodemon
nodemon
```

## Show: GET /todos/:id

This is a snap with <a href="#mongoose-read-and-query">`Todo.findById`</a> and `req.params`. Notice that `params` matches the placeholder name we set while defining the route. `:id` in this case.

```javascript routes/todos.js (showing just show route)
/* GET /todos/id */
router.get('/:id', function(req, res, next) {
  Todo.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
```

[diff](https://github.com/amejiarosario/todoAPIjs/commit/7d8bc67178a4f162858395845c076d9223926bf8)


Let's test what we have so far!

```bash Testing the API with Curl
# Start Web Server on port 4000 (default is 3000)
PORT=4000 nodemon

# Create a todo using the API
curl -XPOST http://localhost:4000/todos -d 'name=Master%20Routes&completed=false&note=soon...'
# => {"__v":0,"name":"Master Routes","completed":false,"note":"soon...","_id":"57a655997d2241695585ecf8"}%

# Get todo by ID (use the _id from the previous request, in my case "57a655997d2241695585ecf8")
curl -XGET http://localhost:4000/todos/57a655997d2241695585ecf8
{"_id":"57a655997d2241695585ecf8","name":"Master Routes","completed":false,"note":"soon...","__v":0}%

# Get all elements (notice it is an array)
curl -XGET http://localhost:4000/todos
[{"_id":"57a655997d2241695585ecf8","name":"Master Routes","completed":false,"note":"soon...","__v":0}]%
```

## Update: PUT /todos/:id

Back in `routes/todos.js`, we are going to update tasks. This one you can do without looking at the example below, review <a href="#mongoose-update">findByIdAndUpdate</a> and give it a try!

```javascript routes/todos.js (showing just update route)
/* PUT /todos/:id */
router.put('/:id', function(req, res, next) {
  Todo.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
```

[diff](https://github.com/amejiarosario/todoAPIjs/commit/00dafe491e0d0b59fa53e86d8c187c42d7824200)

```bash curl update
# Use the ID from the todo, in my case 57a655997d2241695585ecf8
curl -XPUT http://localhost:4000/todos/57a655997d2241695585ecf8 -d "note=hola"
# => {"_id":"57a655997d2241695585ecf8","name":"Master Routes","completed":true,"note":"hola","__v":0}%
```

## Destroy: DELETE /todos/:id

Finally, the last one! Almost identical to `update`, use <a href="#mongoose-delete">`findByIdAndRemove`</a>.

```javascript routes/todos.js (showing just update route)
/* DELETE /todos/:id */
router.delete('/:id', function(req, res, next) {
  Todo.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
```

[diff](https://github.com/amejiarosario/todoAPIjs/commit/cbf5366e2b4e1a683ed50d2148ed6a548616d3f8)

Is it working? Cool, you are done then!
Is NOT working? take a look at the [full repository](https://github.com/amejiarosario/todoAPIjs).

# What's next?

Connecting AngularJS with this endpoint. Check out the [third](/blog/2014/10/03/mean-stack-tutorial-mongodb-expressjs-angularjs-nodejs) tutorial in this series.
