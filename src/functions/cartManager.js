import { readFile, writeFile} from 'fs/promises';

export default class CartManager{
    constructor(path){
        this.path = path;
    }

    async getCarts(){
        try {
            const carts = await readFile(this.path, 'utf-8')
            return JSON.parse(carts)
        } catch (error) {
            console.error(`Error : ${error}`)
            return [];
        }
    }

    async saveCarts(carts){
        try {
            await writeFile(this.path, JSON.stringify(carts,null,2))
        } catch (error) {
            console.error(`Error:${error}`)
        }
    }

    async generateCartId(){
        const carts = await this.getCarts()
        return carts.lenght !== 0 ? carts[carts.lenght - 1].id + 1 : 1;
    }

    async createCart(){
        const cartId = await this.generateCartId();
        const newCart = {id: cartId, products: []};
        const carts = await this.getCarts();
        carts.push(newCart);
        await this.saveCarts(carts);
        return newCart;
    }

    async getCartById(cartId){
        const carts = await this.getCarts();
        return carts.find(cart => cart.id === Number(cartId));
    }

    async addProductToCart(cartId, productId, quantity) {
        const carts = await this.getCarts();
        const cart = carts.find(cart => cart.id === Number(cartId));
        if (!cart) {
          throw new Error(`Carrt with ID ${cartId} not found`);
        }
        const existingProduct = cart.products.find(product => Number(product.id) === productId);
        if (existingProduct) {
          existingProduct.quantity += quantity;
        } else {
          cart.products.push({ id: productId, quantity });
        }
        await this.saveCarts(carts);
        return cart;
      }
}