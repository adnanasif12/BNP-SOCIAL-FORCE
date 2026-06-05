import { connectDB } from '../config/db.js';
import Admin from '../models/Admin.js';
import jwt from 'jsonwebtoken';

export default async (req, res) => {
  try {
    await connectDB();

    if (req.method === 'POST') {
      const { username, email, password, role = 'এডমিন' } = req.body;

      if (!username || !email || !password) {
        return res
          .status(400)
          .json({ success: false, message: 'Username, email and password are required' });
      }

      // Check if admin already exists
      const existingAdmin = await Admin.findOne({
        $or: [{ username }, { email }],
      });

      if (existingAdmin) {
        return res.status(400).json({ success: false, message: 'Username or email already exists' });
      }

      const admin = new Admin({
        username,
        email,
        password,
        role,
      });

      await admin.save();

      const token = jwt.sign(
        {
          id: admin._id,
          username: admin.username,
          role: admin.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      return res.status(201).json({
        success: true,
        message: 'এডমিন অ্যাকাউন্ট তৈরি করা হয়েছে',
        token,
        admin: {
          id: admin._id,
          username: admin.username,
          email: admin.email,
          role: admin.role,
        },
      });
    }

    res.status(405).json({ success: false, message: 'Method not allowed' });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};
