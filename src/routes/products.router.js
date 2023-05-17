import { Router } from "express";
import ProductManager from "../functions/productManager.js"

const productRouter = Router();
const productManager = new ProductManager("desafio.json")

//GET /api/products
productRouter.get('/',async (req,res) => {
    const limit = req.query.limit ? Number(req.query.limit) : undefined;
    const products = await productManager.getProducts(limit);
    res.json({products});
})

//GET /api/products/:id
productRouter.get('/:pid', async(req,res) => {
    const product = await productManager.getProductsById(Number(req.params.pid));
    if(!product){
        res.status(404).json({message: "Producto no encontrado"});
    }else{
        res.json({product})
    }
});

//POST /api/products
productRouter.post('/', async(req,res) => {
    const product = req.body;
    productManager.addProduct(product);
    res.status(201).json({product});
});

//PUT /api/products/:id
productRouter.put('/:pid', async(req,res) => {
    const productId = Number(req.params.pid);
    const field = req.body;
    const updatedProduct = await productManager.updateProduct(productId, field);
    res.json({updatedProduct})
})

//DELETE /api/porducts/:id
productRouter.delete('/:pid', async (req,res) => {
    const productId = Number(req.params.pid);
    const deletedProduct = await productManager.deleteProduct(productId);
    if(!deletedProduct){
        res.status(404).json({message: 'Product not found'});
    }else{
        res.json(deletedProduct);
    }
});
export default productRouter;