import { Router } from "express";
import taskApiController from "../controller/task/taskApiController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/", taskApiController.getAllTasks);
router.get("/user/:userId", isAuthenticated, taskApiController.getTasksByUserId);
router.get("/category/:category", taskApiController.getTasksByCategory);
router.post("/", taskApiController.createTask);     
router.put("/:id", taskApiController.updateTask);   
router.delete("/:id/delete", taskApiController.deleteTask);
router.get("/:id", taskApiController.getTaskById);

export default router;
