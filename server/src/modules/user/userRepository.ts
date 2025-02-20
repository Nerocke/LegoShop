import { AppDataSource } from '../../DataSource'
import { User } from './userEntity'

export const userRepository =
  AppDataSource.getRepository(User)
