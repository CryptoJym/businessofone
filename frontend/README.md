# Business of One - Frontend

This is the Next.js frontend for the Business of One application.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Pages

- `/` - Home page with hero section and primary CTA
- `/about` - About page with company story, mission, and values
- `/services` - Services page (to be implemented)
- `/contact` - Contact page (to be implemented)
- `/consultation` - Consultation booking page (to be implemented)

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **React** - UI library

## Design System

- Primary Color: `#4169E1` (Utlyze Blue)
- Accent Color: `#16A085`
- Font: System font stack for optimal performance

## Project Structure

```
frontend/
├── app/              # Next.js App Router pages and layouts
│   ├── about/        # About page
│   ├── components/   # Shared components
│   ├── globals.css   # Global styles
│   ├── layout.tsx    # Root layout
│   └── page.tsx      # Home page
├── public/           # Static assets
└── __tests__/        # Test files
```