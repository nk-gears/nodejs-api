import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Provider } from './Provider';
import { Profile } from './Profile';

@Entity()
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'varchar', length: 20, unique: true })
  public username: string;

  @OneToOne(() => Profile, { cascade: true })
  @JoinColumn()
  public profile: Profile;

  @OneToMany(() => Provider, provider => provider.account, {
    cascade: ['remove'],
  })
  public provider: Provider;
}
