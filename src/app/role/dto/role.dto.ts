import { IsString, IsIn, IsByteLength, IsEmail, MinLength } from 'class-validator';

export class CreateRoleDto {
    @IsString()   
    readonly name: string;

    @IsString()
    readonly description: string; 

}

export class CreateRolePermisionsDto {
    role: CreateRoleDto;
    permisions: string[]; 

}