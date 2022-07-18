import { Type } from 'class-transformer';
import {
  IsNumber,
  IsString,
  IsUrl,
  MinLength,
  ValidateNested,
} from 'class-validator';
import User from '~modules/user/user.entity';

export class CreateSubscriptionDto {
  @IsNumber()
  chatId: number;

  @Type(() => User)
  @ValidateNested()
  user: User;

  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  @IsUrl(undefined, { message: 'URL is not valid.' })
  url: string;

  constructor(chatId: number, user: User, name: string, url: string) {
    this.chatId = chatId;
    this.user = user;
    this.name = name;
    this.url = url;
  }
}
