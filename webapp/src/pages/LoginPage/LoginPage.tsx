import { useState } from 'react';

import { View, Strut } from 'components/Layout';
import Button from 'components/Button';
import TextField from 'components/TextField';
import { Title } from 'components/Typography';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleEmailChange = (newValue: string) => {
        setEmail(newValue);
    };

    const handlePasswordChange = (newValue: string) => {
        setPassword(newValue);
    };

    const handleSubmit = () => {
        console.log('Hello, World!');
    };

    return (
        <View>
            <Title>Login</Title>
            <Strut size={10} vertical />
            <TextField
                value={email}
                onChange={handleEmailChange}
                type="email"
                placeholder="Email"
            />
            <Strut size={15} vertical />
            <TextField
                value={password}
                onChange={handlePasswordChange}
                type="password"
                placeholder="Password"
            />
            <Strut size={15} vertical />
            <Button title="Submit" onClick={handleSubmit} />
            <Strut size={50} vertical />
        </View>
    );
};

export default LoginPage;
