import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import routerGames from "./routes/game.routes.js";
import routerCustomers from "./routes/customer.routes.js";
import routerRentals from "./routes/rental.routes.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use([routerGames, routerCustomers, routerRentals])

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running in port ${port}`));