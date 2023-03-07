import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import useAuthorizedRequest from 'hooks/useAuthorizedRequest';
import URL from 'constants/url';
import Route from 'constants/route';
import { UserInfo, NewUser } from 'types/models';
import { NewUserState } from 'types/router-states';
import { Strut, View } from 'components/Layout';
import { Title } from 'components/Typography';
import TextField from 'components/TextField';
import Button from 'components/Button';

const NewUserPage: React.FC = () => {
    const request = useAuthorizedRequest();
    const location = useLocation();
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');

    useEffect(() => {
        const state = location.state as NewUserState;
        if (state?.email) {
            setEmail(state.email);
        } else {
            navigate(Route.home);
        }
    }, [location.state, navigate]);

    const handlePhoneChange = (newValue: string) => {
        setPhone(newValue);
    };

    const handleSubmit = () => {
        if (phone.length === 0) {
            console.log('phone cannot be empty');
            return;
        }
        void (async () => {
            try {
                await request.post<UserInfo, NewUser>(URL.user, { phone });
                navigate(Route.account);
            } catch (err) {
                console.error(err);
            }
        })();
    };

    return (
        <View>
            <Title>New User</Title>
            <Strut size={15} vertical />
            <TextField value={email} type="email" readOnly />
            <Strut size={15} vertical />
            <TextField value={phone} onChange={handlePhoneChange} placeholder="Phone" type="tel" />
            <Strut size={15} vertical />
            <Button title="Submit" onClick={handleSubmit} />
        </View>
    );
};

export default NewUserPage;
