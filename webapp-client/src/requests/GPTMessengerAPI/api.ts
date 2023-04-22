import AuthorizedRequest, {
    RequestErrorMessage,
    RequestStatusCode,
    isRequestError,
} from 'requests/authorized-request';

import Prompt from 'constants/prompt';
import URL from 'constants/url';

import {
    User,
    LoginResponse,
    LoginBody,
    NewUserResponse,
    NewUserBody,
    UpdateUserResponse,
    UpdateUserBody,
    UserResponse,
} from './types';

const GPTMessengerAPI = (() => {
    // Callback function when the user session expires.
    let notAuthorizedFunc: (() => void) | null = null;

    /**
     * Callback handler for when the user session expires.
     *
     * The callback functions do not stack.
     * Only the latest function will be invoked.
     */
    const onNotAuthorized = (func: () => void) => {
        notAuthorizedFunc = func;
    };

    // Fetches the corresponding user-friendly prompt given an error.
    const getPromptFromError = (err: unknown): string => {
        if (isRequestError(err)) {
            switch (err.message) {
                case RequestErrorMessage.TIMEOUT:
                    return Prompt.networkTimeout;
                case RequestErrorMessage.UNSUCCESSFUL_STATUS:
                    return Prompt.networkError;
                case RequestErrorMessage.EMPTY_DATA:
                    return Prompt.dataEmpty;
                case RequestErrorMessage.UNKNOWN_ERROR:
                    return Prompt.errorUnknown;
            }
            switch (err.code) {
                case RequestStatusCode.Unauthorized:
                    if (notAuthorizedFunc) {
                        notAuthorizedFunc();
                    }
                    return Prompt.unauthorized;
            }
        }
        return Prompt.errorUnexpected;
    };

    const LoginRequest = async (): Promise<LoginResponse> => {
        try {
            return await AuthorizedRequest.post<LoginResponse, LoginBody>(URL.login, {});
        } catch (err) {
            return Promise.reject(getPromptFromError(err));
        }
    };

    const NewUserRequest = async (phone: string): Promise<NewUserResponse> => {
        try {
            return await AuthorizedRequest.post<NewUserResponse, NewUserBody>(URL.user, { phone });
        } catch (err) {
            return Promise.reject(getPromptFromError(err));
        }
    };

    const UpdateUserRequest = async (user: User): Promise<UpdateUserResponse> => {
        try {
            return await AuthorizedRequest.patch<UpdateUserResponse, UpdateUserBody>(
                URL.user,
                user
            );
        } catch (err) {
            return Promise.reject(getPromptFromError(err));
        }
    };

    const UserRequest = async (): Promise<UserResponse> => {
        try {
            return await AuthorizedRequest.get<UserResponse>(URL.user);
        } catch (err) {
            return Promise.reject(getPromptFromError(err));
        }
    };

    return { LoginRequest, NewUserRequest, UpdateUserRequest, UserRequest, onNotAuthorized };
})();

export default GPTMessengerAPI;
