using Contracts;
using MassTransit;
using Microsoft.AspNetCore.SignalR;

namespace SocketService;

public class BidPlacedConsumer : IConsumer<BidPlaced>
{
    private readonly IHubContext<SocketHub> _hubContext;

    public BidPlacedConsumer(IHubContext<SocketHub> hubContext)
    {
        _hubContext = hubContext;
    }

    public async Task Consume(ConsumeContext<BidPlaced> context)
    {
        Console.WriteLine("------> bid placed message received in socket");

        await _hubContext.Clients.All.SendAsync("BidPlaced", context.Message);
    }
}
