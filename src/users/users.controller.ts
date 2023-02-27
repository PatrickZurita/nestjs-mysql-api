import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  ParseIntPipe,
  Delete,
  Patch,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { User } from "./user.entity";
import { UpdateUserDto } from "./dto/update-user.dto";
import { CreateProfileDto } from "./dto/create-profile.dto";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  createUser(@Body() newUser: CreateUserDto) {
    return this.usersService.createUser(newUser);
  }

  @Get()
  getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Get(":id")
  getUser(@Param("id", ParseIntPipe) id: number) {
    return this.usersService.getUserById(id);
  }

  @Delete(":id")
  deleteUser(@Param("id", ParseIntPipe) id: number) {
    return this.usersService.deleteUserPro(id);
  }

  @Patch(":id")
  updateUser(
    @Param("id", ParseIntPipe) id: number,
    @Body() user: UpdateUserDto
  ) {
    return this.usersService.updateUser(id, user);
  }

  @Post(":id/profile")
  createProfile(
    @Param("id", ParseIntPipe) id: number,
    @Body() profile: CreateProfileDto
  ) {
    return this.usersService.createProfile(id, profile);
  }
}
