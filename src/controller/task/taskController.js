import Task from "../../model/taskModel.js";
import error from "../../helpers/errors.js";

/**
 * Obtener todas las tareas con filtros opcionales.
 */
async function getAllTasks(filters) {
    const { completed, search, priority } = filters;
    const query = {};

    if (completed !== undefined) {
        query.completed = completed === "true";
    }

    if (search) {
        query.$or = [
            { title: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
        ];
    }

    if (priority) {
        query.priority = priority;
    }

    return await Task.find(query).sort({ createdAt: -1 });
}

/**
 * Obtener una tarea por su ID.
 */
async function getTaskById(taskId) {
    const task = await Task.findById(taskId);
    if (!task) {
        throw new error.TASK_NOT_FOUND();
    }
    return task;
}

/**
 * Crear una nueva tarea.
 */
async function createTask(taskData) {
    try {
        const newTask = new Task(taskData);
        return await newTask.save();
    } catch (err) {
        console.error("Error al crear tarea:", err);
        throw new error.VALIDATION_ERROR();
    }
}

/**
 * Actualizar una tarea por su ID.
 */
async function updateTask(taskId, taskData) {
    const task = await Task.findById(taskId);
    if (!task) {
        throw new error.TASK_NOT_FOUND();
    }

    Object.assign(task, taskData); 
    return await task.save();
}

/**
 * Obtener todas las tareas de un usuario específico.
 */
async function getTasksByUserId(userId) {
    try {
      const tasks = await Task.find({ user_id: userId }).sort({ createdAt: -1 });
      return tasks;
    } catch (err) {
      console.error("Error en getTasksByUserId:", err.message);
      throw err;
    }
  }
/**
 * Obtener todas las tareas de una categoría específica.
 */
async function getTasksByCategory(category) {
    return await Task.find({ category }).sort({ createdAt: -1 });
}

/**
 * Eliminar una tareaa.
 */
async function deleteTask(taskId) {
    try {
      const deletedTask = await Task.findByIdAndDelete(taskId);
      if (!deletedTask) {
        throw new errors.TASK_NOT_FOUND();
      }
      return deletedTask;
    } catch (err) {
      console.error("Error en deleteTask controller:", err);
      throw err;
    }
  }

export const taskController = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    getTasksByUserId,
    getTasksByCategory
};

export default taskController;
