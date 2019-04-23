import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class UserAccount extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({
    type: 'enum',
    enum: ['local', 'google', 'facebook'],
    default: 'local',
  })
  public provider: 'local' | 'google' | 'facebook';

  @Column({ type: 'varchar', nullable: true })
  public providerId: string;

  @Column({ type: 'varchar' })
  public email: string;

  @Column({ type: 'boolean', width: 1, default: 'false' })
  public emailVerified: boolean;

  @Column({ type: 'varchar', nullable: true })
  public password: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
