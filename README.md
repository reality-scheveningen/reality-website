# Reality Scheveningen website

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
CONTENTFUL_SPACE=insert-space-id
CONTENTFUL_API_KEY=insert-api-key
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
