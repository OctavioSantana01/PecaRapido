import primaClient from "../../prisma";

interface ProductRequest{
    name:string;
    price: string;
    descricao: string;
    foto: string;
    category_id: string;
}

class CreateProduteService{

    async execute({name,price,descricao,foto,category_id}: ProductRequest){

        const product = await primaClient.product.create({
            data:{
               name: name,
               price: price,
               description: descricao,
               banner: foto,
               category_id: category_id
            }
        })

        return {product}

    }

}

export {CreateProduteService}