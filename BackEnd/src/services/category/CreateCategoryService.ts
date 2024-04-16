import primaClient from "../../prisma"

interface CategoryRequest{
    name: string;
}

class CreateCategoryService{
    async execute({name}: CategoryRequest){
        
        if(name === ''){
            throw new Error('Nome Inválido');
        }

        const category = await primaClient.category.create({
             data:{
                name: name,

             },
             select:{
                id: true,
                name: true,
             }
        })

        return category;

    }
}

export {CreateCategoryService}