# BNP Social Force - Backend API Documentation

## 📚 API Endpoints

### Authentication Endpoints

#### Login
- **URL:** `/api/auth/login`
- **Method:** `POST`
- **Body:**
```json
{
  "username": "admin",
  "password": "password123"
}
```
- **Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "admin": {
    "id": "507f1f77bcf86cd799439011",
    "username": "admin",
    "email": "admin@example.com",
    "role": "সুপার_এডমিন"
  }
}
```

#### Register Admin
- **URL:** `/api/auth/register`
- **Method:** `POST`
- **Body:**
```json
{
  "username": "newadmin",
  "email": "admin@example.com",
  "password": "securepassword",
  "role": "এডমিন"
}
```
- **Response:** Returns token and admin details

---

### Members Endpoints

#### Get All Members
- **URL:** `/api/members?page=1&limit=20&search=name`
- **Method:** `GET`
- **Headers:** `Authorization: Bearer {token}`
- **Query Parameters:**
  - `page` - Page number (default: 1)
  - `limit` - Results per page (default: 20)
  - `search` - Search by name, email, or phone

#### Create Member
- **URL:** `/api/members`
- **Method:** `POST`
- **Headers:** `Authorization: Bearer {token}`
- **Body:**
```json
{
  "name": "সদস্যের নাম",
  "email": "email@example.com",
  "phone": "+8801912345678",
  "district": "ঢাকা",
  "upazila": "উত্তরা",
  "membershipType": "সাধারণ"
}
```

#### Update Member
- **URL:** `/api/members?id=memberid`
- **Method:** `PUT`
- **Headers:** `Authorization: Bearer {token}`
- **Body:** Any fields to update

#### Delete Member
- **URL:** `/api/members?id=memberid`
- **Method:** `DELETE`
- **Headers:** `Authorization: Bearer {token}`

---

### Donations Endpoints

#### Get All Donations
- **URL:** `/api/donations?page=1&limit=20&search=name&purpose=শিক্ষা`
- **Method:** `GET`
- **Headers:** `Authorization: Bearer {token}`
- **Query Parameters:**
  - `page` - Page number
  - `limit` - Results per page
  - `search` - Search by donor name, email, or transaction ID
  - `purpose` - Filter by purpose (শিক্ষা, স্বাস্থ্য, দুর্যোগ, সাধারণ, অন্যান্য)

#### Create Donation
- **URL:** `/api/donations`
- **Method:** `POST`
- **Headers:** `Authorization: Bearer {token}`
- **Body:**
```json
{
  "donorName": "দাতার নাম",
  "email": "donor@example.com",
  "phone": "+8801912345678",
  "amount": 5000,
  "paymentMethod": "bKash",
  "transactionId": "TXN12345",
  "purpose": "শিক্ষা",
  "remarks": "বিশেষ দান"
}
```

#### Update Donation
- **URL:** `/api/donations?id=donationid`
- **Method:** `PUT`
- **Headers:** `Authorization: Bearer {token}`

#### Delete Donation
- **URL:** `/api/donations?id=donationid`
- **Method:** `DELETE`
- **Headers:** `Authorization: Bearer {token}`

---

### Dashboard Endpoints

#### Get Dashboard Statistics
- **URL:** `/api/dashboard`
- **Method:** `GET`
- **Headers:** `Authorization: Bearer {token}`
- **Response:**
```json
{
  "success": true,
  "data": {
    "members": {
      "total": 150,
      "byType": [...],
      "recent": [...]
    },
    "donations": {
      "total": 45,
      "statistics": {
        "totalAmount": 250000,
        "totalCount": 45,
        "averageAmount": 5555.56
      },
      "byPurpose": [...],
      "thisMonth": {...},
      "recent": [...]
    }
  }
}
```

---

## 🔐 Authentication

All protected endpoints require a JWT token in the `Authorization` header:
```
Authorization: Bearer {token}
```

Tokens expire after 7 days.

---

## 🚀 Deployment on Vercel

### Prerequisites
- MongoDB Atlas account (or any MongoDB service)
- Vercel account
- Git repository

### Setup Steps

1. **Clone the repository:**
```bash
git clone https://github.com/adnanasif12/BNP-SOCIAL-FORCE.git
cd BNP-SOCIAL-FORCE
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create environment variables locally:**
```bash
cp .env.example .env.local
```
Edit `.env.local` with your actual values.

4. **Set up MongoDB:**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free cluster
   - Get your connection string
   - Add to `.env.local`: `MONGODB_URI=your_connection_string`

5. **Generate JWT Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Add to `.env.local`: `JWT_SECRET=your_generated_secret`

6. **Test locally:**
```bash
npm run dev
```
Visit `http://localhost:5173`

7. **Push to GitHub:**
```bash
git add .
git commit -m "Setup backend with API"
git push origin main
```

8. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Set Environment Variables:
     - `MONGODB_URI`
     - `JWT_SECRET`
     - `API_BASE_URL` (your Vercel domain)
   - Click "Deploy"

9. **Initialize Admin Account:**
```bash
# Run this once after deployment
npm run setup-admin
```

---

## 🔗 Connecting to Your Domain

### 1. Update Domain Settings in Vercel:
- In Vercel Dashboard → Project Settings → Domains
- Add your domain (e.g., www.bnpsocialforce.org)
- Follow DNS configuration steps

### 2. Configure DNS Records:
For your domain provider (GoDaddy, Namecheap, etc.):

**Add these DNS records:**
```
Type: CNAME
Name: www
Value: cname.vercel.com
```

Or:
```
Type: A
Name: @
Value: 76.76.19.132
```

### 3. Update API Base URL:
- In Vercel Environment Variables
- Set `API_BASE_URL=https://www.yourdomain.com`

### 4. Update Frontend Configuration:
- Create `src/config/api.js`:

```javascript
const API_BASE_URL = 
  import.meta.env.VITE_API_BASE_URL || 
  'https://your-domain.com';

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  MEMBERS: `${API_BASE_URL}/api/members`,
  DONATIONS: `${API_BASE_URL}/api/donations`,
  DASHBOARD: `${API_BASE_URL}/api/dashboard`,
};

export default API_BASE_URL;
```

---

## 📡 Testing API

### Using cURL:

**Login:**
```bash
curl -X POST https://your-domain.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"password123"}'
```

**Get Members:**
```bash
curl -X GET "https://your-domain.com/api/members?page=1&limit=20" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Using Postman:
1. Import the API collection
2. Set base URL: `https://your-domain.com`
3. Set environment variable: `token` (from login response)
4. Use `Bearer {{token}}` in Authorization header

---

## 🐛 Troubleshooting

### MongoDB Connection Error
- Check connection string in environment variables
- Verify IP whitelist in MongoDB Atlas (allow all: 0.0.0.0/0)
- Check database name matches in URI

### 401 Unauthorized Error
- Token may have expired (regenerate by logging in again)
- Token may be incorrectly formatted (should be `Bearer token`)

### API Not Working on Domain
- Verify DNS records are propagated (wait 24-48 hours)
- Check Vercel deployment logs
- Ensure environment variables are set correctly

---

## 📋 Common Commands

```bash
# Development
npm run dev

# Build
npm run build

# Setup initial admin
npm run setup-admin

# Preview build
npm run preview
```

---

## 🤝 Support

For issues and support, please create an issue on GitHub or contact the development team.
