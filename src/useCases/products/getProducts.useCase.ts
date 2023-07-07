import { PRODUCT_NOT_EXISTS } from "../../errors/product/errorMessages";
import { ProductNotExist } from "../../errors/product/productNotExists";
import { ProductsRepository } from "../../repositories/products.repository";
import { ProductStockRepository } from "../../repositories/productStock.repository";

class GetProductsUseCase {
    constructor (
        private productsRepository: Pick<ProductsRepository, "getById" | "getAll">,
        private stockRepository: Pick<ProductStockRepository, "get">
    ) {
        this.productsRepository = productsRepository;
        this.stockRepository = stockRepository;
    }

    async execute (id: string|number|undefined = undefined) {
        if (id) {
            const product = await this.productsRepository.getById(id);

            if(!product.length) throw new ProductNotExist(PRODUCT_NOT_EXISTS);

            const stock = await this.stockRepository.get(id);

            return {
                product,
                stock
            }

        } else {
            return await this.productsRepository.getAll();
        }
    }
}

export default GetProductsUseCase;