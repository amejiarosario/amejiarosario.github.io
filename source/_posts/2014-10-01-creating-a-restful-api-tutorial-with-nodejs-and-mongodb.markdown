---
layout: post
title: "Creating RESTful APIs with NodeJS and MongoDB Tutorial (Part II)"
date: 2014-10-01 17:26:42 -0400
comments: true
categories: [nodejs, javascript, web frameworks, web development, agile frameworks, tutorials, mongodb, mean stack, backbonejs, angularjs, restful]
toc: true
---

Welcome to this RESTful API using Node.js (Express.js) and MongoDB (mongoose) tutorial. You can follow alone to make a stand alone API endpoint, or you could also check out our <a href="/blog/2014/09/28/angularjs-tutorial-for-beginners-with-nodejs-expressjs-and-mongodb" target="_blank">AngularJS</a> or <a href="/blog/2012/09/11/backbone-dot-js-for-absolute-beginners-getting-started" target="_blank">BackboneJS</a> tutorials to build a javascript-client that connects with the endpoint we are going to built.

<!--More-->

# Part II: RESTful API with NodeJS and MongoDB

{% img /images/nodejs.png 200 200 NodeJS %}
{% img /images/mongodb.png 200 200 MongoDB %}

## What RESTful API really means?

REST stands for Representational State Transfer. It is an architecture that allows `client-server` communication through a uniform interface. They are also `stateless`, `cachable` and has property called `idempotence`, which means that the side effect of multiple identical requests have the same effect as the same single request.

HTTP RESTful API's are compose of:

* HTTP methods, e.g. GET, PUT, DELETE, PATCH, POST, ...
* Base URI, e.g. `http://adrianmejia.com`
* URL path, e.g. `/blog/2014/10/01/creating-a-restful-api-tutorial-with-nodejs-and-mongodb/`
* Media type, e.g. `html`, `JSON`, `XML`, `Microformats`, `Atom`, `Images`...

Here's is a summary what we want to implement:

| Resource (URI)  |  POST (create) | GET (read)  | PUT (update)  | DELETE (destroy)  |
|---|---|---|---|---|
| /todos  | create new task  | list tasks  | N/A (update all)  |  N/A (destroy all) |
| /todos/1  |  error  | show task ID 1  | update task ID 1  |  destroy task ID 1 |

**NOTES**: 
* Format will be JSON. 
* Bulk updates and bulk destroys are not safe, so we will not be implementing those.
* POST, GET, PUT, DELETE == **C**REATE, **R**EAD, **U**PDATE, **D**ELETE == **CRUD**. 

## Setup

The two main components of the MEAN stack are... NodeJS and MongoDB.

{% img /images/node-js-mongodb.png NodeJS and MongoDB %}

Note: If already have installed NodeJS, MongoDB (Mongoose), ExpressJS and knows about them separately then you can jump to <a href="#wiring-up-the-mean-stack">wiring the stack</a>, which is where the hands on start. Otherwise, if you want to review/learn about each member of the stack then follow alone and enjoy the ride!

### NodeJS

For short NodeJS is Javascript running outside the browser, in this case in the server.

To install it, you can go to <a href="http://nodejs.org/" target="_blank">NodeJS Website</a>. But if you are using Mac and <a href="http://brew.sh" target="_blank">brew</a> you can do `brew install nodejs` and in ubuntu use <a href="https://github.com/creationix/nvm">nvm</a> to install it. Once you have continue.

Check node version and npm (node package manager) version:
```bash
node -v
# => v0.10.30

npm -v
# => 2.0.0-alpha-5
```

### ExpressJS

ExpressJS is web application framework that runs on NodeJS. Allows you to build web applications and APIs endpoints. (mode details later).

Install it using npm:
```bash
npm install -g express
```

Notice `-g`. It will install `express` globally and add it the `PATH`, so you can run it from anywhere.

Check version:
```
express -V
# => 4.9.0
```

### MongoDB

