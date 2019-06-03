import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ScheduleService } from './cron-scheduler.service';

@Module({
    imports: [
    ],
    providers: [
        ScheduleService,
    ],
    exports: [
        ScheduleService,
    ],
})
export class CronScheduleModule { }
