using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Restaurant_API.Dtos;
using Restaurant_API.Models;
using static System.Net.Mime.MediaTypeNames;
using System.IO;

namespace Restaurant_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenuItemController : ControllerBase
    {
        RestaurantDBContext dbContext;
        public MenuItemController(RestaurantDBContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public ActionResult<List<MenuItemDto>> GetAll()
        {
            var menuItems = dbContext.MenuItems.Include(I => I.MenuItemSizes).ThenInclude(I => I.Size).ToList();
            List<MenuItemDto> result = new List<MenuItemDto>();
            if (menuItems == null)
            {
                return NotFound();
            }
            else
            {
                foreach (var item in menuItems)
                {
                    MenuItemDto temp = new MenuItemDto();
                    temp.Name = item.Name;
                    temp.Image = item.Image;
                    temp.MenuItemId = item.MenuItemId;
                    List<SizeDto> sizes = new List<SizeDto>();
                    foreach (var item2 in item.MenuItemSizes)
                    {
                        SizeDto size = new SizeDto();
                        size.Name = item2.Size.Name;
                        size.SizeId = item2.SizeId;
                        size.Price = item2.Price;
                        sizes.Add(size);
                    }
                    temp.MenuItemSizes = sizes;
                    result.Add(temp);



                }

                return Ok(result);

            }

        }
        [HttpGet("{itemID:int}")]
        public ActionResult<MenuItemDto> GetById(int itemID)
        {
            var menuItem = dbContext.MenuItems
                .Include(i => i.MenuItemSizes)
                .ThenInclude(i => i.Size)
                .FirstOrDefault(i => i.MenuItemId == itemID);

            if (menuItem == null)
            {
                return NotFound();
            }
            else
            {
                MenuItemDto result = new MenuItemDto();
                result.Name = menuItem.Name;
                result.Image = menuItem.Image;
                result.MenuItemId = menuItem.MenuItemId;
                List<SizeDto> sizes = new List<SizeDto>();
                foreach (var item in menuItem.MenuItemSizes)
                {
                    SizeDto size = new SizeDto();
                    size.Name = item.Size.Name;
                    size.SizeId = item.SizeId;
                    size.Price = item.Price;
                    sizes.Add(size);
                }
                result.MenuItemSizes = sizes;

                return Ok(result);
            }
        }
        [HttpPost]
        public ActionResult<CreateMenuItemDto> Add(IFormFile image, CreateMenuItemDto menuItem)
        {
            if (menuItem == null)
            {
                return BadRequest();
            }
            else
            {
                MenuItem newItem = new MenuItem();
                newItem.Name = menuItem.Name;
                var fileName = image.FileName;
                var filePath = Path.Combine("E:", "ASP NET MVC Test AR", "Frontend", "project", "src", "assets", "images", fileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                     image.CopyToAsync(stream);
                }

              //  save image file name to database
newItem.Image = fileName;
                dbContext.MenuItems.Add(newItem);
                dbContext.SaveChanges();
                List<MenuItemSize> Sizes = new List<MenuItemSize>();
                foreach (var item in menuItem.MenuItemSizes)
                {
                    var size = new MenuItemSize();
                    size.MenuItemId = newItem.MenuItemId;
                    size.SizeId = item.SizeId;
                    size.Price = item.Price;
                    dbContext.MenuItemSizes.Add(size);

                }
                dbContext.SaveChanges();
                return Ok(menuItem);
            }

        }
        //[HttpPost]
        //public async Task<ActionResult<CreateMenuItemDto>> Add(IFormFile image, CreateMenuItemDto menuItem)
        //{
        //    if (menuItem == null)
        //    {
        //        return BadRequest();
        //    }
        //    else
        //    {
        //        MenuItem newItem = new MenuItem();
        //        newItem.Name = menuItem.Name;

        //        save image file to the specified directory
        //       var fileName = image.FileName;
        //        var filePath = Path.Combine("E:", "ASP NET MVC Test AR", "Frontend", "project", "src", "assets", "images", fileName);
        //        using (var stream = new FileStream(filePath, FileMode.Create))
        //        {
        //            await image.CopyToAsync(stream);
        //        }

        //        save image file name to database
        //        newItem.Image = fileName;
        //        dbContext.MenuItems.Add(newItem);
        //        dbContext.SaveChanges();

        //        save sizes to database
        //        List<MenuItemSize> Sizes = new List<MenuItemSize>();
        //        foreach (var item in menuItem.MenuItemSizes)
        //        {
        //            var size = new MenuItemSize();
        //            size.MenuItemId = newItem.MenuItemId;
        //            size.SizeId = item.SizeId;
        //            size.Price = item.Price;
        //            dbContext.MenuItemSizes.Add(size);
        //        }
        //        dbContext.SaveChanges();
        //        return Ok(menuItem);
        //    }
        //}

        [HttpDelete("{itemID:int}")]
        public ActionResult<MenuItemDto> delete(int itemID){
            var item =dbContext.MenuItems.FirstOrDefault(I=>I.MenuItemId == itemID);
            if (item==null)
            {
                return BadRequest();
            }
            else
            {
                dbContext.MenuItems.Remove(item);
                dbContext.SaveChanges();
                return NoContent();
            }


            }

        [HttpPut("{itemID:int}")]

        public ActionResult<CreateMenuItemDto> Edite(int itemID, CreateMenuItemDto menuItem)
        {

            if (itemID==null)
            {
                return BadRequest();
            }
           else if  (itemID!=menuItem.MenuItemId)
            {
                return BadRequest();
            }
            else
            {
                var editeItem=dbContext.MenuItems.FirstOrDefault(i=>i.MenuItemId == itemID);
                editeItem.Name=menuItem.Name;
                editeItem.Image=menuItem.Image;
                
                foreach (var item in menuItem.MenuItemSizes)
                {
                    var sizeItem=dbContext.MenuItemSizes.FirstOrDefault(i=>i.MenuItemId == itemID&&i.SizeId==item.SizeId);
                    if (sizeItem == null)
                    {
                        MenuItemSize menuItemSize = new MenuItemSize();
                        menuItemSize.SizeId = item.SizeId;
                        menuItemSize.MenuItemId = itemID;
                        menuItemSize.Price = item.Price;
                        dbContext.MenuItemSizes.Add(menuItemSize);
                    }
                    else
                    {
                        sizeItem.Price = item.Price;
                    }
                    

                }
                dbContext.SaveChanges();
                return NoContent();
            }


        }
    }
}
