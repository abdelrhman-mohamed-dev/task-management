import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';
import { User } from 'src/entities/user.entity';
import { Category } from 'src/entities/category.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findUserTasks(userId: number): Promise<Task[]> {
    return this.taskRepository.find({
      where: { user: { id: userId } },
      relations: ['category'], // Include the category relation
    });
  }

  async findTasksByCategoryId(categoryId: number): Promise<Task[]> {
    return this.taskRepository.find({
      where: { category: { id: categoryId } },
    });
  }

  async findTaskById(taskId: number): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id: taskId } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }
    return task;
  }

  async createTask(
    userId: number,
    categoryId: number,
    title: string,
  ): Promise<Task> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
    });

    const task = this.taskRepository.create({
      title,
      user,
      category,
    });

    return this.taskRepository.save(task);
  }
  async editTask(
    taskId: number,
    newText: string,
    isCompleted: boolean = false, // Default value is false
  ): Promise<Task> {
    const task = await this.findTaskById(taskId);

    // Update the text only if newText is provided
    if (newText !== undefined) {
      task.title = newText;
    }

    // Update isCompleted
    task.isCompleted = isCompleted;

    return this.taskRepository.save(task);
  }

  async deleteTask(taskId: number): Promise<void> {
    const task = await this.findTaskById(taskId);
    await this.taskRepository.remove(task);
  }
}
