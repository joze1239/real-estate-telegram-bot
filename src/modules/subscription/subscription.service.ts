import { Injectable } from '@nestjs/common';
import { validateOrReject } from 'class-validator';
import { CreateSubscriptionDto } from './dto/subscription.create.dto';
import { RemoveSubscriptionDto } from './dto/subscription.remove.dto';
import Subscription from './subscription.entity';
import { SubscriptionRepository } from './subscription.repository';

@Injectable()
export class SubscriptionService {
  constructor(
    private readonly subscriptionRepository: SubscriptionRepository,
  ) {}

  async getSubscriptionsByChatId(chatId: number): Promise<Subscription[]> {
    return await this.subscriptionRepository.getSubscriptionsByChatId(chatId);
  }

  async createSubscription(
    subscriptionDto: CreateSubscriptionDto,
  ): Promise<Subscription> {
    await validateOrReject(subscriptionDto);
    return await this.subscriptionRepository.createSubscription(
      subscriptionDto,
    );
  }

  async removeSubscription(
    subscriptionDto: RemoveSubscriptionDto,
  ): Promise<Subscription> {
    await validateOrReject(subscriptionDto);
    return await this.subscriptionRepository.removeSubscription(
      subscriptionDto,
    );
  }
}
