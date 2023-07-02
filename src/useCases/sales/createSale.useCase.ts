import { SalesRepository } from "../../repositories/sales.repository";
import { OrdersRepository } from "../../repositories/orders.repository";
import { ProductStockRepository } from "../../repositories/productStock.repository";

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
    private salesRepository: SalesRepository;
    private ordersRepository: OrdersRepository;
    private productStockRepository: ProductStockRepository;

    constructor () {
        this.salesRepository = new SalesRepository();
        this.ordersRepository = new OrdersRepository();
        this.productStockRepository = new ProductStockRepository();
    }

    async execute (saleDataInput: ISale) {

        if (!saleDataInput.costumer) {
            return Promise.reject({ 
                code: 500,
                message: "The costumer should be informed!"
            })            
        };

        if (!saleDataInput.totalValue) {
            return Promise.reject({ 
                code: 500,
                message: "The sale total value should be informed!"
            })            
        };

        if (!saleDataInput.products.length) {
            return Promise.reject({ 
                code: 500,
                message: "The sale's products should be informed!"
            })            
        };

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

        if (productOutOfStock) {
            return Promise.reject({
                code: 500,
                message: "In the list there are products out of stock!"
            })
        }

        const sale = await this.salesRepository.create({
            totalValue: saleDataInput.totalValue,
            costumer: saleDataInput.costumer,
            date: new Date()
        })

        if (sale.errno == 1452) {
            return Promise.reject({
                code: 404,
                message: "Costumer not found!"
            })
        }

        if (sale[0].insertId) {
            saleDataInput.products.forEach(({id, amount}) => {
                this.ordersRepository.create(amount, sale[0].insertId, id)
            })
        }
            
        return sale;       
    }
}

export default new CreateSaleUseCase();