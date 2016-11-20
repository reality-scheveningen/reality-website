# Reality Scheveningen website

[![build status](https://gitlab.com/reality-scheveningen/realityscheveningen.nl/badges/master/build.svg)](https://gitlab.com/reality-scheveningen/realityscheveningen.nl/commits/master)
[![coverage report](https://gitlab.com/reality-scheveningen/realityscheveningen.nl/badges/master/coverage.svg)](https://gitlab.com/reality-scheveningen/realityscheveningen.nl/commits/master)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

Hybrid static site generator for [realityscheveningen.nl](https://realityscheveningen.nl)

## What are you looking at

This is the source code of [Reality Scheveningen](https://realityscheveningen.nl) a website for a local 
church in Scheveningen The Hague.
In this community there happened to be a couple of nerds and created this thing into existence.
We didn't want to go the [wordpress](https://wordpress.org) and some bought 
[themeforest](https://themeforest.net) theme route. 
We believe in the creativity of people. In our community we want to give them a stage to get the best out of their 
lives. We wanted to convey this thought in the creation of our website. We tried to create, write and design every page 
with care and hopefully give a good impression of our community.

We have chosen for a hybrid [static site generator](https://davidwalsh.name/introduction-static-site-generators) 
architecture. We are not going to change content every minute of the day, every day or even every week. 
We wanted a low cost, low maintenance, secure and environment friendly solution. 
Static site generators are safe, cheap, fast, portable and developer friendly. But maintaining content is
not very user friendly (yet) with static site generators.
We wanted to build on [shoulders of giants](https://en.wikipedia.org/wiki/Standing_on_the_shoulders_of_giants).
We found a very user and developer friendly headless CMS [Contentful](https://contentful.com). It offers a very nice 
free tier (enough for us).
Since we are making a fairly simple website, javascript was the most obvious language to choose.
It offers a wide range of frontend libs and tools in [npm](https://npmjs.com). 

What you are looking at is a very opinionated way for a hybrid static site generator specifically built for 
[realityscheveningen.nl](https://realityscheveningen.nl) website.
Feel free to look around, copy / use some of our ideas / code. When you see a bug or an improvement do not hesitate to 
make an issue or even better make a pull request.

## How does it work

Content and digital assets are managed with Contentful. 
Code is hosted on [Gitlab](https://gitlab.com) and open sourced on 
[Github](https://github.com/reality-scheveningen/reality-website)
Hosting of the website itself on [Gitlab Pages](https://pages.gitlab.com).

To build the website there are 2 steps:

1. Download content and digital assets (images, pdf's, etc) from contentful api's
2. Generate the html pages, javascript, css, etc.

After code gets pushed to master branch, it will automatically test, build and deploy the website to gitlab pages.
Hooks are configured in Contentful when something gets published the build process will automatically be triggered on 
gitlab ci. Which will deploy to gitlab pages.

In short, developers can deploy with a push to master and content editors can deploy by publishing content.

### Technology stack

We wanted to keep it as simple as possible:

* javascript (nodejs) for all coding 
* sass for stylesheets
* pug for templating

## How to start this thing on your local machine

Make sure you have node version installed which support ES6 (like node 6). 
Most npm scripts probably only run on a unix like shell.

```
npm install
```

Create .env file with atleast:

```
NODE_ENV=dev
BASE_URL=http://localhost:9090
CONTENTFUL_SPACE=insert-space-id
CONTENTFUL_API_KEY=insert-api-key
GA_TRACKING_CODE=UA-XXXXX-Y
GOOGLE_MAPS_API_KEY=insert-api-key
GOOGLE_SITE_VERIFICATION=insert-verification-key
DEBUG=app
CONTENTFUL_FULL_SYNC=1
```

Sync contentful database (if you have a contentful-token)

```
npm run sync-content
```

(TODO) Or download our current database with assets (these are copyrighted! use for development only)

```
TODO
```

Start developing

```
npm run dev
open http://localhost:9090
```

Run test suite

```
npm test
```

or with coverage

```
npm run test-with-coverage && open coverage/lcov-report/index.html
```
