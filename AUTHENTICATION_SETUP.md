# Authentication System Setup Guide

## Overview
This guide explains how to set up and use the new authentication system for Saral Naturals investment platform.

## Features Implemented
- ✅ User authentication (login/register/logout)
- ✅ Password reset with OTP via email
- ✅ Admin panel for user and investment management
- ✅ Investment tracking for logged-in users
- ✅ Responsive mobile-friendly UI
- ✅ Light/dark mode compatibility
- ✅ Bilingual support (English/Hindi)

## Environment Setup

1. **Copy environment variables:**
   ```bash
   cp .env.example .env.local
   ```

2. **Update `.env.local` with your credentials:**
   ```env
   # MongoDB Connection
   MONGODB_URI=mongodb+srv://saralnaturals68_db_user:<YOUR_DB_PASSWORD>@cluster0.0pk9uwm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   
   # JWT Secret (change in production)
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   
   # Email Configuration
   EMAIL_USER=product.saralnaturals@gmail.com
   EMAIL_PASSWORD=your-gmail-app-password
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Initialize admin user:**
   ```bash
   npm run init:admin
   ```
   Or make a POST request to `/api/init-admin`

## Admin Credentials
- **Email:** `products.saralnaturals@gmail.com`
- **Password:** `Test@123`

## User Roles

### Investor
- Can view their own investments
- Can access investment information
- Gets "Invest Now" button if no investments
- Can reset password via OTP

### Admin
- Full access to admin panel
- Can create/edit/delete users
- Can manage all investments
- Can modify investment returns and status
- Access to user management dashboard

## Key Features

### Header Changes
- ❌ Removed dark/light mode toggle
- ✅ Added login button (when not logged in)
- ✅ Added profile dropdown (when logged in)
- ✅ Added hamburger menu for mobile
- ✅ Mobile slider menu with all navigation options

### Investment Page
- Shows personalized investment dashboard for logged-in users
- "Invest Now" button redirects to contact page if no investments
- Displays user's investment history in a table

### Contact Page
- Updated with provided contact information
- **Email:** product.saralnaturals@gmail.com (clickable mailto link)
- **Phone:** +91 9213414228 (clickable tel link)
- **WhatsApp:** +91 9213414228 (clickable WhatsApp link)

### Authentication Flow
1. Users can register or login via `/login`
2. Password reset available via `/forgot-password`
3. OTP sent via email for password reset
4. Session management with JWT tokens
5. Automatic redirect protection

### Admin Panel (`/admin`)
- User management (create, edit, delete users)
- Investment management (modify profit shares, status)
- Statistics dashboard
- Only accessible to admin users

## Database Collections

### Users Collection
- `_id`: ObjectId
- `email`: String (unique)
- `password`: String (hashed)
- `name`: String
- `phone`: String (optional)
- `role`: 'investor' | 'admin'
- `investments`: Array of investment references
- `isEmailVerified`: Boolean
- `createdAt`: Date
- `updatedAt`: Date

### Investments Collection
- `_id`: ObjectId
- `userId`: String (reference to user)
- `amount`: Number
- `profitShare`: Number (percentage)
- `investmentDate`: Date
- `status`: 'active' | 'completed' | 'cancelled'
- `monthlyReturns`: Array of monthly return records
- `createdAt`: Date
- `updatedAt`: Date

### OTP Verifications Collection
- `_id`: ObjectId
- `email`: String
- `otp`: String (6 digits)
- `type`: 'password_reset' | 'email_verification'
- `expiresAt`: Date
- `verified`: Boolean
- `createdAt`: Date

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/auth/session` - Get current session
- `POST /api/auth/forgot-password` - Request password reset OTP
- `POST /api/auth/reset-password` - Reset password with OTP
- `POST /api/auth/verify-otp` - Verify OTP

### User Investments
- `GET /api/investments/user` - Get current user's investments

### Admin Only
- `GET /api/admin/users` - Get all users
- `POST /api/admin/users` - Create new user
- `PATCH /api/admin/users/[id]` - Update user
- `DELETE /api/admin/users/[id]` - Delete user
- `GET /api/admin/investments` - Get all investments
- `PATCH /api/admin/investments/[id]` - Update investment

### Utilities
- `POST /api/init-admin` - Initialize admin user

## Security Features
- Password hashing with bcrypt
- JWT session management
- Route protection middleware
- OTP expiration (10 minutes)
- Admin-only routes protection
- CSRF protection via same-site cookies

## Mobile Responsiveness
- Hamburger menu for mobile navigation
- Responsive tables with horizontal scroll
- Touch-friendly buttons and interactions
- Optimized layout for all screen sizes

## Deployment Notes
For Vercel deployment, set these environment variables:
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: A secure random string
- `EMAIL_USER`: Gmail address for sending emails
- `EMAIL_PASSWORD`: Gmail app password
- `NEXTAUTH_URL`: Your production URL
- `NEXTAUTH_SECRET`: A secure random string

## Next Steps
1. Set up Gmail app password for email functionality
2. Replace database password in MongoDB URI
3. Test the authentication flow
4. Customize investment management features as needed
5. Add additional security measures for production