import { OrderItemDetails } from "./OrderItemDetails.model";

export interface OrderDetailsDto{
    orderId:number;
    customerName:string;
    customerAddress:string;
    customerEmail:string;
    customerPhone:string;
    orderDate:string;
    numberOfItems:number;
    totalPrice:number;
    items:OrderItemDetails[]
}