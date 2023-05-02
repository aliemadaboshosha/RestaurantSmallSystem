using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Restaurant_API.Dtos;
using Restaurant_API.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Restaurant_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        RestaurantDBContext dbContext;
        public OrderController(RestaurantDBContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public ActionResult<List<OrderDto>> GetAll()
        {
            if (dbContext.Orders==null)
            {
                return BadRequest();

            }
            else {

                var orders = dbContext.Orders.Include(o=>o.OrderItems).ThenInclude(o=>o.MenuItem).ThenInclude(o=>o.MenuItemSizes).ThenInclude(o=>o.Size);

                List<OrderDto>resultOrder=new List<OrderDto>();
                foreach (var order in orders)
                {
                    OrderDto temp = new OrderDto();
                    temp.OrderId = order.OrderId;
                    temp.OrderDate = order.OrderDate;
                    temp.CustomerPhone = order.CustomerPhone;
                    temp.CustomerAddress  = order.CustomerAddress;
                    temp.CustomerEmail = order.CustomerEmail;
                    temp.CustomerName=order.CustomerName;
                  
                    var listItem = order.OrderItems.ToList();
                    foreach (var item in listItem)
                    {
                        
                        temp.NumberOfItems += item.Quantity;
                    }
                        //decimal price = 0;

                        //temp.TotalPrice = price;
                        resultOrder.Add(temp);
                }

                return Ok(resultOrder);
            }
            
        }

        // GET api/<OrderController>/5
        [HttpGet("{id:int}")]
        public ActionResult<OrderDetailsDto> GetOrder(int id)
        {
            OrderDetailsDto result = new OrderDetailsDto();
            if (dbContext.Orders == null)
            {
                return BadRequest();

            }
            else if (id==null)
            {
                return BadRequest();
            }
            var order = dbContext.Orders.Include(o => o.OrderItems).ThenInclude(o => o.MenuItem).ThenInclude(o => o.MenuItemSizes).ThenInclude(o => o.Size).FirstOrDefault(O => O.OrderId == id);
            if (order==null)
            {
                return BadRequest();
            }
            
            else
            {
                
                result.OrderId = order.OrderId;
                result.OrderDate = order.OrderDate;
                result.CustomerPhone = order.CustomerPhone;
                result.CustomerAddress = order.CustomerAddress;
                result.CustomerEmail = order.CustomerEmail;
                result.CustomerName = order.CustomerName;
                //result.NumberOfItems=order.OrderItems.Count();
                

                


            }
            List<OrderItemDetails> ordeItemList = new List<OrderItemDetails>();
            var listItem = order.OrderItems.ToList();
            foreach (var item in listItem)
            {
                OrderItemDetails orderItem = new OrderItemDetails();
                
                var temp= dbContext.MenuItemSizes.FirstOrDefault(o=>o.SizeId==item.SizeId&&o.MenuItemId==item.MenuItemId);
                orderItem.Size = dbContext.Sizes.FirstOrDefault(o => o.SizeId == item.SizeId).Name;
                orderItem.Name = dbContext.MenuItems.FirstOrDefault(o => o.MenuItemId == item.MenuItemId).Name;
                orderItem.Quantity = item.Quantity;
                orderItem.Price = temp.Price;
                ordeItemList.Add(orderItem);
                result.NumberOfItems += item.Quantity;
                result.TotalPrice += temp.Price*item.Quantity;

            }
            result.Items = ordeItemList;
            return Ok(result);

        }

        // POST api/<OrderController>
        [HttpPost]
        public ActionResult<OrderCreateDto> Post(OrderCreateDto order)
        {
            if (order==null)
            {
                return BadRequest();
            }

            Order newOrder = new Order();
            newOrder.CustomerName=order.CustomerName;
            newOrder.CustomerEmail=order.CustomerEmail;
            newOrder.CustomerPhone=order.CustomerPhone;
            newOrder.CustomerAddress=order.CustomerAddress;
            newOrder.OrderDate=order.OrderDate;
            dbContext.Orders.Add(newOrder);
            dbContext.SaveChanges();
            
            foreach (var item in order.Items)
            { OrderItem orderItem = new OrderItem();
                orderItem.OrderId = newOrder.OrderId;
                orderItem.MenuItemId = item.MenuItemId;
                orderItem.SizeId = item.SizeId;
                orderItem.Quantity=item.Quantity;
                dbContext.OrderItems.Add(orderItem);
                dbContext.SaveChanges();
                
                


            }
            order.OrderId = newOrder.OrderId;

            return Ok(order);


        }
        

        // PUT api/<OrderController>/5
        [HttpPut("{id:int}")]
        public ActionResult<OrderCreateDto> Edite(int id,OrderCreateDto editeOrder)
        {
            if (editeOrder==null)
            {
                return BadRequest();
            }
             else if (editeOrder.OrderId != id) { return BadRequest(); }
            else
            {

                var order=dbContext.Orders.Find(id);
                order.CustomerName = editeOrder.CustomerName;
                order.CustomerPhone = editeOrder.CustomerPhone;
                order.CustomerAddress = editeOrder.CustomerAddress;
                order.OrderDate = editeOrder.OrderDate;
                order.CustomerEmail= editeOrder.CustomerEmail;
               

                foreach (var item in editeOrder.Items)
                {
                    var orderItem = dbContext.OrderItems.FirstOrDefault(o=>o.OrderId==editeOrder.OrderId&&o.MenuItemId==item.MenuItemId);
                    if (orderItem!=null)
                    {
                        
                        orderItem.Quantity = item.Quantity;
                       
                    }
                    
                   
                }
                dbContext.SaveChanges();

                return NoContent();
            }

        }

        // DELETE api/<OrderController>/5
        [HttpDelete("{id:int}")]
        public ActionResult Delete(int? id)
        {
            if (id==null)
            {

                return BadRequest();
            }
            else
            {
                var order = dbContext.Orders.Find(id);
                if (order == null) { return BadRequest(); }
                else 
                {
                    dbContext.Orders.Remove(order);
                    dbContext.SaveChanges();
                     return NoContent();
                }
            }
        }
    }
}
