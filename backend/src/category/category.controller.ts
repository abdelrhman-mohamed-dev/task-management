// category.controller.ts
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
import { CategoryService } from './category.service';
import { Category } from '../entities/category.entity';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(JwtGuard)
  @Get('user/:userId')
  async findUserCategories(
    @Param('userId') userId: number,
  ): Promise<Category[]> {
    return this.categoryService.findUserCategories(userId);
  }

  @UseGuards(JwtGuard)
  @Get(':categoryId')
  async findCategoryById(
    @Param('categoryId') categoryId: number,
  ): Promise<Category> {
    return this.categoryService.findCategoryById(categoryId);
  }

  @UseGuards(JwtGuard)
  @Post()
  async createCategory(
    @Body('userId') userId: number,
    @Body('title') title: string,
  ): Promise<Category> {
    return this.categoryService.createCategory(userId, title);
  }

  @UseGuards(JwtGuard)
  @Put(':categoryId')
  async editCategory(
    @Param('categoryId') categoryId: number,
    @Body('title') newTitle: string,
  ): Promise<Category> {
    return this.categoryService.editCategory(categoryId, newTitle);
  }

  @UseGuards(JwtGuard)
  @Delete(':categoryId')
  async deleteCategory(@Param('categoryId') categoryId: number): Promise<void> {
    return this.categoryService.deleteCategory(categoryId);
  }
}
