import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

import { CreateUserDto, UpdateUserDto } from './dto/userDto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Check if the properties exist in the request body before updating
    if (updateUserDto.profileImg) {
      user.profileImg = updateUserDto.profileImg;
    }

    if (updateUserDto.jobTitle) {
      user.jobTitle = updateUserDto.jobTitle;
    }

    // Update other properties if needed
    user.name = updateUserDto.name || user.name;
    user.email = updateUserDto.email || user.email;
    user.password = updateUserDto.password || user.password;

    await this.userService.update(id, user);

    return { message: 'User updated successfully' };
  }
}
