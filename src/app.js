import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import userRouter from "./routes/user.routes.js";
import urlRouter from "./routes/urls.routes.js";
import rankRouter from "./routes/ranking.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use([userRouter, urlRouter, rankRouter])

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running in port ${port}`));