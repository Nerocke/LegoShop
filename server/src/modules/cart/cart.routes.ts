import { Router, Request, Response } from "express";
import { cartRepository } from "./cartRepository";
import { userRepository } from "../user/userRepository";
import jwt from "jsonwebtoken";

const cartRoutes = Router();

function getUserId(req: Request): string | null {
  const auth = req.headers.authorization;
  if (!auth) return null;

  const token = auth.split(" ")[1];
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded.id;
  } catch {
    return null;
  }
}

// GET /api/cart - récupérer le panier
cartRoutes.get("/", async (req: Request, res: Response) => {
  const userId = getUserId(req);
  if (!userId) return res.sendStatus(401);

  const cart = await cartRepository.find({ where: { userId } });
  res.json(cart);
});

// POST /api/cart - ajouter un set au panier
cartRoutes.post("/", async (req: Request, res: Response) => {
  const userId = getUserId(req);
  if (!userId) return res.sendStatus(401);

  const { set_num, name, quantity } = req.body;
  const existing = await cartRepository.findOneBy({ userId, set_num });

  if (existing) {
    existing.quantity += quantity;
    await cartRepository.save(existing);
  } else {
    await cartRepository.save({ userId, set_num, name, quantity });
  }

  const updated = await cartRepository.find({ where: { userId } });
  res.status(201).json(updated);
});

// DELETE /api/cart/:set_num - supprimer un set
cartRoutes.delete("/:set_num", async (req: Request, res: Response) => {
  const userId = getUserId(req);
  if (!userId) return res.sendStatus(401);

  const { set_num } = req.params;
  await cartRepository.delete({ userId, set_num });

  const updated = await cartRepository.find({ where: { userId } });
  res.json(updated);
});

export default cartRoutes;
