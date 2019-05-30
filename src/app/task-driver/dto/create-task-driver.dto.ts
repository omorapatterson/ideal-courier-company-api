import { IsString, IsIn, IsByteLength, IsEmail, MinLength } from 'class-validator';

export class CreateTaskDriverDto {

    readonly id: string;

    readonly comments: string;

    readonly description: string;  

    readonly lat: string;

    readonly lon: string;

    readonly pieces: number;

    readonly taskDate: Date;

    readonly transType: string;

    readonly createdAt: Date;

    readonly updatedAt: Date;

}