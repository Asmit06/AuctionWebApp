'use client'
import React, { useEffect } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import Input from '../components/Input';
import { CldUploadWidget } from 'next-cloudinary';
import { createAuction, updateAuction } from '../actions/AuctionActiona';
import { usePathname, useRouter } from 'next/navigation';
import DateInput from '../components/Input';
import toast from 'react-hot-toast';
import { Auction } from '@/types';

type Props = {
    auction?: Auction
}

const AuctionForm = ({ auction }: Props) => {
    const router = useRouter();
    const pathname = usePathname();
    const {control, register, handleSubmit, setFocus, reset,
        formState: {isSubmitting, isValid, isDirty, errors}} = useForm({
            mode: 'onTouched'
        });
        
        useEffect(() => {
            if (auction) {
                const { itemName, itemDesc, type, year } = auction;
                reset({ itemName, itemDesc, type, year });
            }
            setFocus('itemName');
        }, [setFocus, auction, reset])

    const onSubmit = async (data: FieldValues) => {
        //console.log(data);
        try {
            let id = '';
            let res;
            if (pathname === '/auctions/create') {
                const auctionEndUTC = new Date(data.AuctionEnd).toISOString();
                data.AuctionEnd  = auctionEndUTC;
                res = await createAuction(data);
                id = res.id;
            } else {
                if (auction) {
                    res = await updateAuction(data, auction.id);
                    id = auction.id;
                }
            }
            //const res = await createAuction(data);
            if(res.error) {
                throw res.error;
            }
            router.push(`/auctions/details/${id}`)
        }catch(error: any){
            toast.error(error.status + ' ' + error.message)
        }
    }

    
    const items = [
        { value: 'Clothes', label: 'Clothes' },
        { value: 'Automobile', label: 'Automobile' },
        { value: 'Electronics', label: 'Electronics' },
        { value: 'Kids', label: 'Kids Section' },
            // Add more items as needed
    ];

    const disablePastDates = (date: Date) => {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0); // Set the time to 00:00:00 to compare only the date part
        return date < currentDate;
    };

    const CurrentYear = new Date().getFullYear();
    const years = Array.from({ length: CurrentYear - 1899 }, (_, i) => CurrentYear - i);
    
    return (
        <form className='flex flex-col mt-3 space-y-4' onSubmit={handleSubmit(onSubmit)}>
            <div className='grid grid-cols-2 gap-3'>
            <div className="flex flex-col">
                <label className="mb-2 text-sm font-medium text-gray-700">Item Name</label>
                <input 
                    type="text" 
                    placeholder="Item Name" 
                    defaultValue ={auction?.itemName}
                    className={`input input-bordered w-full max-w-xs ${errors.ItemName ? 'border-red-500' : ''}`} 
                    {...register("ItemName", { required: "Item Name is required" })} 
                />
                {errors.ItemName && <p className="text-red-500 text-sm">Item Name is required</p>}
            </div>

            <div className="flex flex-col">
                <label className="mb-2 text-sm font-medium text-gray-700">Item Description</label>
                <textarea 
                    placeholder="Item Description" 
                    defaultValue ={auction?.itemDesc}
                    className={`textarea textarea-bordered w-full max-w-xs ${errors.ItemDesc ? 'border-red-500' : ''}`} 
                    {...register("ItemDesc", { required: "Item Description is required" })} 
                />
                {errors.ItemDesc && <p className="text-red-500 text-sm">Item Description is required</p>}
            </div>
            </div>

            <div className='grid grid-cols-2 gap-3'>
            <div className="flex flex-col">
                <label className="mb-2 text-sm font-medium text-gray-700">Category</label>
                <select 
                    className={`select select-bordered w-full max-w-xs ${errors.Type ? 'border-red-500' : ''}`} 
                    {...register("Type", { required: "Category is required" })}
                    defaultValue ={auction?.type}
                >
                    {items.map((item, index) => (
                    <option key={index} value={item.value}>
                        {item.label}
                    </option>
                    ))}
                </select>
                {errors.Type && <p className="text-red-500 text-sm">Item Selection is required</p>}
            </div>

            <div className="flex flex-col">
                <label className="mb-2 text-sm font-medium text-gray-700">Year of buying item</label>
                <select 
                    className={`select select-bordered w-full max-w-xs ${errors.Year ? 'border-red-500' : ''}`} 
                    {...register("Year", { required: "Year is required" })}
                    defaultValue ={auction?.year}
                >
                    {years.map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                    ))}
                </select>
                {errors.Year && <p className="text-red-500 text-sm">Year is required</p>}
            </div>
            </div>

            {pathname === '/auctions/create' && 
            <>
            <div className='grid grid-cols-3 gap-3'>
                        {/* <DateInput
                        label='Auction end date/time'
                        name='auctionEnd'
                        control={control}
                        dateFormat='dd MMMM yyyy h:mm a'
                        showTimeSelect
                        rules={{ required: 'Auction end date is required' }} /> */}
                        
            <div className="flex flex-col">
                <label className="mb-2 text-sm font-medium text-gray-700">Auction End</label>
                <input 
                    type="datetime-local" 

                    className={`input input-bordered w-full max-w-xs ${errors.AuctionEnd ? 'border-red-500' : ''}`} 
                    {...register("AuctionEnd", { 
                    required: "Date and Time is required",
                    validate: {
                        futureDate: (value) => {
                            const selectedDate = new Date(value);
                            return selectedDate > new Date() || "Date must be in the future";
                        }
                    }
                    })}
                    min={new Date().toISOString().split('T')[0]}
                />
                {errors.AuctionEnd && <p className="text-red-500 text-sm">{errors.AuctionEnd.message as string}</p>}
            </div>

            <div className="flex flex-col">
                <label className="mb-2 text-sm font-medium text-gray-700">Reserve Price</label>
                <input 
                    type="number" 
                    className={`input input-bordered w-full max-w-xs ${errors.ReservePrice ? 'border-red-500' : ''}`} 
                    {...register("ReservePrice", { required: "Reserve Price is required" })}
                />
                {errors.ReservePrice && <p className="text-red-500 text-sm">Reserve Price is required</p>}
            </div>

            <div className="flex flex-col">
                <label className="mb-2 text-sm font-medium text-gray-700">Upload Image</label>
                <input 
                    type="string" 
                    className={`input input-bordered w-full max-w-xs ${errors.ImageUrl ? 'border-red-500' : ''}`} 
                    {...register("ImageUrl", { required: "Reserve Price is required" })}
                />
                {errors.ImageUrl && <p className="text-red-500 text-sm">Image is required</p>}
            </div>
            </div>
            </>}

            <div className="flex justify-end space-x-2">
                <button className="btn btn-error">Cancel</button>
                <button type="submit" className="btn btn-success" disabled={!isValid}>Submit</button>
            </div>
        </form>
    )
}

