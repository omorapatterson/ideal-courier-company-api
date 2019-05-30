import { EntityRepository, Repository } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { CompanyClient } from "./company-client.entity";
import { CreateCompanyClientDto } from "./dto/create-company-client.dto";
import { UpdateCompanyClientDto } from "./dto/update-company-client.dto";

@EntityRepository(CompanyClient)
export class CompanyClientRepository extends Repository<CompanyClient> {

    async createCompanyClient(companyClientDto: CreateCompanyClientDto) {
        const companyClient: CompanyClient = this.create();
        companyClient.firstName = companyClientDto.firstName;
        companyClient.lastName = companyClientDto.lastName;
        companyClient.email = companyClientDto.email;
        companyClient.company = <any>{ id: companyClientDto.companyId };
        //companyClient.team = <any>{ id: companyClientDto.teamId };
        const salt: string = bcrypt.genSaltSync(10);
        companyClient.password = await bcrypt.hash(companyClientDto.password, salt);
        companyClient.updatedAt = new Date();
        companyClient.createdAt = new Date();
        return this.save(companyClient);
    }

    async updateCompanyClient(id: string, companyClientDto: UpdateCompanyClientDto) {
        const companyClient: CompanyClient = await this.getCompanyClient(id);
        companyClient.firstName = companyClientDto.firstName ? companyClientDto.firstName : companyClient.firstName;
        companyClient.lastName = companyClientDto.lastName ? companyClientDto.lastName : companyClient.lastName;
        companyClient.email = companyClientDto.email ? companyClientDto.email : companyClient.email;

        if (companyClientDto.companyId) {
            companyClient.company = <any>{ id: companyClientDto.companyId };
        }

        companyClient.updatedAt = new Date();
        return this.save(companyClient);
    }

    getCompanyClient(id: string) {
        return this.createQueryBuilder("user")
            .select()
            .where("user.id = :id", { id })
            .andWhere("user.isDeleted = false")
            .getOne();
    }

    getCompanyClients() {
        return this.createQueryBuilder("company_client")
        .select()
        .where("company_client.isDeleted = false")
        .getMany();
    }

    getCompanyClientByEmail(email: string) {
        return this.createQueryBuilder("company_client")
            .select()
            .where("company_client.email = :email", { email })
            .andWhere("company_client.isDeleted = false")
            .getOne();
    }

    async deleteUser(companyClient: CompanyClient) {
        companyClient.isDeleted = true;
        companyClient.updatedAt = new Date();
        return this.save(companyClient);
    }
}