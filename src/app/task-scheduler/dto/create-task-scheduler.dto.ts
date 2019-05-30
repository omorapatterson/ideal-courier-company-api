import { IsString, IsIn, IsByteLength, IsEmail, MinLength, IsNumber, IsDate } from 'class-validator';

export class CreateSchedulerDto {

    @IsString()
    readonly description: string; 

    @IsNumber()
    repeatEach: number;
  
    @IsString()
    intervalTime: string;
  
    @IsString()
    monthOption: string;
  
    @IsNumber()
    monday: number;
  
    @IsNumber()
    tuesday: number;
  
    @IsNumber()
    wednesday: number;
  
    @IsNumber()
    thursday: number;
  
    @IsNumber()
    friday: number;
  
    @IsNumber()
    saturday: number;
  
    @IsNumber()
    sunday: number;
  
    @IsString()
    finish: string;
    
    // @IsDate()
    // finishDate: Date;
  
    @IsNumber()
    finishAfterRepetitions: number;
  
    @IsNumber()
    repetitions: number;

}