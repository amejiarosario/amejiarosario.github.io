---
layout: post
title: How to perform Atomic Operations on MongoDB?
comments: true
pageviews__total: 214
pageviews__recent: 93
pageviews__avg_time: 92
tutorial__order: 0
toc: true
photos:
  - /images/atomic-operations-mongodb-small.png
  - /images/atomic-operations-mongodb-large.png
photos__background_color: '#5691C8'
tags:
  - mongodb
categories:
  - Programming
date: 2019-03-14 06:40:00
updated: 2019-03-14 06:40:00
author: DanishWadhwa
---

The NoSQL database system has been able to gain momentum in the past few years due to its flexibility and other benefits. Mongo is the leader when it comes to NoSQL. There are plenty of amazing features of MongoDB, and one of them are atomic operations. In the upcoming sections of this article, we will go deep into atomic operations, its use, and how you can apply it to your projects.

<!-- more -->

Before moving forward to checking out how we can apply atomic operations in MongoDB, we will be looking at some of the critical points that you need to keep in your mind in regards to MongoDB:
- MongoDB does not support atomicity for multi-document transactions. However, version 4.0 onwards will support multi-document transactions in several cases.
- It is only possible to use the atomicity feature of MongoDB in a single document (not in case of version 4.0). Suppose, there is a document that consists of 35 fields. In that document, there will either be updates in all 35 fields or none.
- The atomicity feature is only limited to the document level.


---

