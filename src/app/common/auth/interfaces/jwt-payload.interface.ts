export interface JwtPayload {
    readonly userId: string;
    readonly email: string;
    readonly role: string;
}