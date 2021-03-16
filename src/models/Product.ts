import {
  Entity, Column, PrimaryGeneratedColumn, OneToMany,
} from 'typeorm';

import Image from './Image';

@Entity('products')
class Product {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column()
  user_id: string;

  @OneToMany(() => Image, (image) => image)
  images?: Image[];
}

export default Product;
