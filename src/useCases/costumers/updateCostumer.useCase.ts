import { CostumerNotExist } from "../../errors/costumer/costumerNotExist";
import { CpfCannotBeChanged } from "../../errors/costumer/cpfCannotBeChanged";
import { COSTUMER_CPF_CHANGE, COSTUMER_NOT_FOUND } from "../../errors/costumer/errorMessages";
import { CostumersRepository } from "../../repositories/costumers.repository";

interface ICostumer {
    id: string
    name: string
    cpf: string
    address: string
    email: string
    telephone: string
}

class UpdateCostumerUseCase {
    constructor (private costumersRepository: Pick<CostumersRepository, "update" | "getById">) {
        this.costumersRepository = costumersRepository;
    }

    async execute (data: Partial<ICostumer>, id: string|number) {

        if (data.cpf) throw new CpfCannotBeChanged(COSTUMER_CPF_CHANGE);

        const costumer = await this.costumersRepository.getById(id);
    
        if (!costumer.length) throw new CostumerNotExist(COSTUMER_NOT_FOUND);

        const costumerUpdated = await this.costumersRepository.update(data, id);

        return costumerUpdated;
    }
}

export default UpdateCostumerUseCase;