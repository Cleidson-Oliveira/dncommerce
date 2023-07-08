import { PRODUCT_NOT_EXISTS } from "../../errors/product/errorMessages";
import { ProductNotExist } from "../../errors/product/productNotExists";
import GetProductsUseCase from "./getProducts.useCase";

const productsDBMock = [
    {
        productId: 1
    },
    {
        productId: 2
    },
]

const productsRepositoryMock = {
    async getById(id: string | number) {
        return productsDBMock.filter(product => product.productId === id);
    },
    async getAll() {
        return productsDBMock
    }
}
const productsStockRepositoryMock = {
    async get(id: string | number) {
        return {stockAmount: 1, productId: id};
    }
}

describe("List Producs", () => {
    it("should be to get all products", async () => {
        const getProductsUseCase = new GetProductsUseCase(productsRepositoryMock, productsStockRepositoryMock);

        const products = await getProductsUseCase.execute();

        expect(products.length).toBe(2);
    })
    
    it("should be to get a product by id", async () => {
        const getProductsUseCase = new GetProductsUseCase(productsRepositoryMock, productsStockRepositoryMock);

        const dbResponse = await getProductsUseCase.execute(1);

        expect(dbResponse.product[0].productId).toBe(1);
    })

    it("should return a error if there isn't a product with id informed", async () => {
        const getProductsUseCase = new GetProductsUseCase(productsRepositoryMock, productsStockRepositoryMock);

        getProductsUseCase.execute(3)
        .catch(error => {  
            expect(error).toBeInstanceOf(ProductNotExist);
            expect(error.message).toBe(PRODUCT_NOT_EXISTS);
        })
    })
})