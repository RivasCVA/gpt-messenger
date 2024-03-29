import React from 'react';
import styled from 'styled-components';

import Font from 'constants/font';
import Color from 'constants/color';

type Props = {
    children: string;
    light?: boolean;
};

const Container = styled.p<{ $light: boolean }>(
    ({ $light }) => `
    font: 500 12pt ${Font.poppins};
    text-align: center;
    color: ${$light ? Color.offRed : Color.red};
    box-sizing: border-box;
`
);

const Error: React.FC<Props> = (props) => {
    const { children, light = false, ...rest } = props;
    return (
        <Container $light={light} {...rest}>
            {children}
        </Container>
    );
};

export default Error;
