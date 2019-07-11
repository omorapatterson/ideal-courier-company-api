
export interface IUser {

    readonly companyId?: string;

    readonly id: string;

    readonly firstName: string;

    readonly lastName: string;

    readonly email: string;

    readonly role: string;

    readonly language: string; 

    //zreadonly lastLogin: Date; 

    readonly phone: string;

    readonly createdAt: Date;

    readonly updatedAt: Date;

}