import {
  Entity, Column, PrimaryGeneratedColumn, OneToMany,
} from 'typeorm';

import Product from './Product';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Product, (product) => product)
  products: Product[];

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
}

export default User;
