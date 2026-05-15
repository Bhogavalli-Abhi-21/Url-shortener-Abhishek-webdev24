import { nanoid } from "nanoid";
import { ShortURL } from "../models/shorturl.model.js";


export const createShortUrl = async (req, res) => {
 try {
   let { originalUrl, expiresAt } = req.body;
   const userId = req.user.id;


   if (!userId || !originalUrl) {
     return res
       .status(400)
       .json({ message: "userId or originalUrl missing in payload" });
   }


   let isUnique = false;
   let data = null,
     shortCode = null;


   while (!isUnique) {
     shortCode = nanoid(7);
     data = await ShortURL.findOne({ shortCode: shortCode, isActive: true });
     if (!data) {
       isUnique = true;
     }
   }


   if(!expiresAt){
           expiresAt = new Date()
           expiresAt.setDate( expiresAt.getDate() + 30);
   }


   const newShortenUrl = await ShortURL.create({
     originalUrl : originalUrl,
     shortCode : shortCode,
     userId : userId,
     expiresAt : expiresAt,
   });




   return res.status(201).json(newShortenUrl);


 } catch (error) {
   console.error("Error in creating short url", error);
   res.status(500).json({ message: "Internal Server Error" });
 }
};
export const redirectToOriginalURL = async (req, res) => {
 try {


   const shortCode = req.params.shortCode;


   const shortUrl = await ShortURL.findOne({shortCode: shortCode});


   if(!shortUrl){
     return res.status(404).json({message : "Short url not found"});
   }


   return res.redirect(shortUrl.originalUrl);


 } catch (error) {
   console.error("Error in redirecting", error);
   res.status(500).json({ message: "Internal Server Error" });
 }
};