MongoDB is a document-oriented NoSQL database (Big Data ready). It stores data in JSON-like format and allows to perform SQL-like queries against it.

You can installed following the <a href="http://docs.mongodb.org/manual/installation/" target="_blank">instructions here</a>. If you have a Mac and <a href="http://brew.sh/" target="_blank">brew</a> it's just: `brew install mongodb && mongod`. In ubuntu `sudo apt-get -y install mongodb`.

Check version:
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

## Understanding the MEAN Stack

If follow the previous steps you should have all you need to complete this tutorial. Basically, we are going to build an API that allow users to CRUD (Create-Read-Update-Delete) Todo tasks from database.

### Mongoose CRUD

CRUD = **C**reate-**R**ead-**U**pdate-**D**elete

We can play with Mongoose in the console. In the `todoApp` type `node` to enter in the node CLI. Then:

```javascript
/* prompt> */ var mongoose = require('mongoose');

/* prompt> */ mongoose.connect('mongodb://localhost/test3');

/* prompt> */ var TodoSchema = new mongoose.Schema({
  name: String,
  completed: Boolean,
  note: String,
  updated_at: { type: Date, default: Date.now },
});

/* prompt> */ var Todo = mongoose.model('Todo', TodoSchema);

```

#### Mongoose Create

```javascript
/* prompt> */ var todo = new Todo({name: 'Master NodeJS', completed: false, note: 'Getting there...'});

/* prompt> */ todo.save(function(err){
    if(err)
        console.log(err);
    else
        console.log(todo);
});
```

You can also build the object and save in one step using `create`:

```javascript
/* prompt> */ Todo.create({name: 'Master Javscript', completed: true, note: 'Getting better everyday'}, function(err, todo){
    if(err) console.log(err);
    else console.log(todo);
});
```

#### Mongoose Read and Query

There are multiple options for reading/querying data:

* Model.find(conditions, [fields], [options], [callback])
* Model.findById(id, [fields], [options], [callback])
* Model.findOne(conditions, [fields], [options], [callback])

Some examples:

```javascript Find all
/* prompt> */ Todo.find(function (err, todos) {
  if (err) return console.error(err);
  console.log(todos)
});
```

You can also add queries

```javascript Find with queries
/* prompt> */ var callback = function (err, data) {
  if (err) return console.error(err);
  else console.log(data);
}

// Get all completed tasks
/* prompt> */ Todo.find({completed: true }, callback);

// Get all tasks ending with `JS`
/* prompt> */ Todo.find({name: /JS$/ }, callback);
```

You can chain multiple queries, e.g.:

```javascript Chaining queries
/* prompt> */ var oneYearAgo = new Date();
oneYearAgo.setYear(oneYearAgo.getFullYear() - 1);

// Get all tasks staring with `Master`, completed
/* prompt> */ Todo.find({name: /^Master/, completed: true }, callback);

// Get all tasks staring with `Master`, not completed and created from year ago to now...
/* prompt> */ Todo.find({name: /^Master/, completed: false }).where('updated_at').gt(oneYearAgo).exec(callback);
```

#### Mongoose Update

Each model has an `update` method which accepts multiple updates (for batch updates because doesn’t return an array with data). Alternatively, the method `findOneAndUpdate` could be used to update just one and return an object.

* Model.update(conditions, update, [options], [callback])
* Model.findByIdAndUpdate(id, [update], [options], [callback])
* Model.findOneAndUpdate([conditions], [update], [options], [callback])

```javascript Todo.update and Todo.findOneAndUpdate

// Model.update(conditions, update, [options], [callback])
// update `multi`ple tasks from complete false to true

/* prompt> */ Todo.update({ completed: false }, { completed: true }, { multi: true }, function (err, numberAffected, raw) {
  if (err) return handleError(err);
  console.log('The number of updated documents was %d', numberAffected);
  console.log('The raw response from Mongo was ', raw);
});

//Model.findOneAndUpdate([conditions], [update], [options], [callback])
/* prompt> */ Todo.findOneAndUpdate({name: /JS$/ }, {completed: false}, callback);
```

