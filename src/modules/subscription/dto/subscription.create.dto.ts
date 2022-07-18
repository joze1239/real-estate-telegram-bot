import { IsNumber, IsString, IsUrl, MinLength } from 'class-validator';
import User from '~modules/user/user.entity';

export class CreateSubscriptionDto {
  @IsNumber()
  chatId: number;

  @IsNumber()
  userId: User['id'];

  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  @IsUrl(undefined, { message: 'URL is not valid.' })
  url: string;

  constructor(chatId: number, userId: number, name: string, url: string) {
    this.chatId = chatId;
    this.userId = userId;
    this.name = name;
    this.url = url;
  }
}
