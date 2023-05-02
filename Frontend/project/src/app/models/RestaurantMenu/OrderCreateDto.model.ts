import { OrderItemDto } from "./OrderItemDto.model";

export interface OrderCreateDto{
    orderId:number;
    customerName:string;
    customerAddress:string;
    customerEmail:string;
    customerPhone:string;
    orderDate:string;
    items:OrderItemDto[]
}