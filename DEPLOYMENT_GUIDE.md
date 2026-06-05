# Deployment & Domain Setup Guide

## 🌐 Host Your Project on Vercel

### Step 1: Prepare Your Project

1. **Push code to GitHub:**
```bash
git init
git add .
git commit -m "Initial commit with backend"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/BNP-SOCIAL-FORCE.git
git push -u origin main
```

### Step 2: Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Authorize Vercel to access your GitHub account

### Step 3: Import Project to Vercel

1. Click "New Project"
2. Select your GitHub repository
3. Configure project:
   - **Framework**: Vite (should auto-detect)
   - **Root Directory**: ./ (default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### Step 4: Set Environment Variables

Click "Environment Variables" and add:

```
MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
JWT_SECRET = (generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
API_BASE_URL = https://your-project.vercel.app
NODE_ENV = production
```

### Step 5: Deploy

1. Click "Deploy"
2. Wait for deployment to complete
3. Visit your project URL

---

## 🔗 Connect Your Custom Domain

### Option 1: Using GoDaddy

1. **In Vercel Dashboard:**
   - Go to Project Settings → Domains
   - Click "Add Domain"
   - Enter your domain (e.g., bnpsocialforce.org)

2. **In GoDaddy:**
   - Go to DNS Settings for your domain
   - Add CNAME record:
     ```
     Name: www
     Value: cname.vercel.com
     TTL: 600
     ```
   - Add A record for root domain:
     ```
     Name: @
     Value: 76.76.19.132
     TTL: 600
     ```

3. **Verify in Vercel:**
   - Wait for DNS propagation (5-30 minutes)
   - Vercel will automatically verify

### Option 2: Using Namecheap

1. **In Vercel Dashboard:**
   - Go to Project Settings → Domains
   - Add your domain

2. **In Namecheap:**
   - Go to Domain List → Your Domain → Advanced DNS
   - Add CNAME record:
     ```
     Type: CNAME
     Host: www
     Value: cname.vercel.com
     TTL: 30 min
     ```

3. **Wait for propagation and Vercel will verify**

### Option 3: Using Subdomain

1. **In Vercel:**
   - Go to Domains
   - Add subdomain: api.yourdomain.com

2. **In DNS Provider:**
   - Add CNAME:
     ```
     Host: api
     Value: cname.vercel.com
     ```

---

## 🔐 SSL/HTTPS Setup

Vercel automatically provisions free SSL certificates via Let's Encrypt:

1. Once domain is verified in Vercel
2. Vercel automatically creates SSL certificate
3. All HTTPS traffic is encrypted and redirected

---

## 🚀 First Deployment Checklist

- [ ] MongoDB Atlas cluster created and connection string ready
- [ ] JWT Secret generated
- [ ] All environment variables set in Vercel
- [ ] Project pushed to GitHub
- [ ] Domain DNS records configured
- [ ] Project deployed successfully
- [ ] Can access at domain URL
- [ ] Admin account created (via setup script)
- [ ] API endpoints responding

---

## 📱 Testing After Deployment

1. **Test Frontend:**
```bash
https://your-domain.com
```

2. **Test API:**
```bash
curl https://your-domain.com/api/
```

3. **Test Login:**
```bash
curl -X POST https://your-domain.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

---

## 🔄 Continuous Deployment

Every time you push to GitHub:
1. Vercel detects changes
2. Automatically builds and deploys
3. No manual steps needed!

---

## 💾 Database Backup

### MongoDB Atlas Backup:

1. Go to Clusters → Backup
2. Enable "Continuous Backups"
3. Set recovery window (7-35 days)

### Manual Export:
```bash
mongodump --uri "your-connection-string" --out ./backup
```

---

## 🆘 Troubleshooting

### Domain not working?
- Wait 24-48 hours for DNS propagation
- Check DNS records with `nslookup your-domain.com`
- Verify Vercel has domain verified status

### API 404 errors?
- Check that functions folder exists
- Verify environment variables are set
- Check Vercel deployment logs

### Can't connect to MongoDB?
- Verify connection string is correct
- Add 0.0.0.0/0 to IP whitelist in MongoDB Atlas
- Check database name exists

---

## 📊 Monitor Your Project

In Vercel Dashboard:
- View deployment logs
- Monitor analytics
- Check error rates
- Configure serverless function logs

---

## 💰 Pricing

- **Vercel Free Tier:** 
  - 100 GB bandwidth/month
  - Unlimited deployments
  - Serverless functions included

- **MongoDB Atlas Free Tier:**
  - 512 MB storage
  - Shared cluster
  - Upgrade as needed

---

## 🎓 Next Steps

1. Set up GitHub Actions for automated testing
2. Configure email notifications for deployments
3. Set up monitoring and alerts
4. Configure custom error pages
5. Set up analytics tracking
