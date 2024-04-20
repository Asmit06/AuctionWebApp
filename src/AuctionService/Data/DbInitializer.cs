
using AuctionService.Models;
using Microsoft.EntityFrameworkCore;

namespace AuctionService.Data;

public class DbInitializer
{
    public static void InitDb(WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        SeedData(scope.ServiceProvider.GetService<AuctionDbContext>());
    }

    private static void SeedData(AuctionDbContext context)
    {
        context.Database.Migrate();

        if(context.Auctions.Any()){
            Console.WriteLine("Already have data no need to seed");
            return;
        }

        var auctions = new List<Auction>()
        {
            	    // 1 Ford GT
            new Auction
            {
                Id = Guid.Parse("afbee524-5972-4075-8800-7d1f9d7b0a0c"),
                Status = Status.Live,
                ReservePrice = 20000,
                Seller = "bob",
                AuctionEnd = DateTime.UtcNow.AddDays(10),
                Item = new Item
                {
                    ItemName = "Ford GT",
                    ItemDesc = "Ford GT White 50000CC",
                    Type = "Automobile",
                    Year = 2020,
                    ImageUrl = "https://cdn.pixabay.com/photo/2016/05/06/16/32/car-1376190_960_720.jpg"
                }
            },
            // 2 Bugatti Veyron
            new Auction
            {
                Id = Guid.Parse("c8c3ec17-01bf-49db-82aa-1ef80b833a9f"),
                Status = Status.Live,
                ReservePrice = 90000,
                Seller = "alice",
                AuctionEnd = DateTime.UtcNow.AddDays(60),
                Item = new Item
                {
                    ItemName = "Bugatti Veyron",
                    ItemDesc = "Bugatti Veyron Black 15035CC",
                    Type = "Automobile",
                    Year = 2018,
                    ImageUrl = "https://cdn.pixabay.com/photo/2012/05/29/00/43/car-49278_960_720.jpg"
                }
            },
            // 3 Ford mustang
            new Auction
            {
                Id = Guid.Parse("bbab4d5a-8565-48b1-9450-5ac2a5c4a654"),
                Status = Status.Live,
                Seller = "bob",
                AuctionEnd = DateTime.UtcNow.AddDays(4),
                Item = new Item
                {
                    ItemName = "Ford mustang",
                    ItemDesc = "Ford mustang Black 65125CC",
                    Type = "Automobile",
                    Year = 2023,
                    ImageUrl = "https://cdn.pixabay.com/photo/2012/11/02/13/02/car-63930_960_720.jpg"
                }
            },
            // 4 Mercedes SLK
            new Auction
            {
                Id = Guid.Parse("155225c1-4448-4066-9886-6786536e05ea"),
                Status = Status.ReserveNotMet,
                ReservePrice = 50000,
                Seller = "tom",
                AuctionEnd = DateTime.UtcNow.AddDays(-10),
                Item = new Item
                {
                    ItemName = "Mercedes SLK",
                    ItemDesc = "Mercedes SLK Silver 15001CC",
                    Type = "Automobile",
                    Year = 2020,
                    ImageUrl = "https://cdn.pixabay.com/photo/2016/04/17/22/10/mercedes-benz-1335674_960_720.png"
                }
            },

            new Auction
            {
                Id = Guid.Parse("466e4744-4dc5-4987-aae0-b621acfc5e39"),
                Status = Status.Live,
                ReservePrice = 2000,
                Seller = "alice",
                AuctionEnd = DateTime.UtcNow.AddDays(30),
                Item = new Item
                {
                    ItemName = "H&M Oversized Tee",
                    ItemDesc = "H&M Oversized Tee Unisex Black",
                    Type = "Clothes",
                    Year = 2023,
                    ImageUrl = "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F35%2Fc5%2F35c5f820d773284cf83932146281f2edb861c20c.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5Bkids_clothing_tops_tshirts%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/main]"
                }
            },
            // 6 Ferrari spider
            new Auction
            {
                Id = Guid.Parse("dc1e4071-d19d-459b-b848-b5c3cd3d151f"),
                Status = Status.Live,
                ReservePrice = 20000,
                Seller = "bob",
                AuctionEnd = DateTime.UtcNow.AddDays(45),
                Item = new Item
                {
                    ItemName = "Samsung TV",
                    ItemDesc = "75 Inch Neo QLED 4K Smart TV - QN90C",
                    Type = "Electronics",
                    Year = 2019,
                    ImageUrl = "https://images.samsung.com/is/image/samsung/p6pim/in/qa75qn90cakxxl/gallery/in-qled-qn90c-454657-qa75qn90cakxxl-536415727?$720_576_PNG$"
                }
            },

            new Auction
            {
                Id = Guid.NewGuid(),
                Status = Status.Live,
                ReservePrice = 5000,
                Seller = "tom",
                AuctionEnd = DateTime.UtcNow.AddDays(40),
                Item = new Item
                {
                    ItemName = "Leather Jacket",
                    ItemDesc = "Men's Black Leather Jacket - Size M",
                    Type = "Clothes",
                    Year = 2022,
                    ImageUrl = "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Ffd%2Fdc%2Ffddcbb62e1b0a7d6daf28b92ef2882a8aed56062.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]"
                }
            },

            new Auction
            {
                Id = Guid.NewGuid(),
                Status = Status.Live,
                ReservePrice = 2000,
                Seller = "alice",
                AuctionEnd = DateTime.UtcNow.AddDays(10),
                Item = new Item
                {
                    ItemName = "H&M Jersey Shirt",
                    ItemDesc = "Regular Fit Short-sleeved jersey shirt Khaki Green",
                    Type = "Clothes",
                    Year = 2023,
                    ImageUrl = "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Ff8%2F32%2Ff8327bf8e2929a50debb3fa7998fd600453e5fd7.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/main]"
                }
            },

            new Auction
            {
                Id = Guid.NewGuid(),
                Status = Status.Live,
                ReservePrice = 7000,
                Seller = "bob",
                AuctionEnd = DateTime.UtcNow.AddDays(15),
                Item = new Item
                {
                    ItemName = "Open-back pointelle-knit top",
                    ItemDesc = "Short, fitted top in a soft pointelle knit with a boat neckline and a partially open back with decorative ties ",
                    Type = "Clothes",
                    Year = 2023,
                    ImageUrl = "https://lp2.hm.com/hmgoepprod?set=source[/78/c5/78c5c394cc21f06688a2e04f0d9a90d4f992ec75.jpg],origin[dam],category[],type[DESCRIPTIVESTILLLIFE],res[z],hmver[3]&call=url[file:/product/main]"
                }
            },

            new Auction
            {
                Id = Guid.NewGuid(),
                Status = Status.Live,
                ReservePrice = 50000,
                Seller = "tom",
                AuctionEnd = DateTime.UtcNow.AddDays(45),
                Item = new Item
                {
                    ItemName = "Samsung Galaxy S24",
                    ItemDesc = "Welcome to the era of mobile AI. With Galaxy S24 | S24+ in your hands, you can unleash whole new levels of creativity, productivity and possibility ",
                    Type = "Electronics",
                    Year = 2024,
                    ImageUrl = "https://images.samsung.com/is/image/samsung/p6pim/in/2401/gallery/in-galaxy-s24-492654-sm-s921bzvcins-thumb-539572802?imwidth=480"
                }
            },

            new Auction
            {
                Id = Guid.NewGuid(),
                Status = Status.Live,
                ReservePrice = 50000,
                Seller = "tom",
                AuctionEnd = DateTime.UtcNow.AddDays(45),
                Item = new Item
                {
                    ItemName = "Refrigerator Samsung",
                    ItemDesc = "550 L Twin Cooling Plus™ French Door Refrigerator RF57A5032S9",
                    Type = "Electronics",
                    Year = 2024,
                    ImageUrl = "https://images.samsung.com/is/image/samsung/p6pim/in/rf57a5032s9-tl/gallery/in-ref-convertible-freezer-rf57a5032s9-tl-436322271?$1300_1038_PNG$"
                }
            },
        };

        context.AddRange(auctions);
        context.SaveChanges();
    }
}
