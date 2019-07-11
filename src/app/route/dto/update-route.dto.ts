import { IsString, IsIn, IsByteLength, IsEmail, MinLength } from 'class-validator';

export class UpdateRouteDto {
    @IsString()   
    readonly name: string;

    @IsString()   
    readonly description: string;  
}