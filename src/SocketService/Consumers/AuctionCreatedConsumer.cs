using Contracts;
using MassTransit;
using Microsoft.AspNetCore.SignalR;

namespace SocketService;

public class AuctionCreatedConsumer : IConsumer<AuctionCreated>
{
    private readonly IHubContext<SocketHub> _hubContext;

    public AuctionCreatedConsumer(IHubContext<SocketHub> hubContext)
    {
        _hubContext = hubContext;
    }

    public async Task Consume(ConsumeContext<AuctionCreated> context)
    {
        Console.WriteLine("-------> Auction create message recieved in socket");

        await _hubContext.Clients.All.SendAsync("AuctionCreated", context.Message);
    }
}
