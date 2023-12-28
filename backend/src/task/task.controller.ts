import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from '../entities/task.entity';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(JwtGuard)
  @Get('user/:userId')
  async findUserTasks(@Param('userId') userId: number): Promise<Task[]> {
    return this.taskService.findUserTasks(userId);
  }

  @UseGuards(JwtGuard)
  @Get('category/:categoryId')
  async findTasksByCategoryId(
    @Param('categoryId') categoryId: number,
  ): Promise<Task[]> {
    return this.taskService.findTasksByCategoryId(categoryId);
  }

  @UseGuards(JwtGuard)
  @Get(':taskId')
  async findTaskById(@Param('taskId') taskId: number): Promise<Task> {
    return this.taskService.findTaskById(taskId);
  }

  @UseGuards(JwtGuard)
  @Post()
  async createTask(
    @Body('userId') userId: number,
    @Body('categoryId') categoryId: number,
    @Body('title') text: string,
  ): Promise<Task> {
    return this.taskService.createTask(userId, categoryId, text);
  }

  @UseGuards(JwtGuard)
  @Put(':taskId')
  async editTask(
    @Param('taskId') taskId: number,
    @Body('title') newText: string,
    @Body('isCompleted') isCompleted: boolean,
  ): Promise<Task> {
    return this.taskService.editTask(taskId, newText, isCompleted);
  }

  @UseGuards(JwtGuard)
  @Delete(':taskId')
  async deleteTask(@Param('taskId') taskId: number): Promise<void> {
    return this.taskService.deleteTask(taskId);
  }
}
