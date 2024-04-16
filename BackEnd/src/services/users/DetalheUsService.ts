import primaClient from '../../prisma';

class DetalheUsService{
    
    async execute(user_id: string){
      
        const user = await primaClient.user.findFirst({
            where:{
                id: user_id
            },

            select:{
                id: true,
                name: true,
                email: true
            }
        })

        return user;

    }
    

}

export {DetalheUsService};