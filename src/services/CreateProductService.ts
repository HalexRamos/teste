import { getRepository } from 'typeorm';
import User from '../models/User';
import Product from '../models/Product';

import AppError from '../errors/AppError';

interface Request {
  name: string;
  price: number;
  description: string;
  user_id: string;
}

class CreateProductService {
  public async execute({
    name, price, description, user_id,
  }: Request): Promise<Product> {
    const productsRepository = getRepository(Product);
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: { id: user_id },
    });

    if (!checkUserExists) {
      throw new AppError('User not found try other user');
    }

    const checkProductsExists = await productsRepository.findOne({
      where: { name },
    });

    if (checkProductsExists) {
      throw new AppError('Product already exists');
    }

    const product = productsRepository.create({
      name,
      price,
      description,
      user_id,
    });

    await productsRepository.save(product);

    return product;
  }
}

export default CreateProductService;
