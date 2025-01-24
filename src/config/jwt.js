import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const SECRET = process.env.JWT_SECRET;

function sign(data) {
    const token = jwt.sign(data, SECRET);
    return token;
}

function verify(token) {
    try {
        const response = jwt.verify(token,SECRET);
        return response;
    } catch (error) {
        console.error(error);
        return { error: "Can't verify token", status: 500 };
    }
}

function generateVerificationToken(userId){
    const payload = { id: userId };
    const token = jwt.sign(payload, SECRET);
    return token;
};

export default {
    sign,
    verify,
    generateVerificationToken
};
