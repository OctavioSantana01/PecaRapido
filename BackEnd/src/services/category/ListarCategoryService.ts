import primaClient from "../../prisma";

class ListaCategoryService{
    async execute(){

        const category = await primaClient.category.findMany({
            select:{
                id:true,
                name:true,
            }
        })

        return category;
    }
}

export {ListaCategoryService}