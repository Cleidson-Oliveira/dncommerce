import { CostumerNotExist } from "../../errors/costumer/costumerNotExist";
import { COSTUMER_NOT_FOUND } from "../../errors/costumer/errorMessages";
import { SalesRepository } from "../../repositories/sales.repository";

class GetSalesByCostumerUseCase {    
    constructor (private salesRepository: Pick<SalesRepository, "getAllSalesByCostumer">) {
        this.salesRepository = salesRepository;
    }

    async execute (costumerId: string | number) {
        if (!costumerId) throw new CostumerNotExist(COSTUMER_NOT_FOUND);

        const sales = await this.salesRepository.getAllSalesByCostumer(costumerId);

        return sales

    }
}

export default GetSalesByCostumerUseCase;