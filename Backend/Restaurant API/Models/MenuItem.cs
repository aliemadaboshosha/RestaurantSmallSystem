﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Restaurant_API.Models
{
    [Table("MenuItem")]
    public partial class MenuItem
    {
        //public MenuItem()
        //{
        //    MenuItemSizes = new HashSet<MenuItemSize>();
        //    OrderItems = new HashSet<OrderItem>();
        //}

        [Key]
        public int MenuItemId { get; set; }
        [Required]
        [StringLength(50)]
        [Unicode(false)]
        public string Name { get; set; }
        [Required]
        [StringLength(200)]
        [Unicode(false)]
        public string Image { get; set; }

        [InverseProperty("MenuItem")]
        public virtual ICollection<MenuItemSize> MenuItemSizes { get; set; }
        [InverseProperty("MenuItem")]
        public virtual ICollection<OrderItem> OrderItems { get; set; }
    }
}