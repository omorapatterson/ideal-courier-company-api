export interface ICompany {
    readonly id: string;
    readonly name: string;
    readonly phone: string;
    readonly email: string;
    readonly address: string;
    readonly city: string;
    readonly state: string;
    readonly zip: number;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}