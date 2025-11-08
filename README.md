# Mini Message Board

A simple message board application built with Express.js and PostgreSQL. Users can view messages, add new messages, and view individual message details. This project uses persistent data storage with PostgreSQL instead of ephemeral in-memory arrays.

## Features

- View all messages on the home page
- Add new messages with author name and message text
- View individual message details
- Persistent data storage using PostgreSQL
- Server-side input validation
- Messages ordered by most recent first

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **View Engine**: EJS (Embedded JavaScript)
- **Environment Variables**: dotenv

## Prerequisites

- Node.js (>= 18.x)
- PostgreSQL database (local or hosted)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/wekesaoliver/mini-message-board.git
cd mini-message-board
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
DB_HOST=localhost
DB_USER=your_username
DB_NAME=your_database
DB_PASSWORD=your_password
DB_PORT=5432
```

**Note**: If your password contains special characters (like `#`, `@`, etc.), make sure to quote it:
```env
DB_PASSWORD="your_password_with_special_chars"
```

4. Set up the database:
   - Create a PostgreSQL database
   - Run the populate script to create the table and seed initial data:

```bash
# For local database
node db/populatedb.js

# For production/hosted database (using connection string)
node db/populatedb.js "postgresql://user:password@host:port/database"
```

## Usage

Start the server:
```bash
npm start
```

Or:
```bash
node app.js
```

The server will run on `http://localhost:3000` (or the port specified in your `.env` file).

## Routes

- `GET /` - Display all messages
- `GET /new` - Display form to create a new message
- `POST /new` - Submit a new message
- `GET /message/:id` - View individual message details

## Project Structure

```
mini-message-board/
├── app.js                 # Main application entry point
├── db/
│   ├── pool.js           # PostgreSQL connection pool
│   ├── queries.js        # Database query functions
│   └── populatedb.js     # Database seeding script
├── routes/
│   └── index.js          # Application routes
├── views/
│   ├── index.ejs         # Home page (message list)
│   ├── form.ejs          # New message form
│   └── message-detail.ejs # Individual message view
├── .env                  # Environment variables (not in git)
└── package.json          # Project dependencies
```

## Database Schema

The `messages` table has the following structure:

```sql
CREATE TABLE messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "user" VARCHAR(255) NOT NULL,
  text TEXT NOT NULL,
  added TIMESTAMP DEFAULT NOW()
);
```

**Note**: The `user` column is quoted because `user` is a reserved keyword in PostgreSQL.

## Validation

The application includes server-side validation:
- Author name is required and must not exceed 255 characters
- Message text is required and must not exceed 1000 characters
- Input is trimmed to remove leading/trailing whitespace

## License

ISC

## Author

wekesaoliver
