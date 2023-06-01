import express from "express";
import { register, login, getInfo } from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/info", requireSignIn, getInfo);

router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router;
