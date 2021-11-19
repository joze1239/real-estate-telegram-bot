import { IsNumber, IsString, IsUrl } from 'class-validator';

export class CreatePageViewDto {
  @IsNumber()
  chatId: number;

  @IsString()
  @IsUrl(undefined, { message: 'URL is not valid.' })
  url: string;

  constructor(chatId: number, url: string) {
    this.chatId = chatId;
    this.url = url;
  }
}
