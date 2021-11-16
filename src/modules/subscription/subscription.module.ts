import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionRepository } from '~modules/subscription//subscription.repository';
import Subscription from '~modules/subscription/subscription.entity';
import { SubscriptionService } from '~modules/subscription/subscription.service';

@Module({
  imports: [TypeOrmModule.forFeature([Subscription, SubscriptionRepository])],
  providers: [SubscriptionService],
  exports: [SubscriptionService],
})
export class SubscriptionModule {}
