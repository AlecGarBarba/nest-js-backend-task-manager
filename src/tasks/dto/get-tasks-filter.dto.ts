import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class GetTasksFilterDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus; //we need this to be a valid status
  @IsOptional()
  @IsNotEmpty()
  search?: string; //we need this to not be empty.
}
