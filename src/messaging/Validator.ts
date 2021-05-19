import { AssertionError } from './Errors';
export class Validator<T> {
    constructor(public data: T) {}

    // public checkAttrs<K extends keyof T>(propertyNames: K[]): this {
    //     // console.log('data:', this.data);
    //     // console.log('propertyNames:', propertyNames);
    //     return this;
    // }

    /** setup generic constraint to limit the types that K can be */
    public check<K extends keyof T>(key: K): this {
        // console.log('data:', this.data);
        // console.log('key:', key);
        // console.log(typeof this.data[key]);

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
