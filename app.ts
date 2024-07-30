import express, { Express } from 'express';
import customer from './routes/customer';
import dataSource from './db/dbConfig';
import { customErrorHandler, DefaultErrorHandler } from './middleware/errorHandler';

const app: Express = express();
const PORT: number = 3000;

app.use(express.json());
app.use('/customers', customer);

app.use(customErrorHandler);
app.use(DefaultErrorHandler);

dataSource.initialize().then(() => {
    console.log('Connected to DB');
}).catch(err => {
    console.error('Failed to connect to DB: ' + err);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
