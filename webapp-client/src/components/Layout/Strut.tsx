import React from 'react';
import styled from 'styled-components';

type Props = {
    size: number;
    vertical?: boolean;
};

const Container = styled.div<{ $size: number; $vertical: boolean }>(
    ({ $size, $vertical }) => `
    display: inline-block;
    width: ${$vertical ? 0 : $size}px;
    height: ${$vertical ? $size : 0}px;
    flex-basis: ${$size}px;
    flex-shrink: 0;
`
);

const Strut: React.FC<Props> = (props) => {
    const { size, vertical = false, ...rest } = props;
    return <Container aria-hidden $size={size} $vertical={vertical} {...rest} />;
};

export default Strut;
