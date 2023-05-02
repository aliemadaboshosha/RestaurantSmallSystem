import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateMenuItem } from 'src/app/models/RestaurantMenu/CreateMenuItem.model';
import { MenuItem } from 'src/app/models/RestaurantMenu/Menu.model';
import { RestaurantService } from 'src/app/services/Restaurant.service';

@Component({
  selector: 'app-edite-menu',
  templateUrl: './edite-menu.component.html',
  styleUrls: ['./edite-menu.component.css']
})
export class EditeMenuComponent implements OnInit {

  CreateMenuItem:CreateMenuItem={
    menuItemId:0,
    name:"",
    
    menuItemSizes:[],
    image:''
  }
  menuItemSizesArr = [
    { sizeId: 1, name: 'Small', priceName: 'smallPrice', checked: false, price: 0 },
    { sizeId: 2, name: 'Medium', priceName: 'mediumPrice', checked: false, price: 0 },
    { sizeId: 3, name: 'Large', priceName: 'largePrice', checked: false, price: 0 }
  ];

  constructor(private ResturantService:RestaurantService,private router:Router,private route:ActivatedRoute){}
  ngOnInit(): void {
this.route.paramMap.subscribe({
  next:(params)=>{
    const id =Number(params.get('id')) ;
    if (id) {
      const subscription = this.ResturantService.GetMenuItemById(id).subscribe({
        next: (r: MenuItem) => {
          
          this.CreateMenuItem.name = r.name;
          console.log(r);
          this.CreateMenuItem.menuItemId = r.menuItemId;
          this.CreateMenuItem.image = r.image;
          for (let index = 0; index < r.menuItemSizes.length; index++) {
            for (let index2 = 0; index2 < this.menuItemSizesArr.length; index2++) {
              if (r.menuItemSizes[index].sizeId == this.menuItemSizesArr[index2].sizeId) {
                this.menuItemSizesArr[index2].checked = true;
                this.menuItemSizesArr[index2].price = r.menuItemSizes[index].price;
              }
            }
          }
          
        }
          ,
        error: (r) => {
          console.log(r);
        }
      });
    }

}  
 })}



  

  editeItem(){
    const selectedSizes = this.menuItemSizesArr.filter(size => size.checked);

   for (let index = 0; index < selectedSizes.length; index++) {
     const element = selectedSizes[index];
     this.CreateMenuItem.menuItemSizes.push({sizeId:element.sizeId,price:element.price})}
    
    this.ResturantService.EditeMenuItem(this.CreateMenuItem.menuItemId,this.CreateMenuItem).subscribe({
      next:(r)=>{this.router.navigate(['/home']);
    console.log(this.CreateMenuItem)},error:(r)=>{console.log(r)}
  })
  }
}


