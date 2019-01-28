---
layout: post
title: 'Vue.js Tutorial for beginners'
comments: true
pageviews__total: 8040
pageviews__recent: 472
pageviews__avg_time: 375
tutorial__order: 0
toc: true
photos:
  - /images/vuejs-vuerouter-tutorial-todo-app-small.jpg
  - /images/vuejs-vuerouter-tutorial-todo-app-large.jpg
photos__background_color: '#FB4F3B'
tags:
  - javascript
  - todo app
  - vue.js
categories:
  - Programming
  - Web Development
date: 2018-08-04 21:30:22
updated: 2018-08-04 21:30:22
---
In this tutorial, you are going to learn the basics of Vue.js. While we learn, we are going to build a Todo app that will help us to put in practice what we learn.

<!-- more -->

A good way to learn a new framework, It's by doing a Todo app. It's an excellent way to compare framework features. It's quick to implement and easy to understand. However, don't be fooled by the simplicity, we are going to take it to the next level. We are going to explore advanced topics as well such as Vue Routing, Components, directives and many more!

Let's first setup the dev environment, so we can focus on Vue! 🖖

# Setup

We are going to start with essential HTML elements and CSS files and no JavaScript. You will learn how to add all the JavaScript functionality using Vue.js.

To get started quickly, clone the following repo and check out the `start-here` branch:

```bash
git clone https://github.com/amejiarosario/vue-todo-app.git
cd vue-todo-app
git checkout start-here

npm install
npm start
```

After running `npm start`, your browser should open on port `http://127.0.0.1:8080` and show the todo app.

![todo-app](/images/todo-app.jpg)

Try to interact with it. You cannot create a new Todos, nor can you delete them or edit them. We are going to implement that!

