import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

  async createUser(user: CreateUserDto) {
    const findUser = await this.getUserByUsername(user.username);

    if (findUser) {
      return new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    const newUser = this.userRepository.create(user)
    return this.userRepository.save(newUser);
  }

  getUsers() {
    return this.userRepository.find();
  }

  async getUserById(id: number) {
    const userFound = await this.userRepository.findOne({
      where: {
        id
      }
    })

    if (!userFound) {
      return new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }

    return userFound;
  }

  getUserByUsername(username: string) {
    return this.userRepository.findOne({
      where: {
        username
      }
    })
  }

  async deleteUser(id: number) {
    const userFound = await this.userRepository.findOne({
      where: {
        id
      }
    })

    if (!userFound) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return this.userRepository.delete({ id });
  }

  async deleteUserPro(id: number) {
    const result = await this.userRepository.delete({ id });

    if (result.affected === 0) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return result;
  }

  async updateUser(id: number, user: UpdateUserDto) {
    const userFound = await this.userRepository.findOne({
      where: {
        id
      }
    })

    if (!userFound) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const updateUser = Object.assign(userFound, user)

    return this.userRepository.save(updateUser);
  }
}
