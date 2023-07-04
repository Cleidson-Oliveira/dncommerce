import { CostumerNotExist } from "../../errors/costumer/costumerNotExist";
import { CpfCannotBeChanged } from "../../errors/costumer/cpfCannotBeChanged";
import { COSTUMER_CPF_CHANGE, COSTUMER_NOT_FOUND } from "../../errors/costumer/errorMessages";
import { ICostumer } from "../../repositories/costumers.repository";
import UpdateCostumerUseCase from "./updateCostumer.useCase";

const mockDB: Partial<ICostumer>[] = [
    {
        id: "1",
        name: "mock",
        email: "mock@mock.com",
        telephone: "(99)9999-9999",
        address: "01, Mock st.",
        cpf: "123.456.789-00"
    }
];

const mockCostumerRepository = {
    async getById(id: string | number) {
        return [mockDB.find(item => item.id === id)];
    },
    async update(data: Partial<ICostumer>, id: string | number) {
        return {...mockDB[0], ...data};
    }
};

describe("Update costumers data", () => {
    it("should be possible update costumer name", async () => {
        const updateCostumerUseCase = new UpdateCostumerUseCase(mockCostumerRepository);
        const testId = "1";
        const newName = "test"

        const updatedCostumer = await updateCostumerUseCase.execute({name: newName}, testId);

        expect(updatedCostumer.name).toBe(newName);
    })

    it("should be possible update costumer e-mail", async () => {
        const updateCostumerUseCase = new UpdateCostumerUseCase(mockCostumerRepository);
        const testId = "1";
        const newEmail = "test@test.com"

        const updatedCostumer = await updateCostumerUseCase.execute({email: newEmail}, testId);

        expect(updatedCostumer.email).toBe(newEmail);
    })

    it("should be possible update costumer telephone", async () => {
        const updateCostumerUseCase = new UpdateCostumerUseCase(mockCostumerRepository);
        const testId = "1";
        const newTelephone = "(88)8888-8888"

        const updatedCostumer = await updateCostumerUseCase.execute({telephone: newTelephone}, testId);

        expect(updatedCostumer.telephone).toBe(newTelephone);
    })

    it("should be possible update costumer address", async () => {
        const updateCostumerUseCase = new UpdateCostumerUseCase(mockCostumerRepository);
        const testId = "1";
        const newAddress = "02, Mock st."

        const updatedCostumer = await updateCostumerUseCase.execute({address: newAddress}, testId);

        expect(updatedCostumer.address).toBe(newAddress);
    })

    it("should return a error by tying change CPF", async () => {
        const updateCostumerUseCase = new UpdateCostumerUseCase(mockCostumerRepository);
        const testId = "1";
        const newCPF = "02, Mock st."

        updateCostumerUseCase.execute({cpf: newCPF}, testId)
        .catch(error => {
            expect(error).toBeInstanceOf(CpfCannotBeChanged);
            expect(error.message).toBe(COSTUMER_CPF_CHANGE);
        })
    })

    it("should return error when there is no costumer with id informed", async () => {
        const updateCostumerUseCase = new UpdateCostumerUseCase(mockCostumerRepository);
        const testId = "2";
        
        updateCostumerUseCase.execute({}, testId)
        .catch(error => {
            expect(error).toBeInstanceOf(CostumerNotExist);
            expect(error.message).toBe(COSTUMER_NOT_FOUND);
        })
    })
})