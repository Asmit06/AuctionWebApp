import { v2 as cloudinary } from 'cloudinary';
import { NextApiRequest, NextApiResponse } from 'next';

cloudinary.config({
 cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
 api_key: process.env.CLOUDINARY_API_KEY,
 api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
     try {
       const fileStr = req.body.data;
       const uploadResponse = await cloudinary.uploader.upload(fileStr, {
         upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
       });
 
       if (uploadResponse.secure_url !== '') {
         res.status(200).json({ url: uploadResponse.secure_url });
       } else {
         throw new Error('Upload failed');
       }
     } catch (error: any) {
       res.status(500).json({ error: error.message });
     }
  } else {
     res.status(405).json({ error: 'Method not allowed' });
  }
 }