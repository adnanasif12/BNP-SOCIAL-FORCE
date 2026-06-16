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








import { connectDB } from './config/db.js'; // {} দিয়ে Named Export ইমপোর্ট করা হলো
import authHandler from './auth/login.js';
import donationsHandler from './donations.js';
import membersHandler from './members.js';

export default async (req, res) => {
  // ১. আপনার আসল ফাংশনটি দিয়ে ডাটাবেজ কানেক্ট করা
  try {
    await connectDB();
  } catch (dbError) {
    return res.status(500).json({ 
      success: false, 
      message: 'Database connection failed', 
      error: dbError.message 
    });
  }

  // ২. রিকোয়েস্টের ইউআরএল অনুযায়ী সঠিক ফাইলে পাঠানো (Routing)
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

  // ৩. শুধু GET রিকোয়েস্ট আসলে এপিআই স্ট্যাটাস দেখাবে
  if (req.method === 'GET') {
    return res.status(200).json({
      success: true,
      message: 'BNP Social Force API is running perfectly',
      version: '1.0.0'
    });
  }

  return res.status(404).json({ success: false, message: 'Route not found' });
};