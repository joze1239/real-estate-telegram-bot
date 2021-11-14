import { Ctx, Hears, Help, On, Start, Update } from 'nestjs-telegraf';
import { TelegrafContext } from '~common/interfaces/telegraf-context.interface';

@Update()
export class BotUpdate {
    @Start()
    async start(@Ctx() ctx: TelegrafContext) {
        await ctx.reply('Welcome');
    }

    @Help()
    async help(@Ctx() ctx: TelegrafContext) {
        await ctx.reply('Send me a sticker');
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
