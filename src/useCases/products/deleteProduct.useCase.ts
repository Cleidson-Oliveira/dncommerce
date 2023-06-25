import { ProductsRepository } from "../../repositories/products.repository"

class DeleteProductUseCase {
    private productsRepository: ProductsRepository;

    constructor () {
        this.productsRepository = new ProductsRepository()
    }

    async execute (id: string | number) {

        const product = await this.productsRepository.delete(id);
        return product;
    }
}

export default new DeleteProductUseCase();