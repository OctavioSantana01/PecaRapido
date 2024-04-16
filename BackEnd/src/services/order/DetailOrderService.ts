import primaClient from "../../prisma";

interface DetailRequest{
    order_id: string;
}

class DeitailOrderService{
    async execute({order_id}: DetailRequest){
 
        const order = await primaClient.orderItem.findMany({
            where:{
                order_id: order_id
            },
            include:{
                product:true,
                order:true,
            }
        })

        return order;
    }
}

export {DeitailOrderService}