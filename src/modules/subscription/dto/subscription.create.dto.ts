import { IsNumber, IsString } from 'class-validator';

export class CreateSubscriptionDto {
  @IsNumber()
  chatId: number;

  @IsString()
  name: string;

  @IsString()
  url: string;
}
