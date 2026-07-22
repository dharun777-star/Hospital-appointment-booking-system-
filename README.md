# BlueCare Hospital Appointment System

A complete full-stack hospital appointment platform built with React, TypeScript, Vite, Vercel Functions, and Supabase PostgreSQL.

## Features
- Professional responsive hospital website, departments, facilities, FAQ, contact, and doctor search
- Patient registration, email/password and Google authentication
- Protected patient dashboard and appointment management
- Department-based doctor selection, availability, future-date and duplicate-slot validation
- Printable appointment confirmation and cancellation workflow
- Admin metrics, appointment filters/status workflow, and doctor CRUD
- Persistent database and secure server-side API validation

## Run locally
1. Install Node.js 20+.
2. Run `npm install`.
3. Add the Supabase Vite and server variables to `.env`.
4. Run `npm run dev`.
5. Run `npm run build` for a production build.

## Main structure
- `src/App.tsx` — pages, forms, dashboards, and routing
- `src/index.css` — responsive hospital design system
- `src/contexts` — authentication state
- `src/lib` — Supabase and Google authentication helpers
- `api` — Vercel serverless APIs for profiles, doctors, appointments, contacts, and administration
- `public` — static brand assets

## Demo access
- Patient: `demo@bluecare.health` / `Patient123!`
- Administrator: `admin` / `admin123`

## Future enhancements
Insurance verification, video consultations, SMS reminders, prescriptions, billing, clinical document uploads, and multilingual support.
