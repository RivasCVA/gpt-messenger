export type UserInfo = {
    email: string;
    phone: string;
    subscribed: boolean;
};

export type NewUser = {
    phone: string;
};

export type UserLogin = {
    status: boolean;
    email: string;
};
