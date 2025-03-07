import db from '../../db/db.connect.js';
import AppError from '../../utils/AppError.js';

export const check_if_email_exist_verified = async (email) => {
    const query = `
        SELECT email, isVerified
        FROM users
        WHERE email = ?
    `;

    try {
        const [rows] = await db.execute(query, [email]);
        return rows.length ? rows[0] : null; // Return first row or null
    } catch (error) {
        console.error("❌ Database Error:", error.message);
        throw new AppError("Failed to fetch email data.", 500);
    }
};

export const store_user_data = async (email, password, role, verificationCode, verificationCodeSentAt, verificationCodeExpiresAt) => {
    const query = `
        INSERT INTO users (email, password, role, verificationCode, verificationCodeSentAt, verificationCodeExpiresAt)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    try {
        const [result] = await db.execute(query, [email, password, role, verificationCode, verificationCodeSentAt, verificationCodeExpiresAt]);
        return result.insertId;
    } catch (error) {
        console.error("❌ Database Error:", error.message);
        throw new AppError("Failed to store user data.", 500);
    }
};

export const deleteUser = async (email) => {
    const query = `
        DELETE FROM users
        WHERE email = ? 
    `;

    try {
        const [result] = await db.execute(query, [email]);
        return result.affectedRows > 0; // Return true if a row was deleted
    } catch (error) {
        console.error("❌ Database Error:", error.message);
        throw new AppError("Failed to delete user data.", 500);
    }
};

export const get_verification_expiration_date = async(email) => {
    const query = `
        SELECT  verificationCodeExpiresAt
        FROM users
        WHERE email = ?
    `;

    try {
        const [result] = await db.execute(query, [email])
        return result.length ? result[0].verificationCodeExpiresAt : null;
    } catch (error) {
        console.error("❌ Database Error:", error.message);
        throw new AppError("Failed to get verificationCodeExpiresAt data.", 500);
    }

}