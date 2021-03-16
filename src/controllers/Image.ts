import { Request, Response } from 'express';
import CreateImageService from '../services/CreateImageService';

export default class ImagesController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { id: user_id } = request.user;
      const { product_id } = request.params;
      const createImageService = new CreateImageService();

      const product = await createImageService.execute({
        user_id, product_id,
      });
      return response.json(product);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
