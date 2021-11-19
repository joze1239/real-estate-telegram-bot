import { BadRequestException, NotFoundException } from '@nestjs/common';
import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import Subscription from '~modules/subscription/subscription.entity';
import { CreateSubscriptionDto } from './dto/subscription.create.dto';
import { RemoveSubscriptionDto } from './dto/subscription.remove.dto';

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

  async getSubscriptionsById(subscriptionId: number): Promise<Subscription> {
    const subscription = await this.findOne({
      where: {
        id: subscriptionId,
      },
      withDeleted: false,
    });

    if (!subscription) {
      throw new NotFoundException(`Subscription with this id doesn't exist!`);
    }

    return subscription;
  }

  async createSubscription(dto: CreateSubscriptionDto): Promise<Subscription> {
    const exist = await this.findOne({
      where: {
        chatId: dto.chatId,
        name: dto.name,
      },
      withDeleted: false,
    });

    if (exist) {
      throw new BadRequestException(
        'Subscription with this name already exist!',
      );
    }

    const subscription = await this.create(dto);
    return subscription.save();
  }

  async removeSubscription(dto: RemoveSubscriptionDto): Promise<Subscription> {
    const subscription = await this.findOne({
      where: {
        chatId: dto.chatId,
        name: dto.name,
      },
      withDeleted: false,
    });

    if (!subscription) {
      throw new NotFoundException(`Subscription with this name doesn't exist!`);
    }

    return await subscription.softRemove();
  }
}
