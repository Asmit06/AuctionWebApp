using MongoDB.Entities;

namespace SearchService;

public class Item : Entity
{
    public int ReservePrice { get; set; }
    public string Seller { get; set; }
    public string Winner { get; set; }
    public int SoldAmount { get; set; }
    public int CurrentHighBid { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public DateTime AuctionEnd { get; set; }
    public string Status { get; set; }
    public string ItemName { get; set; }
    public string ItemDesc { get; set; }
    public int Year { get; set; }
    public string ImageUrl { get; set; }
    public string Type { get; set; }
}
