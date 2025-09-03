# Deployment Instructions for Saral Naturals Authentication System

## 🚀 Quick Start

### 1. Environment Setup
1. Copy `.env.example` to `.env.local`
2. Update the MongoDB URI with your actual password:
   ```
   MONGODB_URI=mongodb+srv://saralnaturals68_db_user:YOUR_ACTUAL_PASSWORD@cluster0.0pk9uwm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   ```
3. Set up Gmail App Password for email functionality
4. Update other environment variables as needed

### 2. Initialize Admin User
Run one of these commands to create the admin user:
```bash
npm run init:admin
# OR
curl -X POST http://localhost:3000/api/init-admin
```

### 3. Start Development Server
```bash
npm run dev
```

## 🔐 Admin Access
- **URL:** `/admin`
- **Email:** `products.saralnaturals@gmail.com`
- **Password:** `Test@123`

## 📱 Features Implemented

### ✅ Authentication System
- User registration and login
- Password reset with OTP via email
- JWT-based session management
- Protected routes with middleware

### ✅ User Interface Updates
- **Header Changes:**
  - ❌ Removed dark/light mode toggle
  - ✅ Added login button (when not authenticated)
  - ✅ Added profile dropdown (when authenticated)
  - ✅ Mobile hamburger menu with slide-out navigation

### ✅ Investment Dashboard
- Personalized investment tracking for logged-in users
- "Invest Now" button for users without investments
- Investment history table with status tracking

### ✅ Contact Page Updates
- **Email:** [product.saralnaturals@gmail.com](mailto:product.saralnaturals@gmail.com)
- **Phone:** [+91 9213414228](tel:+919213414228)
- **WhatsApp:** [+91 9213414228](https://wa.me/919213414228)

### ✅ Admin Panel (`/admin`)
- User management (create, edit, delete)
- Investment management (modify profit shares, status)
- Statistics dashboard
- Admin-only access control

### ✅ Responsive Design
- Mobile-first approach
- Touch-friendly interfaces
- Horizontal scroll for tables on mobile
- Consistent dark/light mode support

### ✅ Bilingual Support
- All new features support English/Hindi
- Translation keys added for authentication flows
- Consistent language switching

## 🛠 Technical Implementation

### Database Collections
1. **users** - User accounts and profiles
2. **investments** - Investment records and tracking
3. **otp_verifications** - OTP tokens for password reset

### API Endpoints
- **Auth:** `/api/auth/*` - Login, register, logout, password reset
- **User Investments:** `/api/investments/user` - Get user's investments
- **Admin:** `/api/admin/*` - Admin-only user and investment management

### Security Features
- Password hashing with bcrypt
- JWT session tokens
- Route protection middleware
- OTP expiration (10 minutes)
- Admin-only route protection

## 🚨 Important Notes

### For Vercel Deployment
Set these environment variables in Vercel:
```
MONGODB_URI=mongodb+srv://saralnaturals68_db_user:YOUR_PASSWORD@cluster0.0pk9uwm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your-secure-random-string
EMAIL_USER=product.saralnaturals@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your-nextauth-secret
```

### Gmail Setup for OTP
1. Enable 2-factor authentication on Gmail
2. Generate an App Password
3. Use this App Password as `EMAIL_PASSWORD`

### First-Time Setup
1. Deploy the application
2. Call `/api/init-admin` endpoint to create admin user
3. Login as admin to manage users and investments

## 🎯 User Flows

### Investor Flow
1. Visit `/login` to create account or sign in
2. View `/investments` to see personal dashboard
3. Click "Invest Now" to contact for new investments
4. Use "Forgot Password" if needed

### Admin Flow
1. Login with admin credentials
2. Access `/admin` panel
3. Manage users and investments
4. Monitor investment statistics

## 🔧 Customization

### Adding New Investment Types
1. Update investment creation in admin panel
2. Modify profit calculation logic in database functions
3. Add new status types if needed

### Email Templates
- Customize OTP email templates in `/src/lib/email.ts`
- Add company branding and styling

### UI Theming
- All components support light/dark mode
- Amber/green color scheme maintained
- Responsive breakpoints: sm (640px), md (768px), lg (1024px)

## 🐛 Troubleshooting

### Build Issues
- Ensure all environment variables are set
- Check MongoDB connection string format
- Verify Gmail app password is correct

### Authentication Issues
- Clear browser cookies/localStorage
- Check JWT_SECRET is consistent
- Verify MongoDB collections are created

### Email Issues
- Confirm Gmail 2FA is enabled
- Use App Password, not regular password
- Check EMAIL_USER and EMAIL_PASSWORD variables

## 📞 Support
For technical issues, contact: product.saralnaturals@gmail.com