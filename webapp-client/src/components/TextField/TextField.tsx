import React from 'react';
import styled from 'styled-components';

import Color, { HexToRGB } from 'constants/color';
import Font from 'constants/font';
import { Strut, View } from 'components/Layout';
import { Text } from 'components/Typography';

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
};

const Container = styled(View)`
    align-items: flex-start;
    width: min-content;
`;

const Input = styled.input<{ $error?: string }>(
    ({ $error }) => `
    background-color: ${Color.white};
    color: ${Color.offBlack};
    width: 275px;
    height: 40px;
    padding: 0 10px;
    font: 400 11pt ${Font.poppins};
    border-radius: 8px;
    border: 2px solid ${$error ? Color.red : Color.offBlack};
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

const ErrorText = styled(Text)`
    text-align: start;
    width: 100%;
    padding: 0 5px;
    font-size: 10pt;
    color: ${Color.red};
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
                    <LabelText>{label}</LabelText>
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
                {...rest}
            />
            {error && (
                <>
                    <Strut size={5} vertical />
                    <ErrorText>{error}</ErrorText>
                </>
            )}
        </Container>
    );
};

export default TextField;
