import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import{RestaurantService} from 'src/app/services/Restaurant.service';
import { OrderDetailsDto } from 'src/app/models/RestaurantMenu/OrderDetailsDto.model';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent  implements OnInit{
  constructor(private RestaurantService:RestaurantService,private router:Router,private route:ActivatedRoute) {
  }

  order:OrderDetailsDto={orderId:0,customerName:"",customerAddress:"",customerEmail:"",customerPhone:"",orderDate:"",numberOfItems:0,totalPrice:0,items:[]};

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      this.RestaurantService.GetOrderById(Number(params.get('id'))).subscribe({
        next:(order:OrderDetailsDto)=>{this.order=order;
        console.log(this.order);
        },error:(r:any)=>{console.log(r)}
      });
    });
  }

}
