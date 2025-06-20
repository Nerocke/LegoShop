import { DataSource } from 'typeorm'
import { User } from './modules/user/userEntity'
import { Product } from './modules/products/entity/Product';
import { CartItem } from "./modules/cart/cartEntity";


export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'azerty',
  database: 'postgres',
  entities: [User, Product, CartItem],
  migrations: ['src/migrations/*.ts'],
  synchronize: true,
  logging: false,
})
