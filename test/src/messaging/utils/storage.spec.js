/* eslint-disable */
const { createStorage, Memory } = require('../../../../src/messaging/utils');

describe('createStorage', () => {
    let initialNodeEnv;

    beforeEach(() => {
        initialNodeEnv = process.env.STAGE;
    });

    afterEach(() => {
        process.env.STAGE = initialNodeEnv;
    });

    describe('should create Memory storage for', () => {
        it('jesttestlocal', async () => {
            // GIVEN node env
            process.env.STAGE = 'jesttestlocal';

            // WHEN createStorage is called
            const storageInstance = createStorage();

            // THEN an instance of the expected class is returned
            expect(storageInstance).toBeInstanceOf(Memory);
        });

        it('jesttestci', async () => {
            // GIVEN node env
            process.env.STAGE = 'jesttestci';

            // WHEN createStorage is called
            const storageInstance = createStorage();

            // THEN an instance of the expected class is returned
            expect(storageInstance).toBeInstanceOf(Memory);
        });
    });
});