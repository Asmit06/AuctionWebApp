"use server"

import { fetchWrapper } from "@/lib/fetchWrapper";
import { Auction, Bid, PagedResult } from "@/types";
import { revalidatePath } from "next/cache";
import { FieldValues } from "react-hook-form";

export async function getData(query: string): Promise<PagedResult<Auction>> {
    // const res = await fetch(`http://localhost:6001/search${query}&pageSize=8`);
    // if(!res.ok) throw new Error("Failed to setch data");
    // const data = await res.json();
    // return data;

    return await fetchWrapper.get(`search${query}&pageSize=8`);
}

export async function createAuction(data: FieldValues) {
    return await fetchWrapper.post('auctions', data);
}

export async function getDetailedViewData(id: string): Promise<Auction> {
    return await fetchWrapper.get(`auctions/${id}`);
}

export async function updateAuction(data: FieldValues, id: string) {
    const res = await fetchWrapper.put(`auctions/${id}`, data);
    revalidatePath(`/auctions/${id}`);
    return res;
}

export async function deleteAuction(id: string) {
    return await fetchWrapper.del(`auctions/${id}`);
}

export async function getBidsForAuction(id: string): Promise<Bid[]> {
    return await fetchWrapper.get(`bids/${id}`);
}

export async function postBidForAuction(auctionId: string, amount: number){
    return await fetchWrapper.post(`bids?auctionId=${auctionId}&amount=${amount}`,{});
}