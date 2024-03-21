using AuctionService.Data;
using AuctionService.DTO;
using AuctionService.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AuctionService.Controllers;

[ApiController]
[Route("api/auctions")]
public class AuctionController : ControllerBase
{
    private readonly AuctionDbContext _context;
    private readonly IMapper _mapper;
    public AuctionController(AuctionDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<List<AuctionDTO>>> GetAllAuctions()
    {
        var auctions = await _context.Auctions
            .Include(x => x.Item)
            .OrderBy(x => x.Item.Year)
            .ToListAsync();

        return _mapper.Map<List<AuctionDTO>>(auctions);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<AuctionDTO>> GetAuctionById(Guid id)
    {
        var auction = await _context.Auctions
            .Include(x => x.Item)
            .FirstOrDefaultAsync(x => x.Id == id);
        
        if(auction==null) return NotFound();

        return _mapper.Map<AuctionDTO>(auction);
    }

    // [HttpGet("type={type}")]
    // public async Task<ActionResult<List<AuctionDTO>>> GetAuctionByType(string type)
    // {
    //     var auctions = await _context.Auctions
    //     .Include(x => x.Item)
    //     .Where(x => x.Item.Type.ToLower() == type.ToLower())
    //     .ToListAsync();
        
    //     // if(auctions==null) return NotFound();

    //     return _mapper.Map<List<AuctionDTO>>(auctions);
    // }
    [HttpPost]
    public async Task<ActionResult<AuctionDTO>> CreateAuction(CreateAuctionDTO auctionDto)
    {
        var auction = _mapper.Map<Auction>(auctionDto);

        auction.Seller = "test";
        _context.Auctions.Add(auction);

        var result = await _context.SaveChangesAsync() > 0;
        
        if(!result) return BadRequest("Could not save changes to the DB");

        return CreatedAtAction(nameof(GetAuctionById), 
            new {auction.Id}, _mapper.Map<AuctionDTO>(auction));
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateAuction(Guid id, UpdateAuctionDTO updateAuctionDto)
    {
        var auction = await _context.Auctions.Include(x => x.Item)
            .FirstOrDefaultAsync(x => x.Id == id);

        if (auction == null) return NotFound();

        // TODO: check seller == username

        auction.Item.ItemName = updateAuctionDto.ItemName ?? auction.Item.ItemName;
        auction.Item.ItemDesc = updateAuctionDto.ItemDesc ?? auction.Item.ItemDesc;
        auction.Item.Type = updateAuctionDto.Type ?? auction.Item.Type;
        auction.Item.Year = updateAuctionDto.Year ?? auction.Item.Year;

        var result = await _context.SaveChangesAsync() > 0;

        if (result) return Ok();

        return BadRequest("Problem saving changes");
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteAuction(Guid id)
    {
        var auction = await _context.Auctions.FindAsync(id);

        if (auction == null) return NotFound();

        // TODO: check seller == username

        _context.Auctions.Remove(auction);

        var result = await _context.SaveChangesAsync() > 0;

        if (!result) return BadRequest("Could not update DB");

        return Ok();
    }
}
