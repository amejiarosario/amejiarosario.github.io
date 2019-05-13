---
layout: draft
title: How to build a Node.js eCommerce website for free
comments: true
pageviews__total: 0
pageviews__recent: 0
pageviews__avg_time: 0
tutorial__order: 0
toc: true
photos:
  - /images/placeholder-small.jpg
  - /images/placeholder-large.jpg
photos__background_color: '#F4F0EF'
tags:
  - e-commerce
categories:
  - Programming
date: 2019-05-13 14:43:24
updated: 2019-05-13 14:43:24
---

Running an online store that sells digital goods is easier than ever, and thanks to generous free plans for developers you don't have to spend a dime to run your e-commerce site for a decent amount of users. In this post, I'll go over how I put together [books.adrianmejia.com](https://books.adrianmejia.com) to sell my eBook.

<!-- more -->

A 1000-feet view description would be something like this:

https://twitter.com/amejiarosario/status/1127918275705413632

TL; DR: The e-Commerce site final stack is the following:
- Node.js (Backend processing: payment webhooks)
- Stripe (Payment gateway)
- Heroku (Run server code)
- Netlify (Host static files)
- Amazon S3 (Host assets)
- CircleCI (Test code and generate assets)
- Mailgun (emails platform)

## Automating the generation of the assets (PDF)

I have Github repository where the book docs and code live:

https://github.com/amejiarosario/dsa.js

Every time I made a change (or somebody in the community), it triggers some process on CI that run all tests and generate a new updated document and store it AWS S3.

Generating assets automatically is useful because I want every buyer to get the latest copy.

## Hosting e-Commerce site

I always want to try out new JavaScript/CSS frameworks. However, I resisted the temptation and asked my self: Does a page for selling a book need to be dynamic? Nope. So, it will be more performant if I use plain old CSS and HTML. That's what I did.
Static pages also have the advantage that can be cached and served from a CDN.

I used Netlify to host the static website for free. One single `git push`  will update the site on the domain name of choice (e.g. [books.adrianmejia.com](https://books.adrianmejia.com)). It also uses a global CDN so your page loads faster from anywhere in the world!

## Processing Payments

The next part is to add a `Buy` button. Stripe provides a helpful checkout page that they host themselves and take care of the PCI compliance when dealing with credit cards. So, I used that, and they process the payment for me.

But how do I know if the customer bought my book or got distracted? For that, I need a server that listens for a payment webhook. In the Stripe configuration page, you tell them to send a POST request (webhook) with the customer information when a particular event.

And that brings us to the next part, the Node.js server to take care of the rest.

## Backend processing

I created a Node.js server that listened for webhook requests.  When a customer paid for the book an event with the details is sent to this server, and the document pipeline is kicked off.

The server first downloads the book from AWS S3 bucket, where the latest raw document is. Later, the server uses a library that allows to manipulate the PDF and add the buyer's stamp on the eBook. Finally, the material is attached to and send through email.

```js
async function sendPdfToBuyer(event) {
  const email = event.data.object.charges.data.map(d => d.billing_details.email).join(', ');
  const pdfUrl = await getLatestPdfUrl();
  const fileName = pdfUrl.split('/').pop();
  const pdfBuffer = await downloadPdf(pdfUrl);
  const stampedPdfPath = await stampedPdfWithBuyerData({ pdfBuffer, email, fileName });
  await sendEmail({ stampedPdfPath, email, fileName });
}
```

## Sending emails

Sending emails was a little trickier than I thought. First, I was using my domain name, so I have to set up the `MX` DNS settings to make it work. However, I notice all my test email to myself ended up on the junk mail.

Reading more about the topic I realized that I have to authenticate emails using SPF and DKIM, I still don't know what they are in details, but they allow email providers (Gmail, Yahoo) to verify you are who you say you are. They are setup also using DNS settings given by the emailing service provides.

I set up the setting initially with Sendgrid but was still getting my emails to the junk folder. I moved to Mailgun and got better results. For some reason, `hotmail.com` would always reject the emails. As I learned, unless you pay for a dedicated IP address the email service provider would use a "shared" IP in many accounts. If for some reason the IP gets a bad reputation then your emails will go to spam folder even if you have never sent an email before!

The final part related to emails is doing a template. I have never done it before. The difference between email templates and web pages HTML is that on the email you should embed everything into the message itself. Spam filters don't like external link loading additional resources.

Well, there you have it: an e-commerce store that collects the payments and send digital goods to buyers. Let's close talking about the cost of maintenance.

## Cost of running the e-Commerce store

This is the breakdown of the monthly costs:

- Hosting static websites: **$0** (if you use Netlify or Github pages)
- Payment Gateway: **$0** (Stripe will only a 2.9% charge if you sell something otherwise $0)
- Node.js server: **$0** (Heroku, AWS, Google Cloud and many others have a free plan for developers)
- Email Service: **$0** (Mailgun and Sendgrid both have free plans. The former allows you to send 10K emails per month)

The total is: **$0** / mo.

Note: Like any website, If you want to use a custom domain as I do, you have to pay for it which is about $1/mo.
