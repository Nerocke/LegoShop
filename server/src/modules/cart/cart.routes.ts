import { Router } from 'express';

const router = Router();

let cart: any[] = [];

router.get('/', (req, res) => {
  res.json(cart);
});

router.post("/", (req, res) => {
  const { set_num, name, quantity, set_img_url, price } = req.body;

  const existingItem = cart.find((item) => item.set_num === set_num);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ set_num, name, quantity, set_img_url, price });
  }

  res.json(cart);
});

router.delete('/:set_num', (req, res) => {
  const { set_num } = req.params;
  cart = cart.filter((item) => item.set_num !== set_num);
  res.json(cart);
});

export default router;