#### Mongoose Delete

`update` and `remove` mongoose API are identical, the only difference it is that no elements are returned.

* Model.remove(conditions, [callback])
* Model.findByIdAndRemove(id, [options], [callback])
* Model.findOneAndRemove(conditions, [options], [callback])

### ExpressJS and Middlewares

ExpressJS is a complete web framework solution. It has HTML template solutions (jade, ejs, handlebars, hogan.js) and CSS precompilers (less, stylus, compass). Through middlewares layers, it handles: cookies, sessions, caching, CSRF, compression and many more.

**Middlewares** are a stack of processors that runs on each request made to the server. You can have any number of middlewares that will process the request one by one in a serial fashion. Some might alter the request input, log outputs, add data and pass it to the `next()` middleware in the chain.

Middlewares are added to ExpressJS stack using `app.use` for any method or the app.VERB (e.g., `app.get`, `app.delete`, `app.post`, `app.update`, ...)

{% img /images/express-middlewares.png ExpressJS Middlewares %}

Let's say you want to log the IP of the client on each request:

```javascript Log the client IP on every request
app.use(function (req, res, next) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log('Client IP:', ip);
  next();
});
```

You can also specify a path that you want the middleware to activate on.

```javascript Middleware mounted on "/todos/:id" and log the request method
app.use('/todos/:id', function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});
```

And finally you can use `app.get` to catch GET request with maching route, reply the request with a `response.send` and end the middleware chain. Let's use what we learned on <a href="#mongoose-read-and-query">mongoose read</a> to reply with a user data matching the `id`.

```javascript Middleware mounted on "/todos/:id" and returns 
app.get('/todos/:id', function (req, res, next) {
  Todo.findById(req.params.id, function(err, todo){
    if(err) res.send(err);
    res.json(todo);
  });
});
```

Notice that all previous middlewares called `next()` except this last one, because it sends a respond (in JSON) to the client with the requeste `todo` data.

Hopefully, you don't have to develop a bunch of middlewares besides routes, since ExpressJS has a bunch of middlewares available. 

#### Default Express 4.0 middlewares

* <a href="https://github.com/expressjs/morgan" target="_blank">morgan</a>: logger

* <a href="https://github.com/expressjs/body-parser" target="_blank">body-parser</a>: parse the body so you can access parameters in requests in `req.body`. e.g. `req.body.name`.

* <a href="https://github.com/expressjs/cookie-parser" target="_blank">cookie-parser</a>: parse the cookies so you can access parameters in cookies `req.cookies`. e.g. `req.cookies.name`.

* <a href="https://github.com/expressjs/serve-favicon" target="_blank">serve-favicon</a>: exactly that, serve favicon from route `/favicon.ico`. Should be call on the top before any other routing/middleware takes place to avoids unnecessary parsing.

#### Other ExpressJS Middlewares

The following middlewares are not added by default, but It's nice to know they exist at least:

* <a href="https://github.com/expressjs/compression" target="_blank">compression</a>: compress all request. e.g. `app.use(compression())`

* <a href="https://github.com/expressjs/session" target="_blank">session</a>: create sessions. e.g. `app.use(session({secret: 'b@ndw1d7h'}))`

* <a href="https://github.com/expressjs/method-override" target="_blank">method-override</a>: `app.use(methodOverride('_method'))` Override methods to the one specified on the `_method` param. e.g. `GET /resource/1?_method=DELETE` will become `DELETE /resource/1`.

* <a href="https://github.com/expressjs/response-time" target="_blank">response-time</a>: `app.use(responseTime())` adds `X-Response-Time` header to responses.

* <a href="https://github.com/expressjs/errorhandler" target="_blank">errorhandler</a>: Aid development, by sending full error stack traces to the client when an error occurs. `app.use(errorhandler())`. It is good practice to surround it with an if statement to check `process.env.NODE_ENV === 'development'`.

