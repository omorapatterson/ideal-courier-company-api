import { IsString, IsIn, IsByteLength, IsEmail, MinLength } from 'class-validator';

export class CreateTaskDto {
    @IsString()   
    readonly name: string;

    @IsString()
    readonly description: string; 

}