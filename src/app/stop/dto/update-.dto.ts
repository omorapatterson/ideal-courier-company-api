import { IsString, IsIn, IsByteLength, IsEmail, MinLength } from 'class-validator';

export class UpdateStopDto {
    @IsString()   
    readonly name: string;

    @IsString()   
    readonly description: string;  
}