If you want to jump into the NoSQL database, you should consider [MongoDB certification](https://www.simplilearn.com/big-data-and-analytics/mongodb-certification-training). It will give you a strong foundation and skills to use MongoDB to solve real-world problems. There is a considerable job demand for MongoDB professionals.

---


# Introduction to Atomic Operations

The atomic operations in database terminology is a chained and sophisticated database operations series. In this series, either all aspects of the series will be affected, or nothing will be altered. In atomic operations, there is no such thing as a partial database change.

In atomic operations, there is only a room for complete database updates and changes. In case of any partial updates, the whole database will roll back.

We use atomic operations in a case where the partial update will create more harm in comparison to rolling back. There are some instances in the real world where we need to maintain our database in this manner. In the latter part of this article, we will discuss more in depth about it.

We can explain atomic operations in MongoDB clearly with the use of ACID, a.k.a. Atomicity, Consistency, Isolation, and Durability.
- Here is a simple rule of *atomicity* for every single operation, “either all or none.”
- The *consistency* property will play a crucial role in atomicity. It will ensure that each transaction will ultimately lead to a valid state of some kind.
- The *isolation* property of the database will play a part in guaranteeing the systematic process of the concurrent transaction, which means one by one.
- Finally, the *durability* property will come into play. This property ensures the permanency of the database after each database transaction regardless of errors, crashes, and power loss.


# Modeling e-Commerce Products in MongoDB

We should maintain atomicity in MongoDB by compiling all the related information in a single document, which will update consistently. We can create such type of consistency via embedded documents. The embedded is for ensuring that every single update that takes place in the document is atomic.

Here is how the document looks like for representing item purchase information.

## Creating a new product

Let's say we have an e-Commerce app and we want to model a product on MongoDB with atomic operations. We can do something like this:

{% codeblock creating a product on MongoDB lang:js%}
use AtomicMongoDB;
// => switched to db AtomicMongoDB

// create an iPhone product with embedded buyers
db.AtominMongoDB.save({
  "_id": 1111,
  "item_name": "Apple iPhone Xs Max 512GB",
  "price": 1450,
  "category": "handset",
  "warranty_period": 5,
  "city": "Toronto",
  "country": "Canada",
  "item_total": 10,
  "item_available": 6,
  "item_bought_by": [{
      "customer": "Bob",
      "date": "6-Feb-2019"
    },
    {
      "customer": "Alice",
      "date": "5-Jan-2019"
    },
    {
      "customer": "Anita",
      "date": "4-Dec-2018"
    },
    {
      "customer": "Abhishek",
      "date": "10-Dec-2018"
    }
  ]
});
// => WriteResult({ "nMatched" : 0, "nUpserted" : 1, "nModified" : 0, "_id" : 1111 })

// Verify the document was saved
db.AtominMongoDB.find().pretty();
{% endcodeblock %}


In the above document, we have created a model, embedded document. We have produced a report from the purchase in the item_bought_by field. This single document will manage everything about the purchase and the stock. In this document, it will see whether the item that the customer orders are in the stock or not. The customer’s order processes through the item_available field.

## Decreasing count on a purchase

In the case of availability, we will subtract the `item_available` field by 1. After we complete that part, we will record the information of the customer, and, i.e., name and the purchase date, in the item_bought_by field. We will again look at another document where we will be using the `findAndmodify` statement to fulfill this purpose.
By using `findAndmodify` statement, the document will perform search and update activity simultaneously in the report.

{% codeblock buying a product lang:js%}
db.AtominMongoDB.findAndModify({
  query: {
    _id: 1111,
    item_available: {
      $gt: 0
    }
  },
  update: {
    $inc: {
      item_available: -1
    },
    $push: {
      item_bought_by: {
        customer: "Adrian",
        date: "14-Mar-2019"
      }
    }
  }
});

// => returns found document

// Verify new customer was added and stock number decreased
db.AtominMongoDB.find().pretty();
// {
//   "_id": 1111,
//   "item_name": "Apple iPhone Xs Max 512GB",
//   "price": 1450,
//   "category": "handset",
//   "warranty_period": 5,
//   "city": "Toronto",
//   "country": "Canada",
//   "item_total": 10,
//   "item_available": 5,
//   "item_bought_by": [{
//       "customer": "Bob",
//       "date": "6-Feb-2019"
//     },
//     {
//       "customer": "Alice",
//       "date": "5-Jan-2019"
//     },
//     {
//       "customer": "Anita",
//       "date": "4-Dec-2018"
//     },
//     {
//       "customer": "Abhishek",
//       "date": "10-Dec-2018"
//     },
//     {
//       "customer": "Adrian",
//       "date": "14-Mar-2019"
//     }
//   ]
// }
{% endcodeblock %}


In the above document, we searched for the item, setting the ID as 1111. If the system finds such a thing, we activate the subtraction function and deduct 1 in the item_available field. We will also update the field `item_bought_by` in which we insert the name of the customer along with the purchase date.

Finally, we print the full information with the function, find and pretty method. We can see that the item_available field will come down from 6 to 5 while adding the customer name and the purchase date in the `item_bought_by` field.

One more example to make you more precise about the use of atomic operations in MongoDB

## Modeling books on MongoDB and performing atomic operations

In the above case, we dealt mainly with the product order and the record keeping of customers. In this example, we will be using the function of the simple book store and make it work out in MongoDB via atomic operations.

Let’s suppose in that book store, and we need to maintain the record of books along with the number of copies available for checkout, including crucial details about checkout.

We should sync the number of copies available, and checkout information must for the program to work. We will be embedding the checkout and the `available` field for ensuring that the two areas will be updated atomically.

{% codeblock create a book on mongo lang:js%}
// create a new book
db.books.save({
  _id: 222222,
  title: "Data Structures & Algorithms in JavaScript",
  author: [ "Adrian Mejia" ],
  published_date: ISODate("2019-02-15"),
  pages: 216,
  language: "English",
  publisher_id: "Independent",
  available: 156,
  checkout: [ { by: "Ivan", date: ISODate("2019-04-14") } ]
})

{% endcodeblock %}

Updating the checkout field with new information is essential. We will be using `db.collection.updateOne()` method for atomically updating available and checkout field.

{% codeblock Purchasing a book lang:js%}
db.books.updateOne({
  _id: 222222,
  available: { $gt: 0 }
}, {
  $inc: { available: -1 },
  $push: {
    checkout: {
      by: "Abby",
      date: new Date()
    }
  }
});
{% endcodeblock %}

The above command will return the following:

```js
{ "acknowledged" : true, "matchedCount" : 1, "modifiedCount" : 1 }
```

The `matchedCount` field is responsible for comparing the condition for updates. We can see that 1 document fulfilled the requirements due to which the operation updated 1 document (`modifiedCount`).

There could also be the case where no documents are matched, according to the update condition. In that situation, both the `matchedCount` and `modifiedCount` field would be 0. What this means is that you will not be able to purchase the book and continue with a checkout process.

# Final Say

Finally, we have finished the topic of how you can use atomic operations via MongoDB. It was not that difficult, was it? Although it is not possible to work out with multi-document tasks, but using atomic operations in MongoDB is simple. With that said, MongoDB starting from version 4.0 will be supporting atomic operations in numerous scenarios.

There are plenty of real-world issues where we can use an atomic operation like in purchase record. It will prevent mutual exclusions; hence, it will stop the corruption of data in many ways.

Take a close look at the source codes in the article and follow it as you see fit. After practicing for a few times, you can naturally apply the atomic operation in the real-world problems where needed.

Do you have any confusions? If yes, feel free to leave a comment below. We will reply to your comment for clearing out your difficulties. In case you want to add more insights, you can put forward your opinion in the comment below.
