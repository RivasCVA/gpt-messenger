import axios, { HttpStatusCode as RequestErrorCode } from 'axios';

import { LocalStorageKey } from 'constants/storage';

export {
    /** HTTP error codes. */
    RequestErrorCode,
};

/** Custom error messages. */
export enum RequestErrorMessage {
    TIMEOUT = 'The request took too long to receive a response.',
    INVALID_STATUS_CODE = 'The request returned an invalid status code',
    UNKNOWN_ERROR = 'The request returned an unknown error',
}

/** Custom error object. */
export type RequestError = {
    message: RequestErrorMessage | string;
    code: RequestErrorCode | -1;
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

    // Custom JSON Web Token (if set)
    let jwt: string | undefined = undefined;

    // Generates the headers for the request
    const getHeaders = () => ({
        Authorization: `Bearer ${jwt || localStorage.getItem(LocalStorageKey.jwt) || ''}`,
    });

    /**
     * Updates the JWT the request handler uses for the Authorization header.
     * @param token JSON Web Token.
     */
    const setJWT = (token?: string) => {
        jwt = token;
    };

    /**
     * Create a GET request.
     * @param url HTTP endpoint.
     * @returns Response data. If an error occurred, an error message is given.
     */
    const get = async <T>(url: string): Promise<T> => {
        try {
            const resp = await axios.get<T>(url, {
                timeout: TIMEOUT,
                timeoutErrorMessage: RequestErrorMessage.TIMEOUT,
                headers: getHeaders(),
            });
            if (resp.status >= 200 && resp.status < 300 && resp.data) {
                return resp.data;
            }
            return await Promise.reject(
                NewRequestError({
                    message: RequestErrorMessage.INVALID_STATUS_CODE,
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
                    message: RequestErrorMessage.UNKNOWN_ERROR,
                    code: -1,
                })
            );
        }
    };

    /**
     * Create a POST request.
     * @param url HTTP endpoint.
     * @param data JSON data to send.
     * @returns Response data. If an error occurred, an error message is given.
     */
    const post = async <T, U>(url: string, data: U): Promise<T> => {
        try {
            const resp = await axios.post<T>(url, data, {
                timeout: TIMEOUT,
                timeoutErrorMessage: RequestErrorMessage.TIMEOUT,
                headers: getHeaders(),
            });
            if (resp.status >= 200 && resp.status < 300 && resp.data) {
                return resp.data;
            }
            return await Promise.reject(
                NewRequestError({
                    message: RequestErrorMessage.INVALID_STATUS_CODE,
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
                    message: RequestErrorMessage.UNKNOWN_ERROR,
                    code: -1,
                })
            );
        }
    };

    return { get, post, setJWT };
})();

export default AuthorizedRequest;
