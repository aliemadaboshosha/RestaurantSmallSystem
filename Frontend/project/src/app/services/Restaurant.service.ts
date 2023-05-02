import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/internal/Observable';
import { city } from '../models/City/city.model';
import { Restaurant } from '../models/Restaurant/Restaurant.model';
import { MenuItem } from '../models/Menu/Menu.model';
import { Order } from '../models/Order/Order.model';
import { OrderItem } from '../models/Order/OrderItem.model';
import { CreateMenuItem } from '../models/RestaurantMenu/CreateMenuItem.model';
import { OrderDto } from '../models/RestaurantMenu/OrderDto.model';
import { OrderDetailsDto } from '../models/RestaurantMenu/OrderDetailsDto.model';
import { OrderCreateDto } from '../models/RestaurantMenu/OrderCreateDto.model';
@Injectable({
    providedIn: 'root'
  })
  export class RestaurantService{
    private order:any;
    setOrder(order:any){
      this.order=order
    }

    getOrder():any{
      return this.order
    }
    private data:any;
    setData(data:any){
      this.data=data
    }
    getData(): any {
      return this.data;
    }

    constructor(private http: HttpClient){}

    getAllCities():Observable<city[]>{
        return this.http.get<city[]>("http://localhost:5027/api/City")
     
       }

      getAllRestaurant():Observable<Restaurant[]>{
        return this.http.get<Restaurant[]>("http://localhost:5027/api/Restaurant")
      } 

      GetCityRestaurant(City_id:number):Observable<Restaurant[]>{
        return this.http.get<Restaurant[]>("http://localhost:5027/api/Restaurant/"+City_id)
      } 
      GetRestaurantMenu(Restaurant_id:any):Observable<MenuItem[]>{
        return this.http.get<MenuItem[]>("http://localhost:5027/api/MenuItem/"+Restaurant_id)

      }
      GetRestaurant(Restaurant_id:string):Observable<MenuItem[]>{
        return this.http.get<MenuItem[]>("http://localhost:5027/api/MenuItem/"+Restaurant_id)

      }
      CreateOrder(Restaurant_id:number,orderDate:Order):Observable<Order>{
        return this.http.post<Order>("http://localhost:5027/api/Order/"+Restaurant_id,orderDate)
      }
      FinishOrder(Order_id:number,items:OrderItem[]):Observable<OrderItem>{
        return this.http.post<OrderItem>("http://localhost:5027/api/Order/order/"+Order_id,items)
      }










      
      GetAllMenuItems():Observable<MenuItem[]>{
        return this.http.get<MenuItem[]>("https://localhost:7164/api/MenuItem")
      }
      GetMenuItemById(id: number): Observable<MenuItem> {
        return this.http.get<MenuItem>("https://localhost:7164/api/MenuItem/" + id);
      }
      AddMenuItem(CreateMenuItem:CreateMenuItem):Observable<CreateMenuItem>{
        return this.http.post<CreateMenuItem>("https://localhost:7164/api/MenuItem",CreateMenuItem)
      }
      EditeMenuItem(id:number,CreateMenuItem:CreateMenuItem):Observable<CreateMenuItem>{
        return this.http.put<CreateMenuItem>("https://localhost:7164/api/MenuItem/"+id,CreateMenuItem);
      }
      DeleteMenuItem(id:number):Observable<MenuItem>{
        return this.http.delete<MenuItem>("https://localhost:7164/api/MenuItem/"+id);
      }
GetAllOrders():Observable<OrderDto[]>{
  return this.http.get<OrderDto[]>("https://localhost:7164/api/Order")
}
GetOrderById(id:number):Observable<OrderDetailsDto>{
  return this.http.get<OrderDetailsDto>("https://localhost:7164/api/Order/"+id)
}
AddOrder(OrderCreateDto:OrderCreateDto):Observable<OrderCreateDto>{
  return this.http.post<OrderCreateDto>("https://localhost:7164/api/Order",OrderCreateDto);
}
EditeOrder(id:number,OrderCreateDto:OrderCreateDto):Observable<OrderCreateDto>{
  return this.http.put<OrderCreateDto>("https://localhost:7164/api/Order/"+id,OrderCreateDto);
}
DeleteOrder(id:number):Observable<OrderDto>{
  return this.http.delete<OrderDto>("https://localhost:7164/api/Order/"+id);
}



  }