import { Request,Response } from "express";
import {ListaCategoryService} from '../../services/category/ListarCategoryService'

class ListaCategoryController{
    async handle(req:Request, res: Response){

        const listaCategoryService = new ListaCategoryService();

        const category = await listaCategoryService.execute();

        return res.json(category);

    }
}

export {ListaCategoryController}