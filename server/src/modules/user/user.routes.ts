import { Router, Request, Response } from "express";
import { userRepository } from "./userRepository";

const userRoutes = Router();


userRoutes.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await userRepository.find();
    res.json(users);
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
})



userRoutes.post("/", async (req: Request, res: Response): Promise<void> => {
  const { login, password, role } = req.body;

  if (!login || !password || !["user", "admin"].includes(role)) {
    res.status(400).json({ message: "Invalid input" });
    return;
  }

  try {
    const existing = await userRepository.findOneBy({ login });
    if (existing) {
      res.status(409).json({ message: "Login already taken" });
      return;
    }

    const user = userRepository.create({ login, password, role });
    const savedUser = await userRepository.save(user);
    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
})

export default userRoutes;
