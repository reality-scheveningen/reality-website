# Reality Scheveningen website

[![build status](https://gitlab.com/reality-scheveningen/realityscheveningen.nl/badges/master/build.svg)](https://gitlab.com/reality-scheveningen/realityscheveningen.nl/commits/master)

Hybrid static site generator with ContentFul

## Todo

* A lot ;)

## How to start

Make sure you have node version installed which support ES6 (like node 6)

```
npm install
```

Create .env file with atleast:

```
NODE_ENV=dev
BASE_URL=http://localhost
CONTENTFUL_SPACE=insert-space-id
CONTENTFUL_API_KEY=insert-api-key
GA_TRACKING_CODE=UA-XXXXX-Y
```

Sync contentful database

```
npm run sync-content
```

Start developing

```
npm run dev
open http://localhost:9090
```
