# 🍽️ Menu Management API

A comprehensive RESTful API for managing restaurant menus with categories, sub-categories, and items. Built with Node.js, Express.js, and MongoDB.

![Node.js](https://img.shields.io/badge/Node.js-v14+-green)
![Express](https://img.shields.io/badge/Express-v4.18-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-v5+-brightgreen)
![License](https://img.shields.io/badge/License-ISC-yellow)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Testing](#testing)
- [API Endpoints](#api-endpoints)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **Complete CRUD Operations** for Categories, Sub-Categories, and Items
- **Hierarchical Menu Structure** with three-tier organization
- **Flexible Item Assignment** - Items can belong to categories or sub-categories
- **Tax Management** with inheritance from parent categories
- **Automatic Calculations** - Total amount computed from base amount and discount
- **Advanced Search** - Case-insensitive search by item name
- **Data Validation** - Schema validation using Mongoose
- **Relationship Management** - Populated queries for related data
- **RESTful API Design** - Standard HTTP methods and status codes
- **Error Handling** - Comprehensive error responses

## 🛠️ Tech Stack

- **Runtime:** Node.js (v14+)
- **Framework:** Express.js (v4.18)
- **Database:** MongoDB (v5+)
- **ODM:** Mongoose (v8.0)
- **Development:** Nodemon (v3.0)

## 📁 Project Structure

```
GUESTARA/
├── controller/
│   ├── categoryController.js        # Handles logic for category-related operations
│   ├── itemsController.js           # Handles CRUD and search for items
│   ├── searchController.js          # Manages custom search endpoints
│   ├── subCategoryController.js     # Handles logic for subcategory operations
│
├── models/
│   ├── Category.js                  # Mongoose schema for categories
│   ├── Item.js                      # Mongoose schema for items
│   ├── SubCategory.js               # Mongoose schema for subcategories
│
├── routes/
│   ├── categoryRouter.js            # Routes for category endpoints
│   ├── itemRouter.js                # Routes for item endpoints
│   ├── subCategoryRouter.js         # Routes for subcategory endpoints
│   ├── index.js                     # Combines and exports all route modules
│
├── node_modules/                    # Project dependencies
│
├── .gitignore                       # Specifies intentionally untracked files
├── app.js                           # Entry point for Express app setup
├── dbConnect.js                     # MongoDB connection setup
├── package.json                     # Project metadata and dependencies
├── package-lock.json                # Dependency lock file
└── README.md                        # Project documentation

```

## 🚀 Installation

### Prerequisites

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v5 or higher) - [Download](https://www.mongodb.com/try/download/community)
  - OR use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Cloud)
- **Postman** (Optional) - [Download](https://www.postman.com/downloads/)

### Step 1: Clone the Repository

```bash
git clone git@github.com:dibdas/guestara.git
cd guestara
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Set Up MongoDB

#### Option A: Local MongoDB

1. Install MongoDB on your system
2. Start MongoDB service:

```bash
# Windows
net start MongoDB

# macOS (with Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

3. Verify MongoDB is running:
```bash
mongosh
```

#### Option B: MongoDB Atlas (Cloud)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create a database user
4. Whitelist your IP address
5. Get your connection string

## 🏃 Running the Application

### Development Mode (with auto-reload)

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

The server will start at:
```
http://localhost:5000
```

You should see:
```
✅ MongoDB Connected Successfully
📍 Database: menu-management
🌐 Host: localhost
Server is running on port 3000
API Documentation available at http://localhost:3000
```

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Response Format

**Success Response:**
```json
{
  "message": "Operation successful",
  "data": { ... }
}
```

**Error Response:**
```json
{
  "error": "Error message description"
}
```

### Status Codes

| Code | Description |
|------|-------------|
| `200` | OK - Request successful |
| `201` | Created - Resource created successfully |
| `400` | Bad Request - Invalid input |
| `404` | Not Found - Resource not found |
| `500` | Internal Server Error |

## 🗄️ Database Schema

### Category Schema

```javascript
{
  name: String (required),
  image: String,
  description: String,
  taxApplicability: Boolean,
  tax: Number,
  taxType: String,
  createdAt: Date,
  updatedAt: Date
}
```

### SubCategory Schema

```javascript
{
  name: String (required),
  image: String,
  description: String,
  categoryId: ObjectId (ref: Category, required),
  taxApplicability: Boolean,
  tax: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Item Schema

```javascript
{
  name: String (required),
  image: String,
  description: String,
  taxApplicability: Boolean,
  tax: Number,
  baseAmount: Number (required),
  discount: Number,
  totalAmount: Number (auto-calculated),
  categoryId: ObjectId (ref: Category),
  subCategoryId: ObjectId (ref: SubCategory),
  createdAt: Date,
  updatedAt: Date
}
```

## 🧪 Testing

### Using Postman

1. Import the provided Postman collection
2. Set base URL: `http://localhost:3000`
3. Follow the step-by-step testing guide

### Using cURL

**Create a Category:**
```bash
curl -X POST http://localhost:3000/api/categories \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Beverages",
    "description": "All types of beverages",
    "taxApplicability": true,
    "tax": 5,
    "taxType": "GST"
  }'
```

**Get All Categories:**
```bash
curl http://localhost:3000/api/categories
```

## 🔗 API Endpoints

### Categories

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/categories/create` | Create a new category |
| `GET` | `/api/categories/all` | Get all categories |
| `GET` | `/api/categories/:identifier` | Get category by ID or name |
| `PUT` | `/api/categories/:id` | Update category |

### Sub-Categories

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/subcategories/create` | Create a new sub-category |
| `GET` | `/api/subcategories/all` | Get all sub-categories |
| `GET` | `/api/subcategories/:id` | Get sub-category by ID or name |
| `GET` | `/api/categories/:categoryId/subcategories` | Get all sub-categories under a category |
| `PUT` | `/api/subcategories/:id` | Update sub-category |

### Items

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/items/create` | Create a new item |
| `GET` | `/api/items/all` | Get all items |
| `GET` | `/api/items/items/:name` | Get  items by name |
| `GET` | `/api/items/:identifier` | Get item by ID or name |
| `GET` | `/api/categories/:categoryId/items` | Get all items under a category |
| `GET` | `/api/subcategories/:subCategoryId/items` | Get all items under a sub-category |
| `PUT` | `/api/items/:id` | Update item |

### Search

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/items/search/:name` | Search items by name |

## 💡 Examples

### 1. Create a Category

**Request:**
```http
POST /api/categories
Content-Type: application/json

{
  "name": "Beverages",
  "image": "https://example.com/beverages.jpg",
  "description": "Refreshing drinks",
  "taxApplicability": true,
  "tax": 5,
  "taxType": "GST"
}
```

**Response:**
```json
{
  "message": "Category created successfully",
  "data": {
    "_id": "654a1b2c3d4e5f6789012345",
    "name": "Beverages",
    "image": "https://example.com/beverages.jpg",
    "description": "Refreshing drinks",
    "taxApplicability": true,
    "tax": 5,
    "taxType": "GST",
    "createdAt": "2024-11-12T10:30:00.000Z",
    "updatedAt": "2024-11-12T10:30:00.000Z"
  }
}
```

### 2. Create a Sub-Category

**Request:**
```http
POST /api/subcategories
Content-Type: application/json

{
  "name": "Hot Beverages",
  "description": "Coffee, tea, etc.",
  "categoryId": "654a1b2c3d4e5f6789012345"
}
```

**Response:**
```json
{
  "message": "Sub-category created successfully",
  "data": {
    "_id": "654a1b2c3d4e5f6789012346",
    "name": "Hot Beverages",
    "description": "Coffee, tea, etc.",
    "categoryId": "654a1b2c3d4e5f6789012345",
    "taxApplicability": true,
    "tax": 5,
    "createdAt": "2024-11-12T10:35:00.000Z",
    "updatedAt": "2024-11-12T10:35:00.000Z"
  }
}
```

### 3. Create an Item

**Request:**
```http
POST /api/items
Content-Type: application/json

{
  "name": "Cappuccino",
  "description": "Classic Italian coffee",
  "taxApplicability": true,
  "tax": 5,
  "baseAmount": 150,
  "discount": 10,
  "subCategoryId": "654a1b2c3d4e5f6789012346"
}
```

**Response:**
```json
{
  "message": "Item created successfully",
  "data": {
    "_id": "654a1b2c3d4e5f6789012347",
    "name": "Cappuccino",
    "description": "Classic Italian coffee",
    "taxApplicability": true,
    "tax": 5,
    "baseAmount": 150,
    "discount": 10,
    "totalAmount": 140,
    "categoryId": null,
    "subCategoryId": "654a1b2c3d4e5f6789012346",
    "createdAt": "2024-11-12T10:40:00.000Z",
    "updatedAt": "2024-11-12T10:40:00.000Z"
  }
}
```

### 4. Search Items

**Request:**
```http
GET /api/items/search/ice
```

**Response:**
```json
{
  {
	"success": true,
	"count": 2,
	"data": [
		"Iced Latte",
		"Vanilla Ice Cream"
	]
}
}
```

## 🎯 Key Features Explained

### 1. Tax Inheritance
Sub-categories automatically inherit tax settings from their parent category unless explicitly specified:

```json
// Parent category has tax: 5
// Sub-category without tax specified will inherit tax: 5
```

### 2. Automatic Total Calculation
Items automatically calculate `totalAmount = baseAmount - discount`:

```json
{
  "baseAmount": 150,
  "discount": 10,
  "totalAmount": 140  // Calculated automatically
}
```

### 3. Flexible Queries
Get resources by ID or name:

```http
GET /api/categories/654a1b2c3d4e5f6789012345  # By ID
GET /api/categories/Beverages                  # By Name
```

### 4. Populated Responses
Relationships are automatically populated in GET requests:

```json
{
  "name": "Cappuccino",
  "subCategoryId": {
    "_id": "654a...",
    "name": "Hot Beverages"
  }
}
```

## 🐛 Troubleshooting

### MongoDB Connection Failed

**Error:** `MongooseServerSelectionError: connect ECONNREFUSED`

**Solution:**
- Ensure MongoDB service is running
- Check connection string in `.env`
- Verify firewall settings

### Invalid ObjectId Error

**Error:** `Cast to ObjectId failed`

**Solution:**
- Verify the ID format is correct (24 hex characters)
- Use the exact `_id` from the database

### Port Already in Use

**Error:** `Error: listen EADDRINUSE: address already in use :::3000`

**Solution:**
```bash
# Find and kill the process using port 3000
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:3000 | xargs kill -9
```

## 📝 Future Enhancements

- [ ] JWT Authentication & Authorization
- [ ] Role-based access control
- [ ] Image upload functionality
- [ ] Pagination and sorting
- [ ] Data export (CSV/JSON)
- [ ] Redis caching
- [ ] Rate limiting
- [ ] Unit and integration tests
- [ ] Swagger/OpenAPI documentation
- [ ] Docker containerization

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Created as part of a Node.js backend assignment.

## 📞 Support

For support, please open an issue in the repository or contact the maintainer.

---

**Happy Coding! 🎉**