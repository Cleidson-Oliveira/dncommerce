import { DataNotInformed } from "../../errors/product/dataNotInformed";
import { PRODUCT_NAME_NOT_INFORMED, PRODUCT_PRICE_NOT_INFORMED } from "../../errors/product/errorMessages";
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
    
    constructor (
        private productsRepository: Pick<ProductsRepository, "create">,
        private stockRepository: Pick<ProductStockRepository, "create">
    ) {
        this.productsRepository = productsRepository;
        this.stockRepository = stockRepository;
    }

    async execute (productData: Partial<IProducts>): Promise<IProducts> {
        const productDataInput = productData;

        if (!productDataInput.name) throw new DataNotInformed(PRODUCT_NAME_NOT_INFORMED);

        if (!productDataInput.price) throw new DataNotInformed(PRODUCT_PRICE_NOT_INFORMED);
        
        if (!productDataInput.category) productDataInput.category = "General";
        if (!productDataInput.description) productDataInput.description = "";
        if (!productDataInput.productStock) productDataInput.productStock = 1;

        const [product] = await this.productsRepository.create(productDataInput);
        
        if (product.insertId) {
            this.stockRepository.create(productDataInput.productStock, product.insertId);
        }

        return {
            id: product.insertId,
            name: productDataInput.name,
            price: productDataInput.price,
            category: productDataInput.category,
            description: productDataInput.description,
            productStock: productDataInput.productStock
        };
    }
}

export default CreateProductUseCase;