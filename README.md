# 🚂 Express.js Product RESTful API

This project is a RESTful API built with Express.js that implements standard CRUD operations, custom middleware (logging, authentication, validation), and comprehensive error handling.

## 🚀 Setup & Run Instructions

### Prerequisites

1.  Node.js (v18 or higher recommended) installed.
2.  Dependencies installed: `express`, `body-parser`, `uuid`.

### Installation and Launch

1.  **Clone the repository:**
    ```bash
    git clone [YOUR_REPO_URL]
    cd express-js-server-side-framework
    ```

2.  **Install dependencies:**
    ```bash
    npm install express body-parser uuid
    ```

3.  **Run the server:**
    ```bash
    node server.js
    ```
    The server will start at `http://localhost:3000`. Keep this terminal running.

4.  **Testing:** Use tools like Postman, Insomnia, or cURL from a separate terminal.

## ⚙️ API Endpoints Documentation

All routes related to the resource are prefixed with `/api/products`.

| Method | Endpoint | Description | Auth Required | Query Params |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/products` | Lists products. | No | `category`, `search`, `page`, `limit` |
| `GET` | `/api/products/stats` | Returns product count by category. | No | N/A |
| `GET` | `/api/products/:id` | Retrieves a specific product by ID. | No | N/A |
| `POST` | `/api/products` | Creates a new product. | **Yes** | N/A |
| `PUT` | `/api/products/:id` | Updates an existing product. | **Yes** | N/A |
| `DELETE` | `/api/products/:id` | Deletes a product. | **Yes** | N/A |

### 🔑 Authentication

Routes requiring authentication must include the header:
`X-API-Key: secret-key`

## 💬 Examples of Requests and Responses

### Example 1: Successful Product Creation (`POST`)

**Request:**
```bash
curl -i -X POST \
-H "X-API-Key: secret-key" \
-H "Content-Type: application/json" \
-d '{"name": "Mouse", "description": "Wireless mouse", "price": 35.00, "category": "Electronics", "inStock": true}' \
http://localhost:3000/api/products
