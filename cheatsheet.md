# Cheatsheet

## most used

```bash
hexo s -dp 9000
hexo s --draft -dp 9000
hexo g
hexo d -g

# change index in
# _config.yml
# themes/am-light/source/js/search.es6
hexo algolia
```


## install



## Commands

hexo serve

hexo new TITLE # saved on ```source/_posts```

hexo new draft TITLE # saved on ```source/_drafts```

hexo new page TITLE # saved on ```source/```

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




MEAN Stack tutorial series:

1. [AngularJS tutorial for beginners (Part I)](/blog/2014/09/28/angularjs-tutorial-for-beginners-with-nodejs-expressjs-and-mongodb/)
1. [Creating RESTful APIs with NodeJS and MongoDB Tutorial (Part II)](/blog/2014/10/01/creating-a-restful-api-tutorial-with-nodejs-and-mongodb/)
1. [MEAN Stack Tutorial: MongoDB, ExpressJS, AngularJS and NodeJS (Part III)](/blog/2014/10/03/mean-stack-tutorial-mongodb-expressjs-angularjs-nodejs/)
