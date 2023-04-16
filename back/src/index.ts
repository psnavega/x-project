import { config } from 'dotenv';
config();
import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './config/postgres/data-source';
import routes from './routes/index';
import cors from 'cors';

AppDataSource.initialize()
    .then(data => console.log({
        message: 'Postgres connected successfully'
    }))
    .catch(e => console.log(e))

const app = express();
app.use(cors());
routes(app);

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})