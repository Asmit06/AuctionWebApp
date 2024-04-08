using AuctionService.Data;
using AuctionService.DTO;
using AuctionService.Models;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Contracts;
using MassTransit;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AuctionService.Controllers;

[ApiController]
[Route("api/auctions")]
public class AuctionController : ControllerBase
{
    private readonly AuctionDbContext _context;
    private readonly IMapper _mapper;
    private readonly IPublishEndpoint _publish;

    public AuctionController(AuctionDbContext context, IMapper mapper, IPublishEndpoint publish)
    {
        _context = context;
        _mapper = mapper;
        _publish = publish;
    }

    [HttpGet]
    public async Task<ActionResult<List<AuctionDTO>>> GetAllAuctions(string date)
    {
        var query = _context.Auctions.OrderBy(x=>x.Item.ItemName).AsQueryable();

        if(!string.IsNullOrEmpty(date))
        {
            query = query.Where(x => x.UpdatedAt.CompareTo(DateTime.Parse(date).ToUniversalTime()) > 0);
        }

        // var auctions = await _context.Auctions
        //     .Include(x => x.Item)
        //     .OrderBy(x => x.Item.Year)
        //     .ToListAsync();

        // return _mapper.Map<List<AuctionDTO>>(auctions);

        return await query.ProjectTo<AuctionDTO>(_mapper.ConfigurationProvider).ToListAsync();
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
    [Authorize]
    [HttpPost]
    public async Task<ActionResult<AuctionDTO>> CreateAuction(CreateAuctionDTO auctionDto)
    {
        var auction = _mapper.Map<Auction>(auctionDto);

        auction.Seller = User.Identity.Name;
        
        _context.Auctions.Add(auction);

        var newAuction = _mapper.Map<AuctionDTO>(auction);

        await _publish.Publish(_mapper.Map<AuctionCreated>(newAuction));

        var result = await _context.SaveChangesAsync() > 0;
        
        if(!result) return BadRequest("Could not save changes to the DB");

        return CreatedAtAction(nameof(GetAuctionById), 
            new {auction.Id}, newAuction);
    }

    [Authorize]
    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateAuction(Guid id, UpdateAuctionDTO updateAuctionDto)
    {
        var auction = await _context.Auctions.Include(x => x.Item)
            .FirstOrDefaultAsync(x => x.Id == id);

        if (auction == null) return NotFound();

        if(auction.Seller != User.Identity.Name) return Forbid();

        auction.Item.ItemName = updateAuctionDto.ItemName ?? auction.Item.ItemName;
        auction.Item.ItemDesc = updateAuctionDto.ItemDesc ?? auction.Item.ItemDesc;
        auction.Item.Type = updateAuctionDto.Type ?? auction.Item.Type;
        auction.Item.Year = updateAuctionDto.Year ?? auction.Item.Year;

        await _publish.Publish(_mapper.Map<AuctionUpdated>(auction));
        
        var result = await _context.SaveChangesAsync() > 0;

        if (result) return Ok();

        return BadRequest("Problem saving changes");
    }

    [Authorize]
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteAuction(Guid id)
    {
        var auction = await _context.Auctions.FindAsync(id);

        if (auction == null) return NotFound();

        if(auction.Seller != User.Identity.Name) return Forbid();

        _context.Auctions.Remove(auction);

        await _publish.Publish<AuctionDeleted>(new {Id = auction.Id.ToString()});

        var result = await _context.SaveChangesAsync() > 0;

        if (!result) return BadRequest("Could not update DB");

        return Ok();
    }
}
