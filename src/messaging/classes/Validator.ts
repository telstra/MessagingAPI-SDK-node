import OPENAPISCHEMAS from '../openapi.json';
import { AssertionError } from './Errors';
var Ajv = require('ajv');
var ajv = new Ajv({ allErrors: true, format: false });

ajv.addSchema(OPENAPISCHEMAS, 'openapi.json');

export class Validator<T> {
    constructor(public data: T) {}

    public schemaRef(ref: string): this {
        var valid = ajv.validate(
            { $ref: `openapi.json#/components/schemas/${ref}` },
            this.data
        );
        if (valid) {
            return this;
        } else {
            throw new AssertionError({
                errorCode: 'MISSING_ATTRIBUTE',
                errorMessage: `${ajv.errorsText(valid.errors)}`,
            });
        }
    }

    public schemaInline(ref: any): this {
        var valid = ajv.validate(ref, this.data);
        if (valid) {
            return this;
        } else {
            throw new AssertionError({
                errorCode: 'MISSING_ATTRIBUTE',
                errorMessage: `${ajv.errorsText(valid.errors)}`,
            });
        }
    }
}
