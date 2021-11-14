import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotModule } from '~modules/bot/bot.module';
import { CrawlerModule } from '~modules/crawler/crawler.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TelegrafModule.forRoot({
            token: process.env.TELEGRAM_BOT_TOKEN,
            include: [BotModule],
        }),
        CrawlerModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
