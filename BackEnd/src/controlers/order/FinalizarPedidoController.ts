import { Request,Response } from "express";
import {FinalizarPedidoService} from '../../services/order/FinalizarPedidoService'

class FinzalizarPedidoController{
    async handle(req:Request, res:Response){

        const {order_id} = req.body;

        const finishPedidoService = new FinalizarPedidoService();

        const finishPedido = await finishPedidoService.execute({
            order_id
        });

        return res.json(finishPedido);
    }
}

export {FinzalizarPedidoController}