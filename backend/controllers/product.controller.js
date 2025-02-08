import mongoose from 'mongoose';
import Product from '../models/product.model.js';
export const createProduct = async (req,res) => {
	const product = req.body;
	if (!product.name || !product.price || !product.image) {
		return res.status(400).json({success: false, message: "fill all"})
	}
	const NewProduct = new Product(product);

	try {
		await NewProduct.save();
		res.status(200).json({success:true, data: NewProduct})
	} catch (error) {
		console.error("Error in creating product", error.message);
		res.status(500).json({success:false, message:"Server Error"})
	}
}

export const deleteProduct = async (req, res) => {
	const {id} = req.params;
	try {
		await Product.findByIdAndDelete(id);
		res.status(200).json({success:true, id:{id}})
	} catch (err) {
		console.log("error deleting", err.message);
		res.status(500).json({success:false, message:"..."})
	}
}

export const getProducts = async (req,res) => {
	const data = await Product.find({})
	res.status(200).json({success: true, data: data});
}

export const editProducts = async (req,res) => {
	const {id} = req.params;
	const body = req.body;
	const updated = await Product.findByIdAndUpdate(id, body, {new:true});
	res.status(200).json({success:true, data: updated}) }