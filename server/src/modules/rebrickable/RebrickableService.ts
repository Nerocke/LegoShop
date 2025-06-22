import 'dotenv/config';
import axios, { AxiosInstance } from 'axios';
import { AppDataSource } from '../../DataSource';
import { Product } from '../products/entity/Product';

const BASE_URL = process.env.REBRICKABLE_API_URL || 'https://rebrickable.com/api/v3';

console.log(process.env.REBRICKABLE_API_KEY)
export class RebrickableService {
    private api: AxiosInstance;

    constructor() {
        const apiKey = process.env.REBRICKABLE_API_KEY;
        if (!apiKey) throw new Error('REBRICKABLE_API_KEY is not defined in .env');
        this.api = axios.create({
            baseURL: BASE_URL,
            headers: { Authorization: `key ${apiKey}` }
        });
    }

    async getSet(setNum: string): Promise<any> {
        const { data } = await this.api.get(`/lego/sets/${setNum}/`);
        return data;
    }

    async searchSets(query: string, page = 1, pageSize = 30): Promise<any> {
        const { data } = await this.api.get('/lego/sets/', {
            params: { search: query, page, page_size: pageSize }
        });
        return data;
    }

    async getPartsForSet(setNum: string, page = 1): Promise<any> {
        const { data } = await this.api.get(`/lego/sets/${setNum}/parts/`, {
            params: { page }
        });
        return data;
    }

    async importSetAsProduct(setNum: string): Promise<Product> {
        const setData = await this.getSet(setNum);
        const price = typeof setData.us_price === 'number'
            ? setData.us_price
            : parseFloat(setData.us_price as string) || 0;


        const repo = AppDataSource.getRepository(Product);


        const product = repo.create({
            nom: setData.name,
            description: setData.name,
            prix: price,
            stock: 0,
            imageUrl: setData.set_img_url
        });

        return repo.save(product);
    }
}
