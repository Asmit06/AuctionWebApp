namespace AuctionService.DTO;

public class UpdateAuctionDTO
{
    public string ItemName { get; set; }
    public string ItemDesc { get; set; }
    public int? Year { get; set; }
    public string Type { get; set; }
}
