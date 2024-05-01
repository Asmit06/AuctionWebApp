using BiddingService;
using MassTransit;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using MongoDB.Driver;
using MongoDB.Entities;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

builder.Services.AddMassTransit(X=>
{
    X.AddConsumersFromNamespaceContaining<AuctionCreatedConsumer>();

    X.SetEndpointNameFormatter(new KebabCaseEndpointNameFormatter("bids", false));

    X.UsingRabbitMq((context, cfg) => {
        //cfg.Host(builder.Configuration["RabbitMq:Host"], "/", host =>{
        cfg.Host(builder.Configuration.GetValue<string>("RabbitMq:Host", "localhost"), "/", host => {
            host.Username(builder.Configuration.GetValue("RabbitMq:Username", "guest"));
            host.Password(builder.Configuration.GetValue("RabbitMq:Password", "guest"));
        });
        cfg.ConfigureEndpoints(context);
    });
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = builder.Configuration["IdentityServiceUrl"];
        options.RequireHttpsMetadata = false;
        options.TokenValidationParameters.ValidateAudience = false;
        options.TokenValidationParameters.NameClaimType = "username";
    });

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddHostedService<CheckAuctionFinished>();
builder.Services.AddScoped<GrpcAuctionClient>();

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseAuthorization();

app.MapControllers();

var connectionString = builder.Configuration.GetConnectionString("BidDbConnection") ?? "mongodb://localhost:27017";

//await DB.InitAsync("BidDB", "localhost", 27017);
await DB.InitAsync("BidDB", MongoClientSettings
             .FromConnectionString(connectionString));

app.Run();
