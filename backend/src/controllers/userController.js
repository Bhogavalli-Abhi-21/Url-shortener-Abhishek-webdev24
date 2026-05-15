import { User } from "../models/user/user.model.js"
import { ShortURL } from "../models/shorturl.model.js";

export const getUserData = async (req,res)=>{
   try{


       let userId = req.user.id;


       if(!userId) {
           return res.status(400).json({message : "user id not found"});
       }


       const user = await User.findById(userId);


       if(!user) {
           return res.status(404).json({message : "User not found with the id"});
       }


       return res.status(200).json(user)
   }catch( err ){
       console.log("Error fetching user from db", err);
       return res.status(500).send({ message: "Internal Server Error!!"})
   }
}

export const getAllUrlsOfUser = async (req, res) => {
 try {
   const userId = req.user.id;
   if (!userId) {
     return res.status(400).json({
       message: "UserId not found!!",
     });
   }
   const user = await User.findOne({ _id: userId });
   if (!user) {
     return res.status(404).json({
       message: "User not found!!",
     });
   }
   let page = Number(req.query.page) || 1;
   let limit = Number(req.query.limit) || 10;


   const response = await ShortURL.find({ userId: userId, isActive: true })
     .sort({ createdAt: -1 })
     .skip((page - 1) * limit)
     .limit(limit);
   const totalItems = await ShortURL.countDocuments({
     userId: userId,
     isActive: true,
   });
   const totalPages = Math.ceil(totalItems / limit);


   return res.status(200).json({
     page: page,
     limit: limit,
     totalItems: totalItems,
     totalPages: totalPages,
     shortURLs: response,
   });
 } catch (err) {
   console.log(err);
   return res.status(500).send({
     message: "Internal Server Error!!",
   });
 }
};