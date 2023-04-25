export interface Login {
    error: boolean;
    token: string;
}

export interface User {
    token: string;
    role: string
}