import express from "express";
import { createProduct, deleteProduct, editProducts, getProducts } from "../controllers/product.controller.js";

const router = express.Router();

router.post("/", createProduct)

router.delete("/:id", deleteProduct)

router.get("/", getProducts)

router.put("/:id", editProducts)


export default router