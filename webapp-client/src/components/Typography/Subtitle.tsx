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
    textAlign: center;
    padding: 0 10px;
    color: ${$light ? Color.offWhite : Color.offBlack};
`
);

const Subtitle: React.FC<Props> = (props) => {
    const { children, light = false } = props;
    return <Container $light={light}>{children}</Container>;
};

export default Subtitle;
