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
            required: true,
        },
        user_id: {
            type: String,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("tasks", taskSchema);
