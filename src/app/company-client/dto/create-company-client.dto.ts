import { IsString, IsIn, IsByteLength, IsEmail, IsUUID, MinLength } from 'class-validator';

export class CreateCompanyClientDto {
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

    @IsUUID()
    readonly companyId: string;
    
    @IsUUID()
    readonly teamId: string;    
}