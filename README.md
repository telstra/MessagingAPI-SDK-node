# My SDK

My SDK.

## Installing

```bash
npm install @christrewin/my-sdk
```

## Getting Started

Set the `TLS_CLIENT_KEY` and `TLS_CLIENT_SECRET` environment variables.
These are the `Client key` and `Client secret` you can find here: <https://dev.telstra.com/user/me/apps>.

To send your first SMS:

```javascript
import { SMS } from './messaging';

const sms = SMS.getInstance();

sms.send({
  to: "+61<mobile>",
  body: "Hello from Telstra Messaging SDK"
});

```

```bash
TLS_CLIENT_KEY="XXXX" TLS_CLIENT_SECRET="YYYY" node examples/app.js
```
