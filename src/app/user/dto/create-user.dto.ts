import { IsString, IsIn, IsByteLength, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsByteLength(1, 100, {
        message: "Invalid First Name length"
    })
    readonly firstName: string;

    @IsString()
    @IsByteLength(1, 100, {
        message: "Invalid Last Name length"
    })
    readonly lastName: string;

    @IsEmail({}, {
        message: "Invalid email format"
    })
    readonly email: string;

    @IsString()
    @MinLength(5, {
        message: "Invalid password length"
    })
    readonly password: string;

    @IsIn(['expert', 'adviser', 'company'], {
        message: "Invalid role value, should be adviser or company"
    })
    readonly role: string;

}