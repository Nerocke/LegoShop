import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { AppDataSource } from './DataSource';

import rebrickableRoutes from './modules/rebrickable/rebrickable.routes';
import productRoutes from './modules/products/entity/product.routes';
import { authController } from './modules/auth/authController';
import userRoutes from './modules/user/user.routes';
import cartRoutes from './modules/cart/cart.routes';
import { userController } from './modules/user/userController';


async function bootstrap() {
  await AppDataSource.initialize();
  const app = express();

  app.use(cors());
  app.use(express.json()); 

  // Déclaration des routes
  app.use('/api/products', productRoutes);
  app.use('/api/rebrickable', rebrickableRoutes);
  app.use('/api/auth', authController); 
  app.use('/api/users', userRoutes);
  app.use('/api/cart', cartRoutes);
  app.use('/api/users', userController);


  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('REBRICKABLE_API_KEY =', process.env.REBRICKABLE_API_KEY);
  });
}

bootstrap().catch(err => {
  console.error('Failed to start server', err);
});
