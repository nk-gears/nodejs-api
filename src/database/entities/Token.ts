import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { UserAccount } from './UserAccount';

@Entity()
export class Token extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'enum', enum: ['reset-password', 'email-verification'] })
  public type: 'reset-password' | 'email-verification';

  @Column({ type: 'varchar', unique: true })
  public token: string;

  @ManyToOne(() => UserAccount)
  public user: UserAccount;

  @Column({ type: 'datetime' })
  public expiresIn: Date;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
