import { IsString, IsInt, IsEmail, IsUUID } from 'class-validator';

export class CreateCompanyDto {
    @IsString()
    readonly name: string;

    @IsString()
    readonly phone: string;

    @IsEmail()
    readonly email: string;

    @IsString()
    readonly address: string;

    @IsString()
    readonly city: string;

    @IsString()
    readonly state: string;

    @IsInt()
    readonly zip: number;
}