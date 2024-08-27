import express from 'express';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import products from './models/testmodel.js';
import bodyParser from 'body-parser';
import testUserRoutes from './routes/testuser.js';
dotenv.config();


const app = express();


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.error('MongoDB connection error:', err));



app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/products', (req, res) => {
    res.json(products);
});

app.use('/api/test-users', testUserRoutes);
































const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});