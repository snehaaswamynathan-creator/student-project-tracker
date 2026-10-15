# Student Project Tracker — Live Cloud Variant

## Project Overview

This project is a hands-on web application development project. It demonstrates a student project tracker with a frontend, backend API, and cloud PostgreSQL database.

## Technology Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js and Express
- **Hosting:** Vercel
- **Database:** Supabase PostgreSQL

## Local Development

### Prerequisites

- Node.js compatible with the version specified in `package.json`
- npm
- A Supabase PostgreSQL database

### Setup

1. Install the project dependencies:

   ```bash
   npm.cmd ci
   ```

2. Create a private `.env` file in the project root using `.env.example` as a template.

3. Add the database connection string to `.env`:

   ```env
   DATABASE_URL=your_private_database_connection_string
   ```

   Replace the placeholder with your actual connection string. Never commit `.env` or expose database credentials in frontend code.

4. Set up the database table by running the SQL in `schema.sql` against your Supabase PostgreSQL database.

5. Start the local server:

   ```bash
   npm.cmd start
   ```

6. Open `http://localhost:3000` in your browser.

## Database Configuration

`DATABASE_URL` is a server-only environment variable. Configure it locally in `.env` and configure it as an environment variable in the hosting platform for deployment. Do not expose it to browser JavaScript or commit its value to Git.

The `schema.sql` file defines the database table required by the application.

## Demo Data and Authentication

This application uses shared demo records and does not currently require users to sign in. Anyone who can access the application may be able to view or modify the shared records, depending on the deployed API configuration.

Do not store private or sensitive information in the demo application.

## Deployment

The intended hosting platform is Vercel, with Supabase PostgreSQL as the database.

**Hosted URL:** To be added after deployment.

Before deployment, configure the required environment variables and verify that the hosting setup supports the application's server/API entry point.

## Data Migration

Existing local SQLite rows are not migrated automatically. Any records stored in a local SQLite database must be migrated separately if they are needed in Supabase PostgreSQL.

## Verification Status

Record only checks that have actually been completed. Do not mark deployment, database persistence, or other tests as successful until they have been verified.