import React from 'react';
import styled from 'styled-components';

import Font from 'constants/font';
import Color from 'constants/color';

type Props = {
    children: string;
    light?: boolean;
};

const Container = styled.h3<{ $light: boolean }>(
    ({ $light }) => `
    font: 400 15pt ${Font.poppins};
    text-align: center;
    color: ${$light ? Color.offWhite : Color.offBlack};
`
);

const Subtitle: React.FC<Props> = (props) => {
    const { children, light = false, ...rest } = props;
    return (
        <Container $light={light} {...rest}>
            {children}
        </Container>
    );
};

export default Subtitle;
