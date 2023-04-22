import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import styled from 'styled-components';

import GPTMessengerAPI from 'requests/GPTMessengerAPI';
import Route from 'constants/route';
import Color from 'constants/color';
import Prompt from 'constants/prompt';
import { LocalStorageKey } from 'constants/storage';
import { Device } from 'constants/media-size';
import { NewUserRouterState } from 'types/router-states';
import { View, Strut } from 'components/Layout';
import { Error, Text, Title } from 'components/Typography';

const Container = styled(View)`
    display: grid;
    min-height: 100%;
    grid-template-columns: 5fr 3fr;
    grid-template-rows: 100%;

    @media ${Device.maxWidth.tablet} {
        grid-template-columns: 100%;
        grid-template-rows: 1fr auto;
    }
`;

const LoginView = styled(View)`
    height: 100%;
    padding: 10px 15px 25px 15px;
    background-color: ${Color.white};
`;

const MessageView = styled(View)`
    height: 100%;
    padding: 35px 15px 50px 15px;
    background-color: ${Color.green};
`;

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    const handleGoogleLoginSucess = (credentialResponse: CredentialResponse) => {
        const { credential } = credentialResponse;

        if (!credential) {
            setError(Prompt.googleEmptyCredential);
            return;
        }

        localStorage.setItem(LocalStorageKey.jwt, credential);

        void (async () => {
            try {
                const { exists, email } = await GPTMessengerAPI.LoginRequest();
                if (exists) {
                    navigate(Route.account);
                } else {
                    const state: NewUserRouterState = { email };
                    navigate(Route.newUser, { state });
                }
            } catch (message) {
                setError(message as string);
            }
        })();
    };

    const handleGoogleLoginError = () => {
        setError(Prompt.googleLoginFail);
    };

    return (
        <Container>
            <LoginView>
                {error && (
                    <>
                        <Error>{error}</Error>
                        <Strut size={15} vertical />
                    </>
                )}
                <Title>Login to Your Account</Title>
                <Strut size={5} vertical />
                <Text center>or signup through the available platforms.</Text>
                <Strut size={35} vertical />
                <GoogleLogin onSuccess={handleGoogleLoginSucess} onError={handleGoogleLoginError} />
                <Strut size={15} vertical />
                <GoogleLogin onSuccess={handleGoogleLoginSucess} onError={handleGoogleLoginError} />
                <Strut size={15} vertical />
                <GoogleLogin onSuccess={handleGoogleLoginSucess} onError={handleGoogleLoginError} />
                <Strut size={15} vertical />
                <GoogleLogin onSuccess={handleGoogleLoginSucess} onError={handleGoogleLoginError} />
            </LoginView>
            <MessageView>
                <Title light>Welcome!</Title>
                <Strut size={15} vertical />
                <Text light center>
                    Access your account to manage your subscription or subscribe for unlimited
                    access.
                </Text>
            </MessageView>
        </Container>
    );
};

export default LoginPage;
