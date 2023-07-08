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
            return res.status(error.statusCode).json({error: error.message});
        })
    }

    listById (req: Request, res: Response) {
        const { id } = req.params;

        const getProductsUseCase = new GetProductsUseCase(
            new ProductsRepository(),
            new ProductStockRepository()
        )

        getProductsUseCase.execute(id)
        .then((product) => {
            return res.json(product);
        })
        .catch ((error) => {
            console.error(error);
            return res.status(error.statusCode).json({error: error.message});
        })
    }

    listAll (req: Request, res: Response) {

        const getProductsUseCase = new GetProductsUseCase(
            new ProductsRepository(),
            new ProductStockRepository(),
        )
        
        getProductsUseCase.execute()
        .then((products) => {
            return res.json(products);
        })
        .catch ((error) => {
            console.error(error);
            return res.status(error.statusCode).json({error: error.message});
        })
    }

    update (req: Request, res: Response) {
        const { id } = req.params;
        const productDataUpdate = req.body;

        const updateProductUseCase = new UpdateProductUseCase(
            new ProductsRepository(),
        )

        updateProductUseCase.execute(productDataUpdate, id)
        .then(() => {
            return res.status(200).end();
        })
        .catch((error) => {
            console.error(error);
            return res.status(error.statusCode).json({error: error.message});
        })
    }

    delete (req: Request, res: Response) {
        const { id } = req.params;

        const deleteProductUseCase = new DeleteProductUseCase(
            new ProductsRepository(),
            new ProductStockRepository(),
        )
        
        deleteProductUseCase.execute(id)
        .then(() => {
            return res.status(200).end();
        })
        .catch((error) => {
            console.error(error);
            return res.status(error.statusCode).json({error: error.message});
        })
    }
}