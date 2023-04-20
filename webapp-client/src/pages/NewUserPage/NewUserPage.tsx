import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import GPTMessengerAPI from 'requests/GPTMessengerAPI';
import Prompt from 'constants/prompt';
import Route from 'constants/route';
import Color from 'constants/color';
import { Device } from 'constants/media-size';
import { isValidEmail, removeAllWhiteSpace } from 'constants/string';
import { NewUserState } from 'types/router-states';
import { Strut, View } from 'components/Layout';
import { Error, Text, Title } from 'components/Typography';
import TextField from 'components/TextField';
import Button from 'components/Button';

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

const FieldView = styled(View)`
    height: 100%;
    padding: 10px 15px 25px 15px;
    background-color: ${Color.white};
`;

const MessageView = styled(View)`
    height: 100%;
    padding: 35px 15px 50px 15px;
    background-color: ${Color.green};
`;

const Footnote = styled(Text)`
    width: 275px;
    margin-left: -5px;
    font-size: 10pt;
`;

const PhoneMessageWrapper = styled(View)`
    align-items: flex-start;
    margin: 0 35px;
`;

const NewUserPage: React.FC = () => {
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
        const processedPhone = removeAllWhiteSpace(phone);
        const processedEmail = removeAllWhiteSpace(email);
        if (processedEmail.length === 0) {
            setEmailError(Prompt.emailEmpty);
            return;
        }
        if (!isValidEmail(processedEmail)) {
            setEmailError(Prompt.emailInvalid);
            return;
        }
        if (processedPhone.length === 0) {
            setPhoneError(Prompt.phoneEmpty);
            return;
        }
        if (!processedPhone.includes('+')) {
            setPhoneError(Prompt.phoneCountryCode);
            return;
        }
        void (async () => {
            try {
                await GPTMessengerAPI.NewUserRequest(processedPhone);
                navigate(Route.account);
            } catch (message) {
                setError(message as string);
            }
        })();
    };

    return (
        <Container>
            <FieldView>
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
                    disabled
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
            </FieldView>
            <MessageView>
                <Title light>Enter Your Phone Number Correctly</Title>
                <Strut size={15} vertical />
                <PhoneMessageWrapper>
                    <Text light>1. Text {`"phone"`} to GPT</Text>
                    <Strut size={5} vertical />
                    <Text light>2. Wait for the response text</Text>
                    <Strut size={5} vertical />
                    <Text light>3. Copy the phone number</Text>
                    <Strut size={5} vertical />
                    <Text light>4. Paste the phone number under the Phone field</Text>
                </PhoneMessageWrapper>
            </MessageView>
        </Container>
    );
};

export default NewUserPage;
