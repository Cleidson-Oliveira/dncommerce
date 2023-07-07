import { ProductsRepository } from "../../repositories/products.repository";
import { ProductStockRepository } from "../../repositories/productStock.repository";

class GetProductsUseCase {
    private productsRepository: ProductsRepository;
    private productStockRepository: ProductStockRepository;

    constructor () {
        this.productsRepository = new ProductsRepository();
        this.productStockRepository = new ProductStockRepository();

    }

    async execute (id: string|number|undefined = undefined) {
        if (id) {
            const product = await this.productsRepository.getById(id);
            const stock = await this.productStockRepository.get(id);

            return {
                product,
                stock
            }
        } else {
            return await this.productsRepository.getAll();
        }
    }
}

export default new GetProductsUseCase();