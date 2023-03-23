import { User, NewUser } from 'types/models';
import URL from 'constants/url';
import Prompt from 'constants/prompt';

import AuthorizedRequest, { isRequestError, RequestErrorMessage } from './authorized-request';

const NewUserRequest = async (phone: string): Promise<NewUser> => {
    try {
        return await AuthorizedRequest.post<User, NewUser>(URL.user, { phone });
    } catch (err) {
        if (isRequestError(err)) {
            const { message } = err;
            switch (message) {
                case RequestErrorMessage.TIMEOUT:
                    return Promise.reject(Prompt.networkTimeout);
                case RequestErrorMessage.INVALID_STATUS_CODE:
                    return Promise.reject(Prompt.networkError);
                case RequestErrorMessage.UNKNOWN_ERROR:
                    return Promise.reject(Prompt.errorUnknown);
                default:
                    if (message.includes('duplicate')) {
                        if (message.includes('email')) {
                            return Promise.reject(Prompt.accountExistsEmail);
                        }
                        if (message.includes('phone')) {
                            return Promise.reject(Prompt.accountExistsPhone);
                        }
                        return Promise.reject(Prompt.accountExists);
                    }
                    console.error(message);
                    return Promise.reject(Prompt.errorUnknown);
            }
        }
        return Promise.reject(Prompt.errorUnexpected);
    }
};

export default NewUserRequest;
