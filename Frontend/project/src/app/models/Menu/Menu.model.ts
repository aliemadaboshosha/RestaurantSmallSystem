import { MenuItemSize } from "../RestaurantMenu/MenuItemSize.model";

export interface MenuItem{
    menuItemId:number;
    name:string;
    price:number;
    menuItemSizes:MenuItemSize[];
    image:string;
}