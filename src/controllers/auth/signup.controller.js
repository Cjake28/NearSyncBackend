import AppError from '../../utils/AppError.js';
import bcrypt from 'bcrypt';

import Send_signup_email_verification from '../../nodemailer/signup.email.js';

import { 
    check_if_email_exist_verified, 
    deleteUser,
    store_user_data, 
    get_verification_expiration_date 
    } from '../../models/auth/signup.model.js';

const signup = async (req, res) => {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            throw new AppError('All fields required', 400);
        }

        const EmailLower = email.toLowerCase();
        const existingUser = await check_if_email_exist_verified(EmailLower);
        const userExists = !!existingUser;
        const isVerified = userExists && existingUser.isVerified;

        if (userExists && isVerified) {
            throw new AppError('Account already exists', 400);
        }


        const verificationExpiredAt = await get_verification_expiration_date(EmailLower);

        if (verificationExpiredAt) {
            const expirationDate = new Date(verificationExpiredAt);
            const now = new Date();
        
            if (expirationDate > now) { // If expiration date is still in the future
                throw new AppError('Wait for OTP to expire before requesting a new one', 401);
                
            }
        }

        // Delete any unverified user with the same email before proceeding
        await deleteUser(EmailLower);

        // Generate verification code and timestamps
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        const verificationCodeSentAt = new Date();
        const verificationCodeExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // Expires in 5 minutes

        const encryptedPassword = await bcrypt.hash(password, 10);

        // Send verification email
        try {
            await Send_signup_email_verification(EmailLower, verificationCode);
        } catch (error) {
            console.error('❌ Error sending email:', error);
            throw new AppError("Failed to send verification email. Please try again.", 500);
        }

        // Store user data
        await store_user_data(EmailLower, encryptedPassword, role, verificationCode, verificationCodeSentAt, verificationCodeExpiresAt);

        return res.status(201).json({ success: true, message: "User created successfully" });

};

export default signup;
