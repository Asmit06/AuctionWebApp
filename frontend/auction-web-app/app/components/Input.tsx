import React from 'react'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'
import { UseControllerProps, useController, useForm } from 'react-hook-form'

type Props = {
    label: string
    type?: string
    showLabel?: boolean
} & UseControllerProps & Partial<ReactDatePickerProps>

const DateInput = (props: Props) => {
    const {control, register, handleSubmit, setFocus, reset,
        formState: {errors}} = useForm({
            mode: 'onTouched'
        });
        
    const {fieldState, field} = useController({...props, defaultValue: ''});
  return (
    <>
    {/* <div className="flex flex-col">
        <label className="mb-2 text-sm font-medium text-gray-700" htmlFor={field.name}>{props.label}</label>
        <input 
            {...props}
            {...field}
            type={props.type || 'text'}
            placeholder={props.label}
            className={`input input-bordered w-full max-w-xs`}                 
        />
        {errors.ItemName && <p className="text-red-500 text-sm">Item Name is required</p>}
    </div> */}

    <div className="flex flex-col">
        <label className="mb-2 text-sm font-medium text-gray-700">Auction End</label>
        <DatePicker
            {...props}
            {...field}
            onChange={value => field.onChange(value)}
            selected={field.value}
            placeholderText={props.label}
            className={`input input-bordered w-full max-w-xs`} 
        />
        {/* <input 
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
        /> */}
        {errors.AuctionEnd && <p className="text-red-500 text-sm">{errors.AuctionEnd.message as string}</p>}
    </div>
</>

  )
}

export default DateInput