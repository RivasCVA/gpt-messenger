import { useNavigate } from 'react-router-dom';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';

import useAuthorizedRequest from 'hooks/useAuthorizedRequest';
import Route from 'constants/route';
import URL from 'constants/url';
import { LocalStorageKey } from 'constants/storage';
import { UserLogin } from 'types/models';
import { NewUserState } from 'types/router-states';
import { View, Strut } from 'components/Layout';
import { Title } from 'components/Typography';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const request = useAuthorizedRequest();

    const handleGoogleLoginSucess = (credentialResponse: CredentialResponse) => {
        if (!credentialResponse.credential) {
            console.error('empty credential received from google');
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
                console.error(err);
            }
        })();
    };

    const handleGoogleLoginError = () => {
        console.error('error logging in with google');
    };

    return (
        <View>
            <Title>Login</Title>
            <Strut size={25} vertical />
            <GoogleLogin onSuccess={handleGoogleLoginSucess} onError={handleGoogleLoginError} />
        </View>
    );
};

export default LoginPage;
