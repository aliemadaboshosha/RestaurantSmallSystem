namespace Restaurant_API.Dtos
{
    public class CreateMenuItemDto
    {
        public int MenuItemId { get; set; }
        public string? Name { get; set; }
        public string? Image { get; set; }
        public List<MenuItemSizeDto>? MenuItemSizes { get; set; }
    }
}
