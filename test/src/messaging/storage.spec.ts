/* eslint-disable */
import jestEach from 'jest-each';

import { createStorage, storage, Memory } from '../../../src/messaging/storage';

describe('createStorage', () => {
    let initialNodeEnv: string | undefined;

    beforeEach(() => {
        initialNodeEnv = process.env.STAGE;
    });

    afterEach(() => {
        process.env.STAGE = initialNodeEnv;
    });

    jestEach([
        [
            'should create Memory storage for jesttestlocal',
            {
                nodeEnv: 'jesttestlocal',
                expectedClass: Memory,
            },
        ],
        [
            'should create Memory storage for jesttestci',
            {
                nodeEnv: 'jesttestci',
                expectedClass: Memory,
            },
        ],
    ]).test('%s', (_, { nodeEnv, expectedClass }) => {
        // GIVEN node env
        process.env.STAGE = nodeEnv;

        // WHEN createStorage is called
        const storageInstance = createStorage();

        // THEN an instance of the expected class is returned
        expect(storageInstance).toBeInstanceOf(expectedClass);
    });
});

describe('storage', () => {
    test('should create a new storage when calling storage for the first time', () => {
        // GIVEN

        // WHEN storage is called
        const firstStorage = storage();

        // THEN a storage is created
        expect(firstStorage).toBeTruthy();
    });

    test('should return the same storage when calling storage for future calls', () => {
        // GIVEN

        // WHEN storage is called multiple times
        const firstStorage = storage();
        const secondStorage = storage();

        // THEN a storage is created
        expect(firstStorage).toBe(secondStorage);
    });
});
