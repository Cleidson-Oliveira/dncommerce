import { CostumerNotExist } from "../../errors/costumer/costumerNotExist";
import { COSTUMER_NOT_FOUND } from "../../errors/costumer/errorMessages";
import { CostumersRepository } from "../../repositories/costumers.repository";

class DeleteCostumerUseCase {

    constructor (private costumersRepository: Pick<CostumersRepository, "delete" | "getById">) {
        this.costumersRepository = costumersRepository;
    }

    async execute (id: string | number) {

        const costumer = await this.costumersRepository.getById(id);
    
        if (!costumer.length) throw new CostumerNotExist(COSTUMER_NOT_FOUND);

        await this.costumersRepository.delete(id);

        return costumer;
    }
}

export default DeleteCostumerUseCase;