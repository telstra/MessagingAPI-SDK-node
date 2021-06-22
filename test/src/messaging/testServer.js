/* eslint-disable */
const { rest } = require('msw');
const { setupServer } = require('msw/node');

const server = setupServer(
    rest.post(
        'https://tapi.telstra.com/v2/messages/sms/multi',
        (req, res, ctx) => {
            return res(ctx.status(200), ctx.json(req.body));
        }
    ),
    rest.get(
        'https://tapi.telstra.com/v2/messages/sms/healthcheck',
        (req, res, ctx) => {
            return res(ctx.status(200), ctx.json({ status: 'up' }));
        }
    ),
    rest.get(
        'https://tapi.telstra.com/v2/messages/mms/healthcheck',
        (req, res, ctx) => {
            return res(ctx.status(200), ctx.json({ status: 'up' }));
        }
    ),
    rest.post('https://tapi.telstra.com/v2/oauth/token', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                access_token: 'XXXXX',
                token_type: 'Bearer',
                expires_in: '3599',
            })
        );
    }),
    rest.get(
        'https://tapi.telstra.com/v2/messages/freetrial/bnum',
        (req, res, ctx) => {
            return res(ctx.status(200), ctx.json({ bnum: ['+61234567890'] }));
        }
    ),
    rest.post(
        'https://tapi.telstra.com/v2/messages/freetrial/bnum',
        (req, res, ctx) => {
            return res(ctx.status(200), ctx.json(req.body));
        }
    ),
    rest.get(
        'https://tapi.telstra.com/v2/messages/provisioning/subscriptions',
        (req, res, ctx) => {
            return res(ctx.status(200), ctx.json({ status: 'EMPTY' }));
        }
    ),
    rest.post(
        'https://tapi.telstra.com/v2/messages/provisioning/subscriptions',
        (req, res, ctx) => {
            return res(ctx.status(200), ctx.json(req.body));
        }
    ),
    rest.delete(
        'https://tapi.telstra.com/v2/messages/provisioning/subscriptions',
        (req, res, ctx) => {
            return res(ctx.status(200), ctx.json(req.body));
        }
    ),
    rest.get(
        'https://tapi.telstra.com/v2/messages/sms/XXXXX/status',
        (req, res, ctx) => {
            return res(ctx.status(200), ctx.json({ messageId: 'XXXXX' }));
        }
    ),
    rest.get('https://tapi.telstra.com/v2/messages/sms', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ status: 'EMPTY' }));
    }),
    rest.post('https://tapi.telstra.com/v2/messages/sms', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(req.body));
    }),
    rest.post('https://tapi.telstra.com/v2/messages/mms', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(req.body));
    }),
    rest.get('*', (req, res, ctx) => {
        console.error(`Please add request handler for ${req.url.toString()}`);
        return res(
            ctx.status(500),
            ctx.json({ error: 'Please add request handler' })
        );
    })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

module.exports = { server, rest };
