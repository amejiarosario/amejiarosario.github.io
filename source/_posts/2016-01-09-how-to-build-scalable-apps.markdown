---
layout: post
title: "How to build scalable apps?"
date: 2016-01-09 10:43:27 -0500
updated: 2016-01-09 10:43:27 -0500
comments: true
pageviews__total: 3524
pageviews__recent: 23
pageviews__avg_time: 136
toc: true
# tags: [production, scalability]
photos__background_color: '#9B59B6'
photos:
  - /images/scaling_apps_2016_small.png
  - /images/scaling_apps_2016_large.png
tutorial__order: 0
tags:
  - scalability
  - production
categories:
  - Technologies
---
Scaling application is not an easy topic to cover in one post. So in this first post, you can find “the mindset” to build scalable apps using the 12-factor principles. In the [next post](/blog/2016/03/23/how-to-scale-a-nodejs-app-based-on-number-of-users/), you will find more down to earth examples one how to scale based on the number of users.

The Twelve steps are a compilation of guidelines to ensure apps can scale up without significant changes and tooling. These are very suitable for cloud platforms and continuous deployment. Furthermore, these principles are language agnostic, so it will work with any framework.

<!-- More -->

**The Twelve Factor Principles**

# One codebase per app, multiple deployments

<i class="fa fa-thumbs-o-up" aria-hidden="true"></i> *DO*
  * One codebase to rule all deployment environments: production, staging, local and so on and differentiate them from config files (see #3).

<i class="fa fa-thumbs-o-down" aria-hidden="true"></i> *DON'T*
  * Multiple apps sharing the same code. INSTEAD the common code should be extracted from a library and included through a dependency manager.

# Declare and isolate dependencies

<i class="fa fa-thumbs-o-up" aria-hidden="true"></i> *DO*
  * Have a dependency declaration manifest (e.g. packages.json, Gemfile)
  * Execute dependencies in isolation per app (e.g. bundle exec).

<i class="fa fa-thumbs-o-down" aria-hidden="true"></i> *DON'T*
  * Rely on implicit existence of system-wide packages (e.g. curl, ImageMagik). INSTEAD vendor them into the app.

# Store the config in the environment

<i class="fa fa-thumbs-o-up" aria-hidden="true"></i> *DO*
  * Separate app's config (AWS S3, passwords, Google/Fb/Tw/APIs credentials, deployment hostname) from the code.
  * Keep the code ready in a way that if were open source, it wouldn't compromise any credentials.
  * Use/commit 'config' files with sensitive information into repository. INSTEAD use environmental variables (env, env vars) which are easily changed between deployments and without changing code.

<i class="fa fa-thumbs-o-down" aria-hidden="true"></i> *DON'T*
  * Group config variables by environment (e.g. AWS_S3_PRODUCTION, AWS_S3_TEST, AWS_S3_QA, AWS_S3_STAGING, AWS_S3_JOE...). INSTEAD use clean environment variables (e.g. AWS_S3) that are managed individually per deploy.


# Swappable local and third party services

<i class="fa fa-thumbs-o-up" aria-hidden="true"></i> *DO*
  * Services like databases (e.g. MongoDB, PostgreSQL), message queues (e.g. RabbitMQ, Beanstalkd) should be accessed via URL or locator/credential stored in config.
  * Swapping local to production services should be done without any code changes.


# Build and runtime

<i class="fa fa-thumbs-o-up" aria-hidden="true"></i> *DO*
  * Code changes flows in one direction only development -> build -> run time environments.

# Execute the app as share-nothing stateless processes

<i class="fa fa-thumbs-o-up" aria-hidden="true"></i> *DO*
  * Store any persistent data in external services (such as databases)

<i class="fa fa-thumbs-o-down" aria-hidden="true"></i> *DON'T*
  * Use the filesystem/memory to save states. INSTEAD any instance of the app should be able to handle requests.

# Export services via port binding

<i class="fa fa-thumbs-o-up" aria-hidden="true"></i> *DO*
  * App is completely self-contained and communicates with other processes through port binding.

# Scale out the app horizontally

<i class="fa fa-thumbs-o-up" aria-hidden="true"></i> *DO*
  * Scale app horizontally since the app is a stateless and share-nothing model.

<i class="fa fa-thumbs-o-down" aria-hidden="true"></i> *DON'T*
  * Daemonize. INSTEAD use operating system manager such as Upstart or init and Foreman in development.

# Fast startup and shutdown

<i class="fa fa-thumbs-o-up" aria-hidden="true"></i> *DO*
  * app start in few seconds to serve requests or jobs.
  * shut down gracefully after receiving SIGTERM signal  (stop receiving new request/jobs, finish processing current request/job before stopping).

# Keep development, staging, and production as similar as possible

<i class="fa fa-thumbs-o-up" aria-hidden="true"></i> *DO*
  * design app for continuous deployment keeping the tools gaps and deployment times as minimum as possible.
  * code from development to production should take few hours or just few minutes.
  * developers who wrote the code should be able to deploy it to production.
  * keep production and development tool the same as possible

<i class="fa fa-thumbs-o-down" aria-hidden="true"></i> *DON'T*
  * use different services on production and development (e.g. development using SQLite and production ProtgreSQL).

# Logs goes to stdout


<i class="fa fa-thumbs-o-down" aria-hidden="true"></i> *DON'T*
  * write logs to a particular location in the filesystem. INSTEAD send them to STDOUT, so they can be routed as will depending the environment (e.g. output to terminal in development and output to log file in production)

# Admin processes

<i class="fa fa-thumbs-o-up" aria-hidden="true"></i> *DO*
  * favor languages/frameworks that use REPL shell out of the box to do admin tasks such as migrating databases, running consoles or running one-time scripts.


This is just the beginning follow up with [this next post](/blog/2016/03/23/how-to-scale-a-nodejs-app-based-on-number-of-users/).
