import React from 'react';
import styled from 'styled-components';

import Color from 'constants/color';
import { View } from 'components/Layout';
import { Text } from 'components/Typography';

type Props = {
    cardNumber: string;
    expiration: string;
    securityCode: string;
    network: string;
};

const Container = styled(View)`
    width: 300px;
    aspect-ratio: 1.6;
    border-radius: 24px;
    padding: 2%;
    background-color: ${Color.offBlack};
    border: 2px solid ${Color.gray};
`;

const Section = styled(View)`
    width: 100%;
    flex: 1;
    justify-content: space-between;
`;

const CardNumber = styled(Text)`
    width: 100%;
    font-size: 13pt;
    font-weight: 500;
`;

const Footer = styled(View)`
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
`;

const FooterText = styled(Text)`
    color: ${Color.offGray};
    font-weight: 400;
`;

const CreditCard: React.FC<Props> = (props) => {
    const { cardNumber, expiration, securityCode, network } = props;

    const getFormattedCardNumber = (num: string): string => {
        const SPACE_SIZE = 4;
        const SPACE_CHAR = '\u00a0';

        if (num.length === 16) {
            let cn = '';
            cn += num.slice(0, 4);
            cn += SPACE_CHAR.repeat(SPACE_SIZE);
            cn += num.slice(4, 8);
            cn += SPACE_CHAR.repeat(SPACE_SIZE);
            cn += num.slice(8, 12);
            cn += SPACE_CHAR.repeat(SPACE_SIZE);
            cn += num.slice(12, 16);
            return cn;
        }

        if (num.length === 15) {
            let cn = '';
            cn += num.slice(0, 4);
            cn += SPACE_CHAR.repeat(SPACE_SIZE);
            cn += num.slice(4, 10);
            cn += SPACE_CHAR.repeat(SPACE_SIZE);
            cn += num.slice(10, 15);
            return cn;
        }

        if (num.length === 4) {
            return getFormattedCardNumber('*'.repeat(12) + num);
        }

        if (num.length === 5) {
            return getFormattedCardNumber('*'.repeat(10) + num);
        }

        return '';
    };

    return (
        <Container>
            <Section>
                <Text light>Credit Card</Text>
            </Section>
            <Section>
                <CardNumber light>{getFormattedCardNumber(cardNumber)}</CardNumber>
                <Footer>
                    <FooterText>{expiration}</FooterText>
                    <FooterText>{securityCode}</FooterText>
                    <FooterText>{network}</FooterText>
                </Footer>
            </Section>
        </Container>
    );
};

export default CreditCard;
