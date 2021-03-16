import { getRepository } from 'typeorm';
import Product from '../models/Product';

class ListProductService {
  public async execute(): Promise<Product> {
    const productsRepository = getRepository(Product);
    const products = await productsRepository.find();

    return products;
  }
}
export default ListProductService;
