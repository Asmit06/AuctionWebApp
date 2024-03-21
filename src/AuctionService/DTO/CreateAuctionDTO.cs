using System.ComponentModel.DataAnnotations;

namespace AuctionService.DTO;

public class CreateAuctionDTO
{
    [Required]
    public string ItemName { get; set; }
    [Required]
    public string ItemDesc { get; set; }
    [Required]
    public int Year { get; set; }
    [Required]
    public string ImageUrl { get; set; }
    [Required]
    public string Type { get; set; }
    [Required]
    public int ReservePrice { get; set; }
    [Required]
    public DateTime AuctionEnd { get; set; }
}
