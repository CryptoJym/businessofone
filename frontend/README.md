# Business of One Frontend

A modern, professional design system and web application for one-person businesses seeking growth.

## 🎨 Design System

The Business of One design system features:
- **Primary Color**: Utlyze Blue (#4169E1)
- **Accent Color**: Teal (#16A085)
- **Typography**: Inter font family
- **Components**: Button, Card, Input, Badge, and more

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **View the application:**
   - Home: http://localhost:3000
   - Design System Demo: http://localhost:3000/design-system

## 📁 Project Structure

```
frontend/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── design-system/     # Design system demo
├── components/            # React components
│   └── ui/               # UI components
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Input.tsx
│       ├── Badge.tsx
│       └── index.ts
├── lib/                   # Utilities and tokens
│   └── design-tokens.ts   # Design system tokens
├── styles/                # Global styles
│   └── globals.css       # Global CSS with utilities
├── docs/                  # Documentation
│   └── DESIGN_SYSTEM.md  # Design system guide
└── public/               # Static assets
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks

## 📦 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: Custom React components
- **Icons**: React Icons
- **Animations**: Framer Motion

## 🎯 Design Principles

1. **Clarity First** - Clear visual hierarchy and intuitive navigation
2. **Professional & Trustworthy** - Consistent, reliable design
3. **Efficient & Scalable** - Modular, performance-optimized
4. **Empowering Solo Entrepreneurs** - Simple, growth-oriented

## 📚 Using the Design System

### Import Components

```tsx
import { Button, Card, Input, Badge } from '@/components/ui';
```

### Use Design Tokens

```tsx
import { designTokens } from '@/lib/design-tokens';

// Access colors, typography, spacing, etc.
const primaryColor = designTokens.colors.primary[500];
```

### Example Usage

```tsx
<Card variant="elevated" hoverable>
  <CardHeader title="Welcome" subtitle="Get started with Business of One" />
  <CardBody>
    <p>Build your business with confidence.</p>
  </CardBody>
  <CardFooter>
    <Button variant="primary" size="lg">
      Get Started
    </Button>
  </CardFooter>
</Card>
```

## 🔧 Configuration

- **Tailwind Config**: Customized with design tokens
- **TypeScript**: Strict mode enabled
- **Path Aliases**: Use `@/` for imports

## 📖 Documentation

- [Design System Guide](./docs/DESIGN_SYSTEM.md)
- [Design System Summary](./DESIGN_SYSTEM_SUMMARY.md)

## 🚧 Next Steps

1. Install dependencies and start the development server
2. Explore the design system demo page
3. Review the component documentation
4. Start building your Business of One application

---

Built with ❤️ for solo entrepreneurs