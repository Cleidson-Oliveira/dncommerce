import { Request, Response } from "express";
import CreateProductUseCase from "../useCases/products/createProduct.useCase";
import GetProductsUseCase from "../useCases/products/getProducts.useCase";
import DeleteProductUseCase from "../useCases/products/deleteProduct.useCase";
import updateProductUseCase from "../useCases/products/updateProduct.useCase";

export class ProductsController {
    create (req: Request, res: Response) {
        const data = req.body;
        
        CreateProductUseCase.execute(data)
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
            updateProductUseCase.execute(productDataUpdate, id);
            return res.status(200).end();
        } catch (error) {
            console.error(error);
            return res.status(404)
        }
    }

    delete (req: Request, res: Response) {
        const { id } = req.params;
        try {
            DeleteProductUseCase.execute(id);
            return res.status(200).end();
        } catch (error) {
            console.error(error);
            return res.status(404);
        }
    }
}