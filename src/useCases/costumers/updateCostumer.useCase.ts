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
    private costumersRepository: CostumersRepository;

    constructor () {
        this.costumersRepository = new CostumersRepository()
    }

    async execute (data: Partial<ICostumer>, id: string|number) {
        return await this.costumersRepository.update(data, id);
    }
}

export default new UpdateCostumerUseCase();