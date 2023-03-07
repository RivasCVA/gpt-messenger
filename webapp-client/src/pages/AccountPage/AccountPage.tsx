import React, { useEffect, useState } from 'react';
import { StatusCodes } from 'http-status-codes';
import { useNavigate } from 'react-router-dom';

import useAuthorizedRequest, { isRequestError } from 'hooks/useAuthorizedRequest';
import URL from 'constants/url';
import Route from 'constants/route';
import { UserInfo } from 'types/models';
import { View } from 'components/Layout';
import { Subtitle, Title } from 'components/Typography';

const AccountPage: React.FC = () => {
    const navigate = useNavigate();
    const request = useAuthorizedRequest();
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

    useEffect(() => {
        void (async () => {
            try {
                const resp = await request.get<UserInfo>(URL.user);
                setUserInfo(resp);
            } catch (err) {
                if (isRequestError(err)) {
                    switch (err.code) {
                        case StatusCodes.UNAUTHORIZED:
                        case StatusCodes.NOT_FOUND:
                            navigate(Route.login);
                            break;
                        default:
                            console.error(err.message);
                            break;
                    }
                    navigate(Route.login);
                }
                console.error(err);
            }
        })();
    }, [navigate, request]);

    return (
        <View>
            <Title>Account</Title>
            {userInfo && <Subtitle>{userInfo.email}</Subtitle>}
            {userInfo && <Subtitle>{userInfo.phone}</Subtitle>}
        </View>
    );
};

export default AccountPage;
