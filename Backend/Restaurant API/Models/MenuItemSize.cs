﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Restaurant_API.Models
{
    public partial class MenuItemSize
    {
        [Key]
        public int MenuItemId { get; set; }
        [Key]
        public int SizeId { get; set; }
        [Column(TypeName = "decimal(8, 2)")]
        public decimal Price { get; set; }

        [ForeignKey("MenuItemId")]
        [InverseProperty("MenuItemSizes")]
        public virtual MenuItem MenuItem { get; set; }
        [ForeignKey("SizeId")]
        [InverseProperty("MenuItemSizes")]
        public virtual Size Size { get; set; }
    }
}