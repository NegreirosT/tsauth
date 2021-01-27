import { Entity, PrimaryColumn, Column, BeforeInsert, BeforeUpdate } from 'typeorm';
import bcrypt from 'bcryptjs';
import { Exclude } from 'class-transformer';

@Entity('users')
class User{

  @PrimaryColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword(){
    this.password = bcrypt.hashSync(this.password, 8)
  }
}

export default User;