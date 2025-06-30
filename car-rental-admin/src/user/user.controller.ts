import { Controller, Post, Body, Delete, Param, Get, UseGuards, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { ParseIntPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('add-user')
  async create(@Body() createUserDto: CreateUserDto) {
    const response = await this.userService.create(createUserDto);
    return response;
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Delete(':delete-user/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const response = await this.userService.deleteById(id);
    return response;
  }

  @Get(':get-user/:id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.findById(id);
  }

  @Get('find-by-username/:username')
  async findByUsername(@Param('username') username: string): Promise<User> {
    return await this.userService.findByUsername(username);
  }

  @Patch('update-username/:id')
  async updateUsername(
    @Param('id', ParseIntPipe) id: number,
    @Body('username') username: string,
  ) {
    return this.userService.updateUsername(id, username);
  }

  @Patch('update-password/:id')
  async updatePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body('password') password: string,
  ) {
    return this.userService.updatePassword(id, password);
  }
}
