# RCSSA Airport Pickup

### Project Overview: 

- Matches incoming Rice freshmen with volunteer drivers

- Pipeline: students register -> arrival -> volunteers browse calendar and claim slots -> email confirmation sent on match.

### Tech Stack:

- Frontend: React
- Backend: Supabase; email via Google Apps Script
- Deploy: Github Pages (frontend) + Supabase cloud (backend)

### Key gotchas:

- Volunteer must be approved by admin (`confirmed = true` in Supabase dashboard) before they can log in
