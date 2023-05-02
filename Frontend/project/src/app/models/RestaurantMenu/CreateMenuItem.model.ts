import { MenuItemSizeDto } from "./MenuItemSizeDto.model";

export interface CreateMenuItem{
    menuItemId:number;
    name:string;
    
    menuItemSizes:MenuItemSizeDto[];
    image:any;
}