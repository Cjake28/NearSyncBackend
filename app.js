import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import {errorHandler} from './src/middleware/errorHandler.js';

import authRoutes from './src/routes/auth.js'

dotenv.config();

export const app = express();

// const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174', 'https://attendeasyai.up.railway.app'];

// app.use(cors({
//   origin: (origin, callback) => {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true); 
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true
// }));



app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRoutes);

app.use(errorHandler);