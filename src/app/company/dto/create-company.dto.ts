import { IsString, IsInt, IsEmail, IsUUID } from 'class-validator';
import { CreateUserDto } from '../../user/dto/create-user.dto'

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

    @IsString()
    readonly language: string;
    
    @IsInt()
    readonly driverAssignRadius: number;

}

export class RegisterCompanyDto {
    readonly company: CreateCompanyDto;
    readonly user: CreateUserDto;
}