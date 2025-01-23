import taskController from "./taskController.js";
import errors from "../../helpers/errors.js";

async function getAllTasks(req, res) {
    try {
        const tasks = await taskController.getAllTasks(req.query);
        res.status(200).json(tasks.map((task) => task.toJSON())); // Enviar tareas como JSON
    } catch (err) {
        console.error("Error en getAllTasks:", err);
        res.status(err.status || 500).json({ error: err.message || "Error interno del servidor" });
    }
}

async function getTaskById(req, res) {
    try {
        const taskId = req.params.id;
        const task = await taskController.getTaskById(taskId);
        if (!task) {
            throw new errors.TASK_NOT_FOUND();
        }
        res.status(200).json(task.toJSON());
    } catch (err) {
        console.error("Error en getTaskById:", err);
        res.status(err.status || 500).json({ error: err.message || "Error interno del servidor" });
    }
}

async function getTasksByUserId(req, res) {
    try {   
        const userId = req.params.userId;
        const tasks = await taskController.getTasksByUserId(userId);
        res.status(200).json(tasks.map((task) => task.toJSON()));
    } catch (err) {
        console.error("Error en getTasksByUserId:", err);
        res.status(err.status || 500).json({ error: err.message || "Error interno del servidor" });
    }
}

async function getTasksByCategory(req, res) {
    try {
        const category = req.params.category; // Obtener la categoría de los parámetros
        const tasks = await taskController.getTasksByCategory(category);
        res.status(200).json(tasks.map((task) => task.toJSON())); // Enviar tareas como JSON
    } catch (err) {
        console.error("Error en getTasksByCategory:", err);
        res.status(err.status || 500).json({ error: err.message || "Error interno del servidor" });
    }
}

async function createTask(req, res) {
    try {
        const newTask = await taskController.createTask(req.body);
        res.status(201).json(newTask.toJSON());
    } catch (err) {
        console.error("Error en createTask:", err);
        res.status(err.status || 500).json({ error: err.message || "Error al crear la tarea" });
    }
}

async function updateTask(req, res) {
    try {
        const taskId = req.params.id;
        const updatedTask = await taskController.updateTask(taskId, req.body);
        if (!updatedTask) {
            throw new errors.TASK_NOT_FOUND();
        }
        res.status(200).json(updatedTask.toJSON());
    } catch (err) {
        console.error("Error en updateTask:", err);
        res.status(err.status || 500).json({ error: err.message || "Error al actualizar la tarea" });
    }
}

async function deleteTask(req, res) {
    try {
      const taskId = req.params.id;
      const deletedTask = await taskController.deleteTask(taskId);
      res.status(200).json({ message: "Tarea eliminada con éxito", task: deletedTask });
    } catch (err) {
      console.error("Error en deleteTask API Controller:", err);
      res.status(err.status || 500).json({ error: err.message || "Error al eliminar la tarea" });
    }
  }

export const taskApiController = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    getTasksByUserId,
    getTasksByCategory
};

export default taskApiController;
