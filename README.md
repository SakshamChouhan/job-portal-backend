# Job Portal Backend

This is the backend for the Job Portal application, built using Node.js, Express, MongoDB, and AWS S3 for resume storage.

## Setup Instructions

### Prerequisites
- Node.js (v18 or later)
- MongoDB (Atlas or local instance)
- AWS S3 bucket for resume storage

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/SakshamChouhan/job-portal-backend.git
   cd job-portal-backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and configure the environment variables (see below).
4. Start the server:
   ```bash
   npm start
   ```

## Environment Variables
Create a `.env` file in the root directory and add the following:

```env
PORT=5000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=your-aws-region
AWS_S3_BUCKET=your-s3-bucket-name
```

## API Endpoints

| Method | Endpoint          | Description |
|--------|------------------|-------------|
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login` | Login and receive a token |
| GET    | `/api/profile` | Fetch user profile (name, email, resume from S3) (Requires Token) |
| GET    | `/api/skills` | Fetch user skills stored in MongoDB (Requires Token) |
| POST   | `/api/resume/upload` | Upload resume, extract skills, and save to DB (Requires Token) |
| GET    | `/api/jobs` | Fetch job recommendations (Requires Token) |

## Example API Requests

### Register a new user
```sh
curl -X POST http://localhost:5000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Test User",
       "email": "test@example.com",
       "password": "test123",
       "confirmPassword": "test123"
     }'
```

### Login
```sh
curl -X POST http://localhost:5000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{
       "email": "test@example.com",
       "password": "test123"
     }'
```

### Fetch user profile
```sh
curl -X GET http://localhost:5000/api/profile \
     -H "Authorization: Bearer <your-token>"
```

### Fetch user skills
```sh
curl -X GET http://localhost:5000/api/skills \
     -H "Authorization: Bearer <your-token>"
```

### Upload resume
```sh
curl -X POST http://localhost:5000/api/resume/upload \
     -H "Authorization: Bearer <your-token>" \
     -H "Content-Type: multipart/form-data" \
     -F "resume=@Resume.pdf"
```

### Fetch job recommendations
```sh
curl -X GET http://localhost:5000/api/jobs \
     -H "Authorization: Bearer <your-token>"
```

## Authentication
- After login, a token is returned.
- The token must be included in the `Authorization` header as `Bearer <token>` for protected routes.

## Running the Server
Start the backend server using:
```bash
npm start
```

For development, use:
```bash
npm run dev
```

## Technologies Used
- **Node.js** with Express.js
- **MongoDB** for database
- **AWS S3** for resume storage
- **JWT** for authentication

---
This backend powers the Job Portal, handling user authentication, resume processing, skill extraction, and job recommendations.

