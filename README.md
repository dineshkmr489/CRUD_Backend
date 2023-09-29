
# CRUD Backend

This is a CRUD (Create, Read, Update, Delete) backend project developed using Node.js and MySQL.

## Installation

Follow these steps to set up the project on your local machine:

1. **Install Node Modules:**

   Open your terminal and run the following command to install the required Node modules:

   ```bash
   npm install
   ```

2. **Create Your Own Database in MySQL:**

   Create a database in MySQL that you will use for this project.

3. **Create `.env` File:**

   In the project's root directory, create a `.env` file. You can copy the contents from `env.example` and replace the placeholder values with your database configuration.

4. **Table Migration:**

   Run the following command to perform table migrations using Knex:

   ```bash
   npx knex migrate:latest
   ```

5. **Running the Application:**

   Start the application with the following command:

   ```bash
   npm run dev
   ```

## Usage

- This CRUD backend is designed to be used as a foundation for building RESTful APIs.



