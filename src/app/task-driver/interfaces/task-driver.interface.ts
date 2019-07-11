import { ITaskScheduler } from '../../task-scheduler/interfaces/task-scheduler.interface'

export interface ITaskDriver {

    readonly id: string;

    readonly companyId?: string;

    readonly comments: string;

    readonly description: string;  

    readonly ipAddress: string;

    readonly lat: string;

    readonly lon: string;

    readonly pieces: number;

    readonly taskDate: Date;

    readonly transType: string;

    readonly scheduler?: ITaskScheduler,

    readonly createdAt: Date;

    readonly updatedAt: Date;
}