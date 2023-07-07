import { PRODUCT_NOT_EXISTS } from "../../errors/product/errorMessages";
import { ProductNotExist } from "../../errors/product/productNotExists";
import { ProductsRepository } from "../../repositories/products.repository";
import { ProductStockRepository } from "../../repositories/productStock.repository";

class DeleteProductUseCase {
    constructor (
        private productsRepository: Pick<ProductsRepository, "delete">,
        private stockRepository: Pick<ProductStockRepository, "delete">
    ) {
        this.productsRepository = productsRepository;
        this.stockRepository = stockRepository;
    }

    async execute (id: string | number) {

        await this.stockRepository.delete(id);
        const productDeleted = await this.productsRepository.delete(id);
        
        if (!productDeleted) throw new ProductNotExist(PRODUCT_NOT_EXISTS);

        return productDeleted
    }
}

export default DeleteProductUseCase;