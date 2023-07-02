import { SalesRepository } from "../../repositories/sales.repository";

class GetSalesByCostumerUseCase {
    private salesRepository: SalesRepository;
    
    constructor () {
        this.salesRepository = new SalesRepository();
    }

    async execute (costumerId: string | number) {
        if (costumerId) {
            const sales = await this.salesRepository.getAllSalesByCostumer(costumerId);

            return sales
        }

        return Promise.reject({
            code: 404,
            message: "Costumer not found!"
        })       
    }
}

export default new GetSalesByCostumerUseCase();