import { CostumerNotExist } from "../../errors/costumer/costumerNotExist";
import { COSTUMER_NOT_FOUND } from "../../errors/costumer/errorMessages";
import CreateSaleUseCase from "./createSale.useCase";

const mockSalesRepository= {
    async create () { return [{insertId: 1}]}
}
const mockOrderRepository= {
    async create () {}
}
const mockProductStockRepository= {
    async get () { return {stockAmount: 1, productId: 1} }
}

const saleMock = {
    costumer: 1,
    totalValue: 1,
    products: [{
        id: 1,
        amount: 1
    }]
}

describe("Create Sales", () => {
    it("should be possible create a new sale", async () => {
        const createSaleUseCase = new CreateSaleUseCase(
            mockSalesRepository,
            mockOrderRepository,
            mockProductStockRepository
        )

        const newSale = await createSaleUseCase.execute(saleMock);

        expect(newSale.costumer).toBe(saleMock.costumer);
        expect(newSale.totalValue).toBe(saleMock.totalValue);
    })

    it("should return a error if there is not costumer", async () => {
        const mockSalesRepository = {
            async create () { return [{errno: 1452}] }
        }

        const createSaleUseCase = new CreateSaleUseCase(
            mockSalesRepository,
            mockOrderRepository,
            mockProductStockRepository
        )

        createSaleUseCase.execute(saleMock)
        .catch(error => {
            expect(error).toBeInstanceOf(CostumerNotExist);
            expect(error.message).toBeInstanceOf(COSTUMER_NOT_FOUND);

        })

    })
})