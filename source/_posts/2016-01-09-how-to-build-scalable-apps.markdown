---
layout: post
title: "How to build scalable apps in 2016?"
date: 2016-01-09 10:43:27 -0500
comments: true
categories: [production, scalability]
---
Scaling application is not an easy topic to cover in one post. So in this first post, you can find “the mindset” to build scalable apps using the 12-factor principles. In the [next post](/blog/2016/03/23/how-to-scale-a-nodejs-app-based-on-number-of-users/), you will find more down to earth examples one how to scale based on the number of users.

The Twelve steps are a compilation of guidelines to ensure apps can scale up without significant changes and tooling. These are very suitable for cloud platforms and continuous deployment. Furthermore, these principles are language agnostic, so it will work with any framework.

<!-- More -->

# The Twelve Factor Principles

1. **One codebase per app, multiple deployments**
    * *DO*: One codebase to rule all deployment environments: production, staging, local and so on and differentiate them from config files (see #3).
    * *DON'T*: Multiple apps sharing the same code. INSTEAD the common code should be extracted from a library and included through a dependency manager.
2. **Declare and isolate dependencies**
    * *DO*: have a dependency declaration manifest (e.g. packages.json, Gemfile)
    * *DO*: execute dependencies in isolation per app (e.g. bundle exec).
    * *DON'T*: rely on implicit existence of system-wide packages (e.g. curl, ImageMagik). INSTEAD vendor them into the app.
3. **Store the config in the environment**
    * *DO*: separate app's config (AWS S3, passwords, Google/Fb/Tw/APIs credentials, deployment hostname) from the code.
    * *DO*: keep the code ready in a way that if were open source, it wouldn't compromise any credentials.
    * *DON'T*: use/commit 'config' files with sensitive information into repository. INSTEAD use environmental variables (env, env vars) which are easily changed between deployments and without changing code.
    * *DON'T*: group config variables by environment (e.g. AWS_S3_PRODUCTION, AWS_S3_TEST, AWS_S3_QA, AWS_S3_STAGING, AWS_S3_JOE...). INSTEAD use clean environment variables (e.g. AWS_S3) that are managed individually per deploy.
4. **Swappable local and third party services**
    * *DO*: Services like databases (e.g. MongoDB, PostgreSQL), message queues (e.g. RabbitMQ, Beanstalkd) should be accessed via URL or locator/credential stored in config.
    * *DO*: Swapping local to production services should be done without any code changes.
5. **Build and runtime**
    * *DO*: code changes flows in one direction only development -> build -> run time environments.
6. **Execute the app as share-nothing stateless processes**
    * *DO*: store any persistent data in external services (such as databases)
    * DON'T: use the filesystem/memory to save states. INSTEAD any instance of the app should be able to handle requests.
7. **Export services via port binding**
    * *DO*: app is completely self-contained and communicates with other processes through port binding.
8. **Scale out the app horizontally**
    * *DO*: scale app horizontally since the app is a stateless and share-nothing model.
    * *DON'T*: daemonize. INSTEAD use operating system manager such as Upstart or init and Foreman in development.
9. **Fast startup and shutdown**
    * *DO*: app start in few seconds to serve requests or jobs.
    * *DO*: shut down gracefully after receiving SIGTERM signal  (stop receiving new request/jobs, finish processing current request/job before stopping).
10. **Keep development, staging, and production as similar as possible**
    * *DO*: design app for continuous deployment keeping the tools gaps and deployment times as minimum as possible.
    * *DO*: code from development to production should take few hours or just few minutes.
    * *DO*: developers who wrote the code should be able to deploy it to production.
    * *DO*: keep production and development tool the same as possible
    * *DON'T*: use different services on production and development (e.g. development using SQLite and production ProtgreSQL).
11. **Logs goes to stdout**
    * *DON'T*: write logs to a particular location in the filesystem. INSTEAD send them to STDOUT, so they can be routed as will depending the environment (e.g. output to terminal in development and output to log file in production)
12. **Admin processes**
    * *DO*: favor languages/frameworks that use REPL shell out of the box to do admin tasks such as migrating databases, running consoles or running one-time scripts.


This is just the beginning follow up with [this next post](/blog/2016/03/23/how-to-scale-a-nodejs-app-based-on-number-of-users/).
