import primaClient from "../../prisma";

interface ProductRequest{
    category_id: string;
}

class ListarCategoriasServices{
    async execute({category_id} : ProductRequest){

        const findCategory = await primaClient.product.findMany({

            where:{
                category_id: category_id
            }
        })

        return findCategory;

    }
}

export {ListarCategoriasServices}