using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AuctionService.Models;

[Table("Items")]
public class Item
{
    public Guid Id { get; set; }
    public string ItemName { get; set; }
    public string ItemDesc { get; set; }
    public int Year { get; set; }
    public string ImageUrl { get; set; }
    public string Type { get; set; }
    // nav properties
    public Auction Auction { get; set; }
    public Guid AuctionId { get; set; }
}
