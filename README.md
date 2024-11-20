  # 🛍️ E-Commerce API

This project is a backend implementation for an **E-Commerce Application**. It provides a set of RESTful APIs to manage products, orders, customers, and other key e-commerce functionalities.

## 🚀 Features

- **Cart Management**
    Add, delete and get cart items

- **Product Management**  
  Add, rate, filter, and fetch product details.

- **User Authentication**  
  Secure user registration and login system.

- **Order Processing**  
  Place orders.

- **Like Management**
    Like a product, retreieve all likes of a product.

- **API Documentation**  
  Swagger-based API documentation for easy integration.


## 🛠️ Technologies Used

- **Backend Framework:** Node.js  
- **Database:** MongoDB  
- **API Documentation:** Swagger  
- **Other Libraries:** Express.js, Mongoose  


## 📖API Endpoints
### Cart
- `POST /api/cart/` - Add items to the cart.
- `GET /api/cart/` - View items in the cart.
- `Delete /api/cart/:id` - Remove an item from the cart.

### Like
- `POST /api/like/` - Like a product
- `GET /api/like/` - View all likes of a product.

### Order
- `POST /api/orders/` - Create a new order

### Product
- `GET /api/product/` - Get a list of all products.
- `POST /api/product/`  - Post a product.
- `GET /api/product/filter` - Filter out the products.
- `GET /api/product/averagePrice` - Get the average price of the products.
- `GET /api/product/:id` - Get a specific product.
- `POST /api/product/rate` - Rate the product.

### User
- `POST /api/user/signup` - Register a new user.
- `POST /api/user/signin` - Authenticate and login a user.
- `POST /api/user/resetPassword` - Reset the password.

## 📁 Project Structure

```
E-Com-API/
├── images/ # API flow diagrams or assets
├── src/
│ ├── config/ # Configuration files
│ ├── error-handler/ # Centralized error handling utilities
│ ├── features/
│ │ ├── Cart/ # Cart-specific logic
│ │ ├── Like/ # Like-specific logic
│ │ ├── Order/ # Order-specific logic
│ │ ├── Product/ # Product-specific logic
│ │ └── User/ # User-specific logic
│ └── middlewares/ # Helper functions
├── index.js # Entry point of the application
├── package.json # Node.js dependencies
├── swagger.json # Swagger API documentation
└── README.md # Project documentation
```

## ⚙️ Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)

### Installation
1. Clone the repository
    ```bash
    git clone https://github.com/tanmaygupta07/E-Com-API.git

2. Navigate to the project directory:
    ```bash
    cd E-com API

3. Install dependencies:
    ```bash
    npm install
    
4. Set up environment variables in a `.env` file:
    ```bash
    DB_URL=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    
5. Start the server:
    ```bash
    npm start
