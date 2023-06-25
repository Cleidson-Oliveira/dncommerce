import { ProductsRepository } from "../../repositories/products.repository"

interface IProducts {
    id: string
    name: string
    description: string
    price: number
    category: string
}

class CreateProductUseCase {
    private productsRepository: ProductsRepository;

    constructor () {
        this.productsRepository = new ProductsRepository()
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

        const product = await this.productsRepository.create(productDataInput);
        return product;
    }
}

export default new CreateProductUseCase();