import React from 'react';
import styled from 'styled-components';

import Color, { HexToRGB } from 'constants/color';
import Font from 'constants/font';
import { Strut, View } from 'components/Layout';
import { Text, Error } from 'components/Typography';

type Props = {
    label?: string;
    error?: string;
    value: string;
    placeholder?: string;
    onChange?: (newValue: string) => void;
    type?: React.HTMLInputTypeAttribute;
    autoComplete?: string;
    readOnly?: boolean;
    disabled?: boolean;
    light?: boolean;
};

const Container = styled(View)`
    align-items: flex-start;
    width: min-content;
`;

const Input = styled.input<{ $error?: string; $light: boolean }>(
    ({ $error, $light }) => `
    background-color: ${Color.white};
    color: ${Color.offBlack};
    width: 275px;
    height: 40px;
    padding: 0 10px;
    font: 400 11pt ${Font.poppins};
    border-radius: 8px;
    border: 2px solid ${
        $error ? ($light ? Color.offRed : Color.red) : $light ? 'transparent' : Color.offBlack
    };
    box-sizing: border-box;
    :disabled {
        -webkit-text-fill-color: ${HexToRGB(Color.offBlack, 0.8)};
        background-color: ${HexToRGB(Color.secondaryWhite)};
    }
`
);

const LabelText = styled(Text)`
    text-align: start;
    width: 100%;
    padding: 0 5px;
`;

const ErrorText = styled(Error)`
    text-align: start;
    width: 100%;
    padding: 0 5px;
    font-size: 10pt;
    font-weight: 400;
`;

const TextField: React.FC<Props> = (props) => {
    const {
        label,
        error,
        value,
        placeholder = '',
        onChange,
        type = 'text',
        autoComplete,
        readOnly = false,
        disabled = false,
        light = false,
        ...rest
    } = props;

    const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        if (onChange) {
            onChange(e.currentTarget.value);
        }
    };

    return (
        <Container>
            {label && (
                <>
                    <LabelText light={light}>{label}</LabelText>
                    <Strut size={5} vertical />
                </>
            )}
            <Input
                value={value}
                placeholder={placeholder}
                onChange={handleOnChange}
                type={type}
                autoComplete={autoComplete}
                readOnly={readOnly}
                disabled={disabled}
                $error={error}
                $light={light}
                {...rest}
            />
            {error && (
                <>
                    <Strut size={5} vertical />
                    <ErrorText light={light}>{error}</ErrorText>
                </>
            )}
        </Container>
    );
};

export default TextField;
