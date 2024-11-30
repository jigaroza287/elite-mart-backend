# **EliteMart Backend**

EliteMart Backend is a RESTful API built using **Node.js**, **Express.js**, and **TypeScript**. It serves as the backend for an e-commerce-like application, showcasing features like user authentication, input validation, multilingual support, and order management. The backend integrates with a PostgreSQL database and is designed for scalability, performance, and developer-friendly code maintenance.

---

## **Features**

### **Core Features**
- **User Authentication**:
  - User registration with validation for fields like name, email, and password.
  - Secure login with proper validation and meaningful error handling.
  - Password hashing using `bcrypt`.

- **Order Management**:
  - CRUD operations for user orders.
  - Middleware to ensure only authenticated users can access or manage their orders.

### **Advanced Features**
- **Validation Middleware**:
  - Centralized validation logic for user input using `express-validator`.
  - Reusable validation rules for both registration and login.
  - Immediate feedback for invalid input.

- **Multilingual Support**:
  - Dynamic language switching based on `Accept-Language` headers or query parameters.
  - Localized error and success messages.
  - Supports English (`en`) and German (`de`), with extensibility for other languages.

- **Secure Input Handling**:
  - Sanitization of user inputs to prevent XSS and other injection attacks.
  - Type-safe handling of dynamic inputs using TypeScript.

### **Technical Features**
- **Built with TypeScript**:
  - Strong typing for robust and maintainable code.
  - Type-safe request/response handling with extended `Express` types.

- **Environment Variables**:
  - `.env` file for environment-specific configuration (e.g., `PORT`, `DB_PORT`, database credentials).
  - `dotenv` dependency to load configuration at runtime.

- **Database Integration**:
  - PostgreSQL as the primary database, managed using Sequelize ORM.
  - Support for relational data models (e.g., users, orders).
  - Secure connection with proper error handling.

- **Code Structure**:
  - Clean separation of concerns:
    - `app.ts`: Core application setup, including middlewares and routes.
    - `server.ts`: Responsible for starting the server.
    - `routes/`: Organized route handlers for different entities.
    - `middlewares/`: Centralized reusable middleware (e.g., authentication, validation).
    - `locales/`: Localization files for multilingual support.

- **Scalable Design**:
  - Middleware-based architecture for extensibility.
  - Easily integrable with additional modules like payment gateways or third-party APIs.

---

## **Setup Instructions**

### **Prerequisites**
Ensure you have the following installed:
- **Node.js** (v16 or higher)
- **PostgreSQL**
- **npm** or **yarn**

### **Installation**
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/swigato-backend.git
   cd swigato-backend
