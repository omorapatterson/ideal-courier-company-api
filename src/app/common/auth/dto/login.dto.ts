import { IsString, IsEmail } from 'class-validator';

export class LoginDto {

    @IsString()
    @IsEmail()
    readonly email: string;

    @IsString()
    readonly password: string;

}
