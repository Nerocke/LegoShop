import { AppDataSource } from "../../DataSource";
import { CartItem } from "./cartEntity";

export const cartRepository = AppDataSource.getRepository(CartItem);
