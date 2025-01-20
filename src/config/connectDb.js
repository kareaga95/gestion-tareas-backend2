import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const DB_USER = process.env.MONGO_USER;
const DB_PASSWORD = process.env.MONGO_PASSWORD;
const DB_HOST = process.env.MONGO_HOST;
const DB_PORT = process.env.MONGO_PORT || 27017;
const DB_NAME = process.env.MONGO_DATABASE;

async function connectDb() {
    try {
        const uri = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;
        await mongoose.connect(uri);  // Se eliminan las opciones obsoletas
        console.log('Conectado a la base de datos MongoDB');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        process.exit(1);  // Finaliza la aplicación si hay un error
    }
}

export default connectDb;
