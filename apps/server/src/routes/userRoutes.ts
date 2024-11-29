import { Router } from "express";
import { SignUp, SignIn } from "../controllers/userController";

const router = Router();

router.post("/signup", SignUp);
router.post("/signin", SignIn)

export const userRouter = router;