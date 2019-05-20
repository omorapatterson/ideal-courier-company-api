import { IsString, IsUUID } from 'class-validator';

export class UpdateCompanyPlanDto {
    
    @IsString()
    readonly sector: string;

    @IsString()
    readonly description: string;

    @IsUUID()
    readonly company: string;

    @IsUUID()
    readonly plan: string;
}