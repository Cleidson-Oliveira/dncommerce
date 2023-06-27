import { CostumersRepository } from "../../repositories/costumers.repository";

class DeleteCostumerUseCase {
    private costumerRepository: CostumersRepository;

    constructor () {
        this.costumerRepository = new CostumersRepository()
    }

    async execute (id: string | number) {

        const product = await this.costumerRepository.delete(id);
        return product;
    }
}

export default new DeleteCostumerUseCase();