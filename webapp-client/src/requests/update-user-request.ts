import { User } from 'types/models';
import URL from 'constants/url';
import Prompt from 'constants/prompt';

import AuthorizedRequest, { isRequestError, RequestErrorMessage } from './authorized-request';

const UpdateUserRequest = async (user: User): Promise<User> => {
    try {
        return await AuthorizedRequest.patch<User, User>(URL.user, user);
    } catch (err) {
        if (isRequestError(err)) {
            switch (err.message) {
                case RequestErrorMessage.TIMEOUT:
                    return Promise.reject(Prompt.networkTimeout);
                case RequestErrorMessage.INVALID_STATUS_CODE:
                    return Promise.reject(Prompt.networkError);
                case RequestErrorMessage.UNKNOWN_ERROR:
                    return Promise.reject(Prompt.errorUnknown);
                default:
                    console.error(err.message);
                    return Promise.reject(Prompt.errorUnknown);
            }
        }
        return Promise.reject(Prompt.errorUnexpected);
    }
};

export default UpdateUserRequest;
