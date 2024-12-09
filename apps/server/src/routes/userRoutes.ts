import { Router } from "express";
import { SignUp, SignIn } from "../controllers/userController";

const router = Router();

router.post("/signup", SignUp);
router.post("/login", SignIn)

export const userRouter = router;