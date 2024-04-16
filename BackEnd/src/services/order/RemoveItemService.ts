import primaClient from "../../prisma";

interface ItemRequest{
    id: string;
}

class RemoveItemService{
    async execute({id}:ItemRequest){
       
        const orderItem = await primaClient.orderItem.delete({
            where:{
                id: id
            }
        });

        return orderItem;
    }
}

export {RemoveItemService}