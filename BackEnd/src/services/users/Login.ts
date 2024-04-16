import primaClient from '../../prisma'
import { compare } from 'bcryptjs'; //BIBLIOTECA PRA CRIPTOGRAFAR SENHA
import {sign} from 'jsonwebtoken' //BIBLIOTECA PRA FAZER A GERAÇÃO DO TOKEN

interface AuthRequest{
    email:string;
    password: string;
}

class AuthUserService{
    async execute({email, password}: AuthRequest){
    
        //VERIFICA SE EMAIL EXISTE
        const user = await primaClient.user.findFirst({
            where:{
                email:email
            }
        })

        if(!user){
            throw new Error("Usuário ou Senha Incorreto")
        }

        //Verifica se a senha está correta
        const passwordCorreta = await compare(password, user.password);

        if(!passwordCorreta){
            throw new Error("Usuário ou Senha Incorreto")
        }

        //Gera um token JWT e devolve dados do us se tudo deu certo
         const token = sign(
         {
           name: user.name,
           email: user.email 
          },

          process.env.JWT_SECRET,
          {
            subject: user.id,
            expiresIn: '30d'
          }
         )

       return {
        id: user.id,
        name: user.name,
        email: user.email,
        token: token
       };
    }
}

export {AuthUserService};