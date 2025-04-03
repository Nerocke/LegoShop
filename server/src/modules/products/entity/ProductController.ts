// server/src/modules/products/ProductController.ts
import { RequestHandler } from 'express';
import { ProductService } from './ProductService';

const svc = new ProductService();

export class ProductController {
    static list: RequestHandler = async (_req, res, next) => {
        try {
            const all = await svc.findAll();
            res.json(all);
        } catch (err) {
            next(err);
        }
    };

    static get: RequestHandler = async (req, res, next) => {
        try {
            const p = await svc.findOne(req.params.id);
            if (!p) {
                res.status(404).json({ message: 'Not found' });
                return;
            }
            res.json(p);
        } catch (err) {
            next(err);
        }
    };

    static create: RequestHandler = async (req, res, next) => {
        try {
            const p = await svc.create(req.body);
            res.status(201).json(p);
        } catch (err) {
            next(err);
        }
    };

    static update: RequestHandler = async (req, res, next) => {
        try {
            const p = await svc.update(req.params.id, req.body);
            res.json(p);
        } catch (err) {
            next(err);
        }
    };

    static remove: RequestHandler = async (req, res, next) => {
        try {
            await svc.remove(req.params.id);
            res.status(204).send();
        } catch (err) {
            next(err);
        }
    };
}
