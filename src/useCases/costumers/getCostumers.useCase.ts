import { CostumersRepository } from "../../repositories/costumers.repository"

class GetCostumersUseCase {
    private costumersRepository: CostumersRepository;

    constructor () {
        this.costumersRepository = new CostumersRepository()
    }

    async execute (id: string|number|undefined = undefined) {
        if (id) {
            return await this.costumersRepository.getById(id);
        } else {
            return await this.costumersRepository.getAll();
        }
        
    }
}

export default new GetCostumersUseCase();