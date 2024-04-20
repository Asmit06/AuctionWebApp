"use server"

import { Auction, PagedResult } from "@/types";

export async function getData(query: string): Promise<PagedResult<Auction>> {
    const res = await fetch(`http://localhost:6001/search${query}&pageSize=8`);
    if(!res.ok) throw new Error("Failed to setch data");
    const data = await res.json();
    return data;
}