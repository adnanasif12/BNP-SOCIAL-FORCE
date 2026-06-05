# Backend File Structure

This document outlines the new backend files created for the project.

## 📁 Complete Backend Directory Structure

```
Social_Force/
│
├── api/                                    # Backend serverless functions
│   ├── index.js                           # API health check endpoint
│   ├── members.js                         # Member CRUD operations
│   ├── donations.js                       # Donation CRUD operations
│   ├── dashboard.js                       # Statistics and analytics
│   │
│   ├── auth/                              # Authentication endpoints
│   │   ├── login.js                       # Admin login endpoint
│   │   └── register.js                    # Admin registration endpoint
│   │
│   ├── middleware/                        # Express middleware
│   │   └── auth.js                        # JWT authentication middleware
│   │
│   ├── models/                            # MongoDB data schemas
│   │   ├── Admin.js                       # Admin user model
│   │   ├── Member.js                      # Member data model
│   │   └── Donation.js                    # Donation data model
│   │
│   └── config/                            # Configuration files
│       └── db.js                          # MongoDB connection
│
├── scripts/                               # Utility scripts
│   ├── setupAdmin.js                      # Create initial admin account
│   ├── verify-setup.js                    # Verify setup completeness
│   └── quick-start.js                     # Interactive setup wizard
│
├── src/
│   ├── components/                        # React components
│   ├── utils/
│   │   └── api.js                        # Frontend API helpers (UPDATED)
│   ├── styles/
│   ├── App.tsx
│   └── main.tsx
│
├── public/                                # Static assets
├── node_modules/                          # Dependencies (after npm install)
│
├── .env.example                           # Environment template
├── .env.local                             # Local environment (CREATE THIS)
├── .gitignore                             # Git ignore rules (UPDATED)
│
├── vercel.json                            # Vercel config (UPDATED)
├── vite.config.ts                         # Vite config
├── tsconfig.json
├── package.json                           # Dependencies (UPDATED)
├── package-lock.json
│
├── BACKEND_READY.md                       # Quick overview
├── BACKEND_SETUP.md                       # Detailed setup guide
├── API_DOCUMENTATION.md                   # API reference
├── DEPLOYMENT_GUIDE.md                    # Vercel deployment
├── README.md                              # Project README
│
└── index.html                             # HTML entry point
```

## 📊 File Descriptions

### Core API Files

#### `api/index.js`
- Health check endpoint
- Lists all available endpoints
- Used to verify API is running

#### `api/auth/login.js`
- Admin login endpoint
- Returns JWT token
- Updates last login timestamp

#### `api/auth/register.js`
- Create new admin user
- Validates unique username/email
- Returns token on success

#### `api/members.js`
- GET: List members with pagination
- POST: Create new member
- PUT: Update member (by id)
- DELETE: Delete member (by id)
- Supports search and filtering

#### `api/donations.js`
- GET: List donations with aggregation
- POST: Create donation record
- PUT: Update donation
- DELETE: Delete donation
- Calculates statistics (total, average, etc.)

#### `api/dashboard.js`
- GET: Dashboard statistics
- Aggregates member data
- Aggregates donation data
- Returns recent data

### Database Models

#### `api/models/Admin.js`
**Fields:**
- username (unique, required)
- email (unique, required)
- password (hashed, required)
- role (সুপার_এডমিন, এডমিন, এডিটর)
- isActive (boolean)
- lastLogin (date)
- permissions (array)

**Methods:**
- comparePassword() - Verify password
- Password hashing on save

#### `api/models/Member.js`
**Fields:**
- name (required, searchable)
- email (required, unique, searchable)
- phone (required, Bangladesh format)
- district (required)
- upazila (required)
- membershipType (সাধারণ, প্রিমিয়াম, জীবনকাল)
- joinedDate (auto-set)
- status (সক্রিয়, নিষ্ক্রিয়)
- notes (optional)

**Indexes:**
- Text search on name, email, phone

