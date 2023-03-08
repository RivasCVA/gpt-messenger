import React from 'react';
import styled from 'styled-components';

type Props = React.HTMLAttributes<HTMLDivElement>;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
`;

const View: React.FC<Props> = (props) => {
    const { children, ...rest } = props;
    return <Container {...rest}>{children}</Container>;
};

export default View;
