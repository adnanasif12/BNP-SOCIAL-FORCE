import { connectDB } from './config/db.js';
import Donation from './models/Donation.js';

export default async (req, res) => {
  try {
    await connectDB();

    if (req.method === 'GET') {
      // Get all donations or search
      const { search, page = 1, limit = 20, purpose } = req.query;

      let query = {};
      if (search) {
        query = { $text: { $search: search } };
      }
      if (purpose) {
        query.purpose = purpose;
      }

      const donations = await Donation.find(query)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ date: -1 });

      const total = await Donation.countDocuments(query);

      // Calculate statistics
      const stats = await Donation.aggregate([
        { $match: query },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: '$amount' },
            totalCount: { $sum: 1 },
            averageAmount: { $avg: '$amount' },
          },
        },
      ]);

      return res.status(200).json({
        success: true,
        data: donations,
        stats: stats[0] || { totalAmount: 0, totalCount: 0, averageAmount: 0 },
        pagination: {
          total,
          pages: Math.ceil(total / limit),
          currentPage: page,
        },
      });
    }

    if (req.method === 'POST') {
      // Create new donation
      const { donorName, email, phone, amount, paymentMethod, transactionId, purpose, remarks } =
        req.body;

      // Validation
      if (!donorName || !amount || !paymentMethod || !transactionId) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
      }

      // Check if transaction ID already exists
      const existingDonation = await Donation.findOne({ transactionId });
      if (existingDonation) {
        return res.status(400).json({ success: false, message: 'Transaction ID already exists' });
      }

      const donation = new Donation({
        donorName,
        email,
        phone,
        amount,
        paymentMethod,
        transactionId,
        purpose,
        remarks,
      });

      await donation.save();

      return res.status(201).json({
        success: true,
        message: 'দান সফলভাবে রেকর্ড করা হয়েছে',
        data: donation,
      });
    }

    if (req.method === 'PUT') {
      // Update donation
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ success: false, message: 'Donation ID required' });
      }

      const donation = await Donation.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!donation) {
        return res.status(404).json({ success: false, message: 'Donation not found' });
      }

      return res.status(200).json({
        success: true,
        message: 'দান রেকর্ড আপডেট করা হয়েছে',
        data: donation,
      });
    }

    if (req.method === 'DELETE') {
      // Delete donation
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ success: false, message: 'Donation ID required' });
      }

      const donation = await Donation.findByIdAndDelete(id);

      if (!donation) {
        return res.status(404).json({ success: false, message: 'Donation not found' });
      }

      return res.status(200).json({
        success: true,
        message: 'দান সফলভাবে মুছে ফেলা হয়েছে',
      });
    }

    res.status(405).json({ success: false, message: 'Method not allowed' });
  } catch (error) {
    console.error('Donation API error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message,
      details: process.env.NODE_ENV === 'production' ? undefined : error.stack
    });
  }
};
