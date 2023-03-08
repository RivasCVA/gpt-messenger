import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import styled from 'styled-components';

import useAuthorizedRequest from 'hooks/useAuthorizedRequest';
import Route from 'constants/route';
import URL from 'constants/url';
import Color from 'constants/color';
import { LocalStorageKey } from 'constants/storage';
import { Device } from 'constants/media-size';
import { UserLogin } from 'types/models';
import { NewUserState } from 'types/router-states';
import { View, Strut } from 'components/Layout';
import { Error, Text, Title } from 'components/Typography';
import { ErrorPrompt } from './constants';

const Container = styled(View)`
    flex-direction: row;
    height: 100vh;
    background-color: ${Color.white};

    @media ${Device.maxWidth.tablet} {
        flex-direction: column;
        height: inherit;
        min-height: 100vh;
    }
`;

const LeftView = styled(View)`
    height: 100%;
    flex: 3;
    background-color: ${Color.white};
    padding: 10px 15px 25px 15px;

    @media ${Device.maxWidth.tablet} {
        flex: 1;
        width: 100%;
    }
`;

const RightView = styled(View)`
    height: 100%;
    flex: 2;
    padding: 35px 15px 50px 15px;
    background-color: ${Color.green};

    @media ${Device.maxWidth.tablet} {
        flex: none;
        width: 100%;
    }
`;

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const request = useAuthorizedRequest();
    const [error, setError] = useState<string | null>(null);

    const handleGoogleLoginSucess = (credentialResponse: CredentialResponse) => {
        if (!credentialResponse.credential) {
            setError(ErrorPrompt.GOOGLE_LOGIN_FAIL);
            console.error(ErrorPrompt.GOOGLE_EMPTY_CREDENTIAL);
            return;
        }
        localStorage.setItem(LocalStorageKey.jwt, credentialResponse.credential);
        void (async () => {
            try {
                const resp = await request.post<UserLogin, unknown>(URL.login, {});
                if (resp.status) {
                    navigate(Route.account);
                } else {
                    const state: NewUserState = {
                        email: resp.email,
                    };
                    navigate(Route.newUser, { state });
                }
            } catch (err) {
                setError(ErrorPrompt.NETWORK_ERROR);
                console.error(err);
            }
        })();
    };

    const handleGoogleLoginError = () => {
        setError(ErrorPrompt.GOOGLE_LOGIN_FAIL);
        console.error(ErrorPrompt.GOOGLE_LOGIN_FAIL);
    };

    return (
        <Container>
            <LeftView>
                {error && (
                    <>
                        <Error>{error}</Error>
                        <Strut size={15} vertical />
                    </>
                )}
                <Title>Login to Your Account</Title>
                <Strut size={5} vertical />
                <Text>or signup through the available platforms.</Text>
                <Strut size={35} vertical />
                <GoogleLogin onSuccess={handleGoogleLoginSucess} onError={handleGoogleLoginError} />
                <Strut size={15} vertical />
                <GoogleLogin onSuccess={handleGoogleLoginSucess} onError={handleGoogleLoginError} />
                <Strut size={15} vertical />
                <GoogleLogin onSuccess={handleGoogleLoginSucess} onError={handleGoogleLoginError} />
                <Strut size={15} vertical />
                <GoogleLogin onSuccess={handleGoogleLoginSucess} onError={handleGoogleLoginError} />
            </LeftView>
            <RightView>
                <Title light>Welcome!</Title>
                <Strut size={15} vertical />
                <Text light>
                    Access your account to manage your subscription or subscribe for unlimited
                    access.
                </Text>
            </RightView>
        </Container>
    );
};

export default LoginPage;
