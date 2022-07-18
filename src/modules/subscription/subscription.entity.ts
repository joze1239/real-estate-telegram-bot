import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import BaseEntity from '~database/entities/base.entity';
import { ColumnNumericTransformer } from '~database/utils/column.numeric.transformer';
import User from '~modules/user/user.entity';

@Entity()
export default class Subscription extends BaseEntity {
  @Column({
    type: 'decimal',
    name: 'chat_id',
    transformer: new ColumnNumericTransformer(),
  })
  chatId: number;

  @Column({ name: 'user_id' })
  userId: User['id'];

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'varchar', length: 64 })
  name: string;

  @Column({ type: 'varchar', length: 512 })
  url: string;
}
