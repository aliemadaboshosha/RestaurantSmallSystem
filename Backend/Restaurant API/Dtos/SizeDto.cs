namespace Restaurant_API.Dtos
{
    public class SizeDto
    {
        public int SizeId { get; set; }
        public string Name { get; set; }
        public decimal Price { get; internal set; }
    }
}
