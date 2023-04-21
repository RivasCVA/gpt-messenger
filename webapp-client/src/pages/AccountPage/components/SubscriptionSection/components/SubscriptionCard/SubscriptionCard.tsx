import React from 'react';
import styled from 'styled-components';

import { Strut, View } from 'components/Layout';
import { Subtitle, Title, Text } from 'components/Typography';
import Color from 'constants/color';
import Button from 'components/Button';

type Props = {
    title: string;
    price: number;
    period: string;
    discount?: number;
    perks: string[];
    active?: boolean;
    onSubscribe?: () => void;
    onUnsubscribe?: () => void;
};

const Container = styled(View)`
    width: 275px;
    height: 325px;
    justify-content: space-between;
    padding: 15px 25px 25px 25px;
    background-color: ${Color.green};
    border-radius: 28px;
`;

const SubscriptionTitle = styled(Title)`
    color: ${Color.secondaryWhite};
    font-weight: 600;
    font-size: 22pt;
`;

const PriceSubtitle = styled(Subtitle)`
    font-size: 14pt;
`;

const DiscountText = styled(Text)`
    font-weight: 600;
    font-size: 9pt;
    color: ${Color.green};
    background-color: ${Color.white};
    border-radius: 20px;
    padding: 5px 10px;
`;

const HeaderWrapper = styled(View)`
    width: 100%;
    height: 110px;
    justify-content: flex-start;
`;

const BodyWrapper = styled(View)`
    width: 100%;
    flex: 1;
    align-items: flex-start;
`;

const FooterWrapper = styled(View)`
    width: 100%;
    height: 50px;
    justify-content: flex-end;
`;

const ActionButton = styled(Button)<{ $active: boolean }>(
    ({ $active }) => `
    background-color: ${$active ? 'transparent' : Color.white};
    color: ${$active ? Color.white : Color.offBlack};
    text-decoration: ${$active ? 'underline' : 'none'};
`
);

const SubscriptionCard: React.FC<Props> = (props) => {
    const {
        title,
        price,
        period,
        discount = undefined,
        perks,
        active = false,
        onSubscribe,
        onUnsubscribe,
    } = props;

    const handleActionClick = () => {
        if (!active && onSubscribe) {
            onSubscribe();
        } else if (active && onUnsubscribe) {
            onUnsubscribe();
        }
    };

    return (
        <Container>
            <HeaderWrapper>
                <SubscriptionTitle light>{title}</SubscriptionTitle>
                <PriceSubtitle light>{`$${price} / ${period}`}</PriceSubtitle>
                {discount !== undefined && (
                    <>
                        <Strut size={6} vertical />
                        <DiscountText light>{`${discount}% Discount`}</DiscountText>
                    </>
                )}
            </HeaderWrapper>
            <BodyWrapper>
                {perks.length && (
                    <>
                        {perks.map((perk, index) => (
                            <Text light key={`${perk}-${index}`}>{`- ${perk}`}</Text>
                        ))}
                    </>
                )}
            </BodyWrapper>
            <FooterWrapper>
                <ActionButton
                    title={active ? 'Unsubscribe' : 'Subscribe'}
                    onClick={handleActionClick}
                    $active={active}
                />
            </FooterWrapper>
        </Container>
    );
};

export default SubscriptionCard;
