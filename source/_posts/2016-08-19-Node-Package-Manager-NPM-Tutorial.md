---
layout: post
title: Node Package Manager (NPM) Tutorial
comments: true
toc: true
pageviews__total: 2496
pageviews__recent: 42
pageviews__avg_time: 225
tutorial__order: 0
photos__background_color: '#235E7E'
photos:
 - /images/node-package-manager-small.png
 - /images/node-package-manager-large.png
tags:
  - npm
  - nodejs
  - javascript
categories:
  - Programming
  - Web Development
date: 2016-08-19 16:18:32
updated: 2016-08-19 16:18:32
---

This tutorial goes from how to install NPM to manage packages dependencies. While we are doing this, we will use practical examples to drive the concepts home.

<!-- more -->

Node Package Manager (NPM) is a CLI tool to manage dependencies. It also allows you to publish packages to the NPM website and find new modules.

In this section, we are going to get hands on NPM. We will cover from how to install it to how to download, uninstall and manage packages. While we are doing this we will use practical examples to drive the concepts home.

# How to install/update NPM?

<abbr title="Node Package Manager">NPM</abbr> is bundle into the Node installation. So, if you have Node, then you have <abbr title="Node Package Manager">NPM</abbr> already. But, <abbr title="Node Package Manager">NPM</abbr> gets updated more often than Node. So, from time to time you need to get the latest version.

You can check the NPM version and install latest  by running:

```bash Installing NPM
# get version
npm -v

# update NPM to latest and greatest
npm install -g npm
```

You can also use the shortcut for `npm install` like `npm i`.

# How to start a NodeJs project?

Node projects and packages use a special file called `package.json`. It contains dependencies and more information to run the project. Let's start by creating that using the `npm init` command. We are going to call our project `meanshop2`, but call it whatever you want ;)

```bash initializing a Node project/package
mkdir meanshop2 && cd meanshop2
npm init --yes
```

This set of commands created a new folder called `meanshop2`. The `init` command will create `package.json` file for us. The `--yes` option go with the defaults. Otherwise, it will ask us to fill out every property in package.json.

```javascript package.json
{
  "name": "meanshop2",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

Feel free to edit any of the properties values, such as author, description. Notice, that version starts with `1.0.0`. We are going to talk more about versioning later on this tutorial.

# How to download NPM packages?

You can download <abbr title="Node Package Manager">NPM</abbr> packages using `npm install <package_name>`. By default, npm will grap the latest version, but you can also expecify an exact verision.

Let's install two packages `lodash` and `express` as follows:

```bash Installing NPM packages
# install latest and save on package.json
npm install lodash --save

# install specific version and save dep on package.json
npm install express@4.14.0 --save
```

`npm install` is going to create a new folder called `node_modules`. This is where all the dependencies live.

Notice that for the second package we are specifying the exact version. You can use the `@` symbol and then the version number.

Go to your `package.json` and verify that they both are listed as dependencies. You can install all the dependencies by running this command:

```bash Install all dependencies from a package.json
npm install

```

<abbr title="Node Package Manager">NPM</abbr> will add packages to dependencies if you use the `--save` flag. Otherwise `npm` won't include it. To automate the process you can run:

```bash Smarter NPM's defaults
npm config set save=true
npm config set save-exact=true
```

The `save=true` will make that the packages get auto-installed. `save-exact=true` will lock the current version and prevent automatic updates and break the project.

To sum up, here are the commands

```bash NPM install commands
# install a package globally
npm install -g <package_name>

# install a package locally (node_modules)
npm install <package_name>

# install a package locally and save it as dependency (package.json)
npm install <package_name> --save-dev

# install package locally, save it as dependency with the exact version
npm install <package_name> --save   --save-exact

# install all dependencies listed on package.json
npm install
```

Usually, you use `--save-dev` vs `--save` when you need use package that is not part of the project. For instance, testing libraries, building assets tools, etc.

You can search for all NPM modules on [npmjs.com](https://www.npmjs.com/browse/star)

# How to view my installed NPM packages?

Sometimes is useful to see the list of packages that you have installed on your system. You can do that with the following commands:

```bash List packages
# list all installed dependencies
npm ls --depth=0

# list all installed globally dependencies
npm ls -g --depth=0
```

You can use `--depth=0` to prevent listing the dependencies' dependencies.

# What is SemVer?

Semantic Versioning (<abbr title="Semantic Versioning">SemVer</abbr>) is versioning convention composed of three numbers: `Major.Minor.Patch` or also `Breaking.Feature.Patch`:

  - **Major releases: breaking changes.** Major changes that change (breaks) how the API worked before. For instance, removed functions.
  - **Minor releases: new features**. Changes that keeps the API working as before and adds new functionality.
  - **Patch releases: bug fixes**. Patches doesn't add functionality nor removes/changes functionality. It's scope only to bug fixes.

You can specify on the `package.json` how packages can be updated. You can use `~` for updating patches. `^` for upgrading minor releases and `*` for major releases.

![SemVer Breaking.Feature.Fix](/images/semver-major-minor-patch-breaking-feature-fix.png)

Like this:

  - Patch releases: `~1.0.7`, or `1.0.x` or just `1.0`.
  - Minor releases: `^1.0.7`, or `1.x` or just `1`.
  - Major releases: `*` or `x`.

As you could imagine, not all developers respect the Semantic Version rules. Try to follow the rules yourself, but don't trust that all will do. You can have your project working well with a `1.0.8` version and all in a sudden it breaks with `1.0.9`. It happened to me before, so I prefer to use: `--save-exact`, when makes sense.

# How to uninstall NPM packages?

You can uninstall <abbr title="Node Package Manager">NPM</abbr> packages using the following commands:

```bash Uninstalling NPM packages
# uninstall package and leave it listed as dep
npm uninstall lodash

# uninstall and remove from dependencies
npm uninstall --save lodash

# uninstall global package
npm uninstall -g <package_name>

# remove uninstalled packages from node_modules
npm prune # remove extranous
```

# Summary

<abbr title="Node Package Manager">NPM</abbr> is a powerful tool. It helps us to create Node projects/modules, manage its dependencies and much more. In this section, we covered the main commands that you would most often.

Furthermore, we cover <abbr title="Semantic Versioning">SemVer</abbr>. It is used in many systems (Ruby Gems, etc.) not just in the Node community. SemVer is three-part number versioning system: Major.Minor.Patch. You can also think as Breaking.Feature.Patch.
