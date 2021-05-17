import { AssertionError } from './Errors';
export class Validator<T> {
    constructor(public data: T) {}

    checkAttrs<K extends keyof T>(propertyNames: K[]): void {
        console.log('data:', this.data);
        console.log('propertyNames:', propertyNames);
    }

    /** setup generic constraint to limit the types that K can be */
    check<K extends keyof T>(key: K, type: string): this {
        console.log('data:', this.data);
        console.log('key:', key);
        console.log('type:', type);
        console.log(typeof this.data[key]);

        /** validate key exists */
        if (!this.data[key]) {
            throw new AssertionError({
                errorCode: 'MISSING_ATTRIBUTE',
                errorMessage: `Attribute [${key}] is mandatory.`,
            });
        }

        return this;
    }
}
