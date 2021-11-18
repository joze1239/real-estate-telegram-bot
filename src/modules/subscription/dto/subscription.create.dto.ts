import { IsNumber, IsString, IsUrl, MinLength } from 'class-validator';

export class CreateSubscriptionDto {
  @IsNumber()
  chatId: number;

  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  @MinLength(1)
  @IsUrl()
  url: string;
}
