# Express tutorial

Using and pacticing express.

## Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.
- [MongoDB](https://www.mongodb.com/try/download/community) installed and running locally or on a remote server.
- [Git](https://git-scm.com/downloads) for version control.

## Getting Started

1. **Clone the repository:**

git clone https://github.com/your-username/your-repo.git

2. **Navigate to the project directory:**

cd express (repository)

3. **Install dependencies:**

npm install

4. **Set up environment variables:**

MONGODB_URI=mongodb://localhost:27017/expressjs_tutorial


5. **Start the development server:**

npm start

The server will start running at http://localhost:3001.

6. **API Endpoints**

GET /api/v1/groceries: Retrieve a list of grocery items.
GET /api/v1/groceries/:item: Retrieve a specific grocery item by its name.
POST /api/v1/groceries: Add a new grocery item.
PUT /api/v1/groceries/:item: Mark a grocery item as completed.
GET /api/v1/groceries/assignee/:assignee: Retrieve grocery items assigned to a specific person.

