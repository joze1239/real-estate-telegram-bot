import { Module } from '@nestjs/common';
import { SubscriptionModule } from '~modules/subscription/subscription.module';
import { BotService } from './bot.service';
import { BotUpdate } from './bot.update';

@Module({
  imports: [SubscriptionModule],
  providers: [BotUpdate, BotService],
})
export class BotModule {}
