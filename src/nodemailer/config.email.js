import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465, // Or 587 for TLS
  secure: true,
  auth: {
    user: process.env.nodemailerEmail,
    pass: process.env.nodemailerEmailPass
  },
  tls: {
    rejectUnauthorized: false // 🚨 Ignores SSL errors
}
});

export default transporter;