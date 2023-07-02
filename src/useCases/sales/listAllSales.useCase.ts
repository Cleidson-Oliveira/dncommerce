import { SalesRepository } from "../../repositories/sales.repository";

class GetSalesUseCase {
    private salesRepository: SalesRepository;
    
    constructor () {
        this.salesRepository = new SalesRepository();
    }

    async execute () {
        const sales = await this.salesRepository.getAll();
            
        if (!sales) return Promise.reject({
            code: 404,
            message: "Costumer not found!"
        })

        return sales
    }
}

export default new GetSalesUseCase();