import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import morgan from "morgan";
import { config } from "./config.js";
import connectDB from "./db/dbConnect.js";
import userRouter from "./routes/userRouter.js";
import authRouter from "./routes/authRouter.js";
import shortURLRouter from "./routes/shortURLRouter.js";

const app = express();
app.disable('x-powered-by');

// Allow all origins
app.use(cors({
  origin: (origin, callback) => {
    callback(null, origin || "*"); 
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));


app.use(morgan("dev")); // Add morgan here for request logging
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/s", shortURLRouter);



await connectDB();

app.listen(config.PORT, () => console.log(`Server on PORT: ${config.PORT}`));

const __dirname = path.dirname(fileURLToPath(import.meta.url));


app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.get("/*name", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});