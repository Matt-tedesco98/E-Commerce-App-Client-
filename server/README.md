# 🛒 E-commerce REST API

This is a fully functional E-commerce REST API built using Node.js, Express, and PostgreSQL. It provides robust CRUD operations for user authentication, product listings, cart management, and order processing — including a simulated checkout workflow.

---

## 📁 Project Structure

```
E-commerce-App(REST API)/
├── controllers/          # Route logic (Auth, Cart, Orders, Products, Checkout)
├── db/                   # PostgreSQL database connection
├── docs/                 # Swagger documentation setup
├── models/               # Data access logic (DB queries)
├── routes/               # Express route definitions
├── utils/                # Utility functions (e.g., password hashing)
├── .env                  # Environment variables
├── app.js                # Main Express app
├── server.js             # Entry point
└── README.md             # Project documentation
```

---

## 🚀 Features

- ✅ **User Authentication**
- 🛍 **Product Management**
- 🛒 **Cart Operations (Add, Update, Delete, View)**
- 📦 **Checkout & Order Creation**
- 📄 **Swagger API Documentation**
- 🔐 **Hashed Passwords with Bcrypt**
- 🧪 **Basic error handling and input validation**

---

## 🧪 Tech Stack

- **Backend:** Node.js, Express
- **Database:** PostgreSQL
- **Docs:** Swagger UI

---

## 🔐 Environment Variables

Create a `.env` file in the root with the following:

```
DATABASE_URL=your_postgres_connection_string
PORT=8000
```

---

## 🛠️ Setup & Run

```bash
npm install
npm start
```

The API will run on: `http://localhost:8000`

---

## 🔍 API Endpoints

### 🧑‍💼 Auth

| Method | Endpoint           | Description             |
|--------|--------------------|-------------------------|
| POST   | `/api/auth/register` | Register new user       |
| POST   | `/api/auth/login`    | Login and receive token |

---

### 📦 Products

| Method | Endpoint              | Description         |
|--------|-----------------------|---------------------|
| GET    | `/api/products`       | List all products   |
| GET    | `/api/products/:id`   | Get product by ID   |
| POST   | `/api/products`       | Create a product    |
| PUT    | `/api/products/:id`   | Update a product    |
| DELETE | `/api/products/:id`   | Delete a product    |

---

### 🛒 Cart

| Method | Endpoint                        | Description              |
|--------|---------------------------------|--------------------------|
| GET    | `/api/cart/:userId`             | Get user's cart          |
| POST   | `/api/cart/add`                 | Add item to cart         |
| PUT    | `/api/cart/update`              | Update cart item         |
| DELETE | `/api/cart/:userId/:productId`  | Remove item from cart    |
| POST   | `/api/cart/:userId/checkout`    | Checkout user’s cart     |

---

### 📑 Orders

| Method | Endpoint                    | Description               |
|--------|-----------------------------|---------------------------|
| GET    | `/api/orders/:userId`       | Get all user orders       |
| GET    | `/api/orders/details/:id`   | Get order item details    |

---

## 📘 Swagger Documentation

Interactive API docs available at:

```
http://localhost:8000/api/docs
```

Generated from annotations in the route files using `swagger-jsdoc`.

---

## 🧠 Developer Notes

- Passwords are securely hashed using bcrypt.
- Cart is tied to user ID for simplicity.
- Checkout creates an order and empties the cart.
- Error handling follows a consistent JSON pattern.

---

## 📌 TODOs

- Integrate payment gateway
- Add JWT authentication middleware
- Improve unit/integration test coverage

---

## 🤝 Contributing

Feel free to fork and submit pull requests!

---

## 📄 License

MIT

---

## 👨‍💻 Author

Matthew Tedesco
