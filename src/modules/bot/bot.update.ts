import { Command, Ctx, Help, Message, Start, Update } from 'nestjs-telegraf';
import { TelegrafContext } from '~common/interfaces/telegraf-context.interface';
import { BotService } from './bot.service';

@Update()
export class BotUpdate {
  constructor(private botService: BotService) {}
  @Start()
  async start(@Ctx() ctx: TelegrafContext) {
    await ctx.reply('Welcome');
  }

  @Help()
  async help(@Ctx() ctx: TelegrafContext) {
    await ctx.reply('Send me a sticker');
  }

  @Command('add')
  addSubscription(@Ctx() ctx: TelegrafContext, @Message('text') text: string) {
    const chatId = ctx.chat.id;
    const name = text.split(' ')[1];
    const url = text.split(' ')[2];
    this.botService.subscribe(chatId, name, url);
  }

  @Command('list')
  listSubscription(@Ctx() ctx: TelegrafContext) {
    const chatId = ctx.chat.id;
    this.botService.listSubscriptions(chatId);
  }
}
