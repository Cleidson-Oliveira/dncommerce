import Router from "express";
import { CostumersController } from "../controllers/sales.controller";

const router = Router();
const costumersController = new CostumersController();

router.post("/sales/", costumersController.create);

router.get("/sales/", costumersController.listSales);

router.get("/sales/:id", costumersController.listCostumersSales);

export default router;