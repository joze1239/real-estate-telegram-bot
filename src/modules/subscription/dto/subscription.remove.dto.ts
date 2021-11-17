import { IsNumber, IsString, MinLength } from 'class-validator';

export class RemoveSubscriptionDto {
  @IsNumber()
  chatId: number;

  @IsString()
  @MinLength(1)
  name: string;
}
