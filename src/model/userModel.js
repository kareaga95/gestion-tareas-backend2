import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "El nombre de usuario es obligatorio"],
      unique: true,
      trim: true,
      maxlength: 70,
    },
    email: {
      type: String,
      required: [true, "El email es obligatorio"],
      unique: true,
      trim: true,
      maxlength: 255,
    },
    password: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
      minlength: 8,  // Requerimiento adicional para seguridad
    },
    rol: {
      type: String,
      enum: ["client", "admin"],
      default: "client",
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,  // Agrega automáticamente `createdAt` y `updatedAt`
  }
);

export default mongoose.model("users", userSchema);
