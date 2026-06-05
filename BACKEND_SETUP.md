# Backend Setup Guide - Step by Step

## ✅ What Has Been Set Up

### Backend Structure Created ✨

```
api/
├── config/
│   └── db.js                 # MongoDB connection configuration
├── models/
│   ├── Member.js            # Member data model
│   ├── Donation.js          # Donation data model
│   └── Admin.js             # Admin user model
├── middleware/
│   └── auth.js              # JWT authentication middleware
├── auth/
│   ├── login.js             # Admin login endpoint
│   └── register.js          # Admin registration endpoint
├── members.js               # Member management API
├── donations.js             # Donation management API
├── dashboard.js             # Dashboard statistics API
└── index.js                 # API health check endpoint
```

### Key Features Implemented:
- ✅ User authentication with JWT tokens
- ✅ Password encryption with bcryptjs
- ✅ MongoDB data models with validation
- ✅ RESTful API endpoints for members and donations
- ✅ Dashboard with statistics aggregation
- ✅ Admin panel setup with roles
- ✅ Vercel serverless function support

---

## 🚀 Quick Start (Local Development)

### 1. Install Dependencies

```bash
npm install
```

This will install:
- `mongoose` - MongoDB ODM
- `jsonwebtoken` - JWT token generation
- `bcryptjs` - Password hashing
- And all React/Vite dependencies

### 2. Set Up MongoDB

**Option A: MongoDB Atlas (Recommended for production)**

1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create free account
3. Create free cluster
4. Get connection string
5. Add username/password
6. Whitelist IP: `0.0.0.0/0` (allow all)

**Option B: Local MongoDB**

```bash
# Install MongoDB locally
# Then run mongod to start server
```

### 3. Configure Environment

Edit `.env.local`:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bnp_socialforce?retryWrites=true&w=majority
JWT_SECRET=your_secret_key_here
API_BASE_URL=http://localhost:5173
NODE_ENV=development
```

To generate a secure JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 4. Create Initial Admin Account

```bash
npm run setup-admin
```

This creates an admin with credentials:
- Username: `admin`
- Password: `admin123` (change this!)
- Email: `admin@bnpsocialforce.org`

### 5. Start Development Server

```bash
npm run dev
```

Visit: `http://localhost:5173`

---

## 🧪 Test the API

### Test Login:
```bash
curl -X POST http://localhost:5173/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

### Get Members:
```bash
curl -X GET "http://localhost:5173/api/members?page=1&limit=20" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Create Member:
```bash
curl -X POST http://localhost:5173/api/members \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name":"টেস্ট সদস্য",
    "email":"test@example.com",
    "phone":"+8801912345678",
    "district":"ঢাকা",
    "upazila":"উত্তরা",
    "membershipType":"সাধারণ"
  }'
```

---

## 📦 Deploy to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Setup backend with API endpoints"
git push origin main
```

### 2. Import to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select your GitHub repository
4. Click "Deploy"

### 3. Set Environment Variables

In Vercel Dashboard → Project Settings → Environment Variables:

```
MONGODB_URI = (your MongoDB connection string)
JWT_SECRET = (your generated secret)
API_BASE_URL = (your domain)
NODE_ENV = production
```

### 4. Connect Your Domain

In Vercel Dashboard → Domains:
1. Add your domain (e.g., bnpsocialforce.org)
2. Follow DNS configuration steps
3. Wait for verification

---

## 🔐 Security Checklist

- [ ] Change default admin password after first login
- [ ] Use strong JWT secret (generate new one)
- [ ] Enable HTTPS on domain (Vercel does this automatically)
- [ ] Set MongoDB IP whitelist to specific IPs (not 0.0.0.0/0 in production)
- [ ] Enable database backups in MongoDB Atlas
- [ ] Set up error monitoring (Sentry, etc.)
- [ ] Enable 2FA on Vercel account
- [ ] Keep dependencies updated regularly

---

## 📝 API Endpoints Summary

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/auth/login` | Admin login |
| POST | `/api/auth/register` | Create new admin |
| GET | `/api/members` | List all members |
| POST | `/api/members` | Create member |
| PUT | `/api/members?id=:id` | Update member |
| DELETE | `/api/members?id=:id` | Delete member |
| GET | `/api/donations` | List donations |
| POST | `/api/donations` | Create donation |
| PUT | `/api/donations?id=:id` | Update donation |
| DELETE | `/api/donations?id=:id` | Delete donation |
| GET | `/api/dashboard` | Get statistics |

---

## 🐛 Troubleshooting

### "Cannot find module 'mongoose'"
```bash
npm install mongoose jsonwebtoken bcryptjs
```

### MongoDB Connection Error
- Check connection string format
- Verify IP whitelist in MongoDB Atlas (0.0.0.0/0)
- Check username/password are URL encoded

### 401 Unauthorized
- Token may be expired
- Check token is passed as `Bearer {token}`
- Log in again to get new token

### API 404 Not Found
- Check endpoint path is correct
- Verify API files are in `/api` folder
- Check Vercel deployment logs

---

## 📚 Documentation Files

- `API_DOCUMENTATION.md` - Complete API reference
- `DEPLOYMENT_GUIDE.md` - Vercel deployment steps
- `src/backend/README.md` - Frontend component docs
- `scripts/verify-setup.js` - Verify setup completeness

---

## ✨ Next Steps

1. **Frontend Integration:**
   - Update Admin Panel components to use real API
   - Replace localStorage with API calls
   - Add loading and error states

2. **Email Notifications:**
   - Send confirmation emails for donations
   - Send welcome emails for new members
   - Set up Nodemailer with Gmail SMTP

3. **Advanced Features:**
   - Donation payment gateway integration (bKash, Nagad)
   - Member certificate generation
   - SMS notifications
   - Report generation

4. **Monitoring & Analytics:**
   - Set up error tracking (Sentry)
   - Add API monitoring
   - Create dashboard for statistics

5. **Performance Optimization:**
   - Add caching layer (Redis)
   - Implement API rate limiting
   - Compress API responses

---

## 🎓 Learning Resources

- [MongoDB Docs](https://docs.mongodb.com/)
- [Express.js Guide](https://expressjs.com/)
- [JWT Handbook](https://auth0.com/resources/ebooks/jwt-handbook)
- [Vercel Docs](https://vercel.com/docs)

---

## 💬 Support

For issues or questions:
1. Check API_DOCUMENTATION.md for API reference
2. Check DEPLOYMENT_GUIDE.md for deployment help
3. Review error messages carefully
4. Check GitHub Issues
5. Contact development team

---

## 📄 License

This project is part of BNP Social Force. See LICENSE file for details.
