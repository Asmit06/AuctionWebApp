﻿using AuctionService.DTO;
using AuctionService.Models;
using AutoMapper;
using Contracts;

namespace AuctionService.RequesrHelpers;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<Auction, AuctionDTO>().IncludeMembers(x=>x.Item);
        CreateMap<Item, AuctionDTO>();
        CreateMap<CreateAuctionDTO, Auction>()
            .ForMember(d => d.Item, o => o.MapFrom(s => s));
        CreateMap<CreateAuctionDTO, Item>();
        CreateMap<AuctionDTO , AuctionCreated>();
        CreateMap<Item , AuctionUpdated>();
        CreateMap<Auction, AuctionUpdated>().IncludeMembers(a => a.Item);
    }
}
