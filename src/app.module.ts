import { Module } from '@nestjs/common';
import { ScheduleModule } from 'nest-schedule';
import { UserModule } from './app/user/user.module';
import { CompanyModule } from './app/company/company.module';
import { CompanyClientModule } from './app/company-client/company-client.module';
import { DriverModule } from './app/driver/driver.module';
import { PlanModule } from './app/plan/plan.module';
import { PermisionModule } from './app/permision/permision.module';
import { RoleModule } from './app/role/role.module';
import { TaskModule } from './app/task/task.module';
import { TaskSchedulerModule } from './app/task-scheduler/task-scheduler.module';
import { TeamModule } from './app/team/team.module';
import { ConfigService } from './app/common/config/config.service';
import { ChatModule } from './chat/chat.module';
import { CronScheduleModule } from './app/cron-scheduler/cron-scheduler.module';


@Module({
  imports: [
    ScheduleModule.register(),
    //
    UserModule,
    CompanyModule,
    CompanyClientModule,
    ChatModule,
    CronScheduleModule,
    DriverModule,
    PlanModule,
    PermisionModule,
    RoleModule,
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
