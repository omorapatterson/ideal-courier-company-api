import { EntityRepository, Repository } from "typeorm";

import { CreateCompanyPlanDto } from "./dto/create-company-plan.dto";
import { UpdateCompanyPlanDto } from "./dto/update-company-plan.dto";
import { CompanyPlan } from "./company-plan.entity";

@EntityRepository(CompanyPlan)
export class CompanyPlanRepository extends Repository<CompanyPlan> {

    async createCompanyPlan(companyPlanDto: CreateCompanyPlanDto) {
        const companyPlan: CompanyPlan = this.create();
        companyPlan.sector = companyPlanDto.sector;
        companyPlan.description = companyPlanDto.description;
        companyPlan.updatedAt = new Date();
        companyPlan.createdAt = new Date();
        return this.save(companyPlan);
    }

    async updateCompanyPlan(id: string, companyPlanDto: UpdateCompanyPlanDto) {
        const companyPlan: CompanyPlan = await this.getCompanyPlan(id);
        companyPlan.sector = companyPlanDto.sector ? companyPlanDto.sector : companyPlan.sector;
        companyPlan.description = companyPlanDto.description ? companyPlanDto.description : companyPlan.description;
        companyPlan.updatedAt = new Date();
        return this.save(companyPlan);
    }

    getCompanyPlan(id: string) {
        return this.findOne({ id });
    }

    getCompanyPlans() {
        return this.find();
    }
}