import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from "./config/db.js";
import Product from './models/product.model.js';

import productRoutes from "./routes/product.route.js"

dotenv.config();

const app = express();
app.use(express.json());
app.use("/api/products", productRoutes);
app.listen(process.env.PORT || 5000, () => {
	connectDB();
	console.log(`Server listening on port ${process.env.PORT || 5000}`);
})

