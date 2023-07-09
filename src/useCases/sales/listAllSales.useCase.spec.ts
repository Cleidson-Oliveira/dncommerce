import GetSalesUseCase from "./listAllSales.useCase";

const mockSalesRepository= {
    async create () { return [{insertId: 1}]},
    async getAll () { return [saleMock]}
}

const saleMock = {
    costumer: 1,
    totalValue: 1,
    products: [{
        id: 1,
        amount: 1
    }]
}

describe("List Sales", () => {
    it("should be list all sales", async () => {
        const getSalesUseCase = new GetSalesUseCase(
            mockSalesRepository
        )

        const sales = await getSalesUseCase.execute();

        expect(sales.length).toBe(1);
        
    })
})