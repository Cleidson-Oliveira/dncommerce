import { CostumersRepository } from "../../repositories/costumers.repository";

interface ICostumer {
    id: string
    name: string
    cpf: number
    address: number
    email: string
    telephone: number
}

class CreateCostumerUseCase {
    private costumersRepository: CostumersRepository;

    constructor () {
        this.costumersRepository = new CostumersRepository()
    }

    async execute (costumerData: Partial<ICostumer>) {
        const costumerDataInput = costumerData;

        if (!costumerDataInput.name) {
            return Promise.reject({ 
                code: 500,
                message: "The costumer name should be informed!"
            })
        };
        if (!costumerDataInput.cpf) {
            return Promise.reject({ 
                code: 500,
                message: "The costumer CPF should be informed!"
            })            
        };
        if (!costumerDataInput.email) {
            return Promise.reject({ 
                code: 500,
                message: "The costumer E-mail should be informed!"
            })            
        };
        if (!costumerDataInput.address) {
            return Promise.reject({ 
                code: 500,
                message: "The costumer address should be informed!"
            })            
        };
        
        const costumer = await this.costumersRepository.create(costumerDataInput);
        return costumer;
    }
}

export default new CreateCostumerUseCase();