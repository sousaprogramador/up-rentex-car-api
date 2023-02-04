import { Entity, PrimaryColumn, Column ,CreateDateColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

@Entity('users')
class User {

  @PrimaryColumn('uuid')
  id:string;

  @Column()
  first_name:string;

  @Column()
  last_name:string;

  @Column()
  email:string;

  @Column()
  password:string;

  @Column()
  avatar:string;

  @Column()
  driver_license:string;

  @Column()
  is_admin:boolean;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }

}

export { User }
