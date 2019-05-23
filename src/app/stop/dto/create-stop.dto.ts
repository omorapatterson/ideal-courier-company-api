import { IsString, IsIn, IsByteLength, IsEmail, MinLength } from 'class-validator';

export class CreateStopDto {
    @IsString()   
    readonly name: string;

    @IsString()
    readonly description: string; 

}