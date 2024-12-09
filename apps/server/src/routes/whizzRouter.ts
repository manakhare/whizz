import {Router} from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { CreateWhizz, GetTriggers, GetActions, GetWhizzes, UpdateWhizz, DeleteWhizz } from "../controllers/whizzController";

const router = Router();

// whizz
router.post("/", authMiddleware, CreateWhizz);
router.get("/", authMiddleware, GetWhizzes);
router.put("/update", authMiddleware, UpdateWhizz);
router.delete("/delete/:id", authMiddleware, DeleteWhizz);

// router.post("/zap_name", authMiddleware, CreateWhizzName);
// router.get("/:id", authMiddleware, GetWhizz);

// triggers
// router.post("/:id/trigger", authMiddleware, AddTrigger);
router.get("/all-triggers", authMiddleware, GetTriggers)

// actions
// router.post("/:id/action", authMiddleware, AddAction);
router.get("/all-actions", authMiddleware, GetActions);

export const whizzRouter = router;