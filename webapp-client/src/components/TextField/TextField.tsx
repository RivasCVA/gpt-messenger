import React from 'react';
import styled from 'styled-components';

import Color from 'constants/color';
import Font from 'constants/font';

type Props = {
    value: string;
    onChange?: (newValue: string) => void;
    type?: React.HTMLInputTypeAttribute;
    placeholder?: string;
    readOnly?: boolean;
};

const Container = styled.input`
    background-color: ${Color.white};
    color: ${Color.offBlack};
    width: 300px;
    height: 40px;
    padding: 0 10px;
    font: 400 11pt ${Font.poppins};
    border-radius: 8px;
    border: 2px solid ${Color.offBlack};
    box-sizing: border-box;
`;

const TextField: React.FC<Props> = (props) => {
    const { value, onChange, type = 'text', placeholder = '', readOnly = false, ...rest } = props;

    const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        if (onChange) {
            onChange(e.currentTarget.value);
        }
    };

    return (
        <Container
            value={value}
            onChange={handleOnChange}
            type={type}
            placeholder={placeholder}
            readOnly={readOnly}
            {...rest}
        />
    );
};

export default TextField;
