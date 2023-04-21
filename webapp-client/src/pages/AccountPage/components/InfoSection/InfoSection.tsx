import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import GPTMessengerAPI from 'requests/GPTMessengerAPI';
import { useUser } from 'contexts/UserContext';
import { User } from 'types/models';
import { Device } from 'constants/media-size';
import Color from 'constants/color';
import { isValidEmail, removeAllWhiteSpace } from 'constants/string';
import Prompt from 'constants/prompt';
import { Strut, View } from 'components/Layout';
import Button from 'components/Button';
import TextField from 'components/TextField';
import { Title, Text, Subtitle, Error } from 'components/Typography';

type Props = {
    onSubscribe?: () => void;
};

const Container = styled(View)`
    min-height: 100%;
    width: 100%;
    justify-content: flex-start;
    padding: 10px 25px 35px 25px;
`;

const SectionTitle = styled(Title)`
    font-weight: 300;
`;

const ContentWrapper = styled(View)`
    background-color: ${Color.green};
    border-radius: 50px;
    height: min-content;
    padding: 45px;

    @media ${Device.maxWidth.mobileL} {
        border-radius: 35px;
        padding: 35px 15px;
    }
`;

const SaveMessage = styled(Error)`
    font-size: 11pt;
    color: ${Color.white};
`;

const InfoSection: React.FC<Props> = (props) => {
    const { onSubscribe } = props;
    const { user, setUser } = useUser();
    const [email, setEmail] = useState<string>('');
    const [emailError, setEmailError] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [phoneError, setPhoneError] = useState<string>('');
    const [saveError, setSaveError] = useState<string>('');
    const [saveMessage, setSaveMessage] = useState<string>('');
    const [hasChanges, setHasChanges] = useState<boolean>(false);

    useEffect(() => {
        if (!user) {
            return;
        }
        setEmail(user.email);
        setPhone(user.phone);
    }, [user]);

    useEffect(() => {
        if (!user) {
            return;
        }
        const changed = user.email !== email || user.phone !== phone;
        if (!changed) {
            setEmailError('');
            setPhoneError('');
        }
        setHasChanges(changed);
    }, [user, email, phone]);

    useEffect(() => {
        if (saveMessage) {
            setTimeout(() => {
                setSaveMessage('');
            }, 5000);
        }
    }, [saveMessage]);

    const handleEmailChange = (newValue: string) => {
        setEmail(newValue);
    };

    const handlePhoneChange = (newValue: string) => {
        setPhone(newValue);
    };

    const handleSaveClick = () => {
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
        const changedUser: User = {
            ...user,
            email: processedEmail,
            phone: processedPhone,
        };
        void (async () => {
            try {
                const updatedUser = await GPTMessengerAPI.UpdateUserRequest(changedUser);
                setUser({ ...updatedUser });
                setSaveMessage(Prompt.savedSuccessfully);
            } catch (message) {
                setSaveError(message as string);
            }
        })();
    };

    const handleSubscribeClick = () => {
        if (onSubscribe) {
            onSubscribe();
        }
    };

    return (
        <Container>
            <SectionTitle>General Info</SectionTitle>
            <Strut size={15} vertical />
            <ContentWrapper>
                <TextField
                    label="Email"
                    value={email}
                    error={emailError}
                    type="email"
                    onChange={handleEmailChange}
                    disabled
                    light
                />
                <Strut size={15} vertical />
                <TextField
                    label="Phone"
                    value={phone}
                    error={phoneError}
                    type="tel"
                    onChange={handlePhoneChange}
                    light
                />
                <Strut size={25} vertical />
                <Button light title="Save" onClick={handleSaveClick} disabled={!hasChanges} />
                {saveError && (
                    <>
                        <Strut size={15} vertical />
                        <Error light>{saveError}</Error>
                    </>
                )}
                {saveMessage && (
                    <>
                        <Strut size={15} vertical />
                        <SaveMessage light>{saveMessage}</SaveMessage>
                    </>
                )}
                {!user.subscribed && (
                    <>
                        <Strut size={40} vertical />
                        <Subtitle light>Not Subscribed</Subtitle>
                        <Strut size={10} vertical />
                        <Text light center>
                            You are not subscribed for unlimited access.
                        </Text>
                        <Strut size={5} vertical />
                        <Text light center>
                            Click below to subscribe.
                        </Text>
                        <Strut size={25} vertical />
                        <Button light title="Subscribe" onClick={handleSubscribeClick} />
                    </>
                )}
            </ContentWrapper>
        </Container>
    );
};

export default InfoSection;
