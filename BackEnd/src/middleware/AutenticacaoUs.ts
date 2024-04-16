import { NextFunction, Request,Response } from "express";
import { verify } from "jsonwebtoken";

interface PayLoad{
    sub: string;
}

export function AutenticacaoUs(

   req: Request,
   res: Response,
   next: NextFunction
){
    //Recebe o Token
    const token = req.headers.authorization;

    if(!token){
        return res.status(401).end(); //Status 401(Não autorizado)
    }

    const [, authtoken] = token.split(" ")

    try{
       //VALIDACAO DO TOKEN

       const{ sub } = verify( //sub pega o id do us
         authtoken,
         process.env.JWT_SECRET

       ) as PayLoad; // confirma se o token é válido, se não foi adulterado e se o tempo de validade (data de expiração) ainda não passou
       
       //Recupera o id do token
       req.user_id = sub;
       return next();
    
    }
       
    catch(err){
       return res.status(401).end();
    }

}