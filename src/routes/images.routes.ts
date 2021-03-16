import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateImageService from '../services/CreateImageService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const imagesRouter = Router();
const upload = multer(uploadConfig);

imagesRouter.patch(
  '/:id', ensureAuthenticated,
  upload.single('link'),
  async (request, response) => {
    try {
      const { id: user_id } = request.user;
      const { id: product_id } = request.params;
      const imageFilename = request.file.filename;
      const createImageService = new CreateImageService();

      const image = await createImageService.execute({
        user_id,
        product_id,
        imageFilename,
      });

      return response.json(image);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  },
);

export default imagesRouter;
