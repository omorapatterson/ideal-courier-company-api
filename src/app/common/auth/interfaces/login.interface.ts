import { IUser } from "../../../user/interfaces/user.interface";

export interface ILogin {
    readonly user: IUser;
    readonly token: string;
    readonly expiresIn: number;
}