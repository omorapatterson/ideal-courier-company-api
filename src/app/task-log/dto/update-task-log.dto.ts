import { IsString, IsIn, IsByteLength, IsEmail, MinLength } from 'class-validator';

export class UpdateTaskLogDto {
    @IsString()   
    readonly name: string;

    @IsString()   
    readonly description: string;  
}