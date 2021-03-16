import { Router } from 'express';

import ProductsController from '../controllers/Product';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const productsRouter = Router();
const productsControllers = new ProductsController();

productsRouter.use(ensureAuthenticated);

productsRouter.get('/:id', productsControllers.show);

productsRouter.get('/', productsControllers.index);

productsRouter.post('/', productsControllers.create);

productsRouter.delete('/:id', productsControllers.destroy);

export default productsRouter;
