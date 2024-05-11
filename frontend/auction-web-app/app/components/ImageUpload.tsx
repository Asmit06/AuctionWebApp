// 'use client'
// import React, { ChangeEvent, useState } from 'react';
// import { CldUploadButton   } from 'next-cloudinary';
// import { UseControllerProps, useController } from 'react-hook-form';
// import { v2 as cloudinary } from 'cloudinary';

// cloudinary.config({
//  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//  api_key: process.env.CLOUDINARY_API_KEY,
//  api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// type Props = {
//     label: string
//     type?: string
//     showLabel?: boolean
// } & UseControllerProps


// const ImageUpload = (props: Props) => {
//  const [uploadedImage, setUploadedImage] = useState(null);
//  const {fieldState, field} = useController({...props, defaultValue: ''});

//  return (
//     <div className="flex flex-col">
//       <label className="mb-2 text-sm font-medium text-gray-700" htmlFor={field.name}>Upload Image</label>
//       {/* <input
//         type="file"
//         className="input input-bordered w-full max-w-xs"
//       /> */}
//       <CldUploadButton  
//             {...props}
//             {...field}
//             uploadPreset= 'auctionapp'
//             onSuccess={(imageData: any) => {
//                 setUploadedImage(imageData.secure_url);
//             }}
//             // @ts-ignore
//         />

//         {/* <CldUploadWidget uploadPreset="<Your Upload Preset>">
//         {({ open }) => {
//             return (
//             <button onClick={() => open()}>
//                 Upload an Image
//             </button>
//             );
//         }}
//         </CldUploadWidget> */}
//       {uploadedImage && (
//         <div className="mt-4">
//           <img src={uploadedImage} alt="Uploaded" width="300" />
//         </div>
//       )}
//     </div>
//  );
// };

// export default ImageUpload;
