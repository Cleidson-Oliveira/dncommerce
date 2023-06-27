import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";

import ProductsRoute from "./routes/products.route";
import CostumerRoute from "./routes/costumers.route";

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Hello world");
})

app.use(express.json());
app.use(cors());

app.use(ProductsRoute);
app.use(CostumerRoute);

app.listen(port, () => { 
    console.log(`Server listen on http://localhost:${port}`)
})