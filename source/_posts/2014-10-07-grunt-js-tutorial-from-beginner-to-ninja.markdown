---
layout: post
title: "Grunt JS tutorial from Beginner to Ninja"
date: 2014-10-07 10:41:13 -0400
updated: 2014-10-07 10:41:13 -0400
comments: true
toc: true
pageviews__total: 52812
pageviews__recent: 90
pageviews__avg_time: 265
# categories: [javascript, nodejs, gruntjs, build tools]
photos:
  - /images/gruntjs_small.png
  - /images/gruntjs_large.png
photos__background_color: '#D27B2E'
tutorial__order: 0
tags:
  - gruntjs
  - nodejs
  - javascript
categories:
  - Technologies
  - Web Development
---

Sometimes you find yourself doing the same tasks again and again, especially during web development. It is time to automate repetitive tasks and use that time in more creative activities. This is where Grunt comes in. Grunt is a popular task runner that runs on NodeJS. It can minify CSS/JavaScript, run linting tools (JSHint, JSlint, CSSlint), deploy to server, and run test cases when you change a file to name a few. All the information I found about Grunt and similar Javascript test runners were too verbose and not very helpful to get started quickly. So, I decided to make this tutorial.

<!-- More -->

# Beginner: Grunt.js 101

Grunt.js is a Javascript task runner. At its bare core it does file manipulation (mkdir, reads, write, copy), print messages and helper methods to organize and configure multiple tasks. It takes care of differences among Operating Systems for you. However, the real power comes in with the number of available plugins ready to use. Usually named `grunt-contrib-*`. Let’s start from scratch!

# Hello Wold from GruntJS