* <a href="https://github.com/expressjs/vhost" target="_blank">vhost</a>: Allows you to use different stack of middlewares depending on the request `hostname`. e.g. `app.use(vhost('*.user.local', userapp))` and `app.use(vhost('assets-*.example.com', staticapp))` where `userapp` and `staticapp` are different express instances with different middlewares.

* <a href="https://github.com/expressjs/csurf" target="_blank">csurf</a>: Adds a **C**ross-**s**ite **r**equest **f**orgery (CSRF) protection by adding a token to responds either via `session` or `cookie-parser` middleware. `app.use(csrf());`

* <a href="https://github.com/expressjs/timeout" target="_blank">timeout</a>: halt execution if it takes more that a given time. e.g. `app.use(timeout('5s'));`. However you need to check by yourself under every request with a middleware that checks `if (!req.timedout) next();`.

### API clients (Browser, Postman and curl)

I know you have not created any route yet. However, in the next sections you will. These are just three ways to retrieve, change and delete data from your future API.

#### Curl

```bash Create tasks
# Create task
curl -XPOST http://localhost:3000/todos -d 'name=Master%20Routes&completed=false&note=soon...'

# List tasks
curl -XGET http://localhost:3000/todos
```

#### Browser and Postman

If you open your browser and type `localhost:3000/todos` you will see all the tasks (when you implement it). However, you cannot do post commands by default. For further testing let’s use a Chrome plugin called <a href="https://chrome.google.com/webstore/detail/postman-rest-client/fdmmgilgnpjigdojojpjoooidkmcomcm?hl=en" target="_blank">Postman</a>. It allows you to use all the HTTP VERBS easily and check `x-www-form-urlencoded` for adding parameters.

{% img /images/postman_post.png Postman POST example %}

#### Websites and Mobile Apps

Probably this is the main consumers of the APIs. You can interact with RESTful APIs using jQuery's `$ajax` and its wrappers, BackboneJS's Collections/models, AngularJS's `$http` or `$resource`, among many other libraries/frameworks and mobile clients.

In the end, we are going to explain how to use AngularJS to interact with this API.

{% img /images/api_consumers.png API Consumers %}
<small class="muted">Image from CodeSchool</small>

## Wiring up the MEAN Stack

### Bootstrapping ExpressJS

After a detour in Node CLI, MongoDB, Mongoose, tools and middlewares land we are back to our express todoApp. This time to create the routes and finalize our RESTful API.

Create the app typing `express -e todoApp`, install dependencies `cd todoApp && npm install` and run the app `DEBUG=todoApp ./bin/www`:

```bash
express -e todoApp

# =>   create : todoApp                  # app directory  
# =>   create : todoApp/package.json     # file containing all the dependencies
# =>   create : todoApp/app.js           # Entry point of the application: defines middleware, initialize database connections, routes and more.
# =>   create : todoApp/public           # all files contained here are accessible through to public (browser or API calls).
# =>   create : todoApp/public/javascripts
# =>   create : todoApp/public/images
# =>   create : todoApp/public/stylesheets
# =>   create : todoApp/public/stylesheets/style.css
# =>   create : todoApp/routes           # containes all the routes files
# =>   create : todoApp/routes/index.js
# =>   create : todoApp/routes/users.js
# =>   create : todoApp/views            # contains all the HTML templates
# =>   create : todoApp/views/index.ejs
# =>   create : todoApp/views/error.ejs
# =>   create : todoApp/bin              # contains executable files
# =>   create : todoApp/bin/www          # bootstrap the app: loads app.js, and set the port for the webserver.
# =>
# =>   install dependencies:
# =>     $ cd todoApp && npm install
# =>
# =>   run the app:
# =>     $ DEBUG=todoApp ./bin/www
```

### Connect ExpressJS to MongoDB

Hopefully, you have installed MongoDB in the <a href="#mongodb">setup section</a>, and you can start it typing:

