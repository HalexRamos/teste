import { getRepository } from 'typeorm';
import User from '../models/User';
import Product from '../models/Product';

import AppError from '../errors/AppError';

interface Request {
  id: string;
  user_id: string;
}

class DeleteProductService {
  public async execute({ id, user_id }:Request): Promise<Product> {
    const productsRepository = getRepository(Product);
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: { id: user_id },
    });

    if (!checkUserExists) {
      throw new AppError('User not found, try other user');
    }

    const checkProductsExists = await productsRepository.findOne({
      where: { id },
    });

    if (!checkProductsExists) {
      throw new AppError('Product not found');
    }

    await productsRepository.delete({
      id,
    });

    return checkProductsExists;
  }
}

export default DeleteProductService;
