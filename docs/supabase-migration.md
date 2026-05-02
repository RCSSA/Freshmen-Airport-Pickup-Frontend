# Supabase Migration

This project used Google Apps Script plus Google Sheets as the backend. The Supabase version keeps the frontend API shape the same by exposing one Edge Function:

```text
https://<project-ref>.supabase.co/functions/v1/airport-pickup?action=<action>
```

## Database Model

- `students`: replaces the `新生` sheet.
- `volunteers`: replaces the `志愿者` sheet.
- `matches`: replaces the `新生&志愿者` sheet. Every student has one match row; `volunteer_id` is `null` until matched.
- `app_logs`: replaces the `日志` sheet.

The migration enables RLS on all tables. The browser should not read or write tables directly; the Edge Function uses the service role key server-side.

## Deployment

1. Install and log in to the Supabase CLI.

```sh
supabase login
```

2. Link this repo to your Supabase project.

```sh
supabase link --project-ref <project-ref>
```

3. Push the database schema.

```sh
supabase db push
```

4. Optional: configure Google Apps Script email relay.

```sh
supabase secrets set GOOGLE_EMAIL_WEBHOOK_URL=<google-apps-script-web-app-url>
```

The Google Apps Script deployment must include the `send_email` action from `backend_appscript/backend.gs`. Without this secret, the Edge Function still works but logs that email was skipped.

5. Deploy the Edge Function.

```sh
supabase functions deploy airport-pickup
```

6. Point the React app to Supabase by creating a local `.env.local`.

```sh
REACT_APP_API_URL=https://<project-ref>.supabase.co/functions/v1/airport-pickup
```

7. Rebuild and deploy the frontend.

```sh
npm run build
npm run deploy
```

## Data Migration

Export each Google Sheet tab as CSV and import into Supabase in this order:

1. `新生` -> `students`
2. `志愿者` -> `volunteers`
3. `新生&志愿者` -> `matches`

For `matches`, map student emails to `students.id` and volunteer emails to `volunteers.id`. Leave `volunteer_id` blank for unmatched students.

Volunteers are inserted with `confirmed = false`. After reviewing a volunteer in the Supabase dashboard, set `confirmed = true` so they can log in and match students.

## Security Cleanup

This repo currently contains Google service account credentials in tracked files. Before production:

- Rotate the Google service account key.
- Rotate any Supabase database password that was written to local notes.
- Remove committed secrets from git history.
