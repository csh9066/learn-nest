import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get('/:id')
  async findById(@Param('id') id: string) {
    const user = await this.usersService.findById(id);
    return user;
  }

  @Post()
  @HttpCode(201)
  async create(@Body() user: User) {
    await this.usersService.create(user);
    return 'createdAt';
  }

  @Delete('/:id')
  @HttpCode(204)
  async deleteById(@Param('id') id: string) {
    await this.usersService.deleteById(id);
  }
}
