import { Injectable } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/subscription.create.dto';
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
    return await this.subscriptionRepository.createSubscription(
      subscriptionDto,
    );
  }

  async removeSubscription(chatId: number, name: string): Promise<void> {
    return await this.subscriptionRepository.removeSubscription(chatId, name);
  }
}
