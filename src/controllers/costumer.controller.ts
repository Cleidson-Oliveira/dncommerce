import { Request, Response } from "express";
import CreateCostumerUseCase from "../useCases/costumers/createCostumer.useCase";
import GetCostumersUseCase from "../useCases/costumers/getCostumers.useCase";
import UpdateCostumerUseCase from "../useCases/costumers/updateCostumer.useCase";
import DeleteCostumerUseCase from "../useCases/costumers/deleteCostumer.useCase";

export class CostumersController {
    create (req: Request, res: Response) {
        const data = req.body;
        
        CreateCostumerUseCase.execute(data)
        .then((costumer) => {
            return res.json(costumer);
                
        }).catch((error) => {
            console.error(error);
            return res.status(400).json({error: "Can not be create costumer"})
        })
    }

    listById (req: Request, res: Response) {
        const { id } = req.params;

        GetCostumersUseCase.execute(id)
        .then((costumer) => {
            return res.json(costumer);
        })
        .catch ((error) => {
            console.error(error);
            return res.status(404).json({error: "Costumer not found!"});
        })
    }

    listAll (req: Request, res: Response) {
        
        GetCostumersUseCase.execute()
        .then((costumers) => {
            return res.json(costumers);
        })
        .catch ((error) => {
            console.error(error);
            return res.status(500);
        })
    }

    update (req: Request, res: Response) {
        const { id } = req.params;
        const costumerDataUpdate = req.body;

        try {
            UpdateCostumerUseCase.execute(costumerDataUpdate, id);
            return res.status(200).end();
        } catch (error) {
            console.error(error);
            return res.status(404)
        }
    }

    delete (req: Request, res: Response) {
        const { id } = req.params;
        try {
            DeleteCostumerUseCase.execute(id);
            return res.status(200).end();
        } catch (error) {
            console.error(error);
            return res.status(404);
        }
    }
}