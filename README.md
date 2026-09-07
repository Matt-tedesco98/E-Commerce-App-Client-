# E-Commerce Web Application

A full-stack e-commerce application built with **React, Node.js, Express, PostgreSQL, Passport, and Stripe**.

The project covers a complete shopping workflow: browsing products, authentication, cart management, checkout, payments, and order history.

## Features

### Shopping experience
- Browse products
- View product details
- Add and remove cart items
- Persistent user carts
- Checkout flow
- Order confirmation and history

### Authentication
- Local email/password authentication
- Password hashing with bcrypt
- Session-based authentication with Passport
- Google OAuth integration
- Facebook OAuth integration
- Authenticated user-state handling in React

### Payments
- Stripe Payment Intents
- Stripe Elements integration
- Server-side cart total calculation
- Checkout-to-order workflow

### Backend
- REST API built with Express
- PostgreSQL persistence
- Product, cart, order, authentication, and payment routes
- Swagger API documentation

## Tech Stack

### Frontend
- React 19
- React Router
- React Context
- Redux Toolkit / React Redux
- Stripe React / Stripe.js
- JavaScript
- CSS

### Backend
- Node.js
- Express 5
- PostgreSQL
- Passport
- bcrypt
- Stripe
- Swagger / OpenAPI

## Project Structure

```text
├── src/
│   ├── Components/     Reusable UI and checkout components
│   ├── pages/          Products, cart, checkout, auth, and orders
│   ├── context/        Authentication and cart state
│   └── apis/           REST API client functions
│
└── server/
    ├── controllers/    Request and workflow handlers
    ├── models/         PostgreSQL data access
    ├── routes/         Express API routes
    ├── Passport/       Authentication strategies
    ├── docs/           Swagger configuration
    └── db/             Database connection and setup
```

## What This Project Demonstrates

This project demonstrates full-stack application development across a real multi-step workflow rather than isolated CRUD screens. It combines routed React UI, asynchronous API integration, relational data, authentication, third-party OAuth, shopping-cart state, payment processing, and backend service design.

## Running Locally

Install frontend dependencies:

```bash
npm install
npm start
```

The backend is located in the `server` directory and requires its own dependencies and environment configuration for PostgreSQL, authentication providers, sessions, and Stripe.

## Author

**Matthew Tedesco**
