using System.Text.Json;
using Microsoft.VisualBasic;
using MongoDB.Driver;
using MongoDB.Entities;
namespace SearchService;
using Microsoft.Extensions.Configuration;
public class DBInititalizer
{
    public static async Task InitDb(WebApplication app){
            //await DB.InitAsync("SearchDb", "mongodb", 27017);
            
            //await DB.InitAsync("SearchDb", "mongodb://root:mongopw@mongodb", 27017);

            await DB.InitAsync("SearchDb", MongoClientSettings
            .FromConnectionString(app.Configuration.GetConnectionString("MongoDbConnection")));

            await DB.Index<Item>()
            .Key(x => x.ItemName, KeyType.Text)
            .Key(x => x.Type, KeyType.Text)
            .CreateAsync();

            var count = await DB.CountAsync<Item>();

            // if(count == 0) 
            // {
            //     Console.WriteLine("No data....will begin seeding");
            //     var itemData = await File.ReadAllTextAsync("C:/Users/asmit/OneDrive/Desktop/AuctionSite/src/SearchService/Data/Auctions.json");
            //     var options = new JsonSerializerOptions{PropertyNameCaseInsensitive=true};
            //     var items = JsonSerializer.Deserialize<List<Item>>(itemData,options);
            //     await DB.SaveAsync(items);
            // }

            // using var scope = app.Services.CreateScope();

            // var httpClient = scope.ServiceProvider.GetRequiredService<AuctionServiceHttpClient>();
            // var items = await httpClient.GetItemForSearchDb();

            // Console.WriteLine(items);
            // Console.WriteLine(items.Count + " returned from http client");

            // if(items.Count > 0) await DB.SaveAsync(items);

             using var scope = app.Services.CreateScope();

            var httpClient = scope.ServiceProvider.GetRequiredService<AuctionServiceHttpClient>();

            var items = await httpClient.GetItemForSearchDb();
        
            Console.WriteLine(items.Count + " returned from the auction service");

            if (items.Count > 0) await DB.SaveAsync(items);
        }
        
}
