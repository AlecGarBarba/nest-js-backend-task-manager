import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
import { Logger } from '@nestjs/common';

@Controller('/tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger: Logger = new Logger('TasksController');
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(
    @GetUser() user: User,
    @Query() filterDto: GetTasksFilterDto,
  ): Promise<Task[]> {
    this.logger.verbose(
      `User "${user.username}" retrieving all tasks. Filters: ${JSON.stringify(
        filterDto,
      )}`,
    );
    return this.taskService.getTasks(filterDto, user);
  }

  @Get('/:id')
  getTaskById(@GetUser() user: User, @Param('id') id: string): Promise<Task> {
    return this.taskService.getTaskById(id, user);
  }

  @Post()
  createTask(
    @GetUser() user: User,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    this.logger.verbose(
      `User "${
        user.username
      }" creating a new taskwith the data: ${JSON.stringify(createTaskDto)}`,
    );
    return this.taskService.createTask(createTaskDto, user);
  }

  @Delete('/:id')
  deleteTaskById(
    @GetUser() user: User,
    @Param('id') id: string,
  ): Promise<void> {
    return this.taskService.deleteTaskById(id, user);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @GetUser() user: User,
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    return this.taskService.updateTaskStatus(id, updateTaskStatusDto, user);
  }
}
