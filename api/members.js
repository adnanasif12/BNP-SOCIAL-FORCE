import { connectDB } from './config/db.js';
import Member from './models/Member.js';

export default async (req, res) => {
  try {
    await connectDB();

    if (req.method === 'GET') {
      // Get all members or search
      const { search, page = 1, limit = 20 } = req.query;

      let query = {};
      if (search) {
        query = { $text: { $search: search } };
      }

      const members = await Member.find(query)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ joinedDate: -1 });

      const total = await Member.countDocuments(query);

      return res.status(200).json({
        success: true,
        data: members,
        pagination: {
          total,
          pages: Math.ceil(total / limit),
          currentPage: page,
        },
      });
    }

    if (req.method === 'POST') {
      // Create new member
      const { name, email, phone, district, upazila, membershipType } = req.body;

      // Validation
      if (!name || !email || !phone || !district || !upazila) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
      }

      // Check if email already exists
      const existingMember = await Member.findOne({ email });
      if (existingMember) {
        return res.status(400).json({ success: false, message: 'Email already registered' });
      }

      const member = new Member({
        name,
        email,
        phone,
        district,
        upazila,
        membershipType,
      });

      await member.save();

      return res.status(201).json({
        success: true,
        message: 'সদস্য সফলভাবে যুক্ত করা হয়েছে',
        data: member,
      });
    }

    if (req.method === 'PUT') {
      // Update member
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ success: false, message: 'Member ID required' });
      }

      const member = await Member.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!member) {
        return res.status(404).json({ success: false, message: 'Member not found' });
      }

      return res.status(200).json({
        success: true,
        message: 'সদস্য তথ্য আপডেট করা হয়েছে',
        data: member,
      });
    }

    if (req.method === 'DELETE') {
      // Delete member
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ success: false, message: 'Member ID required' });
      }

      const member = await Member.findByIdAndDelete(id);

      if (!member) {
        return res.status(404).json({ success: false, message: 'Member not found' });
      }

      return res.status(200).json({
        success: true,
        message: 'সদস্য সফলভাবে মুছে ফেলা হয়েছে',
      });
    }

    res.status(405).json({ success: false, message: 'Method not allowed' });
  } catch (error) {
    console.error('Member API error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};
