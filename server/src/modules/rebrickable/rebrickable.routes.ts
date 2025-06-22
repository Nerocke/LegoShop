
import { Router, RequestHandler } from 'express';
import { RebrickableService }    from './RebrickableService';

const router = Router();
const service = new RebrickableService();


const searchSets: RequestHandler = async (req, res, next) => {
    try {
        const data = await service.searchSets(
            req.query.search as string,
            Number(req.query.page) || 1,
            Number(req.query.page_size) || 30
        );
        res.json(data);
    } catch (err) {
        next(err);
    }
};


const getSet: RequestHandler<{ setNum: string }> = async (req, res, next) => {
    try {
        const data = await service.getSet(req.params.setNum);
        res.json(data);
    } catch (err) {
        next(err);
    }
};


const importSet: RequestHandler<{ setNum: string }> = async (req, res, next) => {
    try {
        const product = await service.importSetAsProduct(req.params.setNum);
        res.status(201).json(product);
    } catch (err: any) {
        // Gestion explicite des erreurs 401 de clé invalide
        if (err.status === 401) {
            res.status(401).json({ error: err.message });
            return;
        }
        next(err);
    }
};

router.get('/sets',               searchSets);
router.get('/sets/:setNum',       getSet);
router.post('/sets/:setNum/import', importSet);

export default router;
