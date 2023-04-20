import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import UserRequest from 'requests/user-request';
import { UserContextProvider, useUser } from 'contexts/UserContext';
import Route from 'constants/route';
import Color from 'constants/color';
import Prompt from 'constants/prompt';
import { Strut, View } from 'components/Layout';
import { Error, Title } from 'components/Typography';

import Sidebar from './components/Sidebar';
import InfoSection from './components/InfoSection';
import SubscriptionSection from './components/SubscriptionSection';

const Container = styled(View)`
    display: grid;
    min-height: 100%;
    grid-template-columns: 100%;
    grid-template-rows: auto 1fr;
`;

const BarView = styled(View)`
    height: 100%;
    justify-content: flex-start;
    padding: 10px 15px 25px 15px;
    background-color: ${Color.green};
`;

const ContentView = styled(View)`
    height: 100%;
    background-color: ${Color.white};
`;

const ErrorView = styled(View)`
    width: 100%;
    height: 100%;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 50px;
`;

const AccountPage: React.FC = () => {
    const navigate = useNavigate();
    const { user, setUser } = useUser();
    const [error, setError] = useState<string>('');

    const Section = {
        info: 'Info',
        subscription: 'Subscription',
    };

    const [selectedSection, setSelectedSection] = useState<string>(Section.info);

    const handleOnSubscribe = () => {
        setSelectedSection(Section.subscription);
    };

    useEffect(() => {
        void (async () => {
            try {
                const usr = await UserRequest();
                setUser({ ...usr });
            } catch (message) {
                const msg = message as string;
                if (msg === Prompt.unauthorized) {
                    navigate(Route.login);
                    return;
                }
                setError(msg);
            }
        })();
    }, [navigate, setUser]);

    const renderSection = () => {
        switch (selectedSection) {
            case Section.info:
                return <InfoSection onSubscribe={handleOnSubscribe} />;
            case Section.subscription:
                return <SubscriptionSection />;
            default:
                return (
                    <ErrorView>
                        <Error>No section selected</Error>
                    </ErrorView>
                );
        }
    };

    return (
        <Container>
            <BarView>
                <Title light>Account</Title>
                <Strut size={15} vertical />
                <Sidebar
                    sections={Object.values(Section)}
                    initialSection={selectedSection}
                    onSectionChange={(section) => setSelectedSection(section)}
                />
            </BarView>
            <ContentView>
                {error ? (
                    <ErrorView>
                        <Error>{error}</Error>
                    </ErrorView>
                ) : (
                    user && renderSection()
                )}
            </ContentView>
        </Container>
    );
};

const AccountPageWithProvider: React.FC = () => {
    return (
        <UserContextProvider>
            <AccountPage />
        </UserContextProvider>
    );
};

export default AccountPageWithProvider;
