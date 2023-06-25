import Router from "express";
import { ProductsController } from "../controllers/products.controller";

const router = Router();
const productsController = new ProductsController();

router.post("/products/", productsController.create);

router.get("/products/", productsController.listAll);

router.get("/products/:id", productsController.listById);

router.put("/products/:id", productsController.update);

router.delete("/products/:id", productsController.delete);

export default router;