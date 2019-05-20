import { IsString, IsUUID } from 'class-validator';

export class CreateCompanyPlanDto {
    
    @IsString()
    readonly sector: string;

    @IsString()
    readonly description: string;   
    
    @IsUUID()
    readonly company: string;

    @IsUUID()
    readonly plan: string;
}