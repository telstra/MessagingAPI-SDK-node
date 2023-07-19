/* eslint-disable */
const { rest } = require('msw');
const { setupServer } = require('msw/node');
const { Constants } = require('./Constants');

const server = setupServer(
    rest.post(
        'https://products.api.telstra.com/messaging/v3/messages',
        (req, res, ctx) => {
            return res(ctx.status(201), ctx.json(Constants.SEND_MESSAGE_RESPONSE));
        }
    ),
    rest.patch(
        'https://products.api.telstra.com/messaging/v3/messages/8369468e-20c9-11ee-be56-0242ac120002',
        (req, res, ctx) => {
            return res(ctx.status(204));
        }
    ),
    rest.put(
        'https://products.api.telstra.com/messaging/v3/messages/8369468e-20c9-11ee-be56-0242ac120002',
        (req, res, ctx) => {
            return res(ctx.status(200), ctx.json(Constants.UPDATE_MESSAGE_RESPONSE));
        }
    ),
    rest.get(
        'https://products.api.telstra.com/messaging/v3/messages',
        (req, res, ctx) => {
            return res(ctx.status(200), ctx.json(Constants.GET_ALL_MESSAGES_RESPONSE));
        }
    ),
    rest.get(
        'https://products.api.telstra.com/messaging/v3/messages/8369468e-20c9-11ee-be56-0242ac120002',
        (req, res, ctx) => {
            return res(ctx.status(200), ctx.json(Constants.GET_MESSAGE_RESPONSE));
        }
    ),
    rest.delete(
        'https://products.api.telstra.com/messaging/v3/messages/8369468e-20c9-11ee-be56-0242ac120002',
        (req, res, ctx) => {
            return res(ctx.status(204));
        }
    ),
    rest.post('https://products.api.telstra.com/v2/oauth/token', (req, res, ctx) => {
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
        'https://products.api.telstra.com/messaging/v3/free-trial-numbers',
        (req, res, ctx) => {
            return res(ctx.status(200), ctx.json(Constants.CREATE_FREETRIAL_NUMBERS_RESPONSE));
        }
    ),
    rest.post(
        'https://products.api.telstra.com/messaging/v3/free-trial-numbers',
        (req, res, ctx) => {
            return res(ctx.status(201), ctx.json(req.body));
        }
    ),
    rest.get(
        'https://products.api.telstra.com/messaging/v3/virtual-numbers',
        (req, res, ctx) => {
            return res(ctx.status(200), ctx.json(Constants.GET_ALL_VIRTUAL_NUMBERS_RESPONSE));
        }
    ),
    rest.get(
        'https://products.api.telstra.com/messaging/v3/virtual-numbers/0412345678',
        (req, res, ctx) => {
            return res(ctx.status(200), ctx.json(Constants.GET_ALL_VIRTUAL_NUMBERS_RESPONSE.virtualNumbers[0]));
        }
    ),
    rest.post(
        'https://products.api.telstra.com/messaging/v3/virtual-numbers',
        (req, res, ctx) => {
            return res(ctx.status(201), ctx.json(Constants.ASSIGN_VIRTUAL_NUMBER_RESPONSE));
        }
    ),
    rest.put(
        '',
        (req, res, ctx) => {
            return res(ctx.status(200), ctx.json(Constants.UPDATE_VIRTUAL_NUMBER_RESPONSE));
        }
    ),
    rest.delete(
        'https://products.api.telstra.com/messaging/v3/virtual-numbers/0412345678',
        (req, res, ctx) => {
            return res(ctx.status(204));
        }
    ),
    rest.get(
        'https://products.api.telstra.com/messaging/v3/virtual-numbers/0412345678/optouts',
        (req, res, ctx) => {
            return res(ctx.status(200), ctx.json(getOptoutsResponse));
        }
    ),
    rest.post(
        'https://products.api.telstra.com/messaging/v3/reports/messages',
        (req, res, ctx) => {
            return res(ctx.status(201), ctx.json(Constants.CREATE_MESSAGES_REPORT_RESPONSE));
        }
    ),
    rest.get(
        'https://products.api.telstra.com/messaging/v3/reports',
        (req, res, ctx) => {
            return res(ctx.status(200), ctx.json(Constants.GET_ALL_MESSAGES_REPORT_RESPONSE));
        }
    ),
    rest.get(
        'https://products.api.telstra.com/messaging/v3/reports/6940c774-4335-4d2b-b758-4ecb19412e85',
        (req, res, ctx) => {
            return res(ctx.status(200), ctx.json(Constants.GET_MESSAGES_REPORT_RESPONSE));
        }
    ),
    rest.get(
        'https://products.api.telstra.com/messaging/v3/health-check',
        (req, res, ctx) => {
            return res(ctx.status(200), ctx.json({ status: 'up' }));
        }
    ),
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
