import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

type ProviderType = 'local' | 'google' | 'facebook';

@Entity()
export class UserAccount extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
    type: 'enum',
    enum: ['local', 'google', 'facebook'],
    default: 'local',
  })
  public provider: ProviderType;

  @Column({ type: 'varchar', length: 100, unique: true, nullable: true })
  public providerId: string;

  @Column({ type: 'varchar', length: 100 })
  public name: string;

  @Column({ type: 'varchar', nullable: true })
  public avatar: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  public email: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  public password: string;

  @CreateDateColumn({ type: 'datetime' })
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
