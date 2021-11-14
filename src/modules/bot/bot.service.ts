import { Injectable } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { TelegrafContext } from '~common/interfaces/telegraf-context.interface';

@Injectable()
export class BotService {
  constructor(@InjectBot() private bot: Telegraf<TelegrafContext>) {}

  echo(chatId: number) {
    setTimeout(() => {
      this.bot.telegram.sendMessage(
        chatId,
        `Delayed message. Chat Id: ${chatId}`,
      );
    }, 2000);
  }
}
