namespace Restaurant_API.Dtos
{
    public class OrderDto
    {
        public int OrderId { get; set; }
        public string CustomerName { get; set; }
        public string CustomerAddress { get; set; }
        public string CustomerEmail { get; set; }
        public string CustomerPhone { get; set; }
        public DateTime OrderDate { get; set; }
        public int NumberOfItems { get; set; }
        




    }
}
