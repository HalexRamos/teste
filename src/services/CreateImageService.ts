import { getRepository } from 'typeorm';
import path from 'path';

import AppError from '../errors/AppError';

import uploadConfig from '../config/upload';
import User from '../models/User';
import Product from '../models/Product';
import Image from '../models/Image';

interface Request {
  user_id: string;
  product_id: string;
  imageFilename: string;
}
class CreateImageService {
  public async execute({ user_id, product_id, imageFilename }: Request): Promise<Image> {
    const usersRepository = getRepository(User);
    const productsRepository = getRepository(Product);
    const imagesRepository = getRepository(Image);

    const checkUserExists = await usersRepository.findOne(user_id);

    if (!checkUserExists) {
      throw new AppError('User not found try other user');
    }

    const checkProductsExists = await productsRepository.findOne(product_id);

    if (!checkProductsExists) {
      throw new AppError('Product do not exists');
    }

    const [, numberProductsImages] = await imagesRepository.findAndCount({ where: { product_id } });

    if (numberProductsImages > 2) {
      throw new AppError('Product not found or product already 3 images');
    }

    const filePath = path.join(uploadConfig.directory, imageFilename);

    const imageProduct = imagesRepository.save({
      product_id,
      link: filePath,
    });

    return imageProduct;
  }
}

export default CreateImageService;
