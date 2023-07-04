import { CostumerNotExist } from "../../errors/costumer/costumerNotExist";
import { COSTUMER_NOT_FOUND } from "../../errors/costumer/errorMessages";
import { CostumersRepository } from "../../repositories/costumers.repository"

class GetCostumersUseCase {
    constructor (private costumersRepository: Pick<CostumersRepository, "getAll" | "getById">) {
        this.costumersRepository = costumersRepository;
    }

    async execute (id: string|number|undefined = undefined) {
        if (id) {
            const costumer = await this.costumersRepository.getById(id);

            if(!costumer.length) throw new CostumerNotExist(COSTUMER_NOT_FOUND);

            return costumer;
        } else {
            return await this.costumersRepository.getAll();
        }
        
    }
}

export default GetCostumersUseCase;