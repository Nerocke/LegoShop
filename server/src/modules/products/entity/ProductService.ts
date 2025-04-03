import { AppDataSource } from '../../../DataSource';
import { Product } from './Product';

export class ProductService {
    private repo = AppDataSource.getRepository(Product);

    findAll() {
        return this.repo.find();
    }

    findOne(id: string) {
        return this.repo.findOneBy({ id });
    }

    create(data: Partial<Product>) {
        const p = this.repo.create(data);
        return this.repo.save(p);
    }

    async update(id: string, data: Partial<Product>) {
        await this.repo.update(id, data);
        return this.findOne(id);
    }

    remove(id: string) {
        return this.repo.delete(id);
    }
}
