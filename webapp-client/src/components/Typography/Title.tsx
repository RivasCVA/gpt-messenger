import React from 'react';
import styled from 'styled-components';

import Font from 'constants/font';
import Color from 'constants/color';

type Props = {
    children: string;
    light?: boolean;
};

const Container = styled.h2<{ $light: boolean }>(
    ({ $light }) => `
    font: 500 24pt ${Font.poppins};
    text-align: center;
    color: ${$light ? Color.white : Color.black};
    box-sizing: border-box;
`
);

const Title: React.FC<Props> = (props) => {
    const { children, light = false, ...rest } = props;
    return (
        <Container $light={light} {...rest}>
            {children}
        </Container>
    );
};

export default Title;
