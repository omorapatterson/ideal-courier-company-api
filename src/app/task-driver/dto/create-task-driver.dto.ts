import { IsString, IsIn, IsByteLength, IsEmail, MinLength } from 'class-validator';
import { CreateSchedulerDto } from '../../task-scheduler/dto/create-task-scheduler.dto'

export class CreateTaskDriverDto {

    readonly comments: string;

    readonly description: string;  

    readonly ipAddress: string;

    readonly lat: string;

    readonly lon: string;

    readonly pieces: number;

    readonly taskDate: Date;

    readonly transType: string;

    readonly createdAt: Date;

    readonly updatedAt: Date;

}

export class CreateTaskWithSchedulerDto {
    task: CreateTaskDriverDto;
    scheduler: CreateSchedulerDto;
}
