import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CreateMenuItem } from 'src/app/models/RestaurantMenu/CreateMenuItem.model';
import { OrderCreateDto } from 'src/app/models/RestaurantMenu/OrderCreateDto.model';
import { RestaurantService } from 'src/app/services/Restaurant.service';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.css']
})
export class AddMenuComponent {
  constructor(private ResturantService:RestaurantService,private router:Router){}

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
  handleImageInput(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const imageSrc = reader.result as string;
      const imageName = file.name;
      const imagePath = `E:/ASP NET MVC Test AR/Frontend/project/src/assets/images/${imageName}`;
      this.CreateMenuItem.image = imageName;
      localStorage.setItem(imagePath, imageSrc);

      // You can now store the image in the "assets/images" folder using a file API such as fs or an HTTP request to a server.
    };
  }
  addItem(){
    const selectedSizes = this.menuItemSizesArr.filter(size => size.checked);

   for (let index = 0; index < selectedSizes.length; index++) {
     const element = selectedSizes[index];
     this.CreateMenuItem.menuItemSizes.push({sizeId:element.sizeId,price:element.price})}
    
    this.ResturantService.AddMenuItem(this.CreateMenuItem).subscribe({
      next:(r)=>{this.router.navigate(['/home']);
    console.log(this.CreateMenuItem)},error:(r)=>{console.log(r)}
  })


}
}

