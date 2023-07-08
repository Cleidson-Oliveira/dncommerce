import { PRODUCT_NOT_EXISTS } from "../../errors/product/errorMessages";
import { ProductNotExist } from "../../errors/product/productNotExists";
import { IProducts } from "../../repositories/products.repository";
import UpdateProductsUseCase from "./updateProduct.useCase";

const productDBMock: IProducts = {
    id: "1",
    category: "category",
    description: "description",
    name: "product name",
    price: 100
}


const productsRepositoryMock = {
    async update(data: IProducts, id: string | number) {
        return {...productDBMock, ...data}
    },
    async getById(id: string | number) { 
        if (productDBMock.id != id) return [];
        return [productDBMock];
    }
}

describe("Update product use case", () => {
    it("should update a products info", async () => {
        const updateProductUseCase = new UpdateProductsUseCase(productsRepositoryMock);

        const updateData = {
            name: "product name updated",
            price: 1000,
            category: "category updated",
            description: "description updated",
        }

        const productUpdated = await updateProductUseCase.execute(updateData, "1")

        expect(productUpdated.name).toBe(updateData.name);
        expect(productUpdated.price).toBe(updateData.price);
        expect(productUpdated.category).toBe(updateData.category);
        expect(productUpdated.description).toBe(updateData.description);
    })

    it("should return a error if there isn't the informed product", async () => {
        const updateProductUseCase = new UpdateProductsUseCase(productsRepositoryMock);

        updateProductUseCase.execute({}, 2)
        .catch(error => {
            expect(error).toBeInstanceOf(ProductNotExist);
            expect(error.message).toBe(PRODUCT_NOT_EXISTS);
        })

    })
})