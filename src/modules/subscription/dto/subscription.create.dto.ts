import { IsNumber, IsString, IsUrl, MinLength } from 'class-validator';

export class CreateSubscriptionDto {
  @IsNumber()
  chatId: number;

  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  @IsUrl(undefined, { message: 'URL is not valid.' })
  url: string;
}
