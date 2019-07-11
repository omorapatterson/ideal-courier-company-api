import { Injectable } from '@nestjs/common';
import { Cron, Interval, Timeout, NestSchedule } from 'nest-schedule';
import { TaskService } from '../task/task.service'

@Injectable() // Only support SINGLETON scope
export class ScheduleService extends NestSchedule {  
  
  constructor( public taskService: TaskService){
    super();
  }
  @Cron('30 0 0 ? * *')
  async cronJob() {
    this.taskService.createShedulerTask();
  }
  
  @Timeout(5000)
  onceJob() {
    console.log('executing once job');
  }
  
  @Interval(2000)
  intervalJob() {
    console.log('executing interval job');
    
    // if you want to cancel the job, you should return true;
    return true;
  }
}
