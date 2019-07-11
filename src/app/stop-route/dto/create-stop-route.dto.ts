import { IsString, IsIn, IsByteLength, IsEmail, MinLength } from 'class-validator';

export class CreateStopRouteDto {
    @IsString()   
    readonly name: string;

    @IsString()
    readonly description: string; 

}