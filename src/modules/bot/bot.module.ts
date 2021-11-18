import { Module } from '@nestjs/common';
import { CrawlerModule } from '~modules/crawler/crawler.module';
import { SubscriptionModule } from '~modules/subscription/subscription.module';
import { BotService } from './bot.service';
import { BotUpdate } from './bot.update';

@Module({
  imports: [SubscriptionModule, CrawlerModule],
  providers: [BotUpdate, BotService],
})
export class BotModule {}
