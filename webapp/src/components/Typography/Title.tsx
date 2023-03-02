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
    font: 500 22pt ${Font.poppins};
    textAlign: center;
    padding: 0 10px;
    color: ${$light ? Color.white : Color.black};
`
);

const Title: React.FC<Props> = (props) => {
    const { children, light = false } = props;
    return <Container $light={light}>{children}</Container>;
};

export default Title;
