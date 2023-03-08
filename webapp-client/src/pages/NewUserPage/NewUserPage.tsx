import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import useAuthorizedRequest, { isRequestError } from 'hooks/useAuthorizedRequest';
import URL from 'constants/url';
import Route from 'constants/route';
import Color from 'constants/color';
import { Device } from 'constants/media-size';
import { UserInfo, NewUser } from 'types/models';
import { NewUserState } from 'types/router-states';
import { Strut, View } from 'components/Layout';
import { Error, Text, Title } from 'components/Typography';
import TextField from 'components/TextField';
import Button from 'components/Button';

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

const Footnote = styled(Text)`
    width: 275px;
    margin-left: -5px;
    font-size: 10pt;
`;

const PhoneStepWrapper = styled(View)`
    align-items: flex-start;
    margin: 0 35px;
`;

const NewUserPage: React.FC = () => {
    const request = useAuthorizedRequest();
    const location = useLocation();
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [phoneError, setPhoneError] = useState<string>('');
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const state = location.state as NewUserState;
        if (state?.email) {
            setEmail(state.email);
        } else {
            navigate(Route.home);
        }
    }, [location.state, navigate]);

    const handlePhoneChange = (newValue: string) => {
        setPhone(newValue);
    };

    const handleSubmit = () => {
        if (email.length === 0) {
            setEmailError(ErrorPrompt.EMPTY_EMAIL);
            return;
        }
        if (phone.length === 0) {
            setPhoneError(ErrorPrompt.EMPTY_PHONE);
            return;
        }
        if (!phone.includes('+')) {
            setPhoneError(ErrorPrompt.INCLUDE_COUNTRY_CODE);
            return;
        }
        void (async () => {
            try {
                await request.post<UserInfo, NewUser>(URL.user, { phone });
                navigate(Route.account);
            } catch (err) {
                if (isRequestError(err)) {
                    const message = err.message;
                    if (message.includes('duplicate')) {
                        if (message.includes('email')) {
                            setError(ErrorPrompt.ACCOUNT_EXISTS_EMAIL);
                        } else if (message.includes('phone')) {
                            setError(ErrorPrompt.ACCOUNT_EXISTS_PHONE);
                        } else {
                            setError(ErrorPrompt.ACCOUNT_EXISTS);
                        }
                    } else {
                        setError(ErrorPrompt.UNKNOWN_ERROR);
                    }
                } else {
                    setError(ErrorPrompt.NETWORK_ERROR);
                }
                console.error(err);
            }
        })();
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
                <Title>Setup Account</Title>
                <Strut size={5} vertical />
                <Text center>Please provide the following information.</Text>
                <Strut size={15} vertical />
                <TextField
                    label="Email"
                    error={emailError}
                    value={email}
                    placeholder="example@domain.com"
                    type="email"
                    readOnly
                />
                <Strut size={15} vertical />
                <View>
                    <TextField
                        label="Phone"
                        error={phoneError}
                        value={phone}
                        onChange={handlePhoneChange}
                        placeholder="+1234567890"
                        type="tel"
                    />
                    <Strut size={10} vertical />
                    <Footnote center>Text {`"phone"`} to view your exact number.</Footnote>
                </View>
                <Strut size={25} vertical />
                <Button title="Submit" onClick={handleSubmit} />
            </LeftView>
            <RightView>
                <Title light>Enter Your Phone Number Correctly</Title>
                <Strut size={15} vertical />
                <PhoneStepWrapper>
                    <Text light>1. Text GPT {`"phone"`}</Text>
                    <Strut size={5} vertical />
                    <Text light>2. Wait for the response phone number</Text>
                    <Strut size={5} vertical />
                    <Text light>3. Copy the phone number</Text>
                    <Strut size={5} vertical />
                    <Text light>4. Paste the phone number under the Phone field</Text>
                </PhoneStepWrapper>
            </RightView>
        </Container>
    );
};

export default NewUserPage;
