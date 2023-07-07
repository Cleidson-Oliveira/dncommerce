import { Request, Response } from "express";
import CreateProductUseCase from "../useCases/products/createProduct.useCase";
import GetProductsUseCase from "../useCases/products/getProducts.useCase";
import DeleteProductUseCase from "../useCases/products/deleteProduct.useCase";
import UpdateProductUseCase from "../useCases/products/updateProduct.useCase";
import { ProductsRepository } from "../repositories/products.repository";
import { ProductStockRepository } from "../repositories/productStock.repository";

export class ProductsController {
    create (req: Request, res: Response) {
        const data = req.body;
        
        const createProductUseCase = new CreateProductUseCase(
            new ProductsRepository(),
            new ProductStockRepository(),
        )
        
        createProductUseCase.execute(data)
        .then((product) => {
            return res.json(product);
                
        }).catch((error) => {
            console.error(error);
            return res.status(400).json({error: "Can not be create product"})
        })
    }

    listById (req: Request, res: Response) {
        const { id } = req.params;

        GetProductsUseCase.execute(id)
        .then((product) => {
            return res.json(product);
        })
        .catch ((error) => {
            console.error(error);
            return res.status(404).json({error: "Product nor found!"});
        })
    }

    listAll (req: Request, res: Response) {
        
        GetProductsUseCase.execute()
        .then((products) => {
            return res.json(products);
        })
        .catch ((error) => {
            console.error(error);
            return res.status(500);
        })
    }

    update (req: Request, res: Response) {
        const { id } = req.params;
        const productDataUpdate = req.body;

        try {
            UpdateProductUseCase.execute(productDataUpdate, id);
            return res.status(200).end();
        } catch (error) {
            console.error(error);
            return res.status(404)
        }
    }

    delete (req: Request, res: Response) {
        const { id } = req.params;

        const deleteProductUseCase = new DeleteProductUseCase(
            new ProductsRepository(),
            new ProductStockRepository(),
        )
        
        try {
            deleteProductUseCase.execute(id);
            return res.status(200).end();
        } catch (error) {
            console.error(error);
            return res.status(404);
        }
    }
}