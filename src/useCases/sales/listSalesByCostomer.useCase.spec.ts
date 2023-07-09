import GetSalesUseCase from "./listAllSales.useCase";
import GetSalesByCostumerUseCase from "./listSalesByCostomer.useCase";

const mockSalesRepository= {
    async getAllSalesByCostumer () { return [saleMock]}
}

const saleMock = {
    costumer: 1,
    totalValue: 1,
    products: [{
        id: 1,
        amount: 1
    }]
}

describe("List Sales by costumer", () => {
    it("should be list all sales by costumer", async () => {
        const getSalesByCostumerUseCase = new GetSalesByCostumerUseCase(
            mockSalesRepository
        )

        const sales = await getSalesByCostumerUseCase.execute(1);

        expect(sales.length).toBe(1);
        
    })
})