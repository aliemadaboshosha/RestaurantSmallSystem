import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'src/app/models/Menu/Menu.model';
import { CreateMenuItem } from 'src/app/models/RestaurantMenu/CreateMenuItem.model';
import { RestaurantService } from 'src/app/services/Restaurant.service';

@Component({
  selector: 'app-delete-menu',
  templateUrl: './delete-menu.component.html',
  styleUrls: ['./delete-menu.component.css']
})
export class DeleteMenuComponent implements OnInit {
  CreateMenuItem:CreateMenuItem={
    menuItemId:0,
    name:"",
    
    menuItemSizes:[],
    image:''
  }
  itemID:number=0;
  constructor(private ResturantService:RestaurantService,private router:Router,private route:ActivatedRoute){}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next:(params)=>{
        const id =Number(params.get('id')) ;
        if (id) {
          this.itemID=id;
          const subscription = this.ResturantService.GetMenuItemById(id).subscribe({
            next: (r: MenuItem) => {
              
              this.CreateMenuItem.name = r.name;
              console.log(r);
              this.CreateMenuItem.menuItemId = r.menuItemId;
              this.CreateMenuItem.image = r.image;},
              error: (r) => {
                console.log(r);
              }
            }) }}})
  }


  DeleteMenuItem(){
    const subscription = this.ResturantService.DeleteMenuItem(this.itemID).subscribe({
      next: (r) => {
        console.log(r);
        this.router.navigate(['/home']);
      },
      error: (r) => {
        console.log(r);
      }
    });
  }

}
