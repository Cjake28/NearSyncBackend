import mysql from 'mysql2';
import dotenv from 'dotenv';

try {
    dotenv.config();
} catch (error) {
    console.warn("⚠️ dotenv could not be loaded. Ensure environment variables are set.");
}

const db = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.DB_PORT,
}).promise();

export default db;