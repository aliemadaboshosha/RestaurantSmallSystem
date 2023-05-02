using Restaurant_API.Models;

namespace Restaurant_API.Dtos
{
    public class MenuItemDto
    {
        public int MenuItemId { get; set; }
        public string? Name { get; set; }
        public string? Image { get; set; }
        public List<SizeDto>? MenuItemSizes { get; set; }

    }
}
