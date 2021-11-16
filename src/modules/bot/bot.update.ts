import {
  Command,
  Ctx,
  Hears,
  Help,
  Message,
  On,
  Start,
  Update,
} from 'nestjs-telegraf';
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
  async add(@Ctx() ctx: TelegrafContext, @Message('text') text: string) {
    const chatId = ctx.chat.id;
    const name = text.split(' ')[1];
    const url = text.split(' ')[2];

    // await ctx.reply(`Yey, add. Chat id: ${chatId}, URL: ${url}`);
    // this.botService.echo(chatId);
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
