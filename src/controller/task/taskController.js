import Task from "../../model/taskModel.js";
import error from "../../helpers/errors.js";

/**
 * Obtener todas las tareas con filtros opcionales.
 */
async function getAllTasks(filters) {
    const { completed, search, priority } = filters;
    const query = {};

    if (completed !== undefined) {
        query.completed = completed === "true"; // Convierte el valor a booleano
    }

    if (search) {
        query.$or = [
            { title: { $regex: search, $options: "i" } }, // Búsqueda en título
            { description: { $regex: search, $options: "i" } }, // Búsqueda en descripción
        ];
    }

    if (priority) {
        query.priority = priority; // Filtro por prioridad
    }

    return await Task.find(query).sort({ createdAt: -1 }); // Ordenar por fecha de creación descendente
}

/**
 * Obtener una tarea por su ID.
 */
async function getTaskById(taskId) {
    const task = await Task.findById(taskId);
    if (!task) {
        throw new error.TASK_NOT_FOUND(); // Error si no se encuentra la tarea
    }
    return task;
}

/**
 * Crear una nueva tarea.
 */
async function createTask(taskData) {
    try {
        const newTask = new Task(taskData); // Crear instancia de tarea
        return await newTask.save(); // Guardar tarea en la base de datos
    } catch (err) {
        console.error("Error al crear tarea:", err);
        throw new error.VALIDATION_ERROR(); // Lanzar error de validación si ocurre
    }
}

/**
 * Actualizar una tarea por su ID.
 */
async function updateTask(taskId, taskData) {
    const task = await Task.findById(taskId); // Buscar tarea por ID
    if (!task) {
        throw new error.TASK_NOT_FOUND(); // Error si no se encuentra la tarea
    }

    Object.assign(task, taskData); // Actualizar campos de la tarea
    return await task.save(); // Guardar los cambios
}

/**
 * Obtener todas las tareas de un usuario específico.
 */
async function getTasksByUserId(userId) {
    try {
      console.log("ENTRA TASKBYUSERID CONTROLLER"); 
      // Buscar tareas por `user_id`
      const tasks = await Task.find({ user_id: userId }).sort({ createdAt: -1 });
      console.log("TASKssssssssss", tasks);
      return tasks; // Retornar las tareas encontradas
    } catch (err) {
      console.error("Error en getTasksByUserId:", err.message);
      throw err; // Lanzar el error para que el controlador lo maneje
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
      const deletedTask = await Task.findByIdAndDelete(taskId); // Eliminar la tarea
      if (!deletedTask) {
        throw new errors.TASK_NOT_FOUND(); // Lanzar error si no se encuentra la tarea
      }
      return deletedTask; // Devolver la tarea eliminada
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
