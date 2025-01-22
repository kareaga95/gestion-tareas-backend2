import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "El título es obligatorio"],
            trim: true,
        },
        description: {
            type: String,
            trim: true,
            default: "",
        },
        completed: {
            type: Boolean,
            default: false,
        },
        dueDate: {
            type: Date,
            default: null,
        },
        priority: {
            type: String,
            enum: ["baja", "media", "alta"],
            default: "media",
        },
        category: {
            type: String,
            enum: ["hogar", "trabajo", "clase"],
            default: "trabajo",
        },
        user_id: {
            type: String, // Tipo ObjectId para relacionar con usuarios
            ref: "User", // Nombre del modelo de usuarios
            required: true, // Asegurar que cada tarea esté asociada a un usuario
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("tasks", taskSchema);
