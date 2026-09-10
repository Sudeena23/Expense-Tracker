# Expense Tracker

A backend API for tracking personal expenses, built with Express and MongoDB.

## Features

- Add, view, update, and delete expense records
- Each expense includes amount, description, category, date, and type (expense/income)
- RESTful API structure

## Tech Stack

- Node.js
- Express
- MongoDB with Mongoose
- dotenv for environment configuration
- CORS enabled for cross-origin requests

## Project Structure

```
backend/
├── .env
├── server.js
├── package.json
├── models/
│   └── Expense.js
├── controllers/
│   └── expenseController.js
└── routes/
    └── expenseRoutes.js
```

## Prerequisites

- Node.js installed
- MongoDB installed and running locally (or a MongoDB Atlas connection string)

## Setup

1. Clone or download the project.
2. Navigate to the backend folder:
   ```bash
   cd backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the backend root with the following variables:
   ```
   MONGO_URL="mongodb://localhost:27017/expense-tracker"
   JWT_SECRET="your_secret_here"
   PORT=3000
   ```
5. Start the server:
   ```bash
   npm run dev
   ```
   The server runs on `http://localhost:3000` by default.

## API Endpoints

Base URL: `http://localhost:3000/api/expenses`

| Method | Endpoint | Description |
|--------|----------|--------------|
| GET | `/` | Get all expenses |
| POST | `/` | Add a new expense |
| PUT | `/:id` | Update an expense by ID |
| DELETE | `/:id` | Delete an expense by ID |

### Request Body Example (POST / PUT)

```json
{
  "amount": 500,
  "description": "Groceries",
  "category": "Food",
  "date": "2026-09-10",
  "type": "expense"
}
```

### Response Example

```json
{
  "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
  "amount": 500,
  "description": "Groceries",
  "category": "Food",
  "date": "2026-09-10T00:00:00.000Z",
  "type": "expense",
  "__v": 0
}
```

## Testing the API

Use Postman or any REST client to test the endpoints listed above. A health check route is available at:

```
GET http://localhost:3000/
```

which returns `Expense Tracker Backend is Running` when the server is up.

## Notes

- Ensure MongoDB is running before starting the server, or connection will fail.
- The `.env` file is required for the app to run; it is not committed to version control.
