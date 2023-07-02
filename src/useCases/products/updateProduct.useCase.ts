import { ProductsRepository } from "../../repositories/products.repository";

interface IProducts {
    id: string
    name: string
    description: string
    price: number
    category: string
}

class UpdateProductsUseCase {
    private productsRepository: ProductsRepository;

    constructor () {
        this.productsRepository = new ProductsRepository();
    }

    async execute (data: Partial<IProducts>, id: string|number) {
        return await this.productsRepository.update(data, id);
    }
}

export default new UpdateProductsUseCase();