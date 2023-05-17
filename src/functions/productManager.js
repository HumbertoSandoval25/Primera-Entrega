import fs from 'fs'
//Challenge
export default class ProductManager{
    constructor(path){
        this.path = path;
        this.products = JSON.parse(fs.readFileSync('desafio.json','utf-8')) || [];
    }
    addProduct(title,description,price,thumbnail,code,stock){
        let idMax = 0;

        //Add Id
        this.products.forEach((product) => {
            if(product.id > idMax) {
                idMax = product.id
                return
            }
        })

        idMax++

        const product = {
            id: idMax,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        //Validate de Fields
        if(!title || !description || !price || !thumbnail || !code){
            return 'All fields are required'
        }
        if(typeof title !== 'string'|| typeof description !== 'string' || typeof price !== 'number' || typeof thumbnail !== 'string' || typeof stock !== 'number'){
            return 'Any of the fields are incorrect'
        }
        if(!stock){
            product.stock = 1
        }

        //Validate if the code already exist
        if(!this.products.some(p => p.code === product.code)){
            this.products.push(product)
            const productToString = JSON.stringify(this.products);
            fs.writeFileSync(this.path,productToString)
            
        }else{
            return 'Product already exists'
        }        

    }
    getProducts(){
        //Get the all the products
        const data = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
        return data

    }
    getProductsById(id){
        //Getting the product by Id
        const data = JSON.parse(fs.readFileSync(this.path,'utf-8'));
        const produtctMatch = data.find(product => product.id === id)

        if(produtctMatch){
            return produtctMatch
        }else{
            return'Not found'
        }

    }
    updateProduct(id,title,description,price,thumbnail,code,stock){
        let data = JSON.parse(fs.readFileSync(this.path , 'utf-8'))
        let productIndex = data.findIndex((pro) => pro.id === id)
        const updateProduct = {
            id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        data[productIndex] = updateProduct
        fs.writeFileSync(this.path, JSON.stringify(data))

    }
    deleteProduct(id){
        let data = JSON.parse(fs.readFileSync(this.path, 'utf-8'))
        if(id < 0 || typeof id !== 'number'){
            return 'Product not Found'
        }
        const leftoOverProducts = data.filter((pro) => pro.id !== id)
        fs.writeFileSync(this.path, JSON.stringify(leftoOverProducts))
    }
}

// const productM = new ProductManager();

// productM.addProduct('Producto Prueba','Este es un producto prueba',200,'Sin imagen','abc123',25);
// productM.addProduct('Producto Prueba2','Este es un producto prueba2',300,'Sin imagen','abc1234',35);
// productM.addProduct('Producto Prueba3','Este es un producto prueba3',400,'Sin imagen','abc12345',45);

// // productM.updateProduct(2,'Producto Prueba3','Este es un producto prueba3',400,'Sin imagen','abcdef123',10)
// productM.getProducts()
