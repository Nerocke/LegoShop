// server/src/modules/products/product.routes.ts
import { Router } from 'express';
import { ProductController } from './ProductController';

const router = Router();
router.get('/',    ProductController.list);
router.get('/:id', ProductController.get);
router.post('/',   ProductController.create);
router.put('/:id', ProductController.update);
router.delete('/:id', ProductController.remove);

export default router;
