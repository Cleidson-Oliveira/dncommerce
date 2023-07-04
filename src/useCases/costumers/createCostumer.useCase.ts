import { CostumersRepository } from "../../repositories/costumers.repository";
import { DataNotInformed } from "../../errors/costumer/dataNotInformed";
import { 
    COSTUMER_ADDRESS_NOT_INFORMED,
    COSTUMER_CPF_NOT_INFORMED, 
    COSTUMER_EMAIL_NOT_INFORMED, 
    COSTUMER_NAME_NOT_INFORMED 
} from "../../errors/costumer/errorMessages";

interface ICostumer {
    id: string
    name: string
    cpf: string
    address: string
    email: string
    telephone: string
}

class CreateCostumerUseCase {
    constructor (private costumersRepository: Pick<CostumersRepository, "create">) {
        this.costumersRepository = costumersRepository;
    }

    async execute (costumerData: Partial<ICostumer>) {
        const costumerDataInput = costumerData;

        if (!costumerDataInput.name) throw new DataNotInformed(COSTUMER_NAME_NOT_INFORMED);
        
        if (!costumerDataInput.cpf) throw new DataNotInformed(COSTUMER_CPF_NOT_INFORMED);

        if (!costumerDataInput.email) throw new DataNotInformed(COSTUMER_EMAIL_NOT_INFORMED);

        if (!costumerDataInput.address) throw new DataNotInformed(COSTUMER_ADDRESS_NOT_INFORMED);
        
        const costumer = await this.costumersRepository.create(costumerDataInput);
        return costumer;
    }
}

export default CreateCostumerUseCase;