# ToDo-List

Built a fully functional Todo List application using:
React with TypeScript Only(no JavaScript files)
Node.js with TypeScript Only(no JavaScript files)

## 🚀 Quick Start Guide

### Prerequisites

- Make sure you have Node.js installed on your computer

### Installation Steps

1. Clone the repository:

```bash
git clone [repository-url]
cd todo-typescript
```

2. Install dependencies:

````bash
cd backend
npm init -y
npm i express mongoose bcryptjs jsonwebtoken dotenv cors nodemailer
npm i -D typescript ts-node-dev @types/express @types/node @types/jsonwebtoken @types/bcryptjs
````
````bash
cd frontend
npm init -y
npm i react react-dom react-router-dom zustand @tanstack/react-query zod react-hook-form axios
npm i -D typescript @types/react @types/react-dom @types/react-router-dom
````
Few dependencies might be missing, refer to package.json

3. Set up environment variables:
   - Create a file named (in backend)`.env` in the root folder
   ```env
   PORT=5003
   MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.mongodb.net/todos?retryWrites=true&w=majority
   JWT_SECRET=change_this_secret
   JWT_EXPIRES_IN=7d
   FRONTEND_URL=http://localhost:3000
   SMTP_HOST=smtp.mailtrap.io
   SMTP_PORT=587
   SMTP_USER=your_mailtrap_user
   SMTP_PASS=your_mailtrap_pass
````
- Create a file named (in frontend)`.env` in the root folder
   ```env
   VITE_API_URL=http://localhost:5003/api
````

- Save the file

### Running the App

#### Method 1: Development Mode (Recommended for first run)

1. Start the development server:

```bash
npm run dev
```

This command automatically:

- Starts the Vite dev server on port 5180
- Waits for the server to be ready
- Launches the Electron app

#### Method 2: Production Build

```bash
npm run dist
```

#### Features

1. User Management with JWT authentication
```
User Signup
User Sign-in (Login)
User Forgot/Reset Password
```

2. Todo Management
```
Create Todo
Update Todo
List Todos
Delete Todo
Mark Todo as Completed or Not Completed
```

#### Requirements Implemented 

1. Backend Requirements
```
Implement proper error handling in all routes.
Log all backend errors into MongoDB (create a separate collection for logs).
Use a free MongoDB Atlas instance for your database.
```

2. Frontend Requirements
```
Use React router for routing
Use zustand as global state
Use React query with zod schemas for api data fetching
Use React hook form for handling forms
```

Video Link- https://drive.google.com/file/d/1zs23M_GW1pgu-Ij8qEMtTjPvXxVzaKn0/view?usp=sharing
