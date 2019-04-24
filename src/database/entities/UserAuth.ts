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
export class UserAuth extends BaseEntity {
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

  @ManyToOne(() => UserAccount, userAccount => userAccount.userAuth, {
    cascade: ['insert'],
  })
  public userAccount: UserAccount;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
