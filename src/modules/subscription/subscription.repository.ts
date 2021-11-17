import { BadRequestException, NotFoundException } from '@nestjs/common';
import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import Subscription from '~modules/subscription/subscription.entity';
import { CreateSubscriptionDto } from './dto/subscription.create.dto';

@EntityRepository(Subscription)
export class SubscriptionRepository extends BaseRepository<Subscription> {
  async getSubscriptionsByChatId(chatId: number): Promise<Subscription[]> {
    return await this.find({
      where: {
        chatId,
      },
      withDeleted: false,
    });
  }

  async createSubscription(
    subscriptionDto: CreateSubscriptionDto,
  ): Promise<Subscription> {
    const exist = await this.find({
      where: {
        ...subscriptionDto,
      },
      withDeleted: false,
    });

    if (exist) {
      throw new BadRequestException(
        'Subscription with this name and URL already exist!',
      );
    }

    const subscription = await this.create(subscriptionDto);
    return subscription.save();
  }

  async removeSubscription(chatId: number, name: string): Promise<void> {
    const subscription = await this.find({
      where: {
        chatId,
        name,
      },
    });

    if (!subscription) {
      throw new NotFoundException('Subscription does not exist!');
    }
    await this.softRemove(subscription);
  }
}
