// export default (req, res) => {
//   if (req.method !== 'GET') {
//     return res.status(405).json({ success: false, message: 'Method not allowed' });
//   }

//   res.status(200).json({
//     success: true,
//     message: 'BNP Social Force API is running',
//     version: '1.0.0',
//     endpoints: {
//       auth: {
//         login: 'POST /api/auth/login',
//         register: 'POST /api/auth/register',
//       },
//       members: {
//         getAll: 'GET /api/members',
//         create: 'POST /api/members',
//         update: 'PUT /api/members?id=:id',
//         delete: 'DELETE /api/members?id=:id',
//       },
//       donations: {
//         getAll: 'GET /api/donations',
//         create: 'POST /api/donations',
//         update: 'PUT /api/donations?id=:id',
//         delete: 'DELETE /api/donations?id=:id',
//       },
//     },
//   });
// };








import dbConnect from './config/db.js'; // আপনার ডাটাবেজ কানেকশন ফাইল
import authHandler from './auth/login.js'; // আপনার অথ বা লগইন হ্যান্ডলার (প্রয়োজন অনুযায়ী পাথ ঠিক করবেন)
import donationsHandler from './donations.js';
import membersHandler from './members.js';

export default async (req, res) => {
  // ১. প্রথমে ডাটাবেজ কানেক্ট করুন
  try {
    await dbConnect();
  } catch (dbError) {
    return res.status(500).json({ success: false, message: 'Database connection failed', error: dbError.message });
  }

  // ২. ইউআরএল পাথ চেক করে সঠিক ফাইলে রিকোয়েস্ট পাঠান (Routing)
  const url = req.url || '';

  if (url.startsWith('/api/auth')) {
    return authHandler(req, res);
  }

  if (url.startsWith('/api/donations')) {
    return donationsHandler(req, res);
  }

  if (url.startsWith('/api/members')) {
    return membersHandler(req, res);
  }

  // ৩. যদি কোনো রুট না মেলে এবং মেথড শুধু GET হয়, তবে এপিআই স্ট্যাটাস দেখাবে
  if (req.method === 'GET') {
    return res.status(200).json({
      success: true,
      message: 'BNP Social Force API is running perfectly',
      version: '1.0.0'
    });
  }

  // ৪. অন্য সব মেথডের জন্য এরর
  return res.status(404).json({ success: false, message: 'Route or method not found' });
};