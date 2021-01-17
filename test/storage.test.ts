import jestEach from 'jest-each';

import { createStorage, getStorage, Memory } from '../src/messaging/storage';

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

describe('getStorage', () => {
    test('should create a new storage when calling getStorage for the first time', () => {
        // GIVEN

        // WHEN getStorage is called
        const storage = getStorage();

        // THEN a storage is created
        expect(storage).toBeTruthy();
    });

    test('should return the same storage when calling getStorage for future calls', () => {
        // GIVEN

        // WHEN getStorage is called multiple times
        const firstStorage = getStorage();
        const secondStorage = getStorage();

        // THEN a storage is created
        expect(firstStorage).toBe(secondStorage);
    });
});
