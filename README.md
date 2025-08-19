# Project Title

A full-stack application with a React frontend and a Node.js/Express/MySQL backend.

## Table of Contents

- [Project Title](#project-title)
- [Table of Contents](#table-of-contents)
- [Description](#description)
- [Features](#features)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Cart](#cart)
- [Contributing](#contributing)


## Description

This project is a basic e-commerce application demonstrating a React frontend interacting with a Node.js backend. The backend handles user authentication (login and registration) and manages a shopping cart by storing items in a MySQL database.

## Features

- User registration
- User login
- Add products to a shopping cart
- (Add other features here as they are implemented)

## Project Structure

```
.
├── Backend/
│   ├── index.js          # Backend entry point (Express app)
│   ├── package.json      # Backend dependencies
│   ├── package-lock.json
│   └── ...               # Other backend files (e.g., database connection, routes)
├── client/
│   ├── public/
│   │   └── index.html    # Frontend HTML file
│   ├── src/
│   │   ├── App.js        # Main React component
│   │   ├── index.js      # React entry point
│   │   ├── components/   # React components
│   │   └── ...           # Other frontend files
│   ├── package.json      # Frontend dependencies
│   ├── package-lock.json
│   └── README.md         # Frontend specific README (optional)
├── package-lock.json
├── package.json
└── README.md             # Project README
```
## Technologies Used

**Frontend:**

- React
- (Add other frontend libraries here)

**Backend:**

- Node.js
- Express
- MySQL

## Prerequisites

Before you begin, ensure you have met the following requirements:

* Node.js and npm installed
* MySQL database server installed and running

## Getting Started

### Backend Setup

1. Navigate to the `Backend` directory:
   
```
bash
   cd Backend
   
```
2. Install backend dependencies:
```
bash
   npm install
   
```
3. Create a `.env` file in the `Backend` directory and configure your database connection:
```
   DB_HOST=your_database_host
   DB_USER=your_database_user
   DB_PASS=your_database_password
   DB_NAME=your_database_name
   PORT=your_backend_port (e.g., 5000)
   
```
Replace the placeholder values with your actual database credentials and desired port.

4. Create the `Users` and `cart` tables in your MySQL database. You can use a SQL client or a command-line tool to execute the following SQL queries:

   **Users table:**
```
sql
   CREATE TABLE Users (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     emailAddress VARCHAR(255) UNIQUE NOT NULL,
     phoneNumber VARCHAR(20),
     Password VARCHAR(255) NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   
```
**cart table:**
```
sql
   CREATE TABLE cart (
     id INT AUTO_INCREMENT PRIMARY KEY,
     product_id INT NOT NULL,
     name VARCHAR(255),
     price DECIMAL(10,2),
     quantity INT,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   
```
5. Start the backend server:
```
bash
   npm start
   
```
### Frontend Setup

1. Navigate to the `client` directory:
```
bash
   cd ../client
   
```
2. Install frontend dependencies:
```
bash
   npm install
   
```
3. Configure the API endpoint in your frontend code to point to your backend server (e.g., in an environment file or configuration file).

4. Start the frontend development server:
```
bash
   npm start
   
```
The frontend application should now be running and interacting with your backend.

## API Endpoints

### Authentication

- `POST /Users/register`: Register a new user.
- `POST /Users/login`: Log in an existing user.

### Cart

- `POST /cart`: Add items to the user's cart. (Requires a request body with an array of cart items.)
