// task.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { Task } from '../entities/task.entity';
import { User } from '../entities/user.entity';
import { Category } from '../entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task, User, Category])],
  providers: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {}
