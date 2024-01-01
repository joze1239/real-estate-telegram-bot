import { Column, Entity, OneToMany } from 'typeorm';
import BaseEntity from '~database/entities/base.entity';
import Subscription from '~modules/subscription/subscription.entity';

@Entity()
export default class User extends BaseEntity {
  @Column({ type: 'bigint', default: 0, name: 'external_id' })
  externalId: number;

  @Column({ type: 'varchar', length: 64, nullable: true })
  username: string;

  @Column({ type: 'varchar', length: 64, nullable: true, name: 'first_name' })
  firstName: string;

  @Column({ type: 'varchar', length: 64, nullable: true, name: 'last_name' })
  lastName: string;

  @OneToMany(() => Subscription, (subscription) => subscription.id)
  subscriptions: Subscription[];
}
