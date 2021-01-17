import { TErrorResponse } from './types';

export function validateError(error: TErrorResponse) {
    const { message, code, status } = error;
    if (message && code && status) {
        return { message, code, status };
    } else if (message && code) {
        return { message, code };
    } else if (message) {
        return { message };
    } else {
        return false;
    }
}
