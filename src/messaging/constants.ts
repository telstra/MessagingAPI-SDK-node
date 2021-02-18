export const API_URL: string = 'https://tapi.telstra.com/';
export interface IConst {
    status: number;
    code: string;
    message: string;
}

export const ERROR_CONST = {
    anErrorHasOccurred: (): IConst => ({
        status: 500,
        code: `ERROR`,
        message: `An error has occurred.`,
    }),
};
