# Business of One - Frontend

## Stream 15: Animation & Interactions

This is the frontend implementation for Business of One, featuring modern animations and interactions designed to create an engaging user experience for solo entrepreneurs.

## 🎨 Features

### Animations
- **Smooth Page Load Animations**: Hero section with animated text reveals and floating background elements
- **Scroll-Triggered Animations**: Content reveals as users scroll through the page
- **Micro-Interactions**: Hover effects, button animations, and card interactions
- **Loading States**: Animated spinners and skeleton screens
- **Text Effects**: Typewriter, fade-up, and word reveal animations

### Components
- `AnimatedButton`: Interactive buttons with hover and click animations
- `AnimatedCard`: Cards with lift and glow effects
- `AnimatedText`: Text with multiple animation variants
- `ScrollIndicator`: Animated scroll hint
- `LoadingSpinner`: Customizable loading animation

## 🚀 Quick Start

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🛠️ Tech Stack

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling with custom animations
- **Framer Motion**: Production-ready animation library
- **Lucide React**: Beautiful animated icons
- **React Intersection Observer**: Scroll-triggered animations

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── layout.tsx    # Root layout
│   │   └── page.tsx      # Home page
│   ├── components/       # React components
│   │   └── ui/          # UI components
│   ├── lib/             # Utilities and helpers
│   │   ├── animations.ts # Animation variants
│   │   └── utils.ts     # Utility functions
│   ├── hooks/           # Custom React hooks
│   └── styles/          # Global styles
└── public/              # Static assets
```

## 🎯 Animation Guidelines

### Performance
- All animations use CSS transforms for GPU acceleration
- Animations are lazy-loaded with Intersection Observer
- Respects user's `prefers-reduced-motion` preference

### Duration
- Micro-interactions: 0.2s - 0.3s
- Content reveals: 0.5s
- Page transitions: 0.4s

### Easing
- Default: `ease-out`
- Bouncy effects: `spring` physics
- Smooth transitions: `cubic-bezier`

## 🔧 Customization

### Colors
Edit the color scheme in `tailwind.config.ts`:
```js
colors: {
  primary: '#4169E1',    // Utlyze Blue
  accent: '#16A085',     // Teal accent
}
```

### Animations
Add new animations in `tailwind.config.ts` or create Framer Motion variants in `lib/animations.ts`.

## 📱 Responsive Design

All animations and interactions are optimized for:
- Desktop (1920px+)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🧪 Testing

Run tests:
```bash
npm test
```

## 📦 Build

Create production build:
```bash
npm run build
```

## 🚀 Deployment

The app is optimized for deployment on:
- Vercel (recommended)
- Netlify
- AWS Amplify
- Any Node.js hosting

## 📚 Documentation

For detailed animation documentation, see [ANIMATIONS_GUIDE.md](./ANIMATIONS_GUIDE.md)

---

Built with ❤️ for solo entrepreneurs by Utlyze