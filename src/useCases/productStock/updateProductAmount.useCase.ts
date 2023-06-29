import { ProductStockRepository } from "../../repositories/productStock.repository";

class UpdateProductsUseCase {
    private productStockRepository: ProductStockRepository;

    constructor () {
        this.productStockRepository = new ProductStockRepository();
    }

    async execute (amount: number, id: string | number) {
        const productAmount = await this.productStockRepository.get(id);

        const newProductAmount = productAmount - amount;

        if (newProductAmount < 0) return Promise.reject({ 
            code: 500,
            message: "Product amount insufficient in the stock!"
        });

        return await this.productStockRepository.update(amount, id);
    }
}

export default new UpdateProductsUseCase();