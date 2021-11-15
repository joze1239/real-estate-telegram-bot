import {
  BaseEntity as TypeormBaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export default class BaseEntity extends TypeormBaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @CreateDateColumn({
    type: 'timestamptz',
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    name: 'updated_at',
  })
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true, name: 'deleted_at' })
  deletedAt: Date | null;
}
