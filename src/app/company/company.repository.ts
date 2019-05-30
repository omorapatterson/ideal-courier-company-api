import { EntityRepository, Repository } from "typeorm";

import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { Company } from "./company.entity";
import { User, UserRole } from "../user/user.entity";
import { FilterCompanyDto } from "./dto/filter-company.dto";

@EntityRepository(Company)
export class CompanyRepository extends Repository<Company> {

    async createCompany(companyDto: CreateCompanyDto) {
        let company: Company = this.create();
        company.name = companyDto.name;
        company.phone = companyDto.phone;
        company.email = companyDto.email;
        company.address = companyDto.address;
        company.city = companyDto.city;
        company.state = companyDto.state;
        company.zip = companyDto.zip;
        company.language = companyDto.language;
        company.driverAssignRadius = companyDto.driverAssignRadius;
        company.updatedAt = new Date();
        company.createdAt = new Date();
        company = await this.save(company);
        return this.getCompany(company.id);
    }

    async updateCompany(id: string, companyDto: UpdateCompanyDto) {
        let company: Company = await this.getCompany(id);
        company.name = companyDto.name ? companyDto.name : company.name;
        company.phone = companyDto.phone ? companyDto.phone : company.phone;
        company.email = companyDto.email ? companyDto.email : company.email;
        company.address = companyDto.address ? companyDto.address : company.address;
        company.city = companyDto.city ? companyDto.city : company.city;
        company.state = companyDto.state ? companyDto.state : company.state;
        company.zip = companyDto.zip ? companyDto.zip : company.zip;
        company.updatedAt = new Date();
        company = await this.save(company);
        return this.getCompany(company.id);
    }

    getCompany(id: string) {
        return this.createQueryBuilder("company")
            .select()
            .where("company.id = :companyId", { companyId: id })
            .getOne();
    }

    getCompanies(user: User, filter: FilterCompanyDto) {
        let query = this.createQueryBuilder("company")
            .select()
            .leftJoinAndSelect("company.activitySector", "activitySector");

        if (user.role === UserRole.ADVISER) {
            query = query.where("ownerUser.id = :userId", { userId: user.id });
        }

        if (filter) {
            if (filter.name) {
                query = query.andWhere("LOWER(company.name) LIKE LOWER(:name)", { name: '%' + filter.name + '%' });
            }
            if (filter.startDate && filter.endDate) {
                query = query.andWhere("company.updatedAt BETWEEN :startDate AND :endDate",
                    { startDate: filter.startDate, endDate: filter.endDate });
            }
        }
        return query.getMany();
    }

    async deleteCompany(id: string) {
        let company: Company = await this.getCompany(id);
        await this.remove(company);
        return company;
    }
}