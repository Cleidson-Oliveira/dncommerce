import { ProductsRepository } from "../../repositories/products.repository"

class GetProductsUseCase {
    private productsRepository: ProductsRepository;

    constructor () {
        this.productsRepository = new ProductsRepository()
    }

    async execute (id: string|number|undefined = undefined) {
        if (id) {
            return await this.productsRepository.getById(id);
        } else {
            return await this.productsRepository.getAll();
        }
        
    }
}

export default new GetProductsUseCase();