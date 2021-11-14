import { Command, Ctx, Hears, Help, On, Start, Update } from 'nestjs-telegraf';
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
  async add(@Ctx() ctx: TelegrafContext) {
    const chatId = ctx.chat.id;
    await ctx.reply(`Yey, add. Chat id: ${chatId}`);
    this.botService.echo(chatId);
  }

  @On('sticker')
  async on(@Ctx() ctx: TelegrafContext) {
    await ctx.reply('👍');
  }

  @Hears('hi')
  async hears(@Ctx() ctx: TelegrafContext) {
    await ctx.reply('Hey there');
  }
}
