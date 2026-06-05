# ⚡ কুইক স্টার্ট গাইড - BNP Social Force

এই গাইডটি আপনাকে 5 মিনিটে শুরু করতে সাহায্য করবে।

---

## 🚀 শুরু করার আগে

নিশ্চিত করুন যে আপনার কাছে আছে:
- ✅ Node.js 16+ ইনস্টল করা
- ✅ Git ইনস্টল করা
- ✅ একটি টেক্সট এডিটর (VS Code সুপারিশ করা হয়)

---

## 1️⃣ স্টেপ ১: ক্লোন করুন এবং ইনস্টল করুন (1 মিনিট)

```bash
# প্রজেক্ট ফোল্ডারে যান
cd Social_Force

# ডিপেন্ডেন্সি ইনস্টল করুন
npm install
```

---

## 2️⃣ স্টেপ २: পরিবেশ সেটআপ করুন (१ মিনিট)

`.env.local` ফাইল খুলুন এবং পূরণ করুন:

```bash
# MongoDB Atlas থেকে আপনার সংযোগ স্ট্রিং পান
MONGODB_URI=mongodb+srv://admin:password@cluster.mongodb.net/bnp_socialforce?retryWrites=true&w=majority

# JWT সিক্রেট জেনারেট করুন:
JWT_SECRET=your_generated_key

# এটি খুলুন এবং কপি করুন:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 3️⃣ স্টেপ ३: Admin তৈরি করুন (१ মিনিট)

```bash
npm run setup-admin
```

এটি তৈরি করবে:
- **Username:** `admin`
- **Password:** `admin123`
- **Email:** `admin@bnpsocialforce.org`

---

## 4️⃣ স্টেপ ४: সার্ভার চালান (०.५ মিনিট)

```bash
npm run dev
```

ব্রাউজারে খুলুন: **http://localhost:5173**

---

## 5️⃣ স্টেপ ५: API টেস্ট করুন (०.५ মিনিট)

একটি নতুন টার্মিনালে:

```bash
# API স্বাস্থ্য পরীক্ষা
curl http://localhost:5173/api/

# লগইন
curl -X POST http://localhost:5173/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

✅ **আপনি প্রস্তুত!**

---

## 🔗 গুরুত্বপূর্ণ ফাইলগুলি

| ফাইল | উদ্দেশ্য |
|------|---------|
| `.env.local` | পরিবেশ কনফিগারেশন (আপনার ব্যক্তিগত) |
| `.env.example` | টেমপ্লেট (Git এ যায়) |
| `BACKEND_SETUP.md` | বিস্তারিত ব্যাকএন্ড নির্দেশনা |
| `DEPLOYMENT_GUIDE.md` | Vercel নির্দেশনা |
| `DOMAIN_HOSTING_SETUP.md` | ডোমেইন সেটআপ গাইড |
| `FINAL_SETUP_CHECKLIST.md` | উৎপাদন চেকলিস্ট |

---

## 📝 সাধারণ কমান্ড

```bash
# ডেভেলপমেন্ট শুরু করুন
npm run dev

# বিল্ড তৈরি করুন
npm run build

# প্রিভিউ দেখুন
npm run preview

# Admin সেটআপ
npm run setup-admin

# সেটআপ যাচাই করুন
npm run verify-setup

# কুইক স্টার্ট উইজার্ড
npm run quick-start
```

---

## 🐛 ত্রুটি সমাধান

### মসাল ১: MongoDB সংযোগ ব্যর্থ
```
সমাধান:
1. MongoDB Atlas এ IP হোয়াইটলিস্ট করুন
2. সংযোগ স্ট্রিং সঠিক কিনা চেক করুন
3. ডাটাবেস নাম ঠিক কিনা চেক করুন
```

### সমস্যা २: পোর্ট ইতিমধ্যে ব্যবহৃত
```
সমাধান:
lsof -i :5173
kill -9 <PID>
```

### সমস্যা३: ডিপেন্ডেন্সি ইনস্টল ব্যর্থ
```
সমাধান:
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 পরবর্তী পর্যায়

1. **ডেভেলপ করুন:** স্থানীয়ভাবে ফিচার যোগ করুন
2. **গিট পুশ করুন:** `git push origin main`
3. **Vercel যান:** প্রজেক্ট স্বয়ংক্রিয়ভাবে ডিপ্লয় হয়
4. **ডোমেইন সংযুক্ত করুন:** DNS কনফিগার করুন
5. **লাইভ হোন:** সবাই অ্যাক্সেস করতে পারে

---

## 🎯 কোড কাঠামো

```
api/              ← ব্যাকএন্ড API
├── auth/         ← লগইন/রেজিস্ট্রেশন
├── members.js    ← সদস্য ম্যানেজমেন্ট
├── donations.js  ← দান ম্যানেজমেন্ট
└── dashboard.js  ← পরিসংখ্যান

src/              ← ফ্রন্টএন্ড
├── components/   ← React কম্পোনেন্ট
├── styles/       ← CSS ফাইল
└── utils/        ← হেল্পার ফাংশন

scripts/          ← সেটআপ স্ক্রিপ্ট
└── setupAdmin.js ← Admin তৈরি করে
```

---

## 🔐 নিরাপত্তা টিপস

⚠️ **করবেন না:**
- `.env.local` GitHub এ কমিট করবেন না
- Admin পাসওয়ার্ড প্রকাশ করবেন না
- সংবেদনশীল ডেটা কোডে রাখবেন না

✅ **করবেন:**
- `.gitignore` এ `.env.local` যোগ করুন
- শক্তিশালী পাসওয়ার্ড ব্যবহার করুন
- নিয়মিত ব্যাকআপ নিন

---

## 📞 সাহায্য প্রয়োজন?

সম্পূর্ণ ডকুমেন্টেশন দেখুন:

- 📖 [README.md](README.md) - প্রজেক্ট পরিচয়
- 🔌 [API_DOCUMENTATION.md](API_DOCUMENTATION.md) - API রেফারেন্স
- 🚀 [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) - Vercel গাইড
- 🌐 [DOMAIN_HOSTING_SETUP.md](DOMAIN_HOSTING_SETUP.md) - ডোমেইন গাইড
- ✅ [FINAL_SETUP_CHECKLIST.md](FINAL_SETUP_CHECKLIST.md) - চেকলিস্ট

---

**উপভোগ করুন! 🎉**
