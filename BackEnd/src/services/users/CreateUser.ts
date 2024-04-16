import primaClient from '../../prisma'
import { hash } from 'bcryptjs';

interface UserRequest{
    name: string;
    email: string,
    password: string;
}
class CreateUserService{

    async execute({name, email, password}: UserRequest){

      //Verificao se o email foi enviado
      if(!email)
      {
        throw new Error("Email Incorreto")
      }

      //Verificao se o email já foi cadastrado

      const userAlreadyExists = await primaClient.user.findFirst({
       where:{
         email: email
       } 
      })

      if(userAlreadyExists){
         throw new Error("Esse e-mail já existe")
      }

      const passwordHash = await hash(password, 8)

      const user = await primaClient.user.create({
        data:{

          name:name,
          email: email,
          password: passwordHash,
        },
        select:{ //MOSTRA OS DADOS QUE VAI SER MOSTRADO
          id: true,
          email: true,
          name:true,
        }
    })

    return user;
 }
}

export {CreateUserService}