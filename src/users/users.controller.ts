import { Controller, Post, Get, Body, Param, ParseIntPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @Post()
  createUser(@Body() newUser: CreateUserDto): Promise<User> {
    return this.usersService.createUser(newUser)
  }

  @Get()
  getUsers(): Promise<User[]> {
    return this.usersService.getUsers()
  }

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    console.log(id)
    return this.usersService.getUser(id)
  }
}
