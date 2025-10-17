# Handyman API (TypeScript) - Starter

## Features

- Express + TypeScript
- MongoDB (Mongoose)
- Auth (email/password) with JWT
- Role support: client, handyman, admin
- Basic CRUD for Users, Services
- Jobs/Requests scaffold (create, list, update)
- Validation and error handling

## Quick start

1. Clone the repo
2. `cp .env.example .env` and update variables
3. `npm install`
4. `npm run dev` (development)

API base defaults to `http://localhost:5000`.

## Notes

- **Do not** commit real credentials. Use environment variables.
- Configure `FRONTEND_URL` in `.env` to allow CORS from your frontend.
