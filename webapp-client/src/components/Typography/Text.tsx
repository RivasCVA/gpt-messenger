import React from 'react';
import styled from 'styled-components';

import Font from 'constants/font';
import Color from 'constants/color';

type Props = {
    children: string | string[];
    light?: boolean;
};

const Container = styled.p<{ $light: boolean }>(
    ({ $light }) => `
    font: 400 12pt ${Font.poppins};
    text-align: center;
    padding: 0 10px;
    color: ${$light ? Color.white : Color.black};
`
);

const Text: React.FC<Props> = (props) => {
    const { children, light = false } = props;
    return <Container $light={light}>{children}</Container>;
};

export default Text;
