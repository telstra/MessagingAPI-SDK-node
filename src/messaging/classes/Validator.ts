import { AssertionError } from './Errors';
var Ajv = require('ajv');
var ajv = new Ajv({ allErrors: true, format: false });

export class Validator<T> {
    constructor(public data: T) {}

    public schemaInline(ref: any): this {
        var valid = ajv.validate(ref, this.data);
        if (valid) {
            return this;
        } else {
            throw new AssertionError({
                errorCode: 'FIELD_INVALID',
                errorMessage: `${ajv.errorsText(valid.errors)}`,
            });
        }
    }
}
