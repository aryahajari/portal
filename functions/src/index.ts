
import { onRequest } from "firebase-functions/v2/https";
import * as express from "express";
// import productRouter from './routes/test';
import userRouter from './routes/username';
const cors = require('cors');

const app = express();

// Use routers
app.use(cors());

app.use(express.json());
app.use(userRouter);
// app.use('/api', productRouter);

app.get('/', (req, res) => {
    res.send('Hello World with Script!');
});

exports.widgets = onRequest(app);
