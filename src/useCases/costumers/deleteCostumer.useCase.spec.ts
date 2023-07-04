import { CostumerNotExist } from "../../errors/costumer/costumerNotExist";
import { COSTUMER_NOT_FOUND } from "../../errors/costumer/errorMessages";
import DeleteCostumerUseCase from "./deleteCostumer.useCase";

const mockDB = [
    {id: "1"}
];

const mockCostumerRepository = {
    async delete (id: string | number) {
        return mockDB.filter(item => item.id !== id)
    },
    async getById (id: string | number) {
        return [mockDB.find(item => item.id === id)] 
    }
}

describe("Delete costumer", () => {
    it("should be possible delete a user", async () => {
        const testId = "1";

        const deleteCostumerUseCase = new DeleteCostumerUseCase(mockCostumerRepository);

        const [costumerDeleted] = await deleteCostumerUseCase.execute(testId);

        expect(costumerDeleted.id).toBe(testId);
    })

    it("should return error when there is no costumer with id informed", async () => {
        const testId = "2";

        const deleteCostumerUseCase = new DeleteCostumerUseCase(mockCostumerRepository);

        deleteCostumerUseCase.execute(testId)
        .catch(error => {
            expect(error).toBeInstanceOf(CostumerNotExist);
            expect(error.message).toBe(COSTUMER_NOT_FOUND);
        })
    })
})