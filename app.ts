import express, {json} from 'express';
import cors from 'cors';
import {Express} from 'express';
import {deptRouter} from './routes/department.routes';
import {langRouter} from './routes/language.routes';
import {studentRouter} from './routes/student.routes';
import {serviceRouter} from './routes/service.routes';
import {confessionRouter} from './routes/confession.routes';
import {errorHandler} from './shared/utils/errorHandler';
import cookieParser from 'cookie-parser';
import {envs} from './shared/utils/environment_vars';

const app: Express = express();

app.use(
  cors({
    origin: [envs._FRONTEND_URL ?? 'http://localhost:5173'],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(json());

app.use('/api/student', studentRouter);
app.use('/api/department', deptRouter);
app.use('/api/language', langRouter);
app.use('/api/service', serviceRouter);
app.use('/api/confession', confessionRouter);
app.use(errorHandler);

export default app;
