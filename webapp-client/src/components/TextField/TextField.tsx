import React from 'react';
import styled from 'styled-components';

import Color from 'constants/color';
import Font from 'constants/font';
import { Strut, View } from 'components/Layout';
import { Text } from 'components/Typography';

type Props = {
    label?: string;
    error?: string;
    value: string;
    onChange?: (newValue: string) => void;
    type?: React.HTMLInputTypeAttribute;
    placeholder?: string;
    readOnly?: boolean;
};

const Container = styled(View)`
    align-items: flex-start;
    width: 300px;
`;

const Input = styled.input<{ $error?: string }>(
    ({ $error }) => `
    background-color: ${Color.white};
    color: ${Color.offBlack};
    width: 100%;
    height: 40px;
    padding: 0 10px;
    font: 400 11pt ${Font.poppins};
    border-radius: 8px;
    border: 2px solid ${$error ? Color.red : Color.offBlack};
    box-sizing: border-box;
`
);

const LabelText = styled(Text)`
    text-align: start;
    margin-left: -5px;
`;

const ErrorText = styled(Text)`
    text-align: start;
    margin-left: -5px;
    font-size: 10pt;
    color: ${Color.red};
`;

const TextField: React.FC<Props> = (props) => {
    const {
        label,
        error,
        value,
        onChange,
        type = 'text',
        placeholder = '',
        readOnly = false,
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
                onChange={handleOnChange}
                type={type}
                placeholder={placeholder}
                readOnly={readOnly}
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