Open your favorite code editor (I recommend [Code](https://code.visualstudio.com/)) on `vue-todo-app` directory.

## Package.json

Take a look at the `package.json` dependencies:

```js app.js
  "dependencies": {
    "todomvc-app-css": "2.1.2",
    "vue": "2.5.17",
    "vue-router": "3.0.1"
  },
  "devDependencies": {
    "live-server": "1.2.0"
  }
```

We installed `Vue` and `VueRouter` dependencies. Also, we have the nice CSS library for Todo apps and `live-server` to serve and reload the page when we make changes. That's all we would need for this tutorial.

## index.html

Open the `index.html` file.  There we have the basic HTML structure for the Todo app that we are going to build upon:

- Line 9: Loads the CSS from NPM module `node_modules/todomvc-app-css/index.css`.
- Line 23: We have the `ul` and some hard-coded todo lists. We are going to change this in a bit.
- Line 73: we have multiple script files that load Vue, VueRouter and an empty `app.js`.

Now, you know the basic structure where we are going to work on. Let's get started with Vue! 🖖

# Getting started with Vue

As you might know...

> Vue.js is a *reactive* JavaScript framework to build UI components.

It's reactive because the data and the DOM are linked. That means, that when data changes, it automatically updates the DOM. Let's try that!

## Vue Data & v-text

Go to `app.js` and type the following:

```js app.js
const todoApp = new Vue({
  el: '.todoapp',
  data: {
    title: 'Hello Vue!'
  }
});
```

The `el` is the element where Vue is going to be mounted. If you notice in the `index.html` that's the section part. The `data` object is reactive. It keeps track of changes and re-render the DOM if needed. Go to the index page and change `<h1>todos</h1>` for `<h1>{% raw %}{{ title }}{% endraw %}</h1>`. The rest remains the same:

{% codeblock index.html lang:js mark:3 %}
  <section class="todoapp">
    <header class="header">
      <h1>{% raw %}{{ title }}{% endraw %}</h1>
      <input class="new-todo" placeholder="What needs to be done?" autofocus>
    </header>
    <!--  ...  -->
{% endcodeblock %}

If you have `npm start` running you will see that the title changed!

You can also go to the console and change it `todoApp.title = "Bucket List"` and see that it updates the DOM.

![vue](/images/vue-reactive.gif)

Note: besides the curly braces you can also use `v-text`:

```html index.html
<h1 v-text="title"></h1>
```

Let's do something useful and put an initial todo list:

```js app.js
const todoApp = new Vue({
  el: '.todoapp',
  data: {
    title: 'Todos',
    todos: [
      { text: 'Learn JavaScript ES6+ goodies', isDone: true },
      { text: 'Learn Vue', isDone: false },
      { text: 'Build something awesome', isDone: false },
    ],
  }
});
```

Now that we have the list we need to replace the `<li>` elements with each of the elements in the `data.todos` array.

Let's do the CRUD (Create-Read-Update-Delete) of a Todo application.

[review diff](https://github.com/amejiarosario/vue-todo-app/commit/2d1f2e5)

## READ: List rendering with `v-for`

As you can see everything starting with `v-` is defined by the Vue library.

We can iterate through elements using `v-for` as follows:

```html index.html
  <li v-for="todo in todos">
    <div class="view">
      <input class="toggle" type="checkbox">
      <label>{{todo.text}}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="Rule the web">
  </li>
```

You can remove the other `<li>` tag that was just a placeholder.

[review diff](https://github.com/amejiarosario/vue-todo-app/commit/3dc4871)

## CREATE Todo and event directives

We are going to implement the create functionality. We have a textbox, and when we press enter, we would like to add whatever we typed to the list.

In Vue, we can listen to an event using `v-on:EVENT_NAME`. E.g.:

- v-on:click
- v-on:dbclick
- v-on:keyup
- v-on:keyup.enter

**Protip**: since `v-on:` is used a lot, there's a shortcut `@`. E.g. Instead of `v-on:keyup.enter` it can be `@keyup.enter`.

Let's use the `keyup.enter` to create a todo:

```html index.html
  <input class="new-todo" placeholder="What needs to be done?"
    v-on:keyup.enter="createTodo"
    autofocus>
```

On `enter` we are calling `createTodo` method, but it's not defined yet. Let's define it on `app.js` as follows:

```js app.js
  methods: {
    createTodo(event) {
      const textbox = event.target;
      this.todos.push({ text: textbox.value, isDone: false });
      textbox.value = '';
    }
  }
```

[review diff](https://github.com/amejiarosario/vue-todo-app/commit/fcd305c)

## Applying classes dynamically & Vue `v-bind`

If you click the checkbox (or checkcirlcle) we would like the class `completed` to be applied to the element. We can accomplish this by using the `v-bind` directive.

`v-bind` can be applied to any HTML attribute such as `class`, `title` and so forth. Since `v-bind` is used a lot we can have a shortcut `:`, so instead of `v-bind:class` it becomes `:class`.

```html index.html
<li v-for="todo in todos" :class="{ completed: todo.isDone }">
```

Now if a Todo list is completed, it will become cross out. However, if we click on the checkbox, it doesn't update the `isDone` property.  Let's fix that next.

[review diff](https://github.com/amejiarosario/vue-todo-app/commit/2145c36)

## Keep DOM and data in sync with Vue v-model

The todos have a property called `isDone` if it's true we want the checkbox to be marked. That's data -> DOM. We also want if we change the DOM (click the checkbox) we want to update the data (DOM -> data). This bi-directional communication is easy to do using `v-model`, it will keep it in sync for you!

```html
<input class="toggle" type="checkbox" v-model="todo.isDone">
```

If you test the app now, you can see when you click the checkbox; also the text gets cross out. Yay!

You can also go to the console and verify that if you change the data directly, it will immediately update the HTML. Type the following in the browser console where you todo app is running:

```
todoApp.todos[2].isDone = true
```
You should see the update. Cool!

## UPDATE todo list with a double-click

We want to double click on any list and that it automatically becomes a checkbox. We have some CSS magic to do that, the only thing we need to do is to apply the `editing` class.

```html index.html
        <!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
        <li v-for="todo in todos" :class="{ completed: todo.isDone }">
          <div class="view">
            <input class="toggle" type="checkbox" v-model="todo.isDone">
            <label>{{todo.text}}</label>
            <button class="destroy"></button>
          </div>
          <input class="edit" value="Rule the web">
        </li>
```

Similar to what we did with the `completed` class, we need to add a condition when we start editing.

Starting with the label, we want to start editing when we double-click on it. Vue provides `v-on:dblclick` or shorthand `@dblclick`:

```html
<label @dblclick="startEditing(todo)">{{todo.text}}</label>
```

In the `app.js` we can define start editing as follows:

```js app.js
const todoApp = new Vue({
  el: '.todoapp',
  data: {
    title: 'Todos',
    todos: [
      { text: 'Learn JavaScript ES6+ goodies', isDone: true },
      { text: 'Learn Vue', isDone: false },
      { text: 'Build something awesome', isDone: false },
    ],
    editing: null,
  },
  methods: {
    createTodo(event) {
      const textbox = event.target;
      this.todos.push({ text: textbox.value, isDone: false });
      textbox.value = '';
    },
    startEditing(todo) {
      this.editing = todo;
    },
  }
});
```

We created a new variable `editing` in data. We just set whatever todo we are currently editing. We want only to edit one at a time, so this works perfectly. When you double-click the label, the `startEditing` function is called and set the `editing` variable to the current todo element.

Next, we need to apply the `editing` class:

```html
<li v-for="todo in todos" :class="{ completed: todo.isDone, editing: todo === editing }">
```
When `data.editing` matches the `todo` , then we apply the CSS class. Try it out!

If you try it out, you will notice you can enter on edit mode, but there's no way to exit from it (yet). Let's fix that.

```html
          <input class="edit"
            @keyup.esc="cancelEditing"
            @keyup.enter="finishEditing"
            @blur="finishEditing"
            :value="todo.text">
```
First, we want the input textbox to have the `value` of the `todo.text` when we enter to the editing mode. We can accomplish this using `:value="todo.text"`. Remember that colon `:` is a shorthand for `v-bind`.

Before, we implemented the `startEditing` function. Now, we need to complete the edit functionality with these two more methods:

- `finishEditing`: applies changes to the `todo.text`. This is triggered by pressing <kbd>enter</kbd> or clicking elsewhere (blur).
- `cancelEditing`: discard the changes and leave `todos` list untouched. This happens when you press the <kbd>esc</kbd> key.

Let's go to the `app.js` and define these two functions.

```js app.js
    finishEditing(event) {
      if (!this.editing) { return; }
      const textbox = event.target;
      this.editing.text = textbox.value;
      this.editing = null;
    },
    cancelEditing() {
      this.editing = null;
    }
```

Cancel is pretty straightforward. It just set editing to null.

`finishEditing` will take the input current's value (event.target.value) and copy over the todo element that is currently being edited. That's it!

[review diff](https://github.com/amejiarosario/vue-todo-app/commit/4af7d31)

## DELETE todo list on @click event

Finally, the last step to complete the CRUD operations is deleting. We are going to listen for click events on the destroy icon:

```html
<button class="destroy" @click="destroyTodo(todo)"></button>
```

also, `destroyTodo` implementation is as follows:

```js app.js
    destroyTodo(todo) {
      const index = this.todos.indexOf(todo);
      this.todos.splice(index, 1);
    },
```

[review diff](https://github.com/amejiarosario/vue-todo-app/commit/a73e058)

## Trimming inputs

It's always a good idea to `trim` user inputs, so any accidental whitespace doesn't get in the way with `textbox.value.trim()`.

[review diff](https://github.com/amejiarosario/vue-todo-app/commit/45b4eed44abd9a4cfec3b3977b61fe7031ff6c4e)

## Items left count with  `computed` properties

Right now the `item left` count is always 0. We want the number of remaining tasks.  We could do something like this:

```html
<strong>{{ todos.filter(t => !t.isDone).length }}</strong> item(s) left</span>
```

That's a little ugly to stick out all that logic into the template. That's why Vue has the `computed`  section!

```js app.js
  computed: {
    activeTodos() {
      return this.todos.filter(t => !t.isDone);
    }
  }
```

Now the template is cleaner:

```html
<strong>{{ activeTodos.length }}</strong> item(s) left</span>
```

You might ask, why use a computed property when we can create a method instead?

> Computed vs. Methods. Computed properties are **cached** and updated when their dependencies changes. The computed property would return immediately without having to evaluate the function if no changes happened. On the other hand, Methods will **always** run the function.

Try completing other tasks and verify that the count gets updated.

![items-left](/images/items-left.gif)

[review diff](https://github.com/amejiarosario/vue-todo-app/commit/24ae5a0f74c226325d88a2aaecad9e40b35760fb)


## Clearing completed tasks & conditional rendering with `v-show`

We want to show `clear completed` button only if there are any completed task. We can accomplish this with the `v-show` directive:

```html
<button class="clear-completed" @click="clearCompleted" v-show="completedTodos.length">Clear completed</button>
```

The v-show will hide the element if the expression evaluates to false or 0.

One way to clearing out completed tasks is by assigning the `activeTodos` property to the `todos`:

```js app.js
    clearCompleted() {
      this.todos = this.activeTodos;
    }
```
Also, we have to add the computed property `completedTodos` that we use in the v-show

```js
    completedTodos() {
      return this.todos.filter(t => t.isDone);
    }
```

[review diff](https://github.com/amejiarosario/vue-todo-app/commit/dd7dd90)

# Vue Conditional Rendering: `v-show` vs `v-if`

`v-show` and `v-if` looks very similar, but they work differently. `v-if` removes the element from the DOM and disable events, while `v-show` hides it with the CSS `display: none;`. So, `v-if` is more expensive than `v-show`.

> If you foresee the element being toggling visibility very often then you should use `v-show`. If not, then use `v-if`.

We can hide the footer and central section if there's no todo list.

```html
<section class="main" v-if="todos.length">... </section>
<footer class="footer" v-if="todos.length">...</footer>
```

[review diff](https://github.com/amejiarosario/vue-todo-app/commit/790b241)

# Local Storage

On every refresh, our list gets reset. This is useful for dev but not for users. Let's persist our Todos in the local storage.

> Local storage vs. Session storage. **Session** data goes away when you close the window or expire after a specific time. **Local storage** doesn't have an expiration time.

The way `localStorage` works is straightforward. It is global variable and has only 4 methods:

- `localStorage.setItem(key, value)`: key/value storage. `key` and `value` are coerced into a string.
- `localStorage.getItem(key)`: get the item by key.
- `localStorage.removeItem(key)`: remove item matching the key.
- `localStorage.clear()`: clear all items for the current hostname.

We are going to use `getItem` and `setItem`. First we need to define a storage key:

```js app.js
const LOCAL_STORAGE_KEY = 'todo-app-vue';
```

Then we replace `data.todos` to get items (if any) from the local storage:

```js app.js
  data: {
    title: 'Todos',
    todos: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [
      { text: 'Learn JavaScript ES6+ goodies', isDone: true },
      { text: 'Learn Vue', isDone: false },
      { text: 'Build something awesome', isDone: false },
    ],
    editing: null,
  },
```

We have to use `JSON.parse` because everything gets stored as a string and we need to convert it to an object.

`getItem` will retrieve the saved todos from the `localstorage`. However, we are saying it yet. Let's see how we can do that.

# Vue Watchers

For saving, we are going to use the Vue watchers.

> Vue watchers vs. Computed properties. Computed properties are usually used to "compute" and cache the value of 2 or more properties. Watchers are more low level than computed properties. Watchers allow you to "watch" for changes on a single property. This is useful for performing expensive operations like saving to DB, API calls and so on.

```js
  watch: {
    todos: {
      deep: true,
      handler(newValue) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newValue));
      }
    }
  },
```

This expression watches for changes in our `todos` data. Deep means that it recursively watches for changes in the values inside arrays and objects. If there's a change, we save them to the local storage.

[review diff](https://github.com/amejiarosario/vue-todo-app/commit/579da19)

Once you change some todos, you will see they are stored in the local storage. You can access them using the browser's dev tools:

![local storage](/images/local-storage-devtools.jpg)

The last part to implement is the routing! However, for that, we need to explain some more concepts and will do that in the next post.

---

In the next tutorial, we are going to switch gears a little bit and go deeper into Vue Components, Routing, and Local Storage. Stay tuned!

# Summary: Vue cheatsheet

We learned a lot! Here is a summary:

<div class="table--responsive">
  <table class="table">
    <caption>Binders</caption>
    <thead>
      <th>Name</th>
      <th>Description</th>
      <th>Examples</th>
    </thead>

    <tbody>
      <tr>
        <td> Mustache </td>
        <td>Variable that is replaced with variable's value</td>
        <td>
          `<h1>{{ title }}</h1>`
        </td>
      </tr>
      <tr>
        <td> v-bind </td>
        <td>Bind to HTML attribute</td>
        <td>
          `<span v-bind:title="tooltip"></span>` <br>
          `<div v-bind:id="dynamicId"></div>`
          `<button v-bind:disabled="isButtonDisabled">Button</button>`
        </td>
      </tr>

      <tr>
        <td> :</td>
        <td>Shortcut for v-bind</td>
        <td>
          `<span :title="tooltip"></span>`
          `<li v-bind:class="{completed: todo.isDone }"></li>`
        </td>
      </tr>

      <tr>
        <td> v-text </td>
        <td>Inject text into the element</td>
        <td>
          `<h1 v-text="title"></h1>`
        </td>
      </tr>

      <tr>
        <td> v-html </td>
        <td>Inject raw HTML into the element</td>
        <td>
          `<blog-post v-html="content"></blog-post>`
        </td>
      </tr>

    </tbody>
  </table>
</div>

<div class="table--responsive">
  <table class="table">
    <caption>List Rendering</caption>
    <thead>
      <th>Name</th>
      <th>Description</th>
      <th>Examples</th>
    </thead>

    <tbody>
      <tr>
        <td> v-for </td>
        <td>Iterate over elements</td>
        <td>
          `<li v-for="todo in todos">{{todo.text}}</li>`
        </td>
      </tr>

      <tr>
        <td> v-for </td>
        <td>Iterate with index</td>
        <td>
          `<li v-for="(item, index) in items">`<br>
          `{% raw %}  {{ parentMessage }} - {{ index }} - {{ item.message }}{% endraw %}`<br>
          `</li>`
        </td>
      </tr>

      <tr>
        <td> v-for </td>
        <td>Iterate over object's values</td>
        <td>
          `<li v-for="value in object">`<br>
          `{% raw %}  {{ value }}  {% endraw %}`<br>
          `</li>`
        </td>
      </tr>

      <tr>
        <td> v-for </td>
        <td>Iterate over object's keys/values</td>
        <td>
          `<li v-for="(value, key) in object">`<br>
          `{% raw %}  {{ key }}: {{ value }}  {% endraw %}`<br>
          `</li>`
        </td>
      </tr>

      <tr>
        <td> v-for </td>
        <td>Iterate with keys, values and index</td>
        <td>
          `<li v-for="(value, key, index) in object">`<br>
          `{% raw %}  {{index}}.{{ key }}: {{ value }}  {% endraw %}`<br>
          `</li>`
        </td>
      </tr>

    </tbody>
  </table>
</div>

<div class="table--responsive">
  <table class="table">
    <caption>Events</caption>
    <thead>
      <th>Name</th>
      <th>Description</th>
      <th>Examples</th>
    </thead>

    <tbody>
      <tr>
        <td> v-on:click </td>
        <td>Invoke callback on click</td>
        <td>
          `<button class="destroy" v-on:click="destroyTodo(todo)"></button>`
        </td>
      </tr>

      <tr>
        <td> @ </td>
        <td>`@` is shorcut for `v-on:`</td>
        <td>
          `<input class="edit"
              @keyup.esc="cancelEditing"
              @keyup.enter="finishEditing"
              @blur="finishEditing">`
        </td>
      </tr>

      <tr>
        <td> v-on:dblclick </td>
        <td>Invoke callback on double-click</td>
        <td>
          `<label @dblclick="startEditing(todo)">{{todo.text}}</label>`
        </td>
      </tr>

      <tr>
        <td> @keyup.enter </td>
        <td>Invoke callback on keyup <kbd>enter</kbd></td>
        <td>
          `<input @keyup.enter="createTodo">`
        </td>
      </tr>

      <tr>
        <td> @keyup.esc </td>
        <td>Invoke callback on keyup <kbd>esc</kbd></td>
        <td>
          `<input @keyup.esc="cancelEditing">`
        </td>
      </tr>

    </tbody>
  </table>
</div>

<div class="table--responsive">
  <table class="table">
    <caption>Conditional Rendering</caption>
    <thead>
      <th>Name</th>
      <th>Description</th>
      <th>Examples</th>
    </thead>

    <tbody>
      <tr>
        <td> v-show </td>
        <td>Show or hide the element if the expression evaluates to truthy</td>
        <td>
          `<button v-show="completedTodos.length">Clear completed</button>`
        </td>
      </tr>

      <tr>
        <td> v-if </td>
        <td>Remove or add the element if the expression evaluates to truthy</td>
        <td>
          `<footer v-if="todos.length">...</footer>`
        </td>
      </tr>

    </tbody>
  </table>
</div>

<div class="table--responsive">
  <table class="table">
    <caption>Automatic Data<->DOM Sync</caption>
    <thead>
      <th>Name</th>
      <th>Description</th>
      <th>Examples</th>
    </thead>

    <tbody>
      <tr>
        <td> v-model </td>
        <td>Keep data and DOM in sync automatially</td>
        <td>
          `<input class="toggle" type="checkbox" v-model="todo.isDone">`
        </td>
      </tr>

    </tbody>
  </table>
</div>

<div class="table--responsive">
  <table class="table">
    <caption>Vue instance</caption>
    <thead>
      <th>Examples</th>
    </thead>

    <tbody>
      <tr>
        <td>

```js
// Vue Instance
const todoApp = new Vue({
  // element matcher
  el: '.todoapp',

  // Reactive data, when something changes here it gets updated on the templates
  // data should be a function so every instance get's a different data
  data() {
    return {
      title: 'Todos',
      editing: null,
    }
  },

  // invoke this functions on event handlers, etc.
  methods: {
    createTodo(event) {
      const textbox = event.target;
      this.todos.push({ text: textbox.value.trim(), isDone: false });
      textbox.value = '';
    },
  },

  // cached methods (only get invokes when data changes)
  computed: {
    activeTodos() {
      return this.todos.filter(t => !t.isDone);
    },
  },

  // watch for changes on the data
  watch: {
    todos: {
      deep: true,
      handler(newValue, oldValue) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newValue));
      }
    }
  },
});
```

        </td>
      </tr>

    </tbody>
  </table>
</div>


<!-- Feeback
https://news.ycombinator.com/item?id=17762421
Good intro, few nitpicks:
- it should be mentioned that components have to return data as a function [0]

- v-for should ideally be used with keys [1]

[0] https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Fu...

[1] https://vuejs.org/v2/guide/list.html#key

One should definitely mention the vue.js docs for basics.

-->
