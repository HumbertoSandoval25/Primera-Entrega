import express from 'express';
import productRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static('public'));


export const server = app.listen(PORT, () => console.log(`Listening in the port ${PORT}`));

//Endpoints
app.use('/api/products',productRouter);
app.use('/api/carts', cartsRouter);


