/* eslint-disable import/no-extraneous-dependencies */
import { Expose } from 'class-transformer';
import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('users')
class User {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  avatar: string;

  @Column()
  driver_license: string;

  @Column()
  is_admin: boolean;

  @CreateDateColumn()
  created_at: Date;

  @Expose({ name: 'avatar_url' })
  avatar_url(): string {
    switch (process.env.DISK) {
      case 's3':
        return `${process.env.AWS_BUCKET_URL}/avatar/${this.avatar}`;
      case 'local':
        return `${process.env.APP_API_URL}/avatar/${this.avatar}`;
      default:
        return null;
    }
  }

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { User };
