import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findUserCategories(userId: number): Promise<Category[]> {
    return this.categoryRepository.find({
      where: { user: { id: userId } },
    });
  }

  async findCategoryById(categoryId: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }
    return category;
  }

  async createCategory(userId: number, title: string): Promise<Category> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const category = this.categoryRepository.create({
      title,
      user,
    });

    return this.categoryRepository.save(category);
  }

  async editCategory(categoryId: number, newTitle: string): Promise<Category> {
    const category = await this.findCategoryById(categoryId);
    category.title = newTitle;
    return this.categoryRepository.save(category);
  }

  async deleteCategory(categoryId: number): Promise<void> {
    const category = await this.findCategoryById(categoryId);
    await this.categoryRepository.remove(category);
  }
}
