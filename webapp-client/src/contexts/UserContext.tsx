import { createContext, useContext, useState, Dispatch, SetStateAction } from 'react';
import { UserInfo } from 'types/models';

type UserContextType = {
    userInfo: UserInfo;
    setUserInfo: Dispatch<SetStateAction<UserInfo>>;
};

const defaultValue: UserContextType = {
    userInfo: {
        email: '',
        phone: '',
        subscribed: false,
    },
    setUserInfo: () => {},
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
    const [userInfo, setUserInfo] = useState<UserInfo>(defaultValue.userInfo);

    return (
        <UserContext.Provider value={{ userInfo, setUserInfo }}>{children}</UserContext.Provider>
    );
};
