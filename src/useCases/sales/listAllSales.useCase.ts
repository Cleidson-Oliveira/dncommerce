import { SalesRepository } from "../../repositories/sales.repository";

class GetSalesUseCase {
    constructor (private salesRepository: Pick<SalesRepository, "getAll">) {
        this.salesRepository = salesRepository;
    }

    async execute () {
        const sales = await this.salesRepository.getAll();

        return sales
    }
}

export default GetSalesUseCase;