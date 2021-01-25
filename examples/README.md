# Examples

## Setup

In your local environment set the following env var's.

```SHELL
export TLS_CLIENT_KEY="<client key>"
export TLS_CLIENT_SECRET="<client secret>"
export TLS_MOBILE_NUMBER="<mobile number>"
```

## Using CJS

```SHELL
node examples/index.cjs.js
```

## Using MJS

```SHELL
node examples/index.mjs
```

## Using Docker Node

```SHELL
# Common JS
docker run -it --rm --name tls-messaging-node -v "$PWD":/usr/src/app -w /usr/src/app node:10 node examples/index.js
docker run -it --rm --name tls-messaging-node -v "$PWD":/usr/src/app -w /usr/src/app node:11 node examples/index.js
# ES Module
docker run -it --rm --name tls-messaging-node -v "$PWD":/usr/src/app -w /usr/src/app node:12 node examples/index.mjs
docker run -it --rm --name tls-messaging-node -v "$PWD":/usr/src/app -w /usr/src/app node:14 node examples/index.mjs
docker run -it --rm --name tls-messaging-node -v "$PWD":/usr/src/app -w /usr/src/app node:15 node examples/index.mjs
```
