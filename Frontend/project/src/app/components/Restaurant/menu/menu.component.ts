import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'src/app/models/Menu/Menu.model';
import { RestaurantService } from 'src/app/services/Restaurant.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent  implements OnInit{
  Menu:MenuItem[]=[];
  constructor(private RestaurantService:RestaurantService,private router:Router){}
  ngOnInit(): void {
    this.RestaurantService.GetAllMenuItems().subscribe({
      next:(Menu:MenuItem[])=>{this.Menu=Menu;
      console.log(Menu)},error:(r:any)=>{console.log(r)}
    });
  }


}
