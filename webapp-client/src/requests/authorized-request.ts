import axios, { AxiosResponse, HttpStatusCode as RequestStatusCode } from 'axios';

import { LocalStorageKey } from 'constants/storage';

export {
    /** HTTP error codes. */
    RequestStatusCode,
};

/** Custom error messages. */
export enum RequestErrorMessage {
    TIMEOUT = 'The request took too long to receive a response.',
    UNSUCCESSFUL_STATUS = 'The request returned an unsuccessful status code.',
    EMPTY_DATA = 'The request returned no data.',
    UNKNOWN_ERROR = 'The request returned an unknown error',
}

/** Custom error object. */
export type RequestError = {
    message: RequestErrorMessage | string;
    code: RequestStatusCode | -1;
};

/** Request error type guard. */
export const isRequestError = (err: unknown): err is RequestError => {
    const parsedErr = err as RequestError;
    return parsedErr?.message !== undefined && parsedErr.code !== undefined;
};

// Creates a new request error.
const NewRequestError = (err: RequestError): RequestError => err;

/**
 * Custom request handler that provides easy REST queries.
 * All calls are sent with an Authorization header to authenticate the user.
 *
 * The Authorization JSON Web Token is fetched from local storage by default
 * if no `jwt` is provided.
 *
 * Note: Use `setJWT(...)` to provide a specific token.
 */
const AuthorizedRequest = (() => {
    // Request timeout (in milliseconds)
    const TIMEOUT = 5000;
    const EM = RequestErrorMessage;
    const SC = RequestStatusCode;

    // Custom JSON Web Token (if set)
    let jwt: string | undefined = undefined;

    // Pre-configured axios instance.
    const AXIOS = axios.create({
        timeout: TIMEOUT,
        timeoutErrorMessage: EM.TIMEOUT,
        headers: {
            Authorization: `Bearer ${jwt || localStorage.getItem(LocalStorageKey.jwt) || ''}`,
        },
    });

    /**
     * Updates the JWT the request handler uses for the Authorization header.
     * @param token JSON Web Token.
     */
    const setJWT = (token?: string) => {
        jwt = token;
    };

    // Checks if the status code is in the 2xx success class.
    const isStatusSuccess = (status: number) => status >= 200 && status < 300;

    // Processes the response to extract the data load.
    const processResponse = <T>(resp: AxiosResponse<T>): T | Promise<never> => {
        if (isStatusSuccess(resp.status) && resp.data) {
            return resp.data;
        }
        return Promise.reject(
            NewRequestError({
                message: resp.data ? EM.UNSUCCESSFUL_STATUS : EM.EMPTY_DATA,
                code: resp.status,
            })
        );
    };

    // Processes the error to extract the error message and status code.
    const processResponseError = (err: unknown): Promise<never> => {
        if (axios.isAxiosError<RequestError>(err)) {
            return Promise.reject(
                NewRequestError({
                    message: err.response?.data?.message || err.message || EM.UNKNOWN_ERROR,
                    code: err.response?.status || err.status || SC.ServiceUnavailable,
                })
            );
        }
        return Promise.reject(
            NewRequestError({
                message: EM.UNKNOWN_ERROR,
                code: SC.ServiceUnavailable,
            })
        );
    };

    /**
     * Create a GET request.
     * @param url HTTP endpoint.
     * @returns Response data. If an error occurred, an error message is given.
     */
    const get = async <T>(url: string, params: object = {}): Promise<T> => {
        try {
            const resp = await AXIOS.get<T>(url, { params });
            return await processResponse<T>(resp);
        } catch (err) {
            return processResponseError(err);
        }
    };

    /**
     * Create a POST request.
     * @param url HTTP endpoint.
     * @param data JSON data to send.
     * @returns Response data. If an error occurred, an error message is given.
     */
    const post = async <T, U>(url: string, data: U, params: object = {}): Promise<T> => {
        try {
            const resp = await AXIOS.post<T>(url, data, { params });
            return await processResponse<T>(resp);
        } catch (err) {
            return processResponseError(err);
        }
    };

    /**
     * Create a PATCH request.
     * @param url HTTP endpoint.
     * @param data JSON data to send.
     * @returns Response data. If an error occurred, an error message is given.
     */
    const patch = async <T, U>(url: string, data: U, params: object = {}): Promise<T> => {
        try {
            const resp = await AXIOS.patch<T>(url, data, { params });
            return await processResponse<T>(resp);
        } catch (err) {
            return processResponseError(err);
        }
    };

    return { get, post, patch, setJWT };
})();

export default AuthorizedRequest;
