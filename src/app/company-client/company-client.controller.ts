import {
    Controller,
    Get,
    Post,
    Body,
    UseGuards,
    Put,
    Param,
    Delete,
    UsePipes,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
//
import { RolesGuard } from '../common/auth/guards/roles.guard';
import { Roles } from '../common/decorator/roles.decorator';
import { ErrorResult } from '../common/error-manager/errors';
import { ErrorManager } from '../common/error-manager/error-manager';
import { ValidationPipe } from '../common/pipes/validation.pipe';
//
import { CompanyClient } from './company-client.entity';
import { CompanyClientService } from './company-client.service';
import { CreateCompanyClientDto } from './dto/create-company-client.dto';
import { UpdateCompanyClientDto } from './dto/update-company-client.dto';
import { ICompanyClient } from './interfaces/company-client.interface';


@Controller('company-clients')
//@UseGuards(AuthGuard(), RolesGuard)
export class CompanyClientController {

    constructor(private readonly companyClientService: CompanyClientService) { }

    @Post()
    //@Roles('expert')
    @UsePipes(new ValidationPipe())
    async create(@Body() CompanyClient: CreateCompanyClientDto) {
        return this.companyClientService.create(CompanyClient)
            .then((CompanyClient: CompanyClient) => {
                return this.getICompanyClient(CompanyClient);
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    @Put(':id')
    @Roles('expert')
    @UsePipes(new ValidationPipe({ skipMissingProperties: true }))
    async update(@Param('id') id: string, @Body() user: UpdateCompanyClientDto) {
        return this.companyClientService.update(id, user)
            .then((CompanyClient: CompanyClient) => {
                return this.getICompanyClient(CompanyClient);
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    @Get(':id')
    async getCompanyClient(@Param('id') id: string) {
        return this.companyClientService.getCompanyClient(id)
            .then((companyClient: CompanyClient) => {
                return this.getICompanyClient(companyClient);
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    @Get()
    @Roles('expert')
    async getCompanyClients() {
        return this.companyClientService.getCompanyClients()
            .then((companyClients: CompanyClient[]) => {
                return companyClients.map((companyClient: CompanyClient) => {
                    return this.getICompanyClient(companyClient);
                });
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    @Delete(':id')
    @Roles('expert')
    async delete(@Param('id') id: string) {
        return this.companyClientService.delete(id)
            .then((companyClient: CompanyClient) => {
                return this.getICompanyClient(companyClient);
            })
            .catch((error: ErrorResult) => {
                return ErrorManager.manageErrorResult(error);
            });
    }

    getICompanyClient(companyClient: CompanyClient): ICompanyClient {
        return {
            id: companyClient.id,
            firstName: companyClient.firstName,
            lastName: companyClient.lastName,
            email: companyClient.email,
            createdAt: companyClient.createdAt,
            updatedAt: companyClient.updatedAt,
        };
    }
}