You need to [install Node.js and NPM](/blog/2014/10/01/creating-a-restful-api-tutorial-with-nodejs-and-mongodb/#nodejs) to follow along with this example.

```bash
mkdir grunt101 && cd grunt101

# start Node.js project and answer the questions (or leave it in blank)
npm init

# add Grunt as a dependency
npm install grunt  --save-dev
```

If you run the grunt command you will get a message like this:

```bash
grunt
# A valid Gruntfile could not be found. Please see the getting started guide for more information on how to configure grunt: http://gruntjs.com/getting-started
# Fatal error: Unable to find Gruntfile.
```

So, let's create the `Gruntfile.js` file:

```javascript Gruntfile.js
var grunt = require('grunt');

grunt.registerTask('default', 'default task description', function(){
  console.log('hello world');
});
```

If you run `grunt` again, you will see a message. The default task is run when nothing else it is specified. We are going to create a 2nd task called ‘hello’ and it is going to accept a parameter that we can pass along with the task name separated with a colon. As follows: `grunt hello:adrian`. We can handle errors using `grunt.warn`. Every time a `grunt.warn` is found the task will stop executing, and it will give its warning message.. You can override using `--force`. Try all this commands and noticed the different effects: `grunt`, `grunt hello`, `grunt hello --force`, `grunt hello:adrian`.

```javascript Gruntfile.js
var grunt = require('grunt');

grunt.registerTask('default', 'default task description', function(){
  console.log('hello world');
});

grunt.registerTask('hello', 'say hello', function(name){
  if(!name || !name.length)
    grunt.warn('you need to provide a name.');

  console.log('hello ' + name);
});
```

We can chain multiple grunt tasks by using and array. Change the `Gruntfile.js` for the following and see what will happen when you type `grunt`.

```javascript Gruntfile.js
var grunt = require('grunt');

grunt.registerTask('world', 'world task description', function(){
  console.log('hello world');
});

grunt.registerTask('hello', 'say hello', function(name){
  if(!name || !name.length)
    grunt.warn('you need to provide a name.');

  console.log('hello ' + name);
});

grunt.registerTask('default', ['world', 'hello:adrian']);
```


# Reference 1: Grunt tasks, config and warnings

Here are some of the methods that we have used so far and some more that we will use in the next examples:

## Grunt config

* [grunt.initConfig(configObject)](http://gruntjs.com/api/grunt.config#grunt.config.init): Initialize a configuration object. It can be accessed by `grunt.config.get`.

* [grunt.config.get([prop])](http://gruntjs.com/api/grunt.config#grunt.config.get):  get the prop value from the `grunt.initConfig`. The property could be deeply nested (e.g. `concat.options.dest`) and the values inside `<% %>` are expanded.

## Grunt tasks

* [grunt.registerTask(taskName[, description], taskFunction)](http://gruntjs.com/api/grunt.task#grunt.task.registertask): register a task.
    *  **taskName**: required to register the task and it allows the task to be e executed with `grunt taskName` or called by other grunt task.
    *  **description**: (optional) string describing task.
    *  **taskFunction**: function which can accept parameters separated by colons (:). E.g. `grunt taskName:arg1:arg2`


* [grunt.task.registerTask(taskName, taskList)](http://gruntjs.com/api/grunt.task#grunt.task.registertask): register task.
    *  **taskName**: required to register the task and it allows the task to be e executed with `grunt taskName` or called by other grunt task.
    *  **taskList**: array of taskNames to be executed, in the order specified, when the taskName is called. E.g.: `grunt.registerTask('concatAll', ['concat:templates', 'concat:javascripts', 'concat:stylesheets']);`


* [grunt.registerMultiTask(taskName[, description], taskFunction)](http://gruntjs.com/api/grunt.task#grunt.task.registermultitask): multi-tasks accepts the same parameters as `grunt.registerTask`. However, it reads `grunt.initConfig` parameters differently:
  1. Grunt looks for a config that matches the taskName.
  2. MultiTask can have multiple configurations referred as `this.target` and the value as `this.data`.
  3. All the "targets" are run if it is not specified otherwise.

```javascript registerMultiTask Example
  grunt.initConfig({
    print: {
      target1: ['index.html', 'src/styles.css', 2],
      target2: 'data',
      hello: 'world'
    }
  });

  grunt.registerMultiTask('print', 'print targets', function() {
    grunt.log.writeln(this.target + ': ' + this.data);
  });
```

You can specify one target `grunt print:hello` or run all them `grunt print` which will produce this output:

```
Running "print:target1" (print) task
target1: index.html,src/styles.css,2

Running "print:target2" (print) task
target2: data

Running "print:hello" (print) task
hello: world
```

## Grunt Errors and Warnings

* [grunt.fail.warn(error [, errorcode])](http://gruntjs.com/api/grunt.fail#grunt.fail.warn): prints to STDOUT a message and abort grunt executions. It can be override using `--force` and it can show the stack trace if `--stack` is given. e.g. `grunt taskName --force --stack`.

* [grunt.fail.fatal(error [, errorcode])](http://gruntjs.com/api/grunt.fail#grunt.fail.fatal): similar to `warn`, displays message to STDOUT and terminate Grunt. Cannot be `--force`ed and it emits a beep unless `--no-color` parameter is passed. It also accepts `--stack`. E.g. `grunt taskName --no-color --stack`.

# Example: Forex and grunt multiple async calls handling

The idea is get conversion rates from a base currency (e.g. USD) to a target currency (e.g. EUR). We are using a `registerMultiTask`, so the taskName 'currency' matches its property in the `config.init`. Notice that we can has additional arbitrary data such as endpoint URL.

Async calls can be a little tricky in Javascript. We are going to do multiple HTTP request. Since `http.get` is async Grunt will finish the task before even receiving any response. `this.async()` solves the issue, we just need to call it when we are done.

```javascript
module.exports = function(grunt){
  grunt.config.init({
    currency: {
      USD: ['EUR', 'GBP', 'DOP'],
      DOP: ['USD']
    },

    endpoint: {
      host: 'http://www.freecurrencyconverter3api.com',
      path: '/api/v2/convert?compact=y&q='
    }
  });

  grunt.registerMultiTask('currency', 'Fetches currency exchange rates', function() {
    var http = require('http'),
      done = this.async(),
      responses = 0;

    var baseCurrency = this.target;
    var targetCurrencies = this.data;

    grunt.config.requires('endpoint');

    targetCurrencies.forEach(function(targetCurrency, i, arr){
      var convertTo = baseCurrency + '_' + targetCurrency,
        body = [];
        url = grunt.config.get('endpoint.host');

      url += grunt.config.get('endpoint.path') + convertTo;

      http.get(url, function(res) {
        res.on('data', function(data){
          body.push(data);
        });

        res.on('end', function () {
          var conversion = JSON.parse(body.join());
          grunt.log.ok(baseCurrency + '/' + targetCurrency + ' => ' + conversion[convertTo].val);
          // if got all responses: done!
          if(responses++ == arr.length - 1)
            done();
        });
      }).on('error', function (err) {
        grunt.warn('Please verify endpoint host and path: <'+ url +'>. It might be incorrect or down.');
        done(err);
      });
    });
  });
}
```


# Reference 2: Grunt Files and logs

## Grunt logs

All them stars with the prefix `grunt.log` and accepts a `msg` which is displayed to STDOUT (usually the screen). Here are the differences between them:

* [writeln([msg]), write(msg) and subhead(msg)](http://gruntjs.com/api/grunt.log#grunt.log.writeln-grunt.verbose.writeln): writes message to STDOUT. `grunt.log.writeln` will do the same as `grunt.log.write` but without trailing newline. `subhead(msg)` will print the message in bold and proceeded by a newline and a trailing newline as well.

The following methods adds a ">>" before the message in the screen which could be of different colors depending on the method:

* `grunt.log.error([msg])`: print message prefixed with a RED ">>".
* `grunt.log.ok([msg])`: print message prefixed with a GREEN ">>".

## Grunt files

**Files**

All has an optional attributes `options` that could be `encoding` among others.

* [grunt.file.write(filepath, contents [, options])](http://gruntjs.com/api/grunt.file#grunt.file.write): writes contents to file, creates path if necessary.
* [grunt.file.read(filepath [, options])](http://gruntjs.com/api/grunt.file#grunt.file.read): returns file content.
* [grunt.file.readJSON(filepath [, options])](http://gruntjs.com/api/grunt.file#grunt.file.readjson): reads file content and parse it to JSON.
* [grunt.file.delete(filepath [, options])](http://gruntjs.com/api/grunt.file#grunt.file.delete): deletes files recursively.
* [grunt.file.copy(srcpath, destpath [, options])](http://gruntjs.com/api/grunt.file#grunt.file.copy): copy file from `srcpath` to `destpath`.

**Directories**

* [grunt.file.mkdir(dirpath [, mode])](http://gruntjs.com/api/grunt.file#grunt.file.mkdir): creates directory and any intermediary. Like `mkdir -p`.
* [grunt.file.expand([options, ] patterns)](http://gruntjs.com/api/grunt.file#grunt.file.expand): returns an array with all the files matching a pattern. It can also accept and array of patterns. Preceding a patter with `!` will negate them. E.g. `['**/*.js', !**/*spec.js]` => get all javascript (including subdirectories) but NOT the ones that ends with spec.js.
* [grunt.file.recurse(rootdir, callback)](http://gruntjs.com/api/grunt.file#grunt.file.recurse): expand path and return a callback function with the following signature `callback(abspath, rootdir, subdir, filename)`.

# Example 2: Gruntfile for files manipulation

GruntJS comes with built-in functions for basic [file system handling](https://github.com/gruntjs/grunt/blob/master/lib/grunt/file.js). To see the function in action. Create four directories: `stylesheets`, `javascripts`, `templates` and put files on first three. The idea is to concatenate all the files into one index.html and placed it a newly created `public` folder.

Here's the grunt file that will copy and concatenate all the files for us:

```javascript Gruntfile.js
module.exports = function(grunt){
  grunt.config.init({
    concat: {
      options: {
        dest: 'tmp',
        templates: ['templates/header.html', 'templates/footer.html'],
        javascripts: ['javascripts/*.js'],
        stylesheets: ['stylesheets']
      }
    }
  });

  var recursiveConcat = function(source, result){
    grunt.file.expand(source).forEach(function(file){
      if(grunt.file.isDir(file)){
        grunt.file.recurse(file, function(f){
          result = recursiveConcat(f, result);
        });
      } else {
        grunt.log.writeln('Concatenating ' + file + ' to other ' + result.length + ' characters.');
        result += grunt.file.read(file);
      }
    });
    return result;
  };

  grunt.registerTask('concat', 'concatenates files', function(type){
    grunt.config.requires('concat.options.' + type); // fail the task if this propary is missing.
    grunt.config.requires('concat.options.dest');

    var files = grunt.config.get('concat.options.' + type),
      dest = grunt.config.get('concat.options.dest'),
      concatenated = recursiveConcat(files, '');

    grunt.log.writeln('Writing ' + concatenated.length + ' chars to ' + 'tmp/' + type);
    grunt.file.write(dest + '/' + type, concatenated);
  });

  grunt.registerTask('concatAll', ['concat:templates', 'concat:javascripts', 'concat:stylesheets']);
  grunt.registerTask('default', ['concatAll']);
}
```

A more complete example can be found in the repository where we have the join and open function as well.

## Reference 3: Inside Grunt tasks

Inside all Grunt task there are number of functions available through `this`:

* [this.async](http://gruntjs.com/inside-tasks#this.async): designed for async tasks. Grunt will normally end the task without waiting for the callback to be executed. If you need Grunt to wait use `done()`.

```javascript
var done = this.async();

http.get('http://adrianmejia.com', function(res){
  res.on('data', function(data){
    // ... process data ...
    done(); // forces Grunt to wait until data is received.
  })
}).on(function(err){
  done(err); // or an error is received.
});
```

* [this.requires](http://gruntjs.com/inside-tasks#this.requires): list of taskNames that should executed successfully first. E.g. `this.requires(['concat', 'jshint'])`.

* [this.name](http://gruntjs.com/inside-tasks#this.name): this is the name of the task. E.g. `grunt hello`, then `this.name === 'name'`.

* [this.args](http://gruntjs.com/inside-tasks#this.args): returns an array with the parameters. E.g. `grunt hello:crazy:world`, then `this.args` will return `['crazy', 'world']`.

* [this.options([defaultsObj])](http://gruntjs.com/inside-tasks#this.options): it gets options values from the `config.init`, optionally you can also pass an object containing the default values. Notice in the example below that even though console.log has a `this.options({gzip: true})` it gets override by the options parameters. If not one it is specified in the `config.init` then it will use the default gzip: true.

**Inside MultiTasks**

Consider this `grunt.config.init` example:

```javascript
module.exports = function(grunt){
  grunt.config.init({
    multiTaskName: {
      options: {
        gzip: false
      },
      target1: {
        src: 'stylesheets/*.css',
        dest: 'public',
        ext: '.min.css'
      },
      target2: {
        src: '*.js',
        dest: 'public',
        ext: '.min.js'
      }
    }
  });

  grunt.registerMultiTask('multiTaskName', 'example', function(){
    console.log('this.options', this.options({gzip: true}));
    console.log('this.data', this.data);
    console.log('this.files', this.files);
    console.log('this.filesSrc', this.filesSrc);
  });
}
```


```bash Output example
grunt multiTaskName
# Running "multiTaskName:target1" (multiTaskName) task
# this.options { gzip: false }
# this.data { src: 'stylesheets/*.css', dest: 'public', ext: '.min.css' }
# this.files [ { src: [Getter],
#     dest: 'public',
#     ext: '.min.css',
#     orig: { src: [Object], dest: 'public', ext: '.min.css' } } ]
# this.filesSrc [ 'stylesheets/h1.css', 'stylesheets/h2.css' ]
#
# Running "multiTaskName:target2" (multiTaskName) task
# this.options { gzip: false }
# this.data { src: '*.js', dest: 'public', ext: '.min.js' }
# this.files [ { src: [Getter],
#     dest: 'public',
#     ext: '.min.js',
#     orig: { src: [Object], dest: 'public', ext: '.min.js' } } ]
# this.filesSrc [ 'Gruntfile.js' ]
```

* [this.target](http://gruntjs.com/inside-tasks#this.target): name of the target current target. If you call it `grunt multiTaskName`, it will run like multiple tasks calling each target one at a time. `this.target` will be equal to `target1` and then `target2`.

* [this.files](http://gruntjs.com/inside-tasks#this.files): return a (single) array that has all the properties for the current target. Take a look the the output above.

* [this.filesSrc](http://gruntjs.com/inside-tasks#this.filessrc): it expands files and paths against `src` and return an array with them.

* [this.data](http://gruntjs.com/inside-tasks#this.data): contains the raw data of the target parameters.

# Intermediate: Using Grunt.js plugins

Chances are that there is a plugin for most of your needs. Last time I checked there were 3,638 plugins for grunt. This are the 10 most popular:

## Installing a grunt plugin

Let's say we want to install jshint.

1. Get the plugin module

Download it from npm:

`npm install grunt-contrib-jshint --save-dev`

or from github:

`npm install https://github.com/YOUR_USERNAME/grunt-contrib-YOUR-PLUGIN --save-dev`

2. Load it in your Gruntfile

`grunt.loadNpmTasks('grunt-contrib-jshint');`

or

`grunt.loadNpmTasks('grunt-contrib-YOUR-PLUGIN');`

## 10 most popular grunt plugins

1- [jshint](https://github.com/gruntjs/grunt-contrib-jshint): Validate files with JSHint. Uses `.jshintrc` to settings.

``` javascript .jshintrc (example)
{
  "curly": true,
  "eqnull": true,
  "eqeqeq": true,
  "undef": true,
  "globals": {
    "jQuery": true
  }
}
```

2- [watch](https://github.com/gruntjs/grunt-contrib-watch): Run predefined tasks whenever watched file patterns are added, changed or deleted. Spawn runs task in a child process but having set to `spawn: false` is faster.

```javascript grunt.config.init (example)
watch: {
  scripts: {
    files: ['**/*.js'],
    tasks: ['jshint'],
    options: {
      spawn: false,
    },
  },
},
```

3- [uglify](https://github.com/gruntjs/grunt-contrib-uglify): minifies javascript files.
```javascript grunt.config.init (example)
uglify: {
  my_target: {
    files: {
      'dest/output.min.js': ['src/input1.js', 'src/input2.js']
    }
  }
}
```

4- [clean](https://github.com/gruntjs/grunt-contrib-clean): Clean files and folders.
```javascript grunt.config.init (example)
clean: {
  // Deletes all .js files, but skips min.js files
  js: ["path/to/dir/*.js", "!path/to/dir/*.min.js"]

  // delete all files and directories here
  build: ["path/to/dir/one", "path/to/dir/two"],
}
```

5- [concat](https://github.com/gruntjs/grunt-contrib-concat): Concatenate files.
```javascript grunt.config.init (example simple)
concat: {
  options: {
    separator: ';',
  },
  dist: {
    src: ['src/intro.js', 'src/project.js', 'src/outro.js'],
    dest: 'dist/built.js',
  },
}
```

```javascript grunt.config.init (adding banners and multiple targets)
pkg: grunt.file.readJSON('package.json'),
concat: {
  options: {
    stripBanners: true,
    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %> */',
  },
  dist: {
    'dist/with_extras.js': ['src/main.js', 'src/extras.js'],
  },
},
```

6- [cssmin](https://github.com/gruntjs/grunt-contrib-cssmin): Compress CSS files.
```javascript grunt.config.init (example)
cssmin: {
  combine: {
    files: {
      'path/to/output.css': ['path/to/input_one.css', 'path/to/input_two.css']
    }
  }
}
```

```javascript grunt.config.init (example with banner and adding .min.css extension)
cssmin: {
  add_banner: {
    options: {
      banner: '/* My minified css file */'
    },
    files: [{
      expand: true,
      cwd: 'release/css/',
      src: ['*.css', '!*.min.css'],
      dest: 'release/css/',
      ext: '.min.css'
    }]
  }
}
```

7- [connect](https://github.com/gruntjs/grunt-contrib-connect): runs server as long as Grunt is running. It can be persistent passing `keepalive` like this `grunt connect:keepalive`.

```javascript grunt.config.init (example)
  connect: {
    server: {
      options: {
        port: 9001,
        base: 'www-root'
      }
    }
  }
```

8- [karma](https://github.com/karma-runner/grunt-karma): runs karma testing tool.

```javascript grunt.config.init (example)
karma: {
  unit: {
    options: {
      files: ['test/**/*.js']
    }
  }
}
```

```javascript grunt.config.init (example referencing karma.conf and overriding parameters)
karma: {
  unit: {
    configFile: 'karma.conf.js',
    runnerPort: 9999,
    singleRun: true,
    browsers: ['PhantomJS'],
    logLevel: 'ERROR'
  }
}
```

9- [less](https://github.com/gruntjs/grunt-contrib-less): Compile LESS files to CSS.
```javascript grunt.config.init (example)
less: {
  development: {
    options: {
      paths: ["assets/css"]
    },
    files: {
      "path/to/result.css": "path/to/source.less"
    }
  },
  production: {
    options: {
      paths: ["assets/css"],
      cleancss: true,
      modifyVars: {
        imgPath: '"http://mycdn.com/path/to/images"',
        bgColor: 'red'
      }
    },
    files: {
      "path/to/result.css": "path/to/source.less"
    }
  }
}
```

10- [concurrent](https://github.com/sindresorhus/grunt-concurrent): Run grunt tasks concurrently.

```javascript grunt.config.init (example)
concurrent: {
  target1: ['coffee', 'sass'],
  target2: ['jshint', 'mocha'],
  target3: {
    tasks: ['nodemon', 'watch'],
    options: {
      logConcurrentOutput: true
    }
  }
}
```

In the next blog post, we will continue the tutorial with using GruntJS in a web application, making your own plugins and a comparison between other task runners tools such as Gulp, Gulp, Brunch, Rake::Pipeline and Broccoli.
