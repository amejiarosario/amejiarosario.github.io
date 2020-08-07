---
layout: draft
title: >-
  Artificial Intelligence, Machine Learning and Deep Learning for
  Everyone!
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
  - drafts
  - big-o notation
  - algorithms
  - tutorial_algorithms
categories:
  - Artificial Intelligence (AI)
  - Machine Learning (ML)
  - Deep Learning (DL)
date: 2018-06-26 20:49:01
updated: 2018-06-26 20:49:01
---


Probably you have heard a lot about AI or artificial intelligence. But what really is it? What technologies is enabling around us? Are machines going to take your job or over the world? Well, we will answer this questions as we go along.

<!-- more -->

You realize it or not, you are probably using things powered by artifical intelligence every day. Let's start by listing some of the most common applications so you get an idea what is capable of. After we get an idea about the most common use cases we are going to explore the difference between artificial intelligence, machine learning and deep learning.

# Applications

For years we have been using computers with text. We can easily search for the word "dog" on a website or in a text document. However, if we have a bunch of images most computers cannot tell us which ones contains a "dog". Even worst with videos and sounds.

That's where machine learning comes handy. It help us make sense of different kinds of images, animations and voice recordings. We now can say:
* Find me all photos with "houses in the mountains". E.g. [Google Photos](https://photos.google.com/search/house%20in%20the%20mountains)
<!-- * Play the videos where person X shows up. -->
* Look at a celebrity clothing and tell me where I can buy the items. E.g. [LookLive](http://www.looklive.com/)
* Sort my shopping list so I can finish faster. E.g. [Instacart](https://tech.instacart.com/deep-learning-with-emojis-not-math-660ba1ad6cdc)
* Self-driving cars. E.g. Tesla, Uber, Google, Apple
* Convert handwriting into text or even speech.
<!-- E.g. [Blog post](https://towardsdatascience.com/handwriting-recognition-using-tensorflow-and-keras-819b36148fe5) -->
* Listen to all recorded conversations and play me the angry customers.

As you can see, the posibilites are many. If you want to see a full list expand the below.

<details>
  <summary>Machine Learning as a Service Offerings</summary>
  <ul>
  <li>Text Based Applications<ul>
  <li>Language Detection and text translation</li>
  <li>Key phase / topic extraction</li>
  <li>Spellcheck</li>
  <li>Autocompletion</li>
  <li>Chatbots</li>
  </ul>
  </li>
  <li>Image Recognition<ul>
  <li>Face Recognition</li>
  <li>Image classification</li>
  <li>Review healthcare scans and reports illnesses</li>
  <li>Handwriting to text</li>
  <li>Object detection</li>
  <li>Landmark detection</li>
  <li>Celebrity recognition</li>
  <li>Text recognition on images (OCR)</li>
  <li>Logo detection</li>
  <li>Inappropriate content detection</li>
  <li>Search for similar images</li>
  </ul>
  </li>
  <li>Video Detection<ul>
  <li>Person tracking</li>
  <li>Motion/Activity Detection</li>
  <li>Object/scene identification</li>
  <li>Facial recognition</li>
  <li>Facial sentiment analysis</li>
  <li>Text recognition on video</li>
  <li>Keyframe extraction</li>
  <li>Annotations / auto-tagging</li>
  </ul>
  </li>
  <li>Sound Recognition<ul>
  <li>Voice recognition (Siri, Alexa, Cortana)</li>
  <li>Voice synthesizers (text to speech)</li>
  <li>Voice verification</li>
  <li>Speech into text</li>
  <li>Sentiment/Intention Analysis</li>
  <li>Flaw Detection like vehicle’s engine noise</li>
  </ul>
  </li>
  <li>Time Series<ul>
  <li>Recommendations</li>
  <li>Predictions (Financial market)</li>
  <li>Security and IoT with Risk Detections</li>
  <li>Enterprise/Resource Planning</li>
  </ul>
  </li>
  </ul>
</details>

  <!-- * Text Based Applications
      * Language Detection and text translation: [Google Translate](https://translate.google.com/), [Bing Translator](https://www.bing.com/translator)
      * Key phase / topic extraction
      * Spellcheck
      * Autocompletion
      * Chatbots
  * Image Recognition
      * Face Recognition
      * Image classification
      * Review healthcare scans and reports illnesses
      * Handwriting to text
      * Object detection
      * Landmark detection
      * Celebrity recognition
      * Text recognition on images (OCR)
      * Logo detection
      * Inappropriate content detection
      * Search for similar images
  * Video Detection
      * Person tracking
      * Motion/Activity Detection
      * Object/scene identification
      * Facial recognition
      * Facial sentiment analysis
      * Text recognition on video
      * Keyframe extraction
      * Annotations / auto-tagging
  * Sound Recognition
      * Voice recognition (Siri, Alexa, Cortana)
      * Voice synthesizers (text to speech)
      * Voice verification
      * Speech into text
      * Sentiment/Intention Analysis
      * Flaw Detection like vehicle's engine noise
  * Time Series
      * Recommendations
      * Predictions (Financial market)
      * Security and IoT with Risk Detections
      * Enterprise/Resource Planning
  * Others
    * Threat Detection
    * Fraud Detection (credit cards) -->

# AI vs ML vs Deep Learning

Ok, now that we have an idea what these kind of technology is capable of, let's clarify the terms.

**Artificial intelligence** (AI, also machine intelligence, MI) is when machines/software mimics the cognitive functions of humans like learning and solving problems. Form 1956-1974 was considered the "Golden Years" of AI, where programs were develop to solve high school algebra word problems, learning chess strategies.

  * Machine Learning and Deep Learning both are terms related to Artificial Intelligence.
  * Machine Learning is the science of getting the machines to act similar to humans without programming but with lots of data. It can use techniques decision trees learning, association rules.
  * Deep learning and using artificial neural networks (ANN) or also know as deep neural networks (DNN)

# Artificial Neural Networks (ANN)

  * Neural networks simulates how neurons works on the brain.
  * Neurons receives inputs through dendrites, cell body process (sums, transform, triggers) data, synapses output information to next neurons.
  * Similarly to the brain's neuron an artificial neuron has many inputs. It also has an output.
  * The way the inputs produces an output is as follows. 1, 2, 3
      * Each input has an assigned weight.
      * All the weighted inputs get summed.
      * The sum goes through an activation function that finally leads to an output (and to the next neuron)
  * Going back to the analogy, the brain's neuron doesn't just output the sum of inputs. It has some function that strengthen or weaken the output signal. That's the purpose of the activation function. 1
  * Activation functions
      * Sigmoid.
          * Great for classification problems.
          * Produces output between 0 and 1. Used for the binary classification task.
          * Has issues with saturation (and vanishing gradient problem) that paralyze the network from learning.
      * Softmax 1, 2, 3
          * Generalization of the Sigmoid function (i=2)
          * Good for classifying images on DNN 1
          * Used for the multi-classification task.
      * Tanh.
          * Very similar to sigmoid. But produces output from -1 to 1, thus less saturation and allowing neurons to learn more.
          * It is mainly used in LSTM networks.
          * (Still susceptible to the vanishing problem)
      * Rectified Linear Unit (ReLU):
          * One of the most common activation function for deep learning neural networks for speech recognition and computer vision.
          * However, since all negative goes to 0. It prevents neurons to keep learning.
      * Swish
          * This is the new kid in the block and seems to outperform other activation functions.
          * It's more expensive to compute.

# Deep Neural Networks (DNN)

  * Neural networks has many fully connected layers.
  * Fully connected means that all the neurons outputs from then first layer are connected to every neuron in the next layer as input. 1, 2, 3
  * The layers between the inputs and outputs layers are called hidden layers.
  * Each connection between neurons has weights that changes how much one affect the next one.
  * The weights for each input are arbitrary choose initially until they are "trained".
  * Training a neural network is the process of changing weights until they produce the desired output. This loop of adjusting weights to get the desired output could take thousands of trials. Also, training is very computational intensive depending on the number of neurons per layers and number of layers. 2
  * One each training iteration the actual output value is compared with the desired output. The square of the difference between the actual output and desired is called "loss" or "cost". 1
  * The loss value of all outputs are used in the next training with the purpose of reducing how far an output is from the optimal value. This process is also called optimization.
  * Tensorflow provides many choices for optimizations like Gradient Descent, Adagrad just to name a few.

# Types of Neural Networks

  * Feed-Forward Neural Networks (FFNN) 1
      * https://www.kdnuggets.com/2017/10/tensorflow-building-feed-forward-neural-networks-step-by-step.html
      * https://colab.research.google.com/drive/1aywKdiLszjY6avOi2fDD554qtJwu7Yh1#scrollTo=MNH4xvoQI-yW
  * Convolutional Neural Networks (CNN)
      * Designed to process data with a grid-like topology
      * For instance: Time interval 1D grid, images as 2D grid
      * Good for image classification like:
          *  identifying handwritten numbers (MNIST Dataset) example ipynb
          * identifying 10 different objects (CIFAR-10 dataset)
          * cluster them by similarity (photo search),
          * perform object recognition within scenes.
      * Relu activation function
      * It has many layers of covolution and pooling
  * Recurrent Neural Network (RNN)
      * great for Neuro-Linguistic Programming (NLP) tasks
      * Word prediction: Good for predicting next words on a sentence
      * Softmax activation function
  * Long Short-Term Memory (LSTM) networks
      * Special kind of RNN for learning long-term dependencies
      * Example: We want to train a LSTM to predict the next word using a sample short story from Aesop’s Fables.
          * https://towardsdatascience.com/lstm-by-example-using-tensorflow-feb0c1968537
          * https://github.com/sakiii999/Python-and-Deep-Learning-Lab/wiki/Deep-Learning-Lab-Assignment-3


# Summary

Deserunt veniam proident minim enim enim reprehenderit pariatur pariatur aliqua. Ex ad irure nisi elit. Dolor non proident ad nostrud officia occaecat esse culpa ut consequat laboris.

<!-- # TensorFlow -->

<!-- https://developers.google.com/machine-learning/crash-course/prereqs-and-prework -->

<!-- https://colab.research.google.com/notebooks/mlcc/tensorflow_programming_concepts.ipynb?utm_source=mlcc&utm_campaign=colab-external&utm_medium=referral&utm_content=tfprogconcepts-colab&hl=en#scrollTo=NzKsjX-ufyVY -->
