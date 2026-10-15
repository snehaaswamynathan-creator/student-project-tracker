# Student Project Tracker — Live Cloud Variant

## Project Overview

This is a hands-on web application development project that demonstrates how to build a student project tracker with a frontend, backend API, and cloud database.

The application allows users to create, view, update, and delete student project records.

## Technology Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js and Express
- **Hosting:** Vercel
- **Database:** Supabase PostgreSQL
- **Version Control:** Git and GitHub

## Local Development

### Prerequisites

- Node.js 22.x
- npm
- A Supabase PostgreSQL database

### Setup Instructions

1. Install dependencies from the lockfile:

   ```powershell
   npm.cmd ci
   ```

2. Create a private `.env` file in the project root using `.env.example` as a template.

3. Add your Supabase connection string to `.env`:

   ```env
   DATABASE_URL=your_private_database_connection_string
   ```

   Replace the placeholder with your actual database connection string. Never commit your private `.env` file to GitHub.

4. Run the SQL statements in `schema.sql` against your Supabase PostgreSQL database to create the required table.

5. Start the local application:

   ```powershell
   npm.cmd start
   ```

6. Open the application in your browser:

   http://localhost:3000

## Database Configuration

The application uses Supabase PostgreSQL to store project records.

- `database.js` contains the database access functions.
- `schema.sql` defines the table required by the application.
- `DATABASE_URL` is a server-only environment variable.
- The database connection string must never be exposed in frontend JavaScript or committed to Git.

For deployment, configure `DATABASE_URL` in the hosting platform's environment variables.

## Demo Records and Authentication

The application uses shared demo records and does not currently require users to sign in.

Users accessing the same deployed database share the same project records. The application is intended for demonstration purposes, so do not store sensitive or confidential information.

## Deployment

The planned deployment uses:

- **Application hosting:** Vercel
- **Database hosting:** Supabase PostgreSQL

**Hosted URL:** To be added after successful deployment.

Deployment is not considered complete until the hosted application and its database connection have been tested.

## Data Migration

Existing local SQLite rows are not automatically migrated to Supabase PostgreSQL.

Any SQLite records that need to be retained must be exported and migrated separately.

## Verification Status

Record only checks that have actually been completed.

Do not claim successful deployment, database persistence, or API testing unless those checks have been performed and verified.
