---
layout: post
title: "How to build scalable apps in 2016?"
date: 2016-01-09 10:43:27 -0500
comments: true
categories: [apps, scalability, continuous deployment, cloud platforms]
---

{% img /images/scalabilty_matryoshka.png Guidelines to scale apps %}
<small>(external image)</small>

One of the most dreaded question is: 'Would that scale?'. The following are some guidelines to make scalable application in these 2016. Heroku people come with the [12 factor principles](http://12factor.net/) which is a good start. Also I'll expand on them and mention one of the most used tools in 2016 to achieve these principles.

<!-- More -->

# Twelve factor principle

Twelve steps are a compilation of guidelines to ensure apps can scale up without significant changes and tooling. These are very suitable for cloud platforms and continuous deployment. Futhermore, these principles are language agnostic, so it will work everywhere.

1. **One codebase per app, multiple deployments**
    * *DO*: One codebase to rule all deployment environments: production, staging, local and so on and differenciate them through config files (see #3).
    * *DONT*: Multiple apps sharing the same code. INSTEAD the common code should be extracted into a library and included through a dependency manager.
2. **Declare and isolate dependencies**
    * *DO*: have a dependency declaration manifest (e.g. packages.json, Gemfile)
    * *DO*: execute dependencies on isolation per app (e.g. bundle exec).
    * *DONT*: rely on implicit existence of system-wide packages (e.g. curl, ImageMagik). INSTEAD vendor them into the app.
3. **Store the config in the enviroment**
    * *DO*: separate app's config (AWS S3, passwords, Google/Fb/Tw/APIs credentials, deployment hostname) from the code.
    * *DO*: keep the code ready in a way that if were open source, it wouldn't compromise any credentials.
    * *DONT*: use/commit 'config' files with sensitve information into respository. INTEAD use enviromental variables (env, env vars) which are easily change between deployments and without changing code.
    * *DONT*: group config variables by enviroment (e.g. AWS_S3_PRODUCTION, AWS_S3_TEST, AWS_S3_QA, AWS_S3_STAGING, AWS_S3_JOE...). INSTEAD use clean enviroment variabels (e.g. AWS_S3) that are managed individually per deploy.
4. **Swappable local and third party services**
    * *DO*: Services like databases (e.g. MongoDB, PostgreSQL), message queues (e.g. RabbitMQ, Beanstalkd) should be accessed via URL or locator/credential stored in config.
    * *DO*: Swapping local to production services should be done without any code changes.
5. **Build and run time**
    * *DO*: code changes flows in one direction only development -> build -> run time environments.
6. **Execute the app as a share-nothing stateless processes**
    * *DO*: store any presistent data in external services (such as databases)
    * DONT: use the filesystem/memeroy to store states. INSTEAD any instance of the app should be able to handle requests.
7. Export services via port binding
    * *DO*: app is completely self-contained and communicates with other processes through port binding.
8. **Scale out the app horizontally**
    * *DO*: scale app horizontally since the app is stateless and share-nothing model.
    * *DONT*: daemonize. INSTEAD use operating system manager such as Upstart or init and Foreman in development.
9. **Fast startup and shutdown**
    * *DO*: app start in few seconds to serve requests or jobs.
    * *DO*: shutdown gracefully after receiving SIGTERM signal  (stop receiving new request/jobs, finish processing current request/job before stopping).
10. **Keep development, staging, and production as similar as possible**
    * *DO*: design app for continuous deployment keeping the tools gaps and deployment times as minimun as possible.
    * *DO*: code from development to production should take few hours or just few minutes.
    * *DO*: developers who wrote the code should be able to deploy it to production.
    * *DO*: keep production and development tool the same as possible
    * *DONT*: use different services on production and development (e.g. development using SQLite and production ProtgreSQL).
11. **Logs goes to stdout**
    * *DONT*: write logs to a specific location in the filesystem. INSTEAD send them to STDOUT, so they can be routed as will depending the enviroment (e.g. output to terminal in development and output to logfile in production)
12. **Admin processes**
    * *DO*: favor languages/frameworks that uses REPL shell out of the box to do admin tasks such as migrating databases, running consoles or running one-time scripts.

# Opinionated Workflow

Web development is not easy, it requires more than programing skills to get all the process in line towards quality and scalability.


The following are based on my experienced about how should be delivered these days.



That's all for now. Hope it's helpful.
