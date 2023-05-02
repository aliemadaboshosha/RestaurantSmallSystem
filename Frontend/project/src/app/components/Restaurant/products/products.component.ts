import { Component, OnInit,EventEmitter } from '@angular/core';

import { ActivatedRoute,Router } from '@angular/router';
import { MenuItem } from 'src/app/models/Menu/Menu.model';
import { OrderCreateDto } from 'src/app/models/RestaurantMenu/OrderCreateDto.model';
import { OrderItemDto } from 'src/app/models/RestaurantMenu/OrderItemDto.model';
import { RestaurantService } from 'src/app/services/Restaurant.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
order:OrderCreateDto={orderId:0,customerName:"",customerAddress:"",customerEmail:"",customerPhone:"",orderDate:"",items:[]};
  name:string="";
  Menu:MenuItem[]=[];
  SelectedItem:OrderItemDto[]=[];
  orderitem:OrderItemDto={menuItemId:0,sizeId:0,quantity:0};
  Quantities:number[]=[]


  constructor(private RestaurantService:RestaurantService,private router:Router){}
  ngOnInit(): void {
    this.RestaurantService.GetAllMenuItems().subscribe({
      next:(Menu:MenuItem[])=>{this.Menu=Menu;
      console.log(Menu)},error:(r:any)=>{console.log(r)}
    });
  }

  onChange(event:any){
    this.SelectedItem=[];
   

    
   
    let meals=document.querySelectorAll("input[type=checkbox]:checked");
    let sizes=document.querySelectorAll("select");
    let quantitys=document.querySelectorAll("input");
    this.SelectedItem=[];
    for (let index = 0; index < meals.length; index++) {
      let id=meals[index].id;
      
      
      this.RestaurantService.GetMenuItemById(Number(id)).subscribe({
        
        next:(MenuItem:MenuItem)=>{
          this.orderitem={menuItemId:0,sizeId:0,quantity:0};
          this.name=MenuItem.name;

         
          this.orderitem.menuItemId=Number(id);
           for (let index3 = 0; index3 < quantitys.length; index3++) {
          if(quantitys[index3].id===id+this.name){
          
            this.orderitem.quantity=Number(quantitys[index3].value);
          }
          
        }
        for (let index2 = 0; index2 < sizes.length; index2++) {
          if(sizes[index2].id===id){
            
            
            this.orderitem.sizeId=Number(sizes[index2].value);
           
            
            
          }
         
  
        }
       
       this.SelectedItem.push(this.orderitem);
        
      
      }
      
      })
      

      
       
      
      
      
    }
      
      
       
     
        
      }
      onCancel(){
        this.SelectedItem=[];
      }
      submitOrder(){
        this.order.items=this.SelectedItem;
        this.RestaurantService.AddOrder(this.order).subscribe({
          
          next:(order)=>{this.router.navigate(['/Order/'+order.orderId])},error:(r:any)=>{console.log(r)}
        });
        
        
      
      }
      
    }
    

  

