import { Router } from 'express';

const router = Router();

router.get('/products', (req, res) => {
    res.send('List of products');
});

router.get('/products/:id', (req, res) => {
    res.send(`Product ${req.params.id}`);
});

export default router;
