# Coffee Corner — Server (Optional)

This folder contains a small Node.js + Express backend used originally to authenticate admin users with MySQL. Running this server is optional — the site works as a static frontend without it.

WARNING: The sample server and authentication provided here are minimal and intended only for local development/testing. Do not use this code as-is in production.

## What the server provides

- POST `/api/auth/login` — authenticate admin against MySQL `admins` table.
- `create_admin.js` — script to create an admin user (hashes password with bcrypt).

## Requirements

- Node.js (14+)
- MySQL server

## Quick setup (PowerShell)

1. Copy `.env.example` to `.env` and edit DB credentials:

```powershell
cd 'C:\Users\adity\OneDrive\Desktop\coffee shop management system\server'
cp .env.example .env
# then edit .env with your DB_USER, DB_PASS, DB_HOST, DB_PORT
notepad .env
```

2. Install dependencies and start server:

```powershell
npm install
npm start
```

3. Create the database and table (if not already). From your MySQL client or command line:

```sql
-- run this SQL (server/schema.sql)
CREATE DATABASE IF NOT EXISTS coffee_shop;
USE coffee_shop;
CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

4. Create an admin user:

```powershell
# from server folder
npm run create-admin -- myadmin mypassword
```

## Common errors & fixes

- ER_HOST_NOT_PRIVILEGED / Host 'fe80::...' is not allowed to connect:

  - This happens when MySQL rejects the client's host. If your app and MySQL run on the same machine, use `DB_HOST=127.0.0.1` in `.env` to force loopback.
  - Alternatively, grant the DB user permission for remote host `%`:

  ```sql
  CREATE USER 'app_user'@'%' IDENTIFIED BY 'P@ssw0rd';
  GRANT SELECT, INSERT, UPDATE, DELETE ON coffee_shop.* TO 'app_user'@'%';
  FLUSH PRIVILEGES;
  ```

- ER_ACCESS_DENIED_ERROR:

  - Wrong `DB_USER`/`DB_PASS`. Update `.env` with correct credentials and ensure the user has privileges on `coffee_shop`.

- ECONNREFUSED / ENOTFOUND:
  - MySQL not running or wrong `DB_HOST`/`DB_PORT`. Start MySQL and confirm host/port are reachable.

## Security notes

- The demo returns a base64 token string — swap this for a proper JWT or server session with secure cookies for production.
- Use TLS/HTTPS in production and secure DB credentials.

If you'd like, I can:

- Walk through starting the server here and troubleshooting any errors you encounter (paste server logs), or
- Remove the `server/` folder and keep the repo purely static.

## Copyright & Usage Warning

- Copyright: The server code and supporting files here are provided as example/demo code for local development. They are not intended for production use and are not licensed for commercial redistribution unless you add a license file.
- Images & Media: This project references images from external sources (for example, Unsplash). Make sure you have the right to use any images in your intended context. Replace or remove images that are not covered by a suitable license.
- Security: The sample server uses minimal authentication for demonstration. If you plan to deploy any backend, follow security best practices (use HTTPS, secure secrets, validate inputs, use prepared statements, use robust authentication like JWT/sessions, and limit DB user privileges).

If you want, I can add a LICENSE and an `images/ATTRIBUTIONS.md` file to make licensing and attributions explicit.
