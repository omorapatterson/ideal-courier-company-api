import { Module } from '@nestjs/common';
import { ScheduleModule } from 'nest-schedule';
import { UserModule } from './app/user/user.module';
import { CompanyModule } from './app/company/company.module';
import { CompanyClientModule } from './app/company-client/company-client.module';
import { DriverModule } from './app/driver/driver.module';
import { PlanModule } from './app/plan/plan.module';
import { TaskModule } from './app/task/task.module';
import { TaskSchedulerModule } from './app/task-scheduler/task-scheduler.module';
import { TeamModule } from './app/team/team.module';
import { ConfigService } from './app/common/config/config.service';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ScheduleModule.register(),
    //
    UserModule,
    CompanyModule,
    CompanyClientModule,
    ChatModule,
    DriverModule,
    PlanModule,
    TaskModule,
    TaskSchedulerModule,
    TeamModule
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
