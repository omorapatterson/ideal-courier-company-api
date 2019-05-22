export interface ITaskDriver {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}