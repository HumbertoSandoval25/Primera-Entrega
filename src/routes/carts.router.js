import { Router } from "express";
import CartManager  from "../functions/cartManager.js";

const cartsRouter = Router();
const cartManager = new CartManager('carts.json');

//POST /api/carts/
cartsRouter.post('/', async (req,res) => {
    const newCart = await cartManager.createCart();
    res.status(201).json({newCart});
});


//GET /api/carts/:cid
cartsRouter.get('/:cid', async (req,res) => {
    const cid = req.params.cid;
    const cart = await cartManager.getCartById(cid);
    if(!cart){
        res.status(404).json({message: 'Carrito no encontrado'});
    }else{
        res.json({cart})
    }
});

//POST /api/carts/:cid/product/:id
cartsRouter.post('/:cid/product/:pid', async (req,res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;

    const {quantity} = req.body || 1;

    try {
        const updatedCart = await cartManager.addProductToCart(cid, pid, quantity);
        res.json(updatedCart);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
})


export default cartsRouter;