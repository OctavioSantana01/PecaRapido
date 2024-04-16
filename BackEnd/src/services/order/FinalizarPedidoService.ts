import primaClient from "../../prisma";

interface OrderRequest{
    order_id:string;
}

class FinalizarPedidoService{

    async execute({order_id}: OrderRequest){

        const order = await primaClient.order.update({
            where:{
                id:order_id
            },
            data:{
                status:true
            }
        })

        return order;
    }

}

export {FinalizarPedidoService}