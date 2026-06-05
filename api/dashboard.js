import { connectDB } from '../config/db.js';
import Member from '../models/Member.js';
import Donation from '../models/Donation.js';

export default async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    await connectDB();

    // Get member statistics
    const totalMembers = await Member.countDocuments({ status: 'সক্রিয়' });
    const membersByType = await Member.aggregate([
      { $match: { status: 'সক্রিয়' } },
      {
        $group: {
          _id: '$membershipType',
          count: { $sum: 1 },
        },
      },
    ]);

    // Get donation statistics
    const totalDonations = await Donation.countDocuments();
    const donationStats = await Donation.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$amount' },
          totalCount: { $sum: 1 },
          averageAmount: { $avg: '$amount' },
          maxAmount: { $max: '$amount' },
          minAmount: { $min: '$amount' },
        },
      },
    ]);

    // Get donations by purpose
    const donationsByPurpose = await Donation.aggregate([
      {
        $group: {
          _id: '$purpose',
          amount: { $sum: '$amount' },
          count: { $sum: 1 },
        },
      },
    ]);

    // Get recent members
    const recentMembers = await Member.find({ status: 'সক্রিয়' })
      .sort({ joinedDate: -1 })
      .limit(5);

    // Get recent donations
    const recentDonations = await Donation.find()
      .sort({ date: -1 })
      .limit(5);

    // Get this month's donations
    const now = new Date();
    const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const thisMonthDonations = await Donation.aggregate([
      {
        $match: { date: { $gte: currentMonth } },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$amount' },
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: {
        members: {
          total: totalMembers,
          byType: membersByType,
          recent: recentMembers,
        },
        donations: {
          total: totalDonations,
          statistics: donationStats[0] || {
            totalAmount: 0,
            totalCount: 0,
            averageAmount: 0,
            maxAmount: 0,
            minAmount: 0,
          },
          byPurpose: donationsByPurpose,
          thisMonth: thisMonthDonations[0] || { totalAmount: 0, count: 0 },
          recent: recentDonations,
        },
      },
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};
