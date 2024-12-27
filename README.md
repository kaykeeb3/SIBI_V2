# SIBI - Library Management System

**SIBI** is an administrative system developed for the complete management of a virtual library. The goal is to provide ease, security, and practicality in the daily operations of library management.

## Features

SIBI offers a wide range of functionalities to simplify and optimize library management:

- [x] **Complete Authentication**: User registration, access control, and permission management.
- [x] **Complete Library Management**: Book registration, loan control, and user management.
- [x] **Book Registration**: Register new books with detailed information such as title, author, genre, stock quantity, and description, with data validations to ensure integrity.
- [x] **Equipment Registration**: Add equipment with specific details (model, serial number, quantity) and validations to avoid duplicates.
- [x] **Equipment Booking**: A booking system that controls availability, validates quantity to prevent exceeding available stock, and allows new bookings only after the equipment is returned.
- [x] **Book Loans**: Loan management, with stock control and automatic updates when loans are made and returned.
- [x] **Loan and Booking Control**: Monitoring of all active transactions, with a history of checkouts and returns, and overdue notifications.
- [x] **User Management**: User registration and authentication, with permission levels and activity history for tracking transactions.
- [x] **Advanced Security**: Access policies to protect sensitive data.
- [x] **Metrics Analysis**: Recording performance metrics for system analysis and optimization.

## How to Run the Project

To run the project locally, follow these steps:

### Backend

1. **Clone the Repository**:
   Use the following command:

   ```bash
   git clone https://github.com/kaykeeb3/sibi-api-2024.git
   ```

2. **Navigate to the Server**:

   ```bash
   cd apps/server
   ```

3. **Copy the configuration file with connection data and environment variables**:

   ```bash
   cp .env.example .env
   ```

4. **Run PostgreSQL service via Docker** (if you don't have PostgreSQL installed on your computer):

   ```bash
   docker-compose up -d
   ```

5. **Run Prisma Migrations**:

   ```bash
   npx prisma migrate dev
   ```

6. **Start the HTTP server**:

   ```bash
   npm run dev
   ```

## Tech Stack 💜

### Server

- Node.js (REST)
- Prisma
- PostgreSQL
- TypeScript

## Contributions 🆘

We are excited to have you interested in contributing to our project. To facilitate interaction, we would like to highlight a few important points:

### Discussions

Use the discussions tab to share ideas and suggestions for the project.

### Issues

If you encounter issues or want to suggest new tasks, use the issues tab.

### Pull Requests

If you wish to contribute with code, fork the repository and submit a pull request after making your changes.

**Tip** 💡: Don't be afraid to make a Pull Request; use this opportunity to receive constructive feedback.
