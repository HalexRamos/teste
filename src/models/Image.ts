import {
  Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn,
} from 'typeorm';

import Product from './Product';

@Entity('images')
class Image {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  product_id: string;

  @OneToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product?: Product;

  @Column()
  link: string;
}

export default Image;
