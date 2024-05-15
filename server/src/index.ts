import express from 'express';
import productRouter from './routes/test';
import userRouter from './routes/username';
const cors = require('cors');

const app = express();
const PORT = 3000;

// Use routers
app.use(cors());

app.use(express.json());
app.use(userRouter);
app.use('/api', productRouter);

app.get('/', (req, res) => {
    res.send('Hello World with Script!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
