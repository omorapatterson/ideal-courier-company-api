import { IsString, IsIn, IsByteLength, IsEmail, IsUUID, MinLength } from 'class-validator';

export class CreateDriverDto {
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

    @IsUUID()
    readonly companyId: string;
    
    @IsUUID()
    readonly teamId: string;    
}