export default AuctionForm

{/* <div className='grid grid-cols-3 gap-3'>          
            <div className="flex flex-col">
                <label className="mb-2 text-sm font-medium text-gray-700">Auction End</label>
                <input 
                    type="datetime-local" 
                    className={`input input-bordered w-full max-w-xs ${errors.AuctionEnd ? 'border-red-500' : ''}`} 
                    {...register("AuctionEnd", { 
                    required: "Date and Time is required",
                    validate: {
                        futureDate: (value) => {
                            const selectedDate = new Date(value);
                            return selectedDate > new Date() || "Date must be in the future";
                        }
                    }
                    })}
                    min={new Date().toISOString().split('T')[0]} // Disable past dates by setting the minimum selectable date to today
                />
                {errors.AuctionEnd && <p className="text-red-500 text-sm">{errors.AuctionEnd.message as string}</p>}
            </div>

            <div className="flex flex-col">
                <label className="mb-2 text-sm font-medium text-gray-700">Reserve Price</label>
                <input 
                    type="number" 
                    className={`input input-bordered w-full max-w-xs ${errors.ReservePrice ? 'border-red-500' : ''}`} 
                    {...register("ReservePrice", { required: "Reserve Price is required" })}
                />
                {errors.ReservePrice && <p className="text-red-500 text-sm">Reserve Price is required</p>}
            </div>

            <div className="flex flex-col">
                <label className="mb-2 text-sm font-medium text-gray-700">Upload Image</label>
                <input 
                    type="string" 
                    className={`input input-bordered w-full max-w-xs ${errors.ImageUrl ? 'border-red-500' : ''}`} 
                    {...register("ImageUrl", { required: "Reserve Price is required" })}
                />
                {errors.ImageUrl && <p className="text-red-500 text-sm">Image is required</p>}
            </div>
            </div> */}