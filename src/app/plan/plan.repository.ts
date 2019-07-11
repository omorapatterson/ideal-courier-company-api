import { EntityRepository, Repository } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { Plan } from "./plan.entity";
import { CreatePlanDto } from "./dto/create-plan.dto";
import { UpdatePlanDto } from "./dto/update-role.dto";

@EntityRepository(Plan)
export class PlanRepository extends Repository<Plan> {

    async createPlan(planDto: CreatePlanDto) {
        const plan: Plan = this.create();
        plan.name = planDto.name;
        plan.description = planDto.description;
        plan.updatedAt = new Date();
        plan.createdAt = new Date();
        return this.save(plan);
    }

    async updatePlan(id: string, planDto: UpdatePlanDto) {
        const plan: Plan = await this.getRole(id);
        plan.name = planDto.name? planDto.name : plan.name;
        plan.description = planDto.description ? planDto.description : plan.description;       
        plan.updatedAt = new Date();
        return this.save(plan);
    }
 
    getRole(id: string) {
        return this.findOne({ id });
    }

    getRoles() {
        return this.find();
    }
}