```bash
mongod
```

Install the MongoDB driver for NodeJS called mongoose:

```bash
npm install mongoose --save
```

Notice `--save`. It will add it to the `todoApp/package.json`

Next, you need to require mongoose in the `todoApp/app.js`

```javascript
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todoApp', function(err) {
    if(err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});
```

Now, When you run `npm start` or `./bin/www`, you will notice the message `connection successful`. Did you? Great!

You can find the repository [here](https://github.com/amejiarosario/todoAPIjs) and the diff code at this point: 
[diff](https://github.com/amejiarosario/todoAPIjs/commit/d3be6a287e8aff39ab862971da4f050d04e552a1)

### Creating the Todo model with Mongoose

It is show time! All the above was setup and preparation for this moment. Let bring the API to life.

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

What’s going up there? Isn’t MongoDB suppose to be schemaless? Well, it is schemaless and very flexible indeed. However, very often we want bring sanity to our API/WebApp through validations and enforcing a schema to keep a consistent structure. Mongoose does that for us, which is nice.

You can use the following types:

* String
* Boolean
* Date
* Array
* Number
* ObjectId
* Mixed
* Buffer

### ExpressJS Routes

To sum up we want to achieve the following:

| Resource (URI)  |  POST (create) | GET (read)  | PUT (update)  | DELETE (destroy)  |
|---|---|---|---|---|
| /todos  | create new task  | list tasks  | error  |  error |
| /todos/:id  |  error  | show task :id  | update task :id  |  destroy task ID 1 |


Let's setup the routes

```bash Create a new route called `todos.js` in the `routes` folder or rename `users.js`
mv routes/users.js routes/todos.js
```

In `app.js` add new `todos` route or just replace `./routes/users` for `./routes/todos`

``` javascript Adding todos routes
var todos = require('./routes/todos');
app.use('/todos', todos);
```

All set! Now, let's go back and edit our `routes/todos.js`.

#### List: GET /todos

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
DEBUG=todoApp ./bin/www

# Test API (in other terminal tab)
curl localhost:3000/todos
# => []% 
```

[diff](https://github.com/amejiarosario/todoAPIjs/commit/54ab912ea9aa2b6633ae12816beb6e6c3d2702e6)

If it returns an empty array `[]` you are all set. If you get errors, try going back and making sure you didn't forget anything or write a comment at the end of the post for help.

#### Create: POST /todos

Back in `routes/todos.js`, we are going to add the ability to create using <a href="#mongoose-create">mongoose create</a>. Could you make it work before looking at the next example?

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

Few things:

* We are using the `router.post` instead of `router.get`.
* You have to stop and run the server again: `DEBUG=todoApp ./bin/www`. From now on, use `nodemon` to refresh automatically. `npm install nodemon` and then run `nodemon`.

#### Show: GET /todos/:id

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


Test it in *POST*MAN using an `_id` from you created elements. E.g. `localhost:3000/todos/542d7d290a705126360ac635`.

#### Update: PUT /todos/:id

Back in `routes/todos.js`, we are going to update tasks. This one you can do it before looking at the example bellow, review <a href="#mongoose-update">findByIdAndUpdate</a> and give it a try!

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

Test it in *POST*MAN :)

#### Destroy: DELETE /todos/:id

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

## What's next?

Connecting AngularJS with this endpoint:

* Part III - [MEAN Stack: Wiring all together](/blog/2014/10/03/mean-stack-tutorial-mongodb-expressjs-angularjs-nodejs/)

{% img /images/MEAN_jarroba.png MEAN Stack %}

**Related tutorials**

* Part I - [AngularJS](/blog/2014/09/28/angularjs-tutorial-for-beginners-with-nodejs-expressjs-and-mongodb/)
* Part III - [MEAN Stack: Wiring all together](/blog/2014/10/03/mean-stack-tutorial-mongodb-expressjs-angularjs-nodejs/)
* [BackboneJS Tutorials](/blog/categories/backbonejs)

