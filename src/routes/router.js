import { Router } from "express";
import taskRouter from "./taskRouter.js";
import authRouter from "./authRouter.js";
import userRouter from "./userRouter.js";
const router = Router();

router.use("/tasks", taskRouter);
router.use("/auth", authRouter);
router.use("/users", userRouter);

export default router;
