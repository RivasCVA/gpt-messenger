import React from 'react';
import styled from 'styled-components';

import { Strut, View } from 'components/Layout';
import { Title } from 'components/Typography';

import SubscriptionCard from './components/SubscriptionCard';

const Container = styled(View)`
    min-height: 100%;
    width: 100%;
    justify-content: flex-start;
    padding: 10px 25px 35px 25px;
`;

const SectionTitle = styled(Title)`
    font-weight: 300;
`;

const SubscriptionWrapper = styled(View)`
    flex-direction: row;
    gap: 25px;
    flex-wrap: wrap;
`;

const SubscriptionSection: React.FC = () => {
    return (
        <Container>
            <SectionTitle>Your Subscription</SectionTitle>
            <Strut size={15} vertical />
            <SubscriptionWrapper>
                <SubscriptionCard
                    title="Monthly"
                    price={2.99}
                    discount={10}
                    period="month"
                    perks={['Unlimited messages', 'Access 24/7', 'No word limits or filters']}
                    active
                />
                <SubscriptionCard
                    title="Yearly"
                    price={19.99}
                    discount={0}
                    period="year"
                    perks={['Unlimited messages', 'Access 24/7', 'No word limits or filters']}
                />
            </SubscriptionWrapper>
        </Container>
    );
};

export default SubscriptionSection;
