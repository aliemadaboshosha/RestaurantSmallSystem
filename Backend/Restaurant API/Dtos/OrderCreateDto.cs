namespace Restaurant_API.Dtos
{
    public class OrderCreateDto
    {
        public int OrderId { get; set; }
        public string CustomerName { get; set; }
        public string CustomerAddress { get; set; }
        public string CustomerEmail { get; set; }
        public string CustomerPhone { get; set; }
        public DateTime OrderDate { get; set; }
        
        public List<OrderItemDto>? Items { get; set; }

    }
}
