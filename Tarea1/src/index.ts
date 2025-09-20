
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import newsRoutes from './app/routes/news.routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/api/v1/news', newsRoutes);

app.get('', (req, res) => {
    res.send('api works!');
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});