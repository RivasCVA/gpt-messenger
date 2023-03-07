import React from 'react';
import styled from 'styled-components';

import Color from 'constants/color';
import Font from 'constants/font';

type Props = {
    title: string;
    onClick?: () => void;
    disabled?: boolean;
};

const Container = styled.button<{ $disabled: boolean }>(
    ({ $disabled }) => `
    background-color: ${Color.offBlack};
    color: ${Color.white};
    width: 120px;
    height: 40px;
    border-width: 0;
    border-radius: 8px;
    font: 500 12pt ${Font.poppins};
    cursor: ${$disabled ? 'cursor' : 'pointer'};
    transition: transform 450ms;
    :hover {
        transform: scale(${$disabled ? 1.0 : 1.05});
    }
    opacity: ${$disabled ? 0.75 : 1};
`
);

const Button: React.FC<Props> = (props) => {
    const { title, onClick, disabled = false } = props;
    return (
        <Container onClick={onClick} type="button" disabled={disabled} $disabled={disabled}>
            {title}
        </Container>
    );
};

export default Button;
