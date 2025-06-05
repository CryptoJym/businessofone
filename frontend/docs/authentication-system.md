# Authentication System Documentation

## Overview
The Business of One authentication system is built using NextAuth.js (Auth.js) with support for:
- Email/password authentication
- Social login (Google, LinkedIn)
- Session management
- Protected routes
- Role-based access control

## Key Components

### 1. Authentication Configuration
- **Location**: `src/lib/auth.ts`
- **Features**:
  - Credentials provider for email/password
  - OAuth providers (Google, LinkedIn)
  - JWT session strategy
  - Custom callbacks for user data

### 2. Database Schema
- **Location**: `prisma/schema.prisma`
- **Models**:
  - `User`: Core user data with roles
  - `Account`: OAuth account connections
  - `Session`: Active user sessions
  - `VerificationToken`: Email verification
  - `Consultation`: Business consultation bookings

### 3. Authentication Pages
- **Sign In**: `/auth/signin`
- **Sign Up**: `/auth/signup`
- **Dashboard**: `/dashboard` (protected)

### 4. API Routes
- **NextAuth Handler**: `/api/auth/[...nextauth]`
- **Registration**: `/api/auth/register`

## Setup Instructions

### 1. Environment Variables
Create a `.env` file with:
```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# OAuth (optional)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
LINKEDIN_CLIENT_ID=""
LINKEDIN_CLIENT_SECRET=""
```

### 2. Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Create database and tables
npx prisma db push
```

### 3. OAuth Setup (Optional)
1. **Google OAuth**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`

2. **LinkedIn OAuth**:
   - Go to [LinkedIn Developers](https://www.linkedin.com/developers/)
   - Create a new app
   - Add redirect URL: `http://localhost:3000/api/auth/callback/linkedin`

## Usage Examples

### 1. Protecting Pages
```typescript
// In a client component
import { useAuth } from "@/hooks/useAuth";
import { redirect } from "next/navigation";

export default function ProtectedPage() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (!user) redirect("/auth/signin");

  return <div>Protected content</div>;
}
```

### 2. Using Authentication in API Routes
```typescript
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Handle authenticated request
}
```

### 3. Role-Based Access
```typescript
// Middleware automatically handles role checks
// Admin routes require ADMIN role
if (session?.user?.role !== "ADMIN") {
  return new Response("Forbidden", { status: 403 });
}
```

## Security Features

1. **Password Security**:
   - Passwords hashed with bcrypt (12 rounds)
   - Minimum 6 character requirement
   - Secure session tokens

2. **Session Management**:
   - JWT-based sessions
   - Automatic session refresh
   - Secure cookie settings

3. **Protected Routes**:
   - Middleware-based route protection
   - Role-based access control
   - Automatic redirects for unauthenticated users

## API Endpoints

### POST /api/auth/register
Register a new user account.

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**Response**:
```json
{
  "success": true,
  "message": "User created successfully",
  "user": {
    "id": "clx...",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

## Troubleshooting

1. **"NEXTAUTH_SECRET is not set"**:
   - Ensure `.env` file exists with `NEXTAUTH_SECRET`
   - Generate a secret: `openssl rand -base64 32`

2. **OAuth redirect issues**:
   - Verify redirect URIs match exactly in provider settings
   - Check `NEXTAUTH_URL` matches your development URL

3. **Database connection errors**:
   - Run `npx prisma generate` after schema changes
   - Ensure database file has proper permissions

## Future Enhancements

1. **Email Verification**:
   - Send verification emails on registration
   - Require email confirmation for sensitive actions

2. **Password Reset**:
   - Implement forgot password flow
   - Send reset links via email

3. **Two-Factor Authentication**:
   - Add TOTP support
   - SMS verification option

4. **Audit Logging**:
   - Track login attempts
   - Monitor security events