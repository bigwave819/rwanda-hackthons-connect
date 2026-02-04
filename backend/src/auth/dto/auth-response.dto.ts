

export class AuthResponse {
    token: string;
    user: {
        id: string;
        email: string;
        fullName: string;
        role: string
    }
}