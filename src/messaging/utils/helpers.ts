export const ToQueryString = function<T extends Record<string, any>>(
    data: T
): string {
    return Object.entries(data)
        .filter(([, value]) => value !== undefined)
        .map(
            ([key, value]) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        )
        .join('&');
};
