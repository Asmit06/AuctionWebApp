using System.Net;
using MongoDB.Driver;
using MongoDB.Entities;
using Polly;
using Polly.Extensions.Http;
using SearchService;
using MassTransit;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddControllers();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddHttpClient<AuctionServiceHttpClient>().AddPolicyHandler(GetPolicy());
builder.Services.AddMassTransit(X=>{
    X.AddConsumersFromNamespaceContaining<AuctionCreatedConsumer>();
    X.SetEndpointNameFormatter(new KebabCaseEndpointNameFormatter("search",false));
    X.UsingRabbitMq((context, cfg) => 
    {
        cfg.Host(builder.Configuration["RabbitMq:Host"], "/", host =>{
            host.Username(builder.Configuration.GetValue("RabbitMq:Username", "guest"));
            host.Password(builder.Configuration.GetValue("RabbitMq:Password", "guest"));
        });
        
        cfg.ReceiveEndpoint("search-auction-created", e=> 
        {
            e.UseMessageRetry(r=> r.Interval(5,5));
            e.ConfigureConsumer<AuctionCreatedConsumer>(context);
        });

        cfg.ConfigureEndpoints(context);
    });
});

var app = builder.Build();



app.UseAuthorization();

app.MapControllers();

// await DB.InitAsync("SearchDb", MongoClientSettings
//             .FromConnectionString(app.Configuration.GetConnectionString("MongoDbConnection")));

// await DB.InitAsync("SearchDb", "localhost", 27017);


// await DB.Index<Item>()
//     .Key(x => x.ItemName, KeyType.Text)
//     .Key(x => x.Type, KeyType.Text)
//     .CreateAsync();



app.Lifetime.ApplicationStarted.Register(async () =>
{
        try
    {
        await DBInititalizer.InitDb(app);
    }
    catch(Exception e)
    {
        Console.WriteLine(e);
    }
});

app.Run();

static IAsyncPolicy<HttpResponseMessage> GetPolicy()
    => HttpPolicyExtensions
        .HandleTransientHttpError()
        .OrResult(msg => msg.StatusCode == HttpStatusCode.NotFound)
        .WaitAndRetryForeverAsync(_ => TimeSpan.FromSeconds(3));


