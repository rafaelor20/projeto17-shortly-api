import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import userRouter from "./routes/user.routes.js";
import urlRouter from "./routes/urls.routes.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use([userRouter, urlRouter])

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running in port ${port}`));