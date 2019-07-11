import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from 'nest-schedule';
import { ScheduleService } from './cron-scheduler.service';
import { TaskModule } from '../task/task.module';
import { TaskService } from '../task/task.service';

@Module({
    imports: [
        TaskModule,
        ScheduleModule.register(),
    ],
    providers: [
        ScheduleService,
        TaskService
    ],
    exports: [
        ScheduleService,
    ],
})
export class CronScheduleModule { }