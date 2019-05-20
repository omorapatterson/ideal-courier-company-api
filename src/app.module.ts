import { Module } from '@nestjs/common';

import { UserModule } from './app/user/user.module';
import { CompanyModule } from './app/company/company.module';
import { ConfigService } from './app/common/config/config.service';

@Module({
  imports: [
    UserModule,
    CompanyModule,
  ],
  controllers: [],
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(),
    },
  ],
})
export class AppModule { }
