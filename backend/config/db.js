import mongoose from "mongoose"

export const connectDB = async (params) => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI);
		console.log(`Connected to the DB, ${conn.connection.host}`);
	} catch (error) {
		console.log(error.message);
		process.exit(1); // process code 1 is error	
	}
	
}