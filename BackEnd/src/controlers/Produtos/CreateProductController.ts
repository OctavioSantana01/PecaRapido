import { Request, Response } from "express";
import {CreateProduteService} from '../../services/Produtos/CreateProductService'

class CreateProductController{

    async handle(req:Request, res:Response){

        const{name, price, descricao, category_id} = req.body;

        const createProductService = new CreateProduteService();

        if(!req.file){
            throw new Error("Erro ao abrir o arquivo!")
        }
        else{

            const {originalname, filename: foto } = req.file;

            const product = await createProductService.execute({
                name,
                price,
                descricao,
                foto,
                category_id
            });
    
            return res.json(product)
        }
        
    }

}

export {CreateProductController}