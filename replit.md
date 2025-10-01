# Portfolio Website - Replit Setup

## Overview
Next.js 14 portfolio website for William Salas Bolaño, featuring a modern design with profile card, experience section, project showcase, GitHub contributions chart, and contact form.

## Architecture
- **Framework**: Next.js 14.2.0 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with Radix UI components
- **Email Service**: EmailJS for contact form
- **Image Storage**: Supabase for remote images
- **Deployment**: Configured for Replit Autoscale

## Configuration

### Development
- Port: 5000 (bound to 0.0.0.0)
- Workflow: "Next.js Dev Server" runs `npm run dev -- -p 5000 -H 0.0.0.0`

### Environment Variables
The following secrets are configured in Replit Secrets:
- EMAILJS_SERVICE_ID
- EMAILJS_TEMPLATE_ID
- EMAILJS_PUBLIC_KEY
- EMAILJS_PRIVATE_KEY

### Deployment
- Type: Autoscale (stateless website)
- Build: `npm run build`
- Run: `npm start`

## Project Structure
```
src/
├── app/
│   ├── api/email/         # EmailJS API route for contact form
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/
│   ├── ui/                # Reusable UI components (Radix UI)
│   ├── ContactForm.tsx
│   ├── Experience.tsx
│   ├── NavBar.tsx
│   ├── ProfileCard.tsx
│   └── ProjectShowcase.tsx
└── lib/
    ├── types/
    └── utils.ts

public/
├── docs/                  # Resume PDF
└── images/               # Static images
```

## Recent Changes (October 1, 2025)
- Imported from GitHub
- Configured for Replit environment
- Set up workflow on port 5000
- Configured deployment for Autoscale
- Environment variables migrated to Replit Secrets

## Notes
- Next.js dev server runs on 0.0.0.0 to work with Replit's proxy
- EmailJS credentials are securely stored in Replit Secrets
- Remote images are fetched from Supabase and external sources
- GitHub contributions chart loads from ghchart.rshah.org
