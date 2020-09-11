using System;
using System.Collections.Generic;

namespace MajesticArt.Core.Models
{
    public class Order
    {
        public int Id { get; set; }
        public IEnumerable<Product> Products { get; set; }
        public decimal Total { get; set; }
        public OrderStatus Status { get; set; }
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }

    public enum OrderStatus
    {
        Received = 1,
        Processing,
        Shipped
    }
}
