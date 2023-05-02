import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderDto } from 'src/app/models/RestaurantMenu/OrderDto.model';
import{RestaurantService} from 'src/app/services/Restaurant.service';
@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.css']
})
export class OrderTableComponent implements OnInit {
  constructor(private RestaurantService:RestaurantService,private router:Router){}
  ListORder:OrderDto[]=[];
  ngOnInit(): void {
    this.RestaurantService.GetAllOrders().subscribe({
      next:(ListORder:OrderDto[])=>{this.ListORder=ListORder;
      console.log(ListORder)},error:(r:any)=>{console.log(r)}

    });
  }
  

}
