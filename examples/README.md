# Examples

## Setup

In your local environment set the following env var's.

```SHELL
export TLS_CLIENT_KEY="<client key>"
export TLS_CLIENT_SECRET="<client secret>"
export TLS_MOBILE_NUMBER="<mobile number>"
```

## Subscriptions

```SHELL
node examples/subscriptions/retrieve.js
node examples/subscriptions/create.js
node examples/subscriptions/delete.js
```

## Messages

```SHELL
node examples/messages/send.js
node examples/messages/retrieve-unread-reply.js
```

## Free Trial

```SHELL
node examples/freetrial/retrieve.js
node examples/freetrial/create.js
```
