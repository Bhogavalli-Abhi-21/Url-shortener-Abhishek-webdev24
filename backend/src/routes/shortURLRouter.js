import { Router } from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { createShortUrl, redirectToOriginalURL } from "../controllers/shortUrlController.js";
const shortURLRouter = Router();




shortURLRouter.post("/", protect, createShortUrl)
shortURLRouter.get("/:shortCode", redirectToOriginalURL)



export default shortURLRouter;