import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class UserProfile extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'varchar' })
  public name: string;

  @Column({ type: 'date', nullable: true })
  public birthdate: Date;

  @Column({ type: 'enum', enum: ['male', 'female'], nullable: true })
  public gender: 'male' | 'female';

  @Column({ type: 'json', nullable: true })
  public address: {
    cityOrRegency: string;
    province: string;
    country: string;
  };

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
