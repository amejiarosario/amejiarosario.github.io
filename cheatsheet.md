# Cheatsheet

## most used

```bash
hexo s -dp 5000            # server on port 5000
hexo s --draft -dp 5000    # serve drafts on port 5000
# hexo g                     # generate

git commit # commit post modifications

# update GA stats
cd tasks && node google-analytics-runner.js && cd -

# change index in
# _config.yml
# themes/am-light/source/js/search.es6
hexo clean && hexo algolia # index search

ggpush # push source so edit this post works

hexo d -g                  # generate and deploy to github pages/netlify

# https://app.netlify.com/sites/angry-engelbart-d10917/overview # Check is deployed
```

## Update Google Analytics stats
```
cd tasks
npm i

node google-analytics-runner.js

hexo s -dp 5000 # preview changes
hexo d -g       # deploy
```

## install

npm i

## Commands

hexo serve

hexo new "TITLE" # saved on ```source/_posts```

hexo new draft "TITLE" # saved on ```source/_drafts```

hexo new page "TITLE" # saved on ```source/```

hexo new photo "My Gallery"


hexo clean

### new

``` bash
$ hexo new [layout] <title>
```

Creates a new article. If no `layout` is provided, Hexo will use the `default_layout` from [_config.yml](configuration.html) (`post` by default). If the `title` contains spaces, surround it with quotation marks.


There are three default layouts in Hexo: `post`, `page` and `draft`. Each of them is saved to a different path. Custom layouts are saved to the `source/_posts` folder.

Layout | Path
--- | ---
`post` | `source/_posts`
`page` | `source`
`draft` | `source/_drafts`

## generate

``` bash
$ hexo generate
```

Generates static files.

Option | Description
--- | ---
`-d`, `--deploy` | Deploy after generation finishes
`-w`, `--watch` | Watch file changes

## server

``` bash
$ hexo server
```

Starts a local server. By default, this is at `http://localhost:4000/`.

Option | Description
--- | ---
`-p`, `--port` | Override default port
`-s`, `--static` | Only serve static files
`-l`, `--log` | Enable logger. Override logger format.



---



---
This post is part of a tutorial series:

**Learning Data Structures and Algorithms (DSA) for Beginners**
1. [Intro to Algorithm's Time Complexity and Big O Notation](/blog/2018/04/04/how-you-can-change-the-world-learning-data-structures-algorithms-free-online-course-tutorial/)
1. [Eight Time Complexities that Every Programmer Should Know](/blog/2018/04/05/most-popular-algorithms-time-complexity-every-programmer-should-know-free-online-tutorial-course/)
1. [Analysis of Recursive Algorithms](/blog/2018/04/24/Analysis-of-Recursive-Algorithms/)
<!-- 1. Analysis of recursive algorithms **👈 you are here** -->
---




**👈 you are here**

MEAN Stack tutorial series:

1. [AngularJS tutorial for beginners (Part I)](/blog/2014/09/28/angularjs-tutorial-for-beginners-with-nodejs-expressjs-and-mongodb/)
1. [Creating RESTful APIs with NodeJS and MongoDB Tutorial (Part II)](/blog/2014/10/01/creating-a-restful-api-tutorial-with-nodejs-and-mongodb/)
1. [MEAN Stack Tutorial: MongoDB, ExpressJS, AngularJS and NodeJS (Part III)](/blog/2014/10/03/mean-stack-tutorial-mongodb-expressjs-angularjs-nodejs/)


BackboneJS Tutorial series:

1. [Backbone.js for Absolute Beginners - Getting started (Part 1: Intro)](/blog/2012/09/11/backbone-dot-js-for-absolute-beginners-getting-started/)
1. [Backbone.js for absolute beginners - getting started (part 2: Models, Collections and Views)](/blog/2012/09/13/backbone-js-for-absolute-beginners-getting-started-part-2/)
1. [Backbone.js for absolute beginners - getting started (part 3: CRUD)](/blog/2012/09/13/backbonejs-for-absolute-beginners-getting-started-part-3/)
1. [Backbone.js for absolute beginners - getting started (part 4: Routers)](/blog/2012/09/13/backbone-js-for-absolute-beginners-getting-started-part-4/)


"Learning Angular 2 tutorial" series:

1. Angular 2 Tutorial: Create a CRUD App with Angular CLI and TypeScript [this one]
1. Angular 2 Tutorial: Modules, Components, Templates, Services and Pipes  [coming soon]
1. Angular 2 Tutorial: Directives vs Components [coming soon]
1. Angular 2 Tutorial: Routing and navigation [coming soon]
1. Angular 2 Tutorial: HTTP and WebSockets [coming soon]
1. Angular 2 Tutorial: Upgrading from Angular 1 [coming soon]



1. [AngularJS tutorial for beginners (Part I)](/blog/2014/09/28/angularjs-tutorial-for-beginners-with-nodejs-expressjs-and-mongodb/)
1. Creating RESTful APIs with NodeJS and MongoDB Tutorial (Part II) **👈 you are here**
1. [MEAN Stack Tutorial: MongoDB, ExpressJS, AngularJS and NodeJS (Part III)](/blog/2014/10/03/mean-stack-tutorial-mongodb-expressjs-angularjs-nodejs/)
