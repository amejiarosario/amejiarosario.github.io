---
layout: post
title: "Backbone.js for absolute beginners - getting started (part 3: CRUD)"
date: 2012-09-13 01:37
comments: true
categories: [backbonejs, javascript, web frameworks, web development, agile frameworks, tutorials]
---

The part 2 of this tutorial is [here](/blog/2012/09/13/backbone-js-for-absolute-beginners-getting-started-part-2/).

## 2.5 Todo item list CRUD
There are a couple of features that we could improve. Let’s implement the CRUD (Create-Read-Update-Delete) for the item list.  

### 2.5.1. C-reate
  

We are already can create item list from the console (2.3) and also from the UI (2.4.3). So, it’s done.  


### 2.5.2. U-pdate
  

What if you make a mistake and want to change the text on some of your to-do list. Furthermore, you can notice that the checkboxes states are not persistent when you reload the pages. Let’s fix both problems.

1.-	You want to respond to a double click event showing up a text box, where the user can change the text. First, let’s add the HTML in the `item-template` template below the label tag.

`<input class="edit" value="<%- title %>">`

2.- If you refresh, you will notice that there are both displaying at the same time. So, you can hide them properly with the following CSS.
{% codeblock CSS lang:css https://raw.github.com/amejiarosario/Backbone-tutorial/3840dc802d6f311528298639150a5f52364c1975/backbone-tutorial.html Full Code %}

    #todo-list input.edit {
      display: none; /* Hides input box*/
    }
    #todo-list .editing label {
      display: none; /* Hides label text when .editing*/
    }    
    #todo-list .editing input.edit {
      display: inline; /* Shows input text box when .editing*/
    }
  
{% endcodeblock %} 

3.- Then, we need to add the events to the TodoView class to respond to the changes.

{% codeblock Todo Model lang:js https://raw.github.com/amejiarosario/Backbone-tutorial/3840dc802d6f311528298639150a5f52364c1975/backbone-tutorial.html Full Code %}

    // renders individual todo items list (li)
    app.TodoView = Backbone.View.extend({
      tagName: 'li',
      template: _.template($('#item-template').html()),
      render: function(){
        this.$el.html(this.template(this.model.toJSON()));
        this.input = this.$('.edit');
        return this; // enable chained calls
      },
      initialize: function(){
        this.model.on('change', this.render, this);
      },      
      events: {
        'dblclick label' : 'edit',
        'keypress .edit' : 'updateOnEnter',
        'blur .edit' : 'close'
      },
      edit: function(){
        this.$el.addClass('editing');
        this.input.focus();
      },
      close: function(){
        var value = this.input.val().trim();
        if(value) {
          this.model.save({title: value});
        }
        this.$el.removeClass('editing');
      },
      updateOnEnter: function(e){
        if(e.which == 13){
          this.close();
        }
       }            
    });

{% endcodeblock %}

You can find the [diff](https://github.com/amejiarosario/Backbone-tutorial/commit/3840dc802d6f311528298639150a5f52364c1975) that were added to implement the update feature.

[Here](https://github.com/amejiarosario/Backbone-tutorial/commit/19fa69e654ae5d370385675e4ffed615532b9934) are the changes to fix the update for the checkboxes.

### 2.5.2. D-elete

To be able to remove to-do items, we need to add a remove button in each item and listen to the click event on it, which will trigger the destroy function in the selected todo object.

1.- Add the HTML markup for the remove button.

{% codeblock Remove Button into 'item template'  lang:diff https://raw.github.com/amejiarosario/Backbone-tutorial/1267e531ae3ef508eb32e5308c2cc965f02d1b45/backbone-tutorial.html Full Code %}

@@ -47,6 +47,7 @@
       <input class="toggle" type="checkbox" <%= completed ? 'checked' : '' %>>
       <label><%- title %></label>
       <input class="edit" value="<%- title %>">
+      <button class="destroy">remove</button>
     </div>
   </script>

{% endcodeblock %}

2.- Listen for the click event in the button that you just created.

{% codeblock Add event listeners for the Remove Button in 'app.TodoView'  lang:diff https://raw.github.com/amejiarosario/Backbone-tutorial/1267e531ae3ef508eb32e5308c2cc965f02d1b45/backbone-tutorial.html Full Code %}

@@ -105,12 +106,14 @@
       },
       initialize: function(){
         this.model.on('change', this.render, this);
+        this.model.on('destroy', this.remove, this); // remove: Convenience Backbone'
       },      
       events: {
         'dblclick label' : 'edit',
         'keypress .edit' : 'updateOnEnter',
         'blur .edit' : 'close',
-        'click .toggle': 'toggleCompleted'
+        'click .toggle': 'toggleCompleted',
+        'click .destroy': 'destroy'
       },
       edit: function(){
         this.$el.addClass('editing');

{% endcodeblock %}

3.- Add the destroy method to the TodoView.

{% codeblock Add the destroy method to 'app.TodoView'  lang:diff https://raw.github.com/amejiarosario/Backbone-tutorial/1267e531ae3ef508eb32e5308c2cc965f02d1b45/backbone-tutorial.html Full Code %}

@@ -130,7 +133,10 @@
       },
       toggleCompleted: function(){
         this.model.toggle();
-      }
+      },
+      destroy: function(){
+        this.model.destroy();
+      }      
     });

{% endcodeblock %}

You can download the full working code so far in [here](https://raw.github.com/amejiarosario/Backbone-tutorial/1267e531ae3ef508eb32e5308c2cc965f02d1b45/backbone-tutorial.html) and you can visualize the changes needed to implement the delete feature in [here](https://github.com/amejiarosario/Backbone-tutorial/commit/1267e531ae3ef508eb32e5308c2cc965f02d1b45)

### Continue with the [4th part](/blog/2012/09/13/backbone-js-for-absolute-beginners-getting-started-part-4/) and learn about Backbone's Routes!