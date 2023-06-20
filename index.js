import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import sequelize from './src/config/database/index.js';

import route from './src/routes/index.js';

const app = express();
// const port = process.env.PORT;
// let connection;

app.use(
    bodyParser.urlencoded({
        extended: false,
    }),
);

app.use(bodyParser.json());

app.use(express.json());

app.use(
    cors({
        origin: '*',
        credentials: true,
        optionsSuccessStatus: 200,
    }),
);

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

route(app);

const port = 3001;
app.listen(port, (err) => {
    if (err) console.log('Error in server setup');
    console.log(`Server listening on Port = ${port}`);
});
