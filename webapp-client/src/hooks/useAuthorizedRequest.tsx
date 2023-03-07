import { useCallback, useMemo } from 'react';
import axios from 'axios';

import { LocalStorageKey } from 'constants/storage';

export type RequestError = {
    message: string;
    code: number;
};

export const isRequestError = (err: unknown): err is RequestError => {
    const parsedErr = err as RequestError;
    return parsedErr?.message !== undefined && parsedErr.code !== undefined;
};

const NewRequestError = (err: RequestError): RequestError => err;

/**
 * Custom request hook that provides easy GET and POST calls.
 * All calls are sent with an Authorization header to authenticate the user.
 *
 * The Authorization JSON Web Token is fetched from local storage by default
 * if no `jwt` is provided.
 *
 * @param jwt JSON Web Token to authenticate the user.
 */
const useAuthorizedRequest = (jwt?: string) => {
    // Request timeout (in milliseconds).
    const TIMEOUT = 5000;
    const TIMEOUT_MESSAGE = 'Something took too long.';

    // Generates the headers for the request
    const getHeaders = useCallback(
        () => ({
            Authorization: `Bearer ${jwt || localStorage.getItem(LocalStorageKey.jwt) || ''}`,
        }),
        [jwt]
    );

    /**
     * Create a GET request.
     * @param url HTTP endpoint.
     * @returns Response data. If an error occurred, an error message is given.
     */
    const get = useCallback(
        async <T,>(url: string): Promise<T> => {
            try {
                const resp = await axios.get<T>(url, {
                    timeout: TIMEOUT,
                    timeoutErrorMessage: TIMEOUT_MESSAGE,
                    headers: getHeaders(),
                });
                if (resp.status >= 200 && resp.status < 300 && resp.data) {
                    return resp.data;
                }
                return await Promise.reject(
                    NewRequestError({
                        message: 'Something went wrong. Please try again.',
                        code: -1,
                    })
                );
            } catch (err) {
                if (axios.isAxiosError<RequestError>(err)) {
                    if (err.response && err.response.data) {
                        const { message } = err.response.data;
                        return Promise.reject(
                            NewRequestError({
                                message: message,
                                code: err.response.status || -1,
                            })
                        );
                    }
                    return Promise.reject(
                        NewRequestError({
                            message: err.message,
                            code: err.response?.status || err.status || -1,
                        })
                    );
                }
                return Promise.reject(
                    NewRequestError({
                        message: 'invalid request error',
                        code: -1,
                    })
                );
            }
        },
        [getHeaders]
    );

    /**
     * Create a POST request.
     * @param url HTTP endpoint.
     * @param data JSON data to send.
     * @returns Response data. If an error occurred, an error message is given.
     */
    const post = useCallback(
        async <T, U>(url: string, data: U): Promise<T> => {
            try {
                const resp = await axios.post<T>(url, data, {
                    timeout: TIMEOUT,
                    timeoutErrorMessage: TIMEOUT_MESSAGE,
                    headers: getHeaders(),
                });
                if (resp.status >= 200 && resp.status < 300 && resp.data) {
                    return resp.data;
                }
                return await Promise.reject(
                    NewRequestError({
                        message: 'Something went wrong. Please try again.',
                        code: -1,
                    })
                );
            } catch (err) {
                if (axios.isAxiosError<RequestError>(err)) {
                    if (err.response && err.response.data) {
                        const { message } = err.response.data;
                        return Promise.reject(
                            NewRequestError({
                                message: message,
                                code: err.response.status || -1,
                            })
                        );
                    }
                    return Promise.reject(
                        NewRequestError({
                            message: err.message,
                            code: err.response?.status || err.status || -1,
                        })
                    );
                }
                return Promise.reject(
                    NewRequestError({
                        message: 'invalid request error',
                        code: -1,
                    })
                );
            }
        },
        [getHeaders]
    );

    return useMemo(() => ({ get, post }), [get, post]);
};

export default useAuthorizedRequest;
