import { StorageError } from './errors';

/**
 * Construct an instance of a storage based on the environment
 */
export function createStorage(): IStorage {
    return new Memory();
}

let storageInstance: IStorage | null = null;

/**
 * Returns an instance of a storage
 */
export function getStorage(): IStorage {
    if (!storageInstance) {
        storageInstance = createStorage();
    }

    return storageInstance;
}

type TMemoryBucket = Record<TKey, TData>;
type TMemoryStorage = Record<TBucket, TMemoryBucket>;

export class Memory implements IStorage {
    memoryStorage: TMemoryStorage;

    constructor() {
        this.memoryStorage = {};
    }

    listKeys(params: IListParams): Promise<TKeyList> {
        return new Promise((resolve, reject) => {
            // Check for presence of bucket
            if (!this.memoryStorage[params.bucket]) {
                reject(
                    new StorageError({
                        message: `${params} could not be retrieved.`,
                    })
                );
            }

            // Get keys
            const keys = Object.keys(
                this.memoryStorage[params.bucket]
            ).filter(key => key.startsWith(params.prefix));
            resolve(keys);
        });
    }

    get(params: IGetParams): Promise<TData> {
        return new Promise(resolve => {
            // Check for presence of data
            if (
                !this.memoryStorage[params.bucket] ||
                !this.memoryStorage[params.bucket][params.key]
            ) {
                // reject(
                //     new StorageError({
                //         message: `${params} could not be retrieved.`
                //     })
                // );
            }
            resolve(this.memoryStorage[params.bucket][params.key]);
        });
    }

    set(params: ISetParams): Promise<void> {
        return new Promise(resolve => {
            if (!this.memoryStorage[params.bucket]) {
                this.memoryStorage[params.bucket] = {};
            }
            this.memoryStorage[params.bucket][params.key] = params.data;
            resolve();
        });
    }

    clear(params: IClearParams): Promise<void> {
        return new Promise(resolve => {
            delete this.memoryStorage[params.bucket];
            resolve();
        });
    }
}

export type TBucket = string;
export type TPrefix = string;
export type TKey = string;
export type TKeyList = TKey[];
export type TData = string;

export interface IListParams {
    bucket: TBucket;
    prefix: TPrefix;
}

export interface IGetParams {
    bucket: TBucket;
    key: TKey;
}

export interface ISetParams {
    bucket: TBucket;
    key: TKey;
    data: TData;
}

export interface IClearParams {
    bucket: TBucket;
}

export interface IStorage {
    /**
     * List the keys in a bucket that match a prefix in the storage
     * @param params.bucket The bucket the keys should be retrieved from
     * @param params.prefix The prefix to filter keys by
     */
    listKeys: (params: IListParams) => Promise<TKeyList>;

    /**
     * Get a value from the storage
     * @param params.bucket The bucket the data should be retrieved from
     * @param params.key The key where the data should be retrieved from
     */
    get: (params: IGetParams) => Promise<TData>;

    /**
     * Set a value in the storage
     * @param params.bucket The bucket the data should be stored
     * @param params.key The key against which the data should be stored
     * @param params.data The data that should be stored
     */
    set: (params: ISetParams) => Promise<void>;

    /**
     * Remove all items from a bucket and delete it
     * @param params.bucket The bucket that should be cleared and deleted
     */
    clear: (params: IClearParams) => Promise<void>;
}
