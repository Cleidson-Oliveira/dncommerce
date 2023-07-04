import CreateCostumerUseCase from "./createCostumer.useCase";
import { ICostumer } from "../../repositories/costumers.repository";
import { DataNotInformed } from "../../errors/costumer/dataNotInformed";
import {
    COSTUMER_ADDRESS_NOT_INFORMED, 
    COSTUMER_CPF_NOT_INFORMED, 
    COSTUMER_EMAIL_NOT_INFORMED, 
    COSTUMER_NAME_NOT_INFORMED 
} from "../../errors/costumer/errorMessages";

const mockCostumerRepository = {
    async create(data: Partial<ICostumer>) {
        return data
    }
}

const mockCostumer = {
    name: "test",
    cpf: "test",
    address: "test",
    email: "test",
    telephone: "test"
}

describe("Create costumer", () => {
    it("should be possible create a costumer", async () => {

        const createCostumerUseCase = new CreateCostumerUseCase(mockCostumerRepository);

        const createdCostumer = await createCostumerUseCase.execute(mockCostumer);

        expect(Object.is(createdCostumer, mockCostumer)).toBe(true);
    })

    it("should return error when costumer name is not informed", async () => {

        const {name, ...namelessCostumer} = mockCostumer;

        const createCostumerUseCase = new CreateCostumerUseCase(mockCostumerRepository);

        createCostumerUseCase.execute({...namelessCostumer})
        .catch(error => {
            expect(error).toBeInstanceOf(DataNotInformed);
            expect(error.message).toBe(COSTUMER_NAME_NOT_INFORMED);
        })
    })

    it("should return error when costumer CPF is not informed", () => {
        const {cpf, ...costumerWithoutCPF} = mockCostumer;

        const createCostumerUseCase = new CreateCostumerUseCase(mockCostumerRepository);

        createCostumerUseCase.execute({...costumerWithoutCPF})
        .catch(error => {
            expect(error).toBeInstanceOf(DataNotInformed);
            expect(error.message).toBe(COSTUMER_CPF_NOT_INFORMED);
        })
    })

    it("should return error when costumer e-mail is not informed", () => {
        const {email, ...costumerWithoutEmail} = mockCostumer;

        const createCostumerUseCase = new CreateCostumerUseCase(mockCostumerRepository);

        createCostumerUseCase.execute({...costumerWithoutEmail})
        .catch(error => {
            expect(error).toBeInstanceOf(DataNotInformed);
            expect(error.message).toBe(COSTUMER_EMAIL_NOT_INFORMED);
        })
    })

    it("should return error when costumer address is not informed", () => {
        const {address, ...costumerWithoutAddress} = mockCostumer;

        const createCostumerUseCase = new CreateCostumerUseCase(mockCostumerRepository);

        createCostumerUseCase.execute({...costumerWithoutAddress})
        .catch(error => {
            expect(error).toBeInstanceOf(DataNotInformed);
            expect(error.message).toBe(COSTUMER_ADDRESS_NOT_INFORMED);
        })
    })
})