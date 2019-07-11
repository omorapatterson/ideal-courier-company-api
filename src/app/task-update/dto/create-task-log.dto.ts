import { IsString, IsIn, IsByteLength, IsEmail, MinLength } from 'class-validator';

export class CreateTaskLogDto {
    
    readonly id: string;

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