#### `api/models/Donation.js`
**Fields:**
- donorName (required, searchable)
- email (optional, searchable)
- phone (optional)
- amount (required, number)
- paymentMethod (bKash, Nagad, Rocket, Bank Transfer, নগদ)
- transactionId (required, unique)
- purpose (শিক্ষা, স্বাস্থ্য, দুর্যোগ, সাধারণ, অন্যান্য)
- date (auto-set)
- status (নিশ্চিত, অপেক্ষারত, বাতিল)
- remarks (optional)
- receipt (optional, file path)

**Indexes:**
- Text search on donorName, email, transactionId

### Configuration Files

#### `api/config/db.js`
- MongoDB connection management
- Implements connection caching
- Handles connection errors
- Uses global variable for serverless

#### `api/middleware/auth.js`
- JWT token verification
- Protects endpoints
- Returns 401 on invalid token
- Extracts admin ID from token

### Utility Scripts

#### `scripts/setupAdmin.js`
- Creates initial admin account
- Uses environment variables
- Hashes password before saving
- Logs credentials for first login

#### `scripts/verify-setup.js`
- Checks all required files exist
- Validates environment setup
- Checks package.json dependencies
- Provides setup checklist

#### `scripts/quick-start.js`
- Interactive setup wizard
- Walks through each step
- Provides commands to run
- Shows expected output

### Frontend Integration

#### `src/utils/api.js` (UPDATED)
- API request wrapper with token handling
- Login/logout functions
- Member API functions
- Donation API functions
- Dashboard API functions
- useApi custom hook
- Error handling

### Configuration Files

#### `.env.example`
- Template for environment variables
- Documents all required variables
- Safe to commit to git

#### `.env.local`
- Local development environment
- Should NOT be committed
- Contains real credentials

#### `vercel.json` (UPDATED)
- Vercel deployment configuration
- Defines serverless function runtime
- Sets environment variables
- Configures rewrites for SPA

#### `package.json` (UPDATED)
**New Dependencies:**
- mongoose@8.0.0
- jsonwebtoken@9.1.2
- bcryptjs@2.4.3

**New Scripts:**
- setup-admin: Initialize admin account
- (dev, build, preview remain same)

### Documentation Files

#### `BACKEND_READY.md`
- Overview of what was set up
- Quick start guide
- Project structure summary
- What's next steps

#### `BACKEND_SETUP.md`
- Detailed setup instructions
- Local development guide
- Testing procedures
- Troubleshooting tips

#### `API_DOCUMENTATION.md`
- Complete API reference
- Request/response examples
- Authentication details
- Testing with cURL and Postman

#### `DEPLOYMENT_GUIDE.md`
- Vercel deployment steps
- Domain configuration
- Custom domain setup
- DNS configuration for various providers

## 🔗 File Dependencies

```
api/auth/login.js
  └─ api/config/db.js
  └─ api/models/Admin.js (password verification)
  └─ jsonwebtoken (token generation)

api/members.js
  └─ api/config/db.js
  └─ api/models/Member.js

api/donations.js
  └─ api/config/db.js
  └─ api/models/Donation.js

src/utils/api.js
  └─ localStorage (token storage)
  └─ fetch API (HTTP requests)

scripts/setupAdmin.js
  └─ api/config/db.js
  └─ api/models/Admin.js
  └─ bcryptjs (password hashing)
```

## 📦 Dependencies Added

```json
{
  "mongoose": "^8.0.0",        // MongoDB ODM
  "jsonwebtoken": "^9.1.2",    // JWT tokens
  "bcryptjs": "^2.4.3"         // Password hashing
}
```

## ✅ Checklist for Production

- [ ] All files created and in correct locations
- [ ] Dependencies installed: `npm install`
- [ ] MongoDB connection string configured
- [ ] JWT secret generated and configured
- [ ] Initial admin created: `npm run setup-admin`
- [ ] API tested locally: `npm run dev`
- [ ] Environment variables set in Vercel
- [ ] Code pushed to GitHub
- [ ] Project deployed on Vercel
- [ ] Domain DNS configured
- [ ] SSL certificate verified
- [ ] Admin password changed
- [ ] Database backups enabled

---

*Last Updated: June 1, 2026*
