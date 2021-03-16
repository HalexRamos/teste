import { container } from 'tsyringe';
import { Request, Response } from 'express';
import FindProductService from '../services/FindProductService';
import ListProductService from '../services/ListProductService';
import DeleteProductService from '../services/DeleteProductService';
import CreateProductService from '../services/CreateProductService';

export default class ProductsController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.user;
      const { name, description, price } = request.body;
      const createProductService = new CreateProductService();

      const product = await createProductService.execute({
        name, description, price, user_id: id,
      });
      return response.json(product);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async show(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      const findProductService = new FindProductService();

      const product = await findProductService.execute({ id });

      return response.json(product);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const listProducts = container.resolve(ListProductService);
      const products = await listProducts.execute();
      return response.json(products);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async destroy(request: Request, response: Response): Promise<Response> {
    try {
      const { id: user_id } = request.user;
      const { id } = request.params;
      const deleteProduct = container.resolve(DeleteProductService);
      const product = await deleteProduct.execute({ id, user_id });
      return response.json(product);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
