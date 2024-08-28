
# Full-Stack User Management Application

This project consists of a simple REST API (Node.js) and a frontend (Vue.js with Vuetify and TypeScript) to manage users. The project is containerized using Docker and includes testing with Jest.

## Project Structure

```
/project-root
  /backend        # Node.js backend with TypeScript and Jest
  /frontend       # Vue.js frontend with Vuetify and TypeScript
  /docker         # Docker-related files
```

## Getting Started

### Prerequisites

- Docker and Docker Compose installed on your machine.
- Node.js (if running outside Docker).

### Running the Application with Docker

1. Navigate to the `docker` directory:
   ```bash
   cd docker
   ```

2. Start the services:
   ```bash
   docker-compose up --build
   ```

3. The application will be available at:
   - Frontend: `http://localhost:8080`
   - Backend API: `http://localhost:3000`

### Running the Application without Docker

#### Backend

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Compile TypeScript:
   ```bash
   npm run build
   ```

4. Run the server:
   ```bash
   npm run start
   ```

5. The backend API will be available at `http://localhost:3000`.

#### Frontend

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run serve
   ```

4. The frontend will be available at `http://localhost:8080`.

### Testing

#### Backend Testing with Jest

1. Ensure you are in the `backend` directory:
   ```bash
   cd backend
   ```

2. Run tests:
   ```bash
   npm test
   ```

## API Endpoints

- `POST /users` - Create a new user.
- `GET /users/:id` - Retrieve a user by ID.
- `PUT /users/:id` - Update an existing user.
- `DELETE /users/:id` - Soft delete a user by ID.
- `GET /users` - List all users with optional sorting and filtering.
