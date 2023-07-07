import { DataNotInformed } from "../../errors/product/dataNotInformed";
import { PRODUCT_NAME_NOT_INFORMED, PRODUCT_PRICE_NOT_INFORMED } from "../../errors/product/errorMessages";
import CreateProductUseCase from "./createProduct.useCase";

const productsRepositoryMock = {
    async create() {
        return [{insertId: 1}]
    }
}
const productsStockRepositoryMock = {
    async create() {}
}

const newProductMock = {
    name: "product",
    price: 100,
    category: "category",
    description: "description",
    productStock: 10
}

describe("Create products use case", () => {
    it("should be create a product", async () => {
        const newProduct = {...newProductMock};

        const createProductUseCase = new CreateProductUseCase(
            productsRepositoryMock, productsStockRepositoryMock
        )

        const productCreatedInfo = await createProductUseCase.execute(newProduct);

        expect(productCreatedInfo.id).toBe(1);
        expect(productCreatedInfo.name).toBe("product");
        expect(productCreatedInfo.price).toBe(100);
        expect(productCreatedInfo.category).toBe("category");
        expect(productCreatedInfo.description).toBe("description");
        expect(productCreatedInfo.productStock).toBe(10);
    })

    it("should return a error if product name is not informed", async () => {
        const {name, ...newProduct} = newProductMock;

        const createProductUseCase = new CreateProductUseCase(
            productsRepositoryMock, productsStockRepositoryMock
        )

        createProductUseCase.execute(newProduct)
        .catch(error => {
            expect(error).toBeInstanceOf(DataNotInformed);
            expect(error.message).toBe(PRODUCT_NAME_NOT_INFORMED);
        })
    })

    it("should return a error if product price is not informed", async () => {
        const {price, ...newProduct} = newProductMock;

        const createProductUseCase = new CreateProductUseCase(
            productsRepositoryMock, productsStockRepositoryMock
        )

        createProductUseCase.execute(newProduct)
        .catch(error => {
            expect(error).toBeInstanceOf(DataNotInformed);
            expect(error.message).toBe(PRODUCT_PRICE_NOT_INFORMED);
        })
    })

    it("should create a product with empty description if this is not informed", async () => {
        const {description, ...newProduct} = newProductMock;

        const createProductUseCase = new CreateProductUseCase(
            productsRepositoryMock, productsStockRepositoryMock
        )

        const productCreatedInfo = await createProductUseCase.execute(newProduct);

        expect(productCreatedInfo.description).toBe("");
    })

    it("should create a product with 'General' category if this is not informed", async () => {
        const {category, ...newProduct} = newProductMock;

        const createProductUseCase = new CreateProductUseCase(
            productsRepositoryMock, productsStockRepositoryMock
        )

        const productCreatedInfo = await createProductUseCase.execute(newProduct);

        expect(productCreatedInfo.category).toBe("General");
    })

    it("should create a product with productStock = 1 if this is not informed", async () => {
        const {productStock, ...newProduct} = newProductMock;

        const createProductUseCase = new CreateProductUseCase(
            productsRepositoryMock, productsStockRepositoryMock
        )

        const productCreatedInfo = await createProductUseCase.execute(newProduct);

        expect(productCreatedInfo.productStock).toBe(1);
    })
})