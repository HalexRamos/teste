import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Product from '../models/Product';

interface Request {
  id: string;
}

class FindProductService {
  public async execute({ id }: Request): Promise<Product> {
    const productsRepository = getRepository(Product);
    const product = await productsRepository.findOne({
      id,
    });

    if (!product) {
      throw new AppError('product not found');
    }

    return product;
  }
}

export default FindProductService;
