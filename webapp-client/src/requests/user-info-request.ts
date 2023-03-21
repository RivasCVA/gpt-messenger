import { UserInfo } from 'types/models';
import URL from 'constants/url';
import Prompt from 'constants/prompt';

import AuthorizedRequest, {
    isRequestError,
    RequestErrorCode,
    RequestErrorMessage,
} from './authorized-request';

const UserInfoRequest = async (): Promise<UserInfo> => {
    try {
        return await AuthorizedRequest.get<UserInfo>(URL.user);
    } catch (err) {
        if (isRequestError(err)) {
            switch (err.code) {
                case RequestErrorCode.Unauthorized:
                case RequestErrorCode.NotFound:
                    return Promise.reject(Prompt.unauthorized);
            }
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

export default UserInfoRequest;
