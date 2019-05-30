import { IsString, IsIn, IsByteLength, IsEmail, IsUUID, MinLength } from 'class-validator';

export class CreateCompanyClientDto {
    @IsString()   
    readonly firstName: string;

    @IsString()    
    readonly lastName: string;

    @IsEmail({}, {
        message: "Invalid email format"
    })
    readonly email: string;

    @IsString()
    @MinLength(4, {
        message: "Invalid password length"
    })
    readonly password: string;

    @IsUUID()
    readonly companyId: string;
}