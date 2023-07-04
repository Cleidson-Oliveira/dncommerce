import { CostumerNotExist } from "../../errors/costumer/costumerNotExist";
import { COSTUMER_NOT_FOUND } from "../../errors/costumer/errorMessages";
import GetCostumersUseCase from "./getCostumers.useCase";

const mockDB = [
    {id: "1"},
    {id: "2"}
];

const mockCostumerRepository = {
    async getAll () {
        return mockDB
    },
    async getById (id: string | number) {
        return [mockDB.find(item => item.id === id)] 
    }
}

describe("List costumers", () => {
    it("should be possible find a user by your id", async () => {
        const testId = "1";

        const getCostumerByIdUseCase = new GetCostumersUseCase(mockCostumerRepository);

        const [costumer] = await getCostumerByIdUseCase.execute(testId);

        expect(costumer.id).toBe(testId);
    })

    it("should return a error when there is no costumer with id informed", async () => {
        const testId = "3";

        const getCostumerByIdUseCase = new GetCostumersUseCase(mockCostumerRepository);

        getCostumerByIdUseCase.execute(testId)
        .catch(error => {
            expect(error).toBeInstanceOf(CostumerNotExist);
            expect(error.message).toBe(COSTUMER_NOT_FOUND);
        })
    })

    it("should be possble to list all costumers", async () => {
        const getCostumerByIdUseCase = new GetCostumersUseCase(mockCostumerRepository);

        const costumers = await getCostumerByIdUseCase.execute();

        expect(Object.is(costumers, mockDB)).toBe(true);

    })
})