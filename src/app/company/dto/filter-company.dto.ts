import { IsUUID, IsDate, IsString, ValidateIf } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterCompanyDto {

    @IsString()
    readonly name: string;

    @Type(() => Date)
    @IsDate()
    @ValidateIf(filter => filter.endDate)
    readonly startDate: Date;

    @Type(() => Date)
    @IsDate()
    @ValidateIf(filter => filter.startDate)
    readonly endDate: Date;
}