# 🌍 Domain & Hosting Setup Guide

এই গাইডটি আপনাকে আপনার BNP Social Force প্রজেক্টকে Vercel এ হোস্ট করতে এবং কাস্টম ডোমেইন সংযুক্ত করতে সাহায্য করবে।

---

## 📋 প্রয়োজনীয় জিনিসগুলি

- ✅ GitHub অ্যাকাউন্ট (কোড হোস্ট করার জন্য)
- ✅ Vercel অ্যাকাউন্ট (ওয়েবসাইট ডিপ্লয় করার জন্য)
- ✅ MongoDB Atlas অ্যাকাউন্ট (ডাটাবেস এর জন্য)
- ✅ ডোমেইন নেম (GoDaddy, Namecheap, ইত্যাদি থেকে ক্রয় করুন)
- ✅ টেক্সট এডিটর (VS Code অথবা অনুরূপ)

---

## 🔧 ধাপ ১: GitHub তে কোড আপলোড করুন

### ১.১ GitHub রিপোজিটরি তৈরি করুন

```bash
# প্রজেক্ট ফোল্ডারে যান
cd Social_Force

# Git রিপোজিটরি ইনিশিয়ালাইজ করুন
git init

# সব ফাইল যোগ করুন
git add .

# কমিট করুন
git commit -m "Initial commit: BNP Social Force backend and frontend"

# main ব্র্যাঞ্চ সেট করুন
git branch -M main

# GitHub রিমোট যোগ করুন
git remote add origin https://github.com/YOUR_USERNAME/BNP-SOCIAL-FORCE.git

# GitHub এ পুশ করুন
git push -u origin main
```

**নোট:** `YOUR_USERNAME` এ আপনার GitHub ইউজারনেম ব্যবহার করুন।

---

## 🚀 ধাপ ২: MongoDB Atlas সেটআপ করুন

### ২.১ ক্লাস্টার তৈরি করুন

1. [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas) এ যান
2. **Free** প্ল্যান নির্বাচন করুন
3. ক্লাস্টার তৈরি করুন:
   - **Cluster Name:** `bnp-social-force`
   - **Cloud Provider:** AWS
   - **Region:** `Asia Pacific (Singapore)` অথবা আপনার কাছাকাছি

### ២.२ ডাটাবেস ব্যবহারকারী তৈরি করুন

1. **Security** → **Quick Start** যান
2. **Create a database user:**
   - **Username:** `admin`
   - **Password:** একটি শক্তিশালী পাসওয়ার্ড তৈরি করুন
3. **IP Address** → **Add My Current IP Address** ক্লিক করুন

### २.३ সংযোগ স্ট্রিং পান

1. **Connect** বাটন ক্লিক করুন
2. **Connect your application** নির্বাচন করুন
3. **Drivers:** Node.js নির্বাচন করুন
4. সংযোগ স্ট্রিং কপি করুন:

```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/<dbname>?retryWrites=true&w=majority
```

5. এটি `.env.local` এ পেস্ট করুন:

```
MONGODB_URI=mongodb+srv://admin:your_password@bnp-social-force.xxxxx.mongodb.net/bnp_socialforce?retryWrites=true&w=majority
```

---

## 🔐 ধাপ ৩: Vercel এ প্রজেক্ট ডিপ্লয় করুন

### ३.१ Vercel সাইন আপ করুন

1. [vercel.com](https://vercel.com) এ যান
2. **Sign Up** ক্লিক করুন
3. **GitHub দিয়ে সাইন আপ করুন** নির্বাচন করুন
4. GitHub কে Vercel এর অ্যাক্সেস দিন

### ३.२ প্রজেক্ট ইম্পোর্ট করুন

1. Vercel ড্যাশবোর্ডে **Add New** → **Project** ক্লিক করুন
2. আপনার GitHub রিপোজিটরি নির্বাচন করুন
3. **Import** ক্লিক করুন

### ३.३ প্রজেক্ট কনফিগারেশন

**Configure your project:**
- **Framework Preset:** Vite (অটো-ডিটেক্ট হওয়া উচিত)
- **Root Directory:** `./` (ডিফল্ট)
- **Build Command:** `npm run build` (ডিফল্ট)
- **Output Directory:** `dist` (ডিফল্ট)
- **Install Command:** `npm ci` (ডিফল্ট)

**Environment Variables যোগ করুন:**

| Key | Value |
|-----|-------|
| `MONGODB_URI` | আপনার MongoDB সংযোগ স্ট্রিং |
| `JWT_SECRET` | আপনার JWT সিক্রেট কী |
| `API_BASE_URL` | `https://your-vercel-project.vercel.app` |
| `NODE_ENV` | `production` |

### ३.४ ডিপ্লয় করুন

1. **Deploy** বাটন ক্লিক করুন
2. অপেক্ষা করুন... (~2-5 মিনিট)
3. সফল হলে: **Visit** ক্লিক করুন আপনার সাইট দেখতে

**আপনার Vercel URL হবে:** `https://your-project-name.vercel.app`

---

## 🌐 ধাপ ४: কাস্টম ডোমেইন যুক্ত করুন

### ४.१ বিকল্প ১: GoDaddy ব্যবহার করুন

#### Vercel এ ডোমেইন যোগ করুন:

1. Vercel ড্যাশবোর্ডে আপনার প্রজেক্ট খুলুন
2. **Settings** → **Domains** যান
3. **Add Domain** ক্লিক করুন
4. আপনার ডোমেইন টাইপ করুন (যেমন: `bnpsocialforce.org`)
5. **Add** ক্লিক করুন

#### GoDaddy এ DNS রেকর্ড যোগ করুন:

1. [godaddy.com](https://godaddy.com) এ লগইন করুন
2. **My Products** → আপনার ডোমেইন নির্বাচন করুন
3. **DNS** → **Edit DNS** ক্লিক করুন

**নতুন রেকর্ড যোগ করুন:**

| প্রকার | নাম | মান | TTL |
|------|------|-----|-----|
| CNAME | www | `cname.vercel.com` | 3600 |
| A | @ | `76.76.19.132` | 3600 |

4. **Save** ক্লিক করুন

#### Vercel এ যাচাই করুন:

- Vercel এ ফিরে যান
- DNS যাচাইকরণের জন্য অপেক্ষা করুন (~5-30 মিনিট)
- ডোমেইন যাচাই করা হলে **Verified** দেখাবে

### २.२ বিকল্প २: Namecheap ব্যবহার করুন

1. [namecheap.com](https://namecheap.com) এ লগইন করুন
2. **Domain List** যান
3. আপনার ডোমেইনের পাশে **Manage** ক্লিক করুন
4. **Advanced DNS** ট্যাব খুলুন

**নতুন রেকর্ড যোগ করুন:**

| Type | Host | Value | TTL |
|------|------|-------|-----|
| CNAME | www | `cname.vercel.com` | Automatic |
| A | @ | `76.76.19.132` | Automatic |

5. **Save Changes** ক্লিক করুন

### २.३ বিকল্প ३: সাবডোমেইন ব্যবহার করুন (যেমন: api.yourdomain.com)

1. Vercel এ **Add Domain** ক্লিক করুন
2. সাবডোমেইন টাইপ করুন: `api.yourdomain.com`
3. আপনার DNS প্রোভাইডারে CNAME রেকর্ড যোগ করুন:
   ```
   Host: api
   Value: cname.vercel.com
   ```

---

## 🔒 ধাপ ५: SSL/HTTPS সেটআপ

✅ **Vercel স্বয়ংক্রিয়ভাবে SSL সার্টিফিকেট প্রদান করে!**

- একবার আপনার ডোমেইন যাচাই হলে, Vercel স্বয়ংক্রিয়ভাবে Let's Encrypt সার্টিফিকেট ইনস্টল করে
- সব ট্রাফিক HTTPS এ এনক্রিপ্ট করা হয়
- HTTP ট্রাফিক স্বয়ংক্রিয়ভাবে HTTPS এ রিডাইরেক্ট হয়

---

## 📧 ধাপ ६: পোস্ট-ডিপ্লয়মেন্ট কাজ

### ६.१ Admin অ্যাকাউন্ট তৈরি করুন

Vercel এ নিম্নলিখিত দিয়ে সেটআপ স্ক্রিপ্ট চালান:

```bash
npm run setup-admin
```

এটি একটি admin অ্যাকাউন্ট তৈরি করবে:
- **Username:** `admin`
- **Password:** `admin123` (পরে পরিবর্তন করুন)
- **Email:** `admin@bnpsocialforce.org`

### ६.२ API টেস্ট করুন

আপনার ব্রাউজারে যান:

```
https://your-domain.com/api/
```

আপনি দেখবেন:
```json
{
  "success": true,
  "message": "BNP Social Force API is running",
  "version": "1.0.0"
}
```

### ६.३ ফ্রন্টএন্ড টেস্ট করুন

```
https://your-domain.com
```

সম্পূর্ণ ওয়েবসাইট লোড হওয়া উচিত।

---

## 🔄 ধাপ ७: ক্রমাগত ডিপ্লয়মেন্ট সেটআপ

### ७.१ স্বয়ংক্রিয় ডিপ্লয়মেন্ট

প্রতিবার যখন আপনি GitHub এ পুশ করেন:

1. Vercel স্বয়ংক্রিয়ভাবে পরিবর্তন সনাক্ত করে
2. নতুন বিল্ড তৈরি করে
3. স্বয়ংক্রিয়ভাবে ডিপ্লয় করে
4. আপনার ডোমেইনে লাইভ হয়

কোন ম্যানুয়াল কাজ প্রয়োজন নেই! 🎉

---

## 📊 DNS প্রসেস

```
আপনার কম্পিউটার
        ↓
   DNS প্রশ্ন: bnpsocialforce.org?
        ↓
   DNS সার্ভার
        ↓
   CNAME: cname.vercel.com
        ↓
   Vercel নেমসার্ভার
        ↓
   আপনার সার্ভার (Vercel)
        ↓
   ওয়েবসাইট লোড হয়
```

---

## 🆘 সমস্যা নিরসন

### সমস্যা ১: ডোমেইন কাজ করছে না

**সমাধান:**
- DNS প্রচার অপেক্ষা করুন (24-48 ঘণ্টা)
- DNS রেকর্ড চেক করুন:
  ```bash
  nslookup your-domain.com
  ```
- Vercel ড্যাশবোর্ডে যাচাইকরণ স্ট্যাটাস চেক করুন

### সমস্যা २: API 404 ত্রুটি

**সমাধান:**
- `vercel.json` ফাইল চেক করুন
- Environment ভেরিয়েবল সেট করা আছে কিনা যাচাই করুন
- Vercel ড্যাশবোর্ডে ডিপ্লয়মেন্ট লগ দেখুন

### সমস্যা३: MongoDB সংযোগ ব্যর্থ

**সমাধান:**
- MongoDB Atlas এ IP ঠিকানা হোয়াইটলিস্ট করুন: `0.0.0.0/0`
- সংযোগ স্ট্রিং সঠিক কিনা যাচাই করুন
- ডাটাবেস নাম ডাটাবেস তালিকায় আছে কিনা দেখুন

### সমস্যা४: HTTPS কাজ করছে না

**সমাধান:**
- অপেক্ষা করুন (Let's Encrypt সার্টিফিকেট তৈরি করতে 5-10 মিনিট)
- Vercel ড্যাশবোর্ডে সার্টিফিকেট স্ট্যাটাস চেক করুন
- ব্রাউজার ক্যাশ সাফ করুন

---

## 📝 চেকলিস্ট

- [ ] GitHub রিপোজিটরি তৈরি করা হয়েছে
- [ ] সব কোড GitHub এ পুশ করা হয়েছে
- [ ] MongoDB Atlas ক্লাস্টার তৈরি করা হয়েছে
- [ ] MongoDB সংযোগ স্ট্রিং পাওয়া গেছে
- [ ] Vercel অ্যাকাউন্ট তৈরি করা হয়েছে
- [ ] প্রজেক্ট Vercel এ ইম্পোর্ট করা হয়েছে
- [ ] Environment ভেরিয়েবল সেট করা হয়েছে
- [ ] প্রজেক্ট Vercel এ ডিপ্লয় করা হয়েছে
- [ ] ডোমেইন DNS রেকর্ড যোগ করা হয়েছে
- [ ] ডোমেইন Vercel এ যাচাই করা হয়েছে
- [ ] Admin অ্যাকাউন্ট তৈরি করা হয়েছে
- [ ] API এন্ডপয়েন্ট টেস্ট করা হয়েছে
- [ ] ওয়েবসাইট কাজ করছে কিনা যাচাই করা হয়েছে

---

## 🎉 আপনি সম্পন্ন করেছেন!

আপনার BNP Social Force প্রজেক্ট এখন সম্পূর্ণভাবে সেটআপ এবং লাইভ আছে। 🚀

**দরকারী লিঙ্ক:**
- Vercel ড্যাশবোর্ড: https://vercel.com/dashboard
- MongoDB Atlas: https://cloud.mongodb.com/
- GitHub: https://github.com
- Vercel সাপোর্ট: https://vercel.com/support
