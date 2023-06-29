import { ProductsRepository } from "../../repositories/products.repository";
import { ProductStockRepository } from "../../repositories/productStock.repository";

interface IProducts {
    id: string
    name: string
    description: string
    price: number
    category: string
    productStock: number
}

class CreateProductUseCase {
    private productsRepository: ProductsRepository;
    private stockRepository: ProductStockRepository;

    constructor () {
        this.productsRepository = new ProductsRepository();
        this.stockRepository = new ProductStockRepository()
    }

    async execute (productData: Partial<IProducts>) {
        const productDataInput = productData;

        if (!productDataInput.name) {
            return Promise.reject({ 
                code: 500,
                message: "The product name should be informed!"
            })
        };
        if (!productDataInput.price) {
            return Promise.reject({ 
                code: 500,
                message: "The product price should be informed!"
            })            
        };
        
        if (!productDataInput.category) productDataInput.category = "Geral";
        if (!productDataInput.description) productDataInput.description = "";
        if (!productDataInput.productStock) productDataInput.productStock = 1;

        const [product] = await this.productsRepository.create(productDataInput);
        
        if (product.insertId) {
            this.stockRepository.create(productDataInput.productStock, product.insertId);
        }

        return product;
    }
}

export default new CreateProductUseCase();