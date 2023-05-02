import { MenuItemSize } from "./MenuItemSize.model";

export interface MenuItem{
    menuItemId:number;
    name:string;
    
    menuItemSizes:MenuItemSize[];
    image:string;
}