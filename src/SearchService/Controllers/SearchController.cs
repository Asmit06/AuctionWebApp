using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Entities;

namespace SearchService;

[ApiController]
[Route("api/search")]
public class SearchController : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<Item>>> SearchItems([FromQuery]SearchParams searchParams) 
    {
        var query = DB.PagedSearch<Item,Item>();
        query.Sort(x=> x.Ascending(a=>a.ItemName));
        
        if(!string.IsNullOrEmpty(searchParams.SearchTerm))
        {
            //query.Match(a=>Regex.IsMatch(a.ItemName,$"^{searchParams.SearchTerm}" , RegexOptions.IgnoreCase));
            query.Match(Search.Full, searchParams.SearchTerm).SortByTextScore();
        }

        if(!string.IsNullOrEmpty(searchParams.Type))
        {
            query.Match(x => x.Type == searchParams.Type);
        }

        query = searchParams.OrderBy switch {
            "ItemName" => query.Sort(x=> x.Ascending(a=>a.ItemName)),
            "Latest" => query.Sort(x=> x.Descending(a=>a.CreatedAt)),
            _ => query.Sort(x => x.Ascending(a => a.AuctionEnd))
        };

        query = searchParams.FilterBy switch
        {
            "finished" => query.Match(x => x.AuctionEnd < DateTime.UtcNow),
            "endingSoon" => query.Match(x => x.AuctionEnd < DateTime.UtcNow.AddHours(6)
                && x.AuctionEnd > DateTime.UtcNow),
            //"type" => query.Match(x => x.Type == searchParams.Type),
            _ => query.Match(x => x.AuctionEnd > DateTime.UtcNow)
        };

        if (!string.IsNullOrEmpty(searchParams.Seller))
        {
            query.Match(x => x.Seller == searchParams.Seller);
        }

        if (!string.IsNullOrEmpty(searchParams.Winner))
        {
            query.Match(x => x.Winner == searchParams.Winner);
        }

        query.PageNumber(searchParams.PageNumber);
        query.PageSize(searchParams.PageSize);

        var result = await query.ExecuteAsync();

        return Ok(new
        {
            results = result.Results,
            pageCount = result.PageCount,
            totalCount = result.TotalCount
        });
        // var result = await query.ExecuteAsync();
        
        // return result;
    } 
}
