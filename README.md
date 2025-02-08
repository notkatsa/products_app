![;](https://github.com/notkatsa/products_app/blob/main/site.png?raw=true ";")

# Products MERN App

This is a simple web application built using the MERN (MongoDB, Express, React, Node.js) stack.

## Features
- Backend API for adding, deleting, and modifying products
- MongoDB database to store product details (name, image, and price)
- Frontend built with React and Bootstrap for a clean UI
- API calls to `/api/products` for managing product data

## Installation and Setup

### Prerequisites
Ensure you have the following installed:
- Node.js and npm
- MongoDB (local or Atlas cluster)

### Backend Setup
1. Navigate to the `backend` directory:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and add your MongoDB connection string:
   ```
   MONGO_URI=your_mongodb_connection_string
   PORT=1337 # for example
   ```
4. Start the backend server:
   ```sh
   npm start
   ```
   The server will run on `http://localhost:process.env.PORT`.

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend development server:
   ```sh
   npm start
   ```
   The app will be available at `http://localhost:3000`.

## API Endpoints
### Products API (`/api/products`)
- **GET** `/api/products` - Fetch all products
- **POST** `/api/products` - Add a new product
- **PUT** `/api/products/:id` - Update an existing product
- **DELETE** `/api/products/:id` - Remove a product

## Technologies Used
- **Frontend:** React, Bootstrap, Axios
- **Backend:** Node.js, Express, MongoDB, Mongoose

## Contributing
Feel free to fork and modify the project! This was a learning project for me but I will surely
fork from it when creating something new