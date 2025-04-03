import express from 'express';
import 'dotenv/config';
import { AppDataSource } from './DataSource';
import rebrickableRoutes from './modules/rebrickable/rebrickable.routes';
import productRoutes from "./modules/products/entity/product.routes";
import 'dotenv/config';

async function bootstrap() {
  await AppDataSource.initialize();
  const app = express();
  app.use(express.json());
  app.use('/api/products', productRoutes);

  // Monte les routes
  app.use('/api/rebrickable', rebrickableRoutes);
  // app.use('/api/products', productRoutes);
  // …

  app.listen(4000, () => {
    console.log('Server running on http://localhost:4000');
    console.log('REBRICKABLE_API_KEY =', process.env.REBRICKABLE_API_KEY);

  });
}

bootstrap().catch(err => {
  console.error('Failed to start server', err);
});
