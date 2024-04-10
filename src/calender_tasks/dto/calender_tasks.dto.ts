import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { IsAfterStartDate } from './calender_task.customValidator';

export class AddTasksDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsDateString()
  startDate: Date;

  @IsOptional()
  @IsDateString()
  endDate: Date;
}

export class GetAllTasksDTO {
  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  @IsNotEmpty()
  @IsDateString()
  @IsAfterStartDate('startDate')
  endDate: Date;
}
