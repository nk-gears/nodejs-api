import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserAccount } from './UserAccount';

@Entity()
export class PasswordToken extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'varchar', unique: true })
  public token: string;

  @OneToOne(() => UserAccount)
  @JoinColumn()
  public userAccount: UserAccount | string;

  @Column({ type: 'datetime' })
  public expiresIn: Date;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
