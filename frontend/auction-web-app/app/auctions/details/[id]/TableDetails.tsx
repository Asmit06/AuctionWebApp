'use client';

import {Auction} from "@/types";

type Props = {
    auction: Auction
}

export default function DetailedSpecs({auction}: Props) {
    return (
        <div className="overflow-x-auto">
            <table className="table table-zebra table-auto w-full">
                <tbody className="divide-y">
                    <tr className="bg-white dark:bg-gray-800">
                        <td className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            Seller
                        </td>
                        <td>
                            {auction.seller}
                        </td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-800">
                        <td className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            Item Name
                        </td>
                        <td>
                            {auction.itemName}
                        </td>
                    </tr>
                    {/* <tr className="bg-white dark:bg-gray-800">
                        <td className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            Model
                        </td>
                        <td>
                            {auction.model}
                        </td>
                    </tr> */}
                    <tr className="bg-white dark:bg-gray-800">
                        <td className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            Year Brought
                        </td>
                        <td>
                            {auction.year}
                        </td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-800">
                        <td className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            Category
                        </td>
                        <td>
                            {auction.type}
                        </td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-800">
                        <td className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            Has reserve price?
                        </td>
                        <td>
                            {auction.reservePrice > 0 ? 'Yes' : 'No'}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
