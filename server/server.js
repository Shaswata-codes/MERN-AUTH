import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRoutes.js';
import geminiRouter from './routes/geminiRoutes.js';

const app = express();
const port = process.env.PORT || 4000;

connectDB();

app.use(express.json());
app.use(cookieParser());
const allowedOrigins = ['http://localhost:3000', 'http://localhost:3002', 'http://localhost:5173'];
app.use(cors({ origin: allowedOrigins, credentials: true }));



app.get('/', (req, res) => res.send('API Working'));
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/gemini', geminiRouter);

app.listen(port, () => console.log(`Server started on PORT ${port}`))
