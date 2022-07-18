import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from '~modules/user/user.entity';
import { UserRepository } from '~modules/user/user.repository';
import { UserService } from '~modules/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRepository])],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
