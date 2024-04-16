//E COM OS CONTROLERS QUE RECEBE DIRETAMENTE A REQUISICAO E VAI SER PEGO OS PARAMETROS DA REQUISICÃO
//CHAMANDO O SERVICO PASSANDO OS DADOS NECESSÁRIOS 

import { Request, response, Response } from 'express';
import {CreateUserService} from '../../services/users/CreateUser'

class CreateUser{

    async handle(req: Request, res: Response){  //Metódo assincrono

     const {name, email, password } = req.body; //PEGA OS DADOS DA REQUISICAO

     const createUserService = new CreateUserService();

     const user = await createUserService.execute({name, email, password});  //CHAMA O SERVICO PASSANDO OS DADOS OBTIDOS
     //Await espera o resultado do execute e ai sim vai pra linha de baixo
      return res.json(user) 

    }
}

    export{ CreateUser }