import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import Subscription from '~modules/subscription/subscription.entity';

@EntityRepository(Subscription)
export class SubscriptionRepository extends BaseRepository<Subscription> {}
