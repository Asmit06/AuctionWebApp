﻿using AuctionService.Data;
using Contracts;
using MassTransit;

namespace AuctionService;

public class AuctionFinishedConsumer : IConsumer<AuctionFinished>
{
    private readonly AuctionDbContext _dbContext;
    public AuctionFinishedConsumer(AuctionDbContext dbcontext)
    {
        _dbContext = dbcontext;
    }
    public async Task Consume(ConsumeContext<AuctionFinished> context)
    {
         Console.WriteLine("--> Consuming auction finished");
         var auction = await _dbContext.Auctions.FindAsync(Guid.Parse(context.Message.AuctionId));

         if(context.Message.ItemSold)
         {
            auction.Winner = context.Message.Winner;
            auction.SoldAmount = context.Message.Amount;
         }

         auction.Status = auction.SoldAmount > auction.ReservePrice
              ? Models.Status.Finished : Models.Status.ReserveNotMet;
        await _dbContext.SaveChangesAsync();
    }
}
