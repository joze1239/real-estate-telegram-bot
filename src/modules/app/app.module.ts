import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotModule } from '~modules/bot/bot.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TelegrafModule.forRoot({
            token: process.env.TELEGRAM_BOT_TOKEN,
            include: [BotModule],
        }),
        BotModule,
    ],
})
export class AppModule {}
