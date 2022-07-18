import { Module } from '@nestjs/common';
import { SubscriptionModule } from '~modules/subscription/subscription.module';
import { UserModule } from '~modules/user/user.module';
import { BotService } from './bot.service';
import { BotUpdate } from './bot.update';

@Module({
  imports: [SubscriptionModule, UserModule],
  providers: [BotUpdate, BotService],
})
export class BotModule {}
