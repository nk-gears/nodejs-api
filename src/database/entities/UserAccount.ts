import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { UserProfile } from './UserProfile';
import { UserAuth } from './UserAuth';

@Entity()
export class UserAccount extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'varchar', length: 20, unique: true })
  public username: string;

  @OneToOne(() => UserProfile, { cascade: true })
  @JoinColumn()
  public userProfile: UserProfile;

  @OneToMany(() => UserAuth, userAuth => userAuth.userAccount, {
    cascade: true,
  })
  public userAuth: UserAuth;
}
