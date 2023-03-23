import { createContext, useContext, useState, Dispatch, SetStateAction } from 'react';

import { User } from 'types/models';

type UserContextType = {
    user: User;
    setUser: Dispatch<SetStateAction<User>>;
};

const defaultValue: UserContextType = {
    user: {
        id: 0,
        email: '',
        phone: '',
        subscribed: false,
    },
    setUser: () => {},
};

const UserContext = createContext<UserContextType>(defaultValue);

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (context === null) {
        throw new Error('The useUser hook must be used within a UserContextProvider');
    }
    return context;
};

type Props = {
    children?: React.ReactNode;
};

export const UserContextProvider: React.FC<Props> = (props) => {
    const { children } = props;
    const [user, setUser] = useState<User>(defaultValue.user);

    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
