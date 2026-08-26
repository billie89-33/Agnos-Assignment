# 🏥 Agnos Patient Registration & Staff Monitor System

A real-time patient registration form and staff monitoring dashboard built with **Next.js (App Router)**, **TailwindCSS**, and **Supabase Realtime**.

## 🚀 Features
- **Responsive Patient Form:** A clean, modern UI for patients to fill in their details. Supports both desktop (2 columns) and mobile (1 column).
- **Zod Validation:** Comprehensive input validation (emails, required fields) using `react-hook-form` and `zod`.
- **Real-Time Staff Dashboard:** Staff can monitor what the patient is typing in real-time.
- **Presence Indicators:** Live status badge showing if the patient is "Inactive ⚪", "Actively filling in 🟡", or "Submitted 🟢".

---

## 💻 How to Run the Project

1. Install dependencies:
```bash
npm install
```
2. Setup environment variables in a `.env.local` file:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```
3. Start the development server:
```bash
npm run dev
```
4. Build for production:
```bash
npm run build
npm start
```

---

## 🏗️ Development Planning Documentation

### 1. Project Structure
```text
Agnos/
├── src/
│   ├── app/
│   │   ├── admin/       # Route for Staff Dashboard (/admin)
│   │   │   └── page.tsx
│   │   ├── globals.css  # Global Tailwind styles
│   │   ├── layout.tsx   # Root layout
│   │   └── page.tsx     # Route for Patient Form (/)
│   ├── components/      # Reusable React components
│   │   ├── PatientForm.tsx
│   │   └── StaffDashboard.tsx
│   └── lib/             # Utilities and configurations
│       └── supabase.ts  # Supabase client initialization
└── public/              # Static assets (SVGs, icons)
```

### 2. UI/UX Design Decisions
- **Form Layout (Desktop vs Mobile):** 
  - *Desktop:* Utilized a 2-column grid (`md:grid-cols-2`) to optimize vertical screen real estate, reducing the need for excessive scrolling and providing a better overview of the form.
  - *Mobile:* Switched to a 1-column stack layout with large input padding to ensure touch-friendly targets for mobile users.
- **Modern Aesthetic:** Implemented a glassmorphism effect (backdrop-blur), soft shadows, and a gradient background (Indigo/Slate) to make the interface feel welcoming, clean, and professional—steering away from sterile, flat hospital designs.
- **Real-time Indicator (Staff View):** Placed a highly visible Status Badge (Inactive / Actively filling / Submitted) with pulsing animations at the top right of the dashboard. This allows staff to instantly perceive patient activity without scanning the entire screen.
- **Visual Hierarchy:** Grouped information into logical sections (Personal Details, Contact Info, Emergency Contact) using distinct icons and soft background colors, improving the skimmability of the dashboard.

### 3. Component Architecture
- `PatientForm.tsx`: A "Smart" Client Component responsible for rendering the form, handling user input, performing Zod validation, and broadcasting changes via Supabase. It uses `useForm` (React Hook Form) to manage state efficiently without unnecessary re-renders.
- `StaffDashboard.tsx`: A Client Component acting as a "Listener". It subscribes to the Supabase WebSocket channel (`patient-room`), listens for `broadcast` events to update its internal state (`patientData`), and tracks `presence` to update the user status badge.
- `app/page.tsx` & `app/admin/page.tsx`: Server Components acting as simple wrappers/layouts that instantiate the Client Components and provide easy navigation links between them for testing purposes.

### 4. Real-Time Synchronization Flow
The system utilizes **Supabase WebSockets** as a Message Broker, ensuring low-latency communication without requiring database writes (No tables were created).

**Step-by-Step Flow:**
1. **Initial Connection:** When the Patient (`/`) and Staff (`/admin`) open the app, both subscribe to the `patient-room` channel. The patient's initial presence is set to `inactive`.
2. **Actively Filling In:** 
   - When the patient types, `onChange` triggers an update.
   - The patient client broadcasts a `form-update` event containing the form payload.
   - The patient client updates its presence state to `actively_filling`.
   - The Staff View instantly receives the payload to display the text, and updates the status badge to 🟡.
3. **Submission:** When the patient clicks submit, validation passes, and the presence state is updated to `submitted` 🟢, notifying staff that the form is complete.
4. **Disconnection:** If the patient closes the tab, Supabase automatically drops their presence, and the Staff View reverts the badge to ⚪ `Inactive`.

---
*Built as a technical assignment for Agnos.*
