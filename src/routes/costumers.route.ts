import Router from "express";
import { CostumersController } from "../controllers/costumer.controller";

const router = Router();
const costumersController = new CostumersController();

router.post("/costumers/", costumersController.create);

router.get("/costumers/", costumersController.listAll);

router.get("/costumers/:id", costumersController.listById);

router.put("/costumers/:id", costumersController.update);

router.delete("/costumers/:id", costumersController.delete);

export default router;