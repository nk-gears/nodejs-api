import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Account } from './Account';

@Entity()
export class Provider extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
    type: 'enum',
    enum: ['local', 'google', 'instagram'],
    default: 'local',
  })
  public provider: 'local' | 'google' | 'instagram';

  @Column({ type: 'varchar', nullable: true })
  public providerId: string;

  @Column({ type: 'varchar', nullable: true })
  public email: string;

  @Column({ type: 'varchar', nullable: true })
  public password: string;

  @ManyToOne(() => Account, account => account.provider)
  public account: Account;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
