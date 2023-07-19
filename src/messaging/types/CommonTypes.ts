export type TPaging = {
    nextPage?: string;
    previousPage?: string;
    lastPage?: string;
    totalCount: number;
};

export type THealthCheck = {
    status?: string;
};

export type TGetAll = {
    limit?: number;
    offset?: number;
    filter?: string;
}