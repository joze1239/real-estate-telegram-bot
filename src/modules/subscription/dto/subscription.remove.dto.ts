import { IsNumber, IsString, MinLength } from 'class-validator';

export class RemoveSubscriptionDto {
  @IsNumber()
  chatId: number;

  @IsString()
  @MinLength(1)
  name: string;

  constructor(chatId: number, name: string) {
    this.chatId = chatId;
    this.name = name;
  }
}
