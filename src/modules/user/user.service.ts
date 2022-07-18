import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './user.create.dto';
import User from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findOrCreate(createUserDto: CreateUserDto): Promise<User> {
    let user = await this.userRepository.findOne({
      externalId: createUserDto.externalId,
    });

    if (!user) {
      user = await this.userRepository.create({ ...createUserDto });
      user = await user.save();
    }

    return user;
  }
}
