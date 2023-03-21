import React from 'react';
import styled from 'styled-components';

import Font from 'constants/font';
import Color from 'constants/color';

type Props = {
    children: string | string[];
    light?: boolean;
    center?: boolean;
};

const Container = styled.p<{ $light: boolean; $center: boolean }>(
    ({ $light, $center }) => `
    font: 400 12pt ${Font.poppins};
    text-align: ${$center ? 'center' : 'left'};
    color: ${$light ? Color.white : Color.black};
`
);

const Text: React.FC<Props> = (props) => {
    const { children, light = false, center = false, ...rest } = props;
    return (
        <Container $light={light} $center={center} {...rest}>
            {children}
        </Container>
    );
};

export default Text;
