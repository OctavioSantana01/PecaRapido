import { Request, Response } from "express";
import {ListarCategoriasServices} from '../../services/Produtos/ListarCategoriasServices'

class ListarCategoriasController{
    async handle(req:Request, res:Response){

          const category_id = req.query.category_id as string;

          const listarCategorias = new ListarCategoriasServices();

          const products = await listarCategorias.execute({
            category_id
          })

          return res.json(products)
    }
}

export {ListarCategoriasController}