import { ProductsRepository } from "../../repositories/products.repository";
import { ProductStockRepository } from "../../repositories/productStock.repository";

class DeleteProductUseCase {
    private productsRepository: ProductsRepository;
    private stockRepository: ProductStockRepository;

    constructor () {
        this.productsRepository = new ProductsRepository();
        this.stockRepository = new ProductStockRepository();
    }

    async execute (id: string | number) {

        await this.stockRepository.delete(id);
        const product = await this.productsRepository.delete(id);
        return product;
    }
}

export default new DeleteProductUseCase();