import React, { forwardRef } from 'react';
import styled from 'styled-components';

type Props = React.HTMLAttributes<HTMLDivElement>;

type Ref = HTMLDivElement;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
`;

const View = forwardRef<Ref, Props>((props, ref) => {
    const { children, ...rest } = props;
    return (
        <Container ref={ref} {...rest}>
            {children}
        </Container>
    );
});

View.displayName = 'View';

export default View;
