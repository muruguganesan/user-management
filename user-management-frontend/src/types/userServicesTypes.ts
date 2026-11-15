export interface User {
    id: number;
    name: string;
    email: string;
    age: number;
    photo: string;
}
export interface UserResponse {
    message: string;
    state: boolean;
    status: number;

    users: User[];
    total_pages: number;
    total_users: number;
}

export interface IndividualUserResponse {
    message: string;
    state: boolean;
    status: number;
    data: User[];
}