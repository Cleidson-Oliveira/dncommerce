import { Request, Response } from "express";
import CreateCostumerUseCase from "../useCases/costumers/createCostumer.useCase";
import GetCostumersUseCase from "../useCases/costumers/getCostumers.useCase";
import UpdateCostumerUseCase from "../useCases/costumers/updateCostumer.useCase";
import DeleteCostumerUseCase from "../useCases/costumers/deleteCostumer.useCase";
import { CostumersRepository } from "../repositories/costumers.repository";

export class CostumersController {
    create (req: Request, res: Response) {
        const data = req.body;

        const createCostumerUseCase = new CreateCostumerUseCase (new CostumersRepository());
        
        createCostumerUseCase.execute(data)
        .then((costumer) => {
            return res.json(costumer);
                
        }).catch((error) => {
            console.error(error);
            return res.status(error.statusCode).json({error: error.message})
        })
    }

    listById (req: Request, res: Response) {
        const { id } = req.params;

        const getCostumersUseCase = new GetCostumersUseCase (new CostumersRepository());

        getCostumersUseCase.execute(id)
        .then((costumer) => {
            return res.json(costumer);
        })
        .catch ((error) => {
            console.error(error);
            return res.status(error.statusCode).json({error: error.message});
        })
    }

    listAll (req: Request, res: Response) {
        const getCostumersUseCase = new GetCostumersUseCase (new CostumersRepository());
        
        getCostumersUseCase.execute()
        .then((costumers) => {
            return res.json(costumers);
        })
        .catch ((error) => {
            console.error(error);
            return res.status(error.statusCode).json({error: error.message});
        })
    }

    update (req: Request, res: Response) {
        const { id } = req.params;
        const costumerDataUpdate = req.body;

        const updateCostumerUseCase = new UpdateCostumerUseCase (new CostumersRepository());

        updateCostumerUseCase.execute(costumerDataUpdate, id)
        .then(() => {
            return res.status(200).end();
        })
        .catch ((error) => {
            console.error(error);
            return res.status(error.statusCode).json({error: error.message})
        })
    }

    delete (req: Request, res: Response) {
        const { id } = req.params;
        const deleteCostumerUseCase = new DeleteCostumerUseCase(new CostumersRepository());

        
        deleteCostumerUseCase.execute(id)
        .then(() => {
            return res.status(200).end();
        })
        .catch ((error) => {
            console.error(error);
            return res.status(error.statusCode).json({error: error.message})
        })
    }
}