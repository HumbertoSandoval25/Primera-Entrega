import fs from 'fs'
//Challenge
export default class ProductManager{
    constructor(path){
        this.path = path;
        this.products = JSON.parse(fs.readFileSync('desafio.json','utf-8')) || [];
    }
    async addProduct(product){
        try {
            //Validate all the fileds
            const fileds = ['title','description','code','price','stock','category'];
            for(const filed of fileds){
                if(!product.hasOwnProperty(filed)){
                    throw new Error(`Couldn't found the filed: ${filed}`)
                }
            }

            const products = await this.getProducts();

            //Validate the code filed
            if(products.some(p => p.code === product.code)){
                throw new Error(`The product with the code: ${product.code} already exist`);
            }

            //Generate a new ID for each product
            const id = products.length != 0 ? products[products.length - 1].id + 1 : 1;
            const thumbnails = product.thumbnails ? product.thumbnails : [];
            const newProduct = {
                id,
                ...product,
                status:true,
                thumbnails
            };

            products.push(newProduct);

            fs.writeFile(this.path, JSON.stringify(products, null, 2));

            return newProduct;

        } catch (error) {
            console.error(`Error: ${error}`)
            return null;
        }

    }
    async getProducts(limit){
        try {
            //Get the all the products
            const data = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
            if(!limit || limit > data.length){
                return data
            }
    
            return data.slice(0,limit);
        } catch (error) {
            console.log(`Error: ${error}`)
            return [];
        }

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
    async updateProduct(id,updatedFields){
        const products = await this.getProducts();
        let productIndex = data.findIndex((pro) => pro.id === id)
        if(productIndex === -1){
            return null
        }
        const updatedProduct = {...products[productIndex], ...updatedFields };
        products[productIndex] = updatedProduct;
        await this.saveProducts(products)
        return updatedProduct;

    }
    async deleteProduct(id){
        const products = await this.getProducts();
        if(id < 0 || typeof id !== 'number'){
            return 'Product not Found'
        }
        const leftOverProducts = data.filter((pro) => pro.id !== id)
        if(leftOverProducts.length == products.length){
            return null;
        }
        await this.saveProducts(leftOverProducts)
        return true;
    }

    async saveProducts(products){
        try {
            await writeFile(this.path, JSON.stringify(products));
            console.log('Poducts added successfully')
        } catch (error) {
            console.error(`Error: ${error}`)
        }
    }
}

