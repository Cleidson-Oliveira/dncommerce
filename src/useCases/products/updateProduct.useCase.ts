import { PRODUCT_NOT_EXISTS } from "../../errors/product/errorMessages";
import { ProductNotExist } from "../../errors/product/productNotExists";
import { ProductsRepository } from "../../repositories/products.repository";

interface IProducts {
    id: string
    name: string
    description: string
    price: number
    category: string
}

class UpdateProductsUseCase {
    constructor (
        private productsRepository: Pick<ProductsRepository, "update" | "getById">,
    ) {
        this.productsRepository = productsRepository;
    }

    async execute (data: Partial<IProducts>, id: string|number) {
        const product = await this.productsRepository.getById(id);

        if(!product.length) throw new ProductNotExist(PRODUCT_NOT_EXISTS);

        return  await this.productsRepository.update(data, id);
    }
}

export default UpdateProductsUseCase;