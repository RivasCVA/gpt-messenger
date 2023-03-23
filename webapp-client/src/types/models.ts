export type User = {
    id: number;
    email: string;
    phone: string;
    subscribed: boolean;
};

export type NewUser = {
    phone: string;
};

export type LoginStatus = {
    exists: boolean;
    email: string;
};
