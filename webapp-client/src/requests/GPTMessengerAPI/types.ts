export type User = {
    id: number;
    email: string;
    phone: string;
    subscribed: boolean;
};

export type LoginResponse = {
    exists: boolean;
    email: string;
};

export type LoginBody = unknown;

export type NewUserResponse = User;

export type NewUserBody = {
    phone: string;
};

export type UpdateUserResponse = User;

export type UpdateUserBody = User;

export type UserResponse = User;

export type UserBody = unknown;
