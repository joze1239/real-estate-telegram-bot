import { Column, Entity, OneToMany } from 'typeorm';
import BaseEntity from '~database/entities/base.entity';
import Subscription from '~modules/subscription/subscription.entity';

@Entity()
export default class User extends BaseEntity {
  @Column({ type: 'integer', default: 0 })
  externalId: number;

  @Column({ type: 'varchar', length: 64 })
  username: string;

  @Column({ type: 'varchar', length: 64 })
  firstName: string;

  @Column({ type: 'varchar', length: 64 })
  lastName: string;

  @OneToMany(() => Subscription, (subscription) => subscription.id)
  subscriptions: Subscription[];
}
