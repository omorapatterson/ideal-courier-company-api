import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { CompanyClientService } from './company-client.service';
import { CompanyClientController } from './company-client.controller';
import { CompanyClient } from './company-client.entity';
import { CompanyClientRepository } from './company-client.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([CompanyClient, CompanyClientRepository]),
        PassportModule.register({ defaultStrategy: 'jwt' })
    ],
    providers: [
        CompanyClientService,
    ],
    controllers: [CompanyClientController],
    exports: [
        CompanyClientService,
    ],
})
export class UserModule { }
