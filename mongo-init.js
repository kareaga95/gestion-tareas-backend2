db = db.getSiblingDB("gestion_tareas"); // MISMO NOMBRE QUE DATABASE

// Usuarios
db.users.insertMany([
    { username: "Alice Johnson", email: "1@gmail.com", password: "$2a$10$OkKKy0X0kMV1wTqJGryGReLQxZTy1iZdxS5gAMc8xSU.ivYF3Gy8u", rol: "client", active: true },
    { username: "Bob Smith", email: "bob@example.com", password: "$2a$10$OkKKy0X0kMV1wTqJGryGReLQxZTy1iZdxS5gAMc8xSU.ivYF3Gy8u", rol: "client", active: true },
    { username: "Carol Williams", email: "carol@example.com", password: "$2a$10$OkKKy0X0kMV1wTqJGryGReLQxZTy1iZdxS5gAMc8xSU.ivYF3Gy8u", rol: "client", active: true },
    { username: "Dave Brown", email: "dave@example.com", password: "$2a$10$OkKKy0X0kMV1wTqJGryGReLQxZTy1iZdxS5gAMc8xSU.ivYF3Gy8u", rol: "client", active: true },
    { username: "Eve Davis", email: "eve@example.com", password: "$2a$10$OkKKy0X0kMV1wTqJGryGReLQxZTy1iZdxS5gAMc8xSU.ivYF3Gy8u", rol: "client", active: true },
    { username: "Frank Moore", email: "frank@example.com", password: "$2a$10$OkKKy0X0kMV1wTqJGryGReLQxZTy1iZdxS5gAMc8xSU.ivYF3Gy8u", rol: "client", active: true },
    { username: "Grace Lee", email: "grace@example.com", password: "$2a$10$OkKKy0X0kMV1wTqJGryGReLQxZTy1iZdxS5gAMc8xSU.ivYF3Gy8u", rol: "client", active: true },
    { username: "Henry White", email: "henry@example.com", password: "$2a$10$OkKKy0X0kMV1wTqJGryGReLQxZTy1iZdxS5gAMc8xSU.ivYF3Gy8u", rol: "client", active: true },
    { username: "Irene Clark", email: "irene@example.com", password: "$2a$10$OkKKy0X0kMV1wTqJGryGReLQxZTy1iZdxS5gAMc8xSU.ivYF3Gy8u", rol: "client", active: true },
    { username: "Jack Thompson", email: "jack@example.com", password: "$2a$10$OkKKy0X0kMV1wTqJGryGReLQxZTy1iZdxS5gAMc8xSU.ivYF3Gy8u", rol: "admin", active: true }
]);


// Tareas
db.users.insertMany([
    {
        title: "Revisar correos", description: "Responder a los correos pendientes de la semana", completed: false, dueDate: "2025-01-18T12:00:00Z", priority: "alta"
    },
    {
        title: "Planificar reunión", description: "Preparar la agenda para la reunión del equipo", completed: true, dueDate: "2025-01-15T09:00:00Z", priority: "media"
    },
    {
        title: "Comprar material de oficina",
        description: "Comprar bolígrafos, papel y carpetas",
        completed: false,
        dueDate: "2025-01-20T14:00:00Z",
        priority: "baja"
    },
    {
        title: "Actualizar software",
        description: "Actualizar el software de los equipos de la oficina",
        completed: false,
        dueDate: "2025-01-19T10:30:00Z",
        priority: "media"
    },
    {
        title: "Escribir informe mensual",
        description: "Preparar el informe de actividades del mes",
        completed: false,
        dueDate: "2025-01-25T18:00:00Z",
        priority: "alta"
    },
    {
        title: "Revisar contrato",
        description: "Analizar el contrato del nuevo proveedor",
        completed: true,
        dueDate: null,
        priority: "baja"
    }
]);


