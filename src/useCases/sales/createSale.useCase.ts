import { SalesRepository } from "../../repositories/sales.repository";
import { OrdersRepository } from "../../repositories/orders.repository";
import { ProductStockRepository } from "../../repositories/productStock.repository";
import { DataNotInformed } from "../../errors/sales/dataNotInformed";
import { COSTUMER_NOT_INFORMED, PRODUCTS_NOT_INFORMED, PRODUCTS_OUT_OF_STOCK, SALE_TOTAL_VALUE_NOT_INFORMED } from "../../errors/sales/errorMessages";
import { ProductOutOfStock } from "../../errors/sales/productOutOfStock";
import { CostumerNotExist } from "../../errors/costumer/costumerNotExist";
import { COSTUMER_NOT_FOUND } from "../../errors/costumer/errorMessages";

interface IProduct {
    id: string | number,
    amount: number
}

interface ISale {
    costumer: string | number,
    totalValue: number,
    products: IProduct[]
}

class CreateSaleUseCase {
    constructor (
        private salesRepository: Pick<SalesRepository, "create">,
        private ordersRepository: Pick<OrdersRepository, "create">,
        private productStockRepository: Pick<ProductStockRepository, "get">
    ) {
        this.salesRepository = salesRepository;
        this.ordersRepository = ordersRepository;
        this.productStockRepository = productStockRepository;
    }

    async execute (saleDataInput: ISale) {

        if (!saleDataInput.costumer) throw new DataNotInformed(COSTUMER_NOT_INFORMED);

        if (!saleDataInput.totalValue) throw new DataNotInformed(SALE_TOTAL_VALUE_NOT_INFORMED);

        if (!saleDataInput.products.length) throw new DataNotInformed(PRODUCTS_NOT_INFORMED);

        const productStockMap = new Map<string | number, IProduct>();

        const productsStock = await Promise.all(
            saleDataInput.products.map(product => {
                productStockMap.set(product.id, product)
                return this.productStockRepository.get(product.id);
            })
        );

        const productOutOfStock = productsStock.some((product) => {
            return product.stockAmount < productStockMap.get(product.productId)!.amount;
        })

        if (productOutOfStock) throw new ProductOutOfStock(PRODUCTS_OUT_OF_STOCK);

        const sale = await this.salesRepository.create({
            totalValue: saleDataInput.totalValue,
            costumer: saleDataInput.costumer,
            date: new Date()
        })

        if (sale.errno == 1452) throw new CostumerNotExist(COSTUMER_NOT_FOUND);

        if (sale[0].insertId) {
            saleDataInput.products.forEach(({id, amount}) => {
                this.ordersRepository.create(amount, sale[0].insertId, id)
            })
        }
            
        return {
            id: sale[0].insertId,
            ...saleDataInput
        };
    }
}

export default CreateSaleUseCase;