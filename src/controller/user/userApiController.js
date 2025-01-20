import userController from "./userController.js";

async function getAllUsers(req, res) {
    console.log("GETALLUSERS")
    try {
        const users = await userController.getAllUsers();
        console.log("USERS", users);
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        if (error.status) {
            res.status(error.status);
        } else {
            res.status(500);
        }
        res.json({ error: error.message });
    }
}

async function getUserByEmail(req, res) {
    try {
        console.log("ENTRA3", req.params.email);
        const users = await userController.getUserByEmail(req.params.email);
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        if (error.status) {
            res.status(error.status);
        } else {
            res.status(500);
        }
        res.json({ error: error.message });
    }
}

async function getUserByUsername(req, res) {
    try {
        const users = await userController.getUserByUsername(req.params.username);
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        if (error.status) {
            res.status(error.status);
        } else {
            res.status(500);
        }
        res.json({ error: error.message });
    }
}

async function getUserById(req, res) {
    try {
        const users = await userController.getUserById(req.params.id);
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        if (error.status) {
            res.status(error.status);
        } else {
            res.status(500);
        }
        res.json({ error: error.message });
    }
}

async function createUser(req, res) {
    try {
        const { username, email, password } = req.body;
        const newUser = await userController.createUser(username, email, password);
        res.status(201).json(newUser);
    } catch (error) {
        handleError(res, error);
    }
}

async function updateUser(req, res) {
    try {  
        const { username, email, password, rol } = req.body;
        const updatedUser = await userController.updateUser(req.params.id, username, email, password, rol);
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        if (error.status) {
            res.status(error.status);
        } else {
            res.status(500);
        }
        res.json({ error: error.message });
    }
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