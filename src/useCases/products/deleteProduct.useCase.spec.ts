import { PRODUCT_NOT_EXISTS } from "../../errors/product/errorMessages";
import { ProductNotExist } from "../../errors/product/productNotExists";
import DeleteProductUseCase from "./deleteProduct.useCase";

const productsDBMock = [
    {productId: 1}
]

const productsRepositoryMock = {
    async delete(id: string | number) {
        return productsDBMock.some(product => product.productId === id);
    }
}
const productsStockRepositoryMock = {
    async delete(id: string | number) {
        return productsDBMock.some(product => product.productId === id);
    }
}

describe("Delete products use case", () => {
    it("should delete a product", async () => {
        const deleteProductUseCase = new DeleteProductUseCase(
            productsRepositoryMock, productsStockRepositoryMock
        )

        const productDeleted = await deleteProductUseCase.execute(1)

        expect(productDeleted).toBe(true);
    })

    it("should return a error if there isn't the informed product", async () => {
        const deleteProductUseCase = new DeleteProductUseCase(
            productsRepositoryMock, productsStockRepositoryMock
        )

        deleteProductUseCase.execute(1)
        .catch(error => {
            expect(error).toBeInstanceOf(ProductNotExist);
            expect(error.message).toBe(PRODUCT_NOT_EXISTS);
        })

    })
})