---
layout: post
title: "How to scale a Nodejs app based on number of users"
date: 2016-03-23 17:34:11 -0400
updated: 2016-03-23 17:34:11 -0400
comments: true
pageviews__total: 34352
pageviews__recent: 442
pageviews__avg_time: 2050
photos:
  - /images/scalabilty_matryoshka_small.png
  - /images/scalabilty_matryoshka_large.png
#categories: [production, scalability, aws, node, nginx]
toc: true
tutorial__order: 0
tags:
  - scalability
  - production
categories:
  - Technologies
---

Massive success is the best that could happen to any application. But, it could be a blessing and a curse for developers. Dealing with downtime, high availability and trying to scale. The following is a guideline on how to scale the web applications as the number of users grows.

<!-- More -->

One of the most dreaded questions is: 'Would that scale?'. The following is a guideline on how to grow the web applications as the number of users grows. Scaling an application too early is more painful than beneficial. This guide provides a way how to start simple and scale as the number of users grows.

**Common Server Setups For Scaling Your Web Application**

The examples and solutions will be as practical as possible. We might use references to Amazon Web Services (AWS), Digital Ocean or other cloud solutions. Also, there are some NodeJS/Nginx references, but they could easily be translated to other technologies.

You may notice, that the measurement we are using is "concurrent user", which means all users are hitting the web app at the same time. It's different from the number of users supported (which might be higher) since it's unlikely that all users are hitting the app at the same time. However, we are going to use "concurrent user" since it's easier to explain.


# Local host (1 concurrent users)

You are the only one using your app on your localhost.

There is no need to worry about scale.

# Single Server (2 - 9 concurrent users)

You deployed your app to the wild! 👏🏻 You and your colleges (and maybe close friends) are the only users so far.

Everything is great on a single server as long as you are using a web server that uses an event model like Nginx. NodeJS by nature uses an event-driven and non-blocking I/O model. It means that it won’t block with a single request, rather it will handle all the request and reply as data from database or services comes available in a callback/promise. Your Node app will spend most of the time waiting for the database or file system to respond. In the meantime, it can take multiple requests.

Your app should be a monolith (single app) right now, and it’s fine. No need to complicate your life for just a few users yet.If people are reporting bugs, unfortunately, as you make changes, you will need to take it down the app while updating the server. Using AWS t2.micro/t2.nano or equivalent (1 CPU/ 1 GB RAM) will do.

{% img /images/10_users.png Single Server Setup %}

The "Single Server Setup" is the simplest. Web application and database share the same resources (CPU, Memory RAM, I/O).

# Vertical Scaling (10 - 99 concurrent users)

You decided to talk about your app in your social networks 👍🏻. Your friends from Facebook and other social network start clicking the link to your web app at once and you are getting around 100 users.

Requests might start to take longer, and things start to become slower. You need a bigger box! This is called **vertical scaling**. Vertical scale means upgrading a single server hardware with more resources such as higher/faster CPU, RAM, HDD, and I/O.

If you are using AWS, you might upgrade to a t2.medium or equivalent (2 CPU / 4 GB RAM). An additional benefit of having multi CPU cores. We can run two instances of your NodeJS and load balance it with Nginx. Multiple instances of your app mean that you could achieve zero-downtime deployment/updates. You can upgrade one server while the other keeps serving the requests. For example, take down server #1, while server #2 continues serving the request. Then, bring up server #1 and take down server #2 to update it. In the end, no request will be dropped, and your app is fully updated.

{% img /images/100_users.png Scaling a Single Server %}

This setup has several improvements over the previous one:

- Nginx takes care of users requests and accomplish two functions: static filers server and reverse proxy. It serve by itself all static files (CSS, JS, Images) without touching the web app. The request that needs the app to resolve are redirected it, this is called reverse proxy.
- Zero-downtime upgrades.

# Horizontal Scaling (100 - 999 concurrent users)

Looks like the hard work has paid off and your app continue growing to around 1,000 users! 🙌🏻

After some time, the app is becoming slow again. Probably, the bottleneck is on the I/O. Database is taking longer to respond. We could keep upgrading to m4.xlarge or equivalent (4 CPU / 16 GB RAM). 4 CPU means that you could have also have multiple instances of the database/app. This is called **horizontal scaling**.

There is a point where vertical scaling is not cost/effective anymore especially. For instance, on look at this comparison and prices from Digital Ocean:

{% img /images/vertical_vs_horizontal_scaling.png Vertical vs Horizontal Scaling %}

On AWS will a little bit more wider the price range: $37.44/mo vs $172.08/mo.

Vertical scaling has another issue: all your eggs are in one basket. If the server goes down, you're screwed! On the other hand, horizontal scaling will give you redundancy and failover capabilities if done right.

At this point, it's better to start scaling horizontally rather than vertically. The bottleneck is most likely on the database. So, we can:

  - Move the database to a different server and scale it independently
  - Add replica set if the database hits its limit and db caching if it makes sense.

Since the Node is very efficient, it will spend most of the time waiting for the database to return data. So, the main limitation will be dictated by the network limits. You might need to play also with `/etc/security/limits.d` and `/etc/sysctl.conf` based on your needs. For instance the maximum number of requests queued are determined by `net.core.somaxconn`, which defaults to 128. Change it to `1024` so we can meet the 100 - 999 range of users. From now on, let's handle 1000 users per application server.

# Multi-servers (1,000+ concurrent users)

The app keeps growing and now we need to prepare to support around 10k users!

We can improve our previous setup, as follows:
- Add load balancer (e.g. ELB) and add app units.
- Use multiple availability zones (AZ) in a region (e.g. us-east-1, us-west-1), which one are connected through low latency links.
- Split static files to different server/service for easier maintenance. (e.g. AWS S3 and CloudFront CDN). Add CDN for static files for optimizing cross-origin performance and lower the latency. You can store assets such as Javascript, CSS, images, videos, and so on.

Using Elastic Load Balancer (ELB) with Route 53 is Amazon AWS specific, but there are similar solutions for other clouds providers. ELB is a load balancer managed by AWS and is available in all existing AZ. ELB has health checks so it won't route to a failing host. It also can manage around 1000s instances.

{% img /images/10k_users.png Horizontal Scaling %}

In this server setup, we started growing horizontally rather than vertically. In other words, we separated web application from database and scale each one with multiple instances. There are several advantages of having the database in a different server than the app:
 - Application and database doesn't fight for the same resources.
 - We can scale each tier (app, db) independently to as many as we need.

The cons is that getting this setup is more complicated. Furthermore, since app and db are not in the same server performance issues might arise due to network latency or bandwidth limits. It maximize performance, it's recommended to use private networks with low latency and high speed links.

# Microservices (100,000+ concurrent users)

This is it! We need to plan the infrastructure to allow us to grow to infinity! ∞

So far, we have been leveraging vertical and horizontal scaling, we have separated web apps from databases instances, and deploy them to multiple regions. However, we have been a single code based that handles all the work in our application. We can break it down into smaller pieces and scale them as needed. Going from monolith to microservices.

It's time to take down our web app monolith and break it down into multiple smaller and independent components (microservices/SOA) that we can scale independently. We don't have to do the break down all at once. We can have the monolith keep doing what it was doing and start writing small client apps performs some of the task that the main app used to do. Later, we can use the load balancer to redirect the traffic to the new small service instead of the main app. Eventually, we can remove the code from the monolith since the new microservice has fully replaced it. Repeat this process as many time as needed to create new microservices. It should looks something like this:

{% img /images/1m_users.png Microservices Setup %}

If you notice, we have three new components that can scale independently as needed: Users, Products Catalog, and Orders for instance. Another advantages of having microservices is that we can have split the database as well.

# Automate Chores (1,000,000+ concurrent users)

OMG! That's so many people, get you champagne bottle out and celebrate 🎉after you automate!

**Automate** as much as you can. The infrastructure is getting fat. We have db replicas and sharding, horizontal scaling, multiple regions and multi-AZ, autoscaling.

**Highly Available, Multi-Region** At this point, to scale we just keep adding instances and spreading across availability zones and regions based on the source of the traffic. If you notice that a significant amount of traffic is coming from Australia and Germany maybe it's the time to make your app available there (e.g. ap-southeast-2, eu-central-1). Bear in mind that regions doesn't provide low latency links between them. One way to work around this issue is sharding the database.

**Autoscaling** It would be a waste if you always allocate servers for peak capacity. User traffic has peaks (e.g. Black Friday) and valleys (e.g. 4 am.). That said, it's better to put in place an autoscaling option that allows the network to adjust to the traffic conditions. There are multiple strategies to autoscale such as CPU utilization, scale based on latency or based on network traffic.

**Metrics** You will also need metrics, monitoring and centralize logging. Measure everything that can be measured. Server nodes might start to fail randomly, and you don't want to login/SSH into each one to determine the cause. You can avoid that by having a centralized logging solution such as the ELK stack (Elasticsearch, Logstash, and Kibana). For monitoring, you can try DataDog, it has very nice visualization about the servers and CPU/RAM stats. Actully, in DataDog you can aggregate any data that you want.

**Customization** Databases might still be a headache to scale. If you identify that your use case it's better solved with a different NoSQL solution, go for it. Try always to not reinvent the wheel, but if there’s no solution out there for your particular need, consider doing your own.

For more general guidelines [read my previous post](/blog/2016/01/09/how-to-build-scalable-apps/).
