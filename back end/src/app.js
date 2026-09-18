import 'dotenv/config';
import express from 'express';
import routes from './routes.js';
import fileRoutes from './config/fileRoutes.cjs';
import cors from 'cors'

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/product-files', fileRoutes);
app.use('/category-files', fileRoutes);
app.use(routes);

export default app;