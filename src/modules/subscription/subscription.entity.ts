import { Column, Entity } from 'typeorm';
import BaseEntity from '~database/entities/base.entity';
import { ColumnNumericTransformer } from '~database/utils/column.numeric.transformer';

@Entity()
export default class Subscription extends BaseEntity {
  @Column({
    type: 'decimal',
    name: 'chat_id',
    transformer: new ColumnNumericTransformer(),
  })
  chatId: number;

  @Column({ type: 'varchar', length: 64 })
  name: string;

  @Column({ type: 'varchar', length: 512 })
  url: string;
}