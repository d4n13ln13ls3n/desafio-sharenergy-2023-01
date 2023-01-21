import express from 'express';
import cors from 'cors';
import ErrorHandler from './middlewares/ErrorHandler';
import routes from './routes/routes';

const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);
app.use(ErrorHandler.handle);

export default app;