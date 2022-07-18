import { Command, Ctx, Help, Message, Update } from 'nestjs-telegraf';
import { TelegrafContext } from '~common/interfaces/telegraf-context.interface';
import { BotService } from './bot.service';

@Update()
export class BotUpdate {
  constructor(private botService: BotService) {}

  @Help()
  async help(@Ctx() ctx: TelegrafContext) {
    await ctx.reply('For help contact bot author!');
  }

  @Command('add')
  async addSubscription(
    @Ctx() ctx: TelegrafContext,
    @Message('text') text: string,
  ) {
    const chatId = ctx.chat.id;
    const user = ctx.from;
    const name = text.split(' ')[1];
    const url = text.split(' ')[2];

    await this.botService.subscribe(chatId, user, name, url);
  }

  @Command('remove')
  async removeSubscription(
    @Ctx() ctx: TelegrafContext,
    @Message('text') text: string,
  ) {
    const chatId = ctx.chat.id;
    const name = text.split(' ')[1];

    await this.botService.unsubscribe(chatId, name);
  }

  @Command('list')
  async listSubscription(@Ctx() ctx: TelegrafContext) {
    const chatId = ctx.chat.id;
    await this.botService.listSubscriptions(chatId);
  }

  @Command('sync')
  async crawlNewPages() {
    await this.botService.crawlNewPages();
  }
}
