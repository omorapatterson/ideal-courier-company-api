import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { UserModule } from '../user/user.module';
import { Company } from './company.entity';
import { CompanyRepository } from './company.repository';
import { AuthModule } from '../common/auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Company, CompanyRepository]),
        AuthModule,
        UserModule,
    ],
    controllers: [CompanyController],
    providers: [
        CompanyService,
    ],
    exports: [
        CompanyService,
    ],
})
export class CompanyModule { }
