using Contracts;
using MassTransit;
using Microsoft.AspNetCore.SignalR;

namespace SocketService;

public class AuctionFinishedConsumer : IConsumer<AuctionFinished>
{
    private readonly IHubContext<SocketHub> _hubContext;

    public AuctionFinishedConsumer(IHubContext<SocketHub> hubContext)
    {
        _hubContext = hubContext;
    }

    public async Task Consume(ConsumeContext<AuctionFinished> context)
    {
        Console.WriteLine("-------> auction finished message received in socket");

        await _hubContext.Clients.All.SendAsync("AuctionFinished", context.Message);
    }
}
