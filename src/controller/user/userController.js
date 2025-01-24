import User from "../../model/userModel.js";
import error from "../../helpers/errors.js";
import { hashPassword } from "../../config/bcrypt.js";

/**
 * Obtiene todos los usuarios registrados.
 *
 * @async
 * @function getAllUsers
 * @throws {NO_USERS_FOUND} Si no se encuentran usuarios en la base de datos.
 * @returns {Promise<Array>} Retorna una lista de usuarios.
 *
 * @example
 * try {
 *   const users = await getAllUsers();
 *   console.log("Usuarios:", users);
 * } catch (error) {
 *   console.error("Error:", error.message);
 * }
 */
async function getAllUsers() {
    const users = await User.find();
    if (!users.length) {
        throw new error.NO_USERS_FOUND();
    }
    return users;
}

/** 
 * Obtiene un usuario por su identificador único.
 *
 * @async 
 * @function getUserById
 * @param {string} id - El ID del usuario.
 * @throws {USER_NOT_FOUND} Si el usuario no existe.
 * @returns {Promise<Object>} Retorna el objeto del usuario encontrado.
 *
 * @example
 * const user = await getUserById("60c72b2f9e7f4e23d8d9c013");
 * console.log("Usuario encontrado:", user);
 */
async function getUserById(id) {
    const user = await User.findById(id);
    if (!user) {
        throw new error.USER_NOT_FOUND();
    }
    return user;
}

/**
 * Obtiene un usuario por su correo electrónico.
 *
 * @async
 * @function getUserByEmail
 * @param {string} email - Correo electrónico del usuario.
 * @throws {USER_NOT_FOUND} Si el usuario no existe.
 * @returns {Promise<Object>} Retorna el usuario encontrado.
 *
 * @example
 * const user = await getUserByEmail("test@example.com");
 * console.log("Usuario encontrado:", user);
 */
async function getUserByEmail(email) {
    const user = await User.findOne({ email });
    if (!user) {
        throw new error.USER_NOT_FOUND();
    }
    return user;
}

/**
 * Obtiene un usuario por su nombre de usuario.
 *
 * @async
 * @function getUserByUsername
 * @param {string} username - Nombre de usuario.
 * @throws {USER_NOT_FOUND} Si el usuario no existe.
 * @returns {Promise<Object>} Retorna el usuario encontrado.
 *
 * @example
 * const user = await getUserByUsername("john_doe");
 * console.log("Usuario encontrado:", user);
 */
async function getUserByUsername(username) {
    const user = await User.findOne({ username });
    if (!user) {
        throw new error.USER_NOT_FOUND();
    }
    return user;
}

/**
 * Crea un nuevo usuario en la base de datos.
 *
 * @async
 * @function createUser
 * @param {string} username - Nombre de usuario.
 * @param {string} email - Correo electrónico del usuario.
 * @param {string} password - Contraseña del usuario.
 * @returns {Promise<Object>} Retorna el usuario recién creado.
 *
 * @example
 * const newUser = await createUser("john_doe", "test@example.com", "password123");
 * console.log("Nuevo usuario creado:", newUser);
 */
async function createUser(username, email, password) {
    const hash = await hashPassword(password);
    const newUser = new User({
        username,
        email,
        password: hash,
    });

    await newUser.save();
    return newUser;
}

/**
 * Actualiza la información de un usuario específico.
 *
 * @async
 * @function updateUser
 * @param {string} id - Identificador único del usuario.
 * @param {string} username - Nuevo nombre de usuario.
 * @param {string} email - Nuevo correo electrónico del usuario.
 * @param {string} [password] - Nueva contraseña del usuario.
 * @throws {USERNAME_ALREADY_EXISTS} Si el nuevo nombre de usuario ya existe.
 * @throws {EMAIL_ALREADY_EXISTS} Si el nuevo correo electrónico ya existe.
 * @returns {Promise<Object>} Retorna el usuario actualizado.
 *
 * @example
 * const updatedUser = await updateUser("60c72b2f9e7f4e23d8d9c013", "john_doe_updated", "new@example.com", "newpass123");
 * console.log("Usuario actualizado:", updatedUser);
 */
async function updateUser(id, username, email, password) {
    const user = await User.findById(id);
    if (!user) {
        throw new error.USER_NOT_FOUND();
    }

    const existingUserName = await User.findOne({ username });
    if (existingUserName && existingUserName._id.toString() !== id) {
        throw new error.USERNAME_ALREADY_EXISTS();
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail && existingEmail._id.toString() !== id) {
        throw new error.EMAIL_ALREADY_EXISTS();
    }

    user.username = username;
    user.email = email;
    if (password) {
        user.password = await hashPassword(password);
    }

    await user.save();
    return user;
}

export const functions = {
    getAllUsers,
    getUserById,
    getUserByEmail,
    getUserByUsername,
    createUser,
    updateUser
};
export default functions;
