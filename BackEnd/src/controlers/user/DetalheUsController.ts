import { Request, Response } from "express";
import {DetalheUsService} from '../../services/users/DetalheUsService';

class DetalheUsController{
    async handle(req: Request, res:Response){

        const user_id = req.user_id;

        const detalheUsService = new DetalheUsService();

        const user = await detalheUsService.execute(user_id);

        return res.json(user);
    }

}

export {DetalheUsController}
