class AppError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

// -----------------------LOGIN AND REGISTER---------------------------------
class USER_NOT_FOUND extends AppError {
    constructor() {
        super("Usuario no encontrado", 404);
    }
}

class PASSWORD_NOT_MATCH extends AppError {
    constructor() {
        super("Contraseñas no coinciden", 400);
    }
}

class USER_ALREADY_EXISTS extends AppError {
    constructor() {
        super("El usuario ya existe", 409);
    }
}

class EMAIL_ALREADY_EXISTS extends AppError {
    constructor() {
        super("El email ya está en uso", 409);
    }
}

class USERNAME_ALREADY_EXISTS extends AppError {
    constructor() {
        super("El nombre de usuario ya está en uso", 409);
    }
}

class INVALID_CREDENTIALS extends AppError {
    constructor() {
        super("Credenciales inválidas", 401);
    }
}

class USER_NOT_ACTIVE extends AppError {
    constructor() {
        super("El usuario no está activo", 403);
    }
}

// -----------------------------USERS-------------------------------------

class NO_USERS_FOUND extends AppError {
    constructor() {
        super("No hay usuarios", 403);
    }
}

class NO_USERS_SONG extends AppError {
    constructor() {
        super("La canción no pertenece al usuario", 403);
    }
}

export const errors = {
    USER_NOT_FOUND,
    PASSWORD_NOT_MATCH,
    USER_ALREADY_EXISTS,
    EMAIL_ALREADY_EXISTS,
    USER_NOT_ACTIVE,
    USERNAME_ALREADY_EXISTS,
    INVALID_CREDENTIALS,
    NO_USERS_FOUND,
    USER_NOT_FOUND,
    NO_USERS_SONG,
 
};

export default errors;
