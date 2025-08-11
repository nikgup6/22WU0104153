Assessment Submission
This repository contains the solution for the full-stack assessment. The project is a URL Shortener Microservice with a responsive React frontend, including mandatory logging integration.

Project Structure
The repository is organized into three distinct folders as per the instructions:

Logging Middleware: Contains the reusable Log function for sending events to the evaluation server.

Backend Test Submission: A Node.js/Express.js microservice that handles the core URL shortening, redirection, and analytics functionalities.

Frontend Test Submission: A responsive React application built with Material UI that provides a user-friendly interface to interact with the backend.

Backend API Endpoints
The backend microservice exposes the following RESTful API endpoints:

1. Create Short URL
   Endpoint: POST /shorturls

Description: Creates a new shortened URL.

Request Body:

JSON

{
"url": "https://www.example.com/a-very-long-url",
"validity": 60,
"shortcode": "mycustomcode"
}
Response (Status: 201 Created):

JSON

{
"shortlink": "http://localhost:3001/mycustomcode",
"expiry": "2025-08-11T13:45:00.000Z"
} 2. Redirection
Endpoint: GET /:shortcode

Description: Redirects the user to the original long URL.

Response (Status: 302 Found): Redirects to the original URL.

Error Responses:

404 Not Found: Shortcode does not exist.

410 Gone: Shortlink has expired.

3. Retrieve URL Statistics
   Endpoint: GET /shorturls/:shortcode

Description: Retrieves usage statistics for a specific shortened URL.

Response (Status: 200 OK):

JSON

{
"originalUrl": "https://www.example.com/a-very-long-url",
"shortlink": "http://localhost:3001/mycustomcode",
"creationDate": "2025-08-11T13:15:00.000Z",
"expiryDate": "2025-08-11T13:45:00.000Z",
"totalClicks": 5,
"clickDetails": [
{ "timestamp": "...", "source": "...", "location": "..." }
]
}
Error Response:

404 Not Found: Shortcode not found.

Technologies Used
Backend: Node.js, Express.js

Frontend: React, Material UI, Vite

Data Storage: In-memory Map (for this evaluation)

Logging: Custom reusable logging middleware

Setup and Installation
To run this project locally, follow these steps:

Clone the Repository:

Bash

git clone <your_repo_url>
cd <your_repo_name>
Backend Setup:

Bash

cd Backend\Test\Submission
npm install

# Ensure your access token is configured in the logger middleware

node server.js
Frontend Setup:

Bash

cd Frontend\Test\Submission
npm install
npm run dev
The frontend application will be available at http://localhost:5173 (or similar), and the backend will run on http://localhost:3001.
