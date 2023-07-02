import { Request, Response } from "express";
import CreateSaleUseCase from "../useCases/sales/createSale.useCase";
import GetSalesUseCase from "../useCases/sales/listAllSales.useCase";
import GetSalesByCostumerUseCase from "../useCases/sales/listSalesByCostomer.useCase";

interface IProduct {
    id: string | number,
    amount: number
}

interface ISale {
    costumer: string | number,
    totalValue: number,
    products: IProduct[]
}

export class CostumersController {
    async create (req: Request, res: Response) {
        const data: ISale = req.body;
        
        CreateSaleUseCase.execute(data)
        .then(() => {
            return res.status(201).end();
                
        }).catch((error) => {
            console.error(error);
            return res.status(error.code).json({message: error.message})
        })
    }

    async listCostumersSales (req: Request, res: Response) {
        const {id} = req.params;

        GetSalesByCostumerUseCase.execute(id)
        .then((sales) => {
            return res.status(200).json(sales);
                
        }).catch((error) => {
            console.error(error);
            return res.status(error.code).json({message: error.message})
        })
    }
    
    async listSales (req: Request, res: Response) {

        GetSalesUseCase.execute()
        .then((sales) => {
            return res.status(200).json(sales);
                
        }).catch((error) => {
            console.error(error);
            return res.status(error.code).json({message: error.message})
        })
    }
}