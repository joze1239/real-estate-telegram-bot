import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import { CrawlerModule } from '~modules/crawler/crawler.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TelegrafModule.forRoot({
            token: process.env.TELEGRAM_BOT_TOKEN,
        }),
        CrawlerModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
