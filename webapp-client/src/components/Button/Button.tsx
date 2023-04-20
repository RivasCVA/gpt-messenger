import React from 'react';
import styled from 'styled-components';

import Color from 'constants/color';
import Font from 'constants/font';

type Props = {
    title: string;
    onClick?: () => void;
    disabled?: boolean;
    light?: boolean;
};

const Container = styled.button<{ $disabled: boolean; $light: boolean }>(
    ({ $disabled, $light }) => `
    background-color: ${$light ? Color.white : Color.offBlack};
    color: ${$light ? Color.offBlack : Color.white};
    border: none;
    border-radius: 8px;
    width: 120px;
    height: 40px;
    padding: 0 5px;
    font: 500 12pt ${Font.poppins};
    cursor: ${$disabled ? 'cursor' : 'pointer'};
    transition: transform 450ms;
    opacity: ${$disabled ? 0.75 : 1};
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    :hover {
        transform: scale(${$disabled ? 1.0 : 1.05});
    }
`
);

const Button: React.FC<Props> = (props) => {
    const { title, onClick, disabled = false, light = false, ...rest } = props;
    return (
        <Container
            onClick={onClick}
            type="button"
            disabled={disabled}
            $disabled={disabled}
            $light={light}
            {...rest}
        >
            {title}
        </Container>
    );
};

export default Button;
