import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import uploadDomainRouter from './Router/uploadDomainRouter.js';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import userRouter from './Router/userRouter.js';

config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(morgan('dev'));
app.use(cookieParser());

app.use('/api/v1/domain', uploadDomainRouter);
app.use('/api/v1/user', userRouter);

app.get('/', (req, res) => {
    res.send('Server Started');
});
app.all('*', (req, res) => {
    res.status(400).send('OOPS! 404 Page Not Found!');
});

export default app;