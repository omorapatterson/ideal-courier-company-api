import { Controller, Post, Put, Get, Delete, UseGuards, UsePipes, Body, Param, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
//
import { RolesGuard } from '../common/auth/guards/roles.guard';
import { GetUser } from '../common/decorator/user.decorator';
import { Roles } from '../common/decorator/roles.decorator';
import { ErrorManager } from '../common/error-manager/error-manager';
import { ErrorResult } from '../common/error-manager/errors';
import { ValidationPipe } from '../common/pipes/validation.pipe';
import { User } from '../user/user.entity';
//
import { Company } from './company.entity';
import { CompanyService } from './company.service';
import { RegisterCompanyDto } from './dto/create-company.dto';
import { FilterCompanyDto } from './dto/filter-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ICompany } from './interfaces/company.interface';


@Controller('companies')
@UseGuards(AuthGuard(), RolesGuard)
export class CompanyController {

    constructor(private readonly companyService: CompanyService) { }

    @Post()
    @Roles('adviser')
    @UsePipes(new ValidationPipe())
    async create(@Body() registerCompany: RegisterCompanyDto) {
        return this.companyService.create(registerCompany.company, registerCompany.user)
            .then((company: Company) => {
                return this.getICompany(company);
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    @Put(':id')
    @Roles('adviser')
    @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
    async update(@Param('id') id: string, @Body() company: UpdateCompanyDto) {
        return this.companyService.update(id, company)
            .then((company: Company) => {
                return this.getICompany(company);
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    @Get(':id')
    async getCompany(@Param('id') id: string) {
        return this.companyService.getCompany(id)
            .then((company: Company) => {
                return this.getICompany(company);
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    @Get()
    getCompanies(@GetUser() user: User, @Query() filter: FilterCompanyDto) {
        return this.companyService.getCompanies(user, filter)
            .then((companies: Company[]) => {
                return companies.map((company: Company) => {
                    return this.getICompany(company);
                });
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    @Delete(':id')
    @Roles('adviser')
    delete(@Param('id') id: string) {
        return this.companyService.delete(id)
            .then((company: Company) => {
                return this.getICompany(company);
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    getICompany(company: Company): ICompany {
        return {
            id: company.id,
            name: company.name,
            phone: company.phone,
            email: company.email,
            address: company.address,
            city: company.city,
            state: company.state,
            zip: company.zip,  
            language: company.language,            
            driverAssignRadius: company.driverAssignRadius,            
            createdAt: company.createdAt,
            updatedAt: company.updatedAt,
        };
    }
}
