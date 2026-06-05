import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema(
  {
    donorName: {
      type: String,
      required: [true, 'Please provide donor name'],
      trim: true,
    },
    email: {
      type: String,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
    },
    phone: {
      type: String,
      match: [/^(\+88)?01[0-9]{9}$/, 'Please provide a valid Bangladesh phone number'],
    },
    amount: {
      type: Number,
      required: [true, 'Please provide donation amount'],
      min: [1, 'Amount must be at least 1'],
    },
    paymentMethod: {
      type: String,
      enum: ['bKash', 'Nagad', 'Rocket', 'Bank Transfer', 'নগদ'],
      required: [true, 'Please select a payment method'],
    },
    transactionId: {
      type: String,
      required: [true, 'Please provide transaction ID'],
      unique: true,
    },
    purpose: {
      type: String,
      enum: ['শিক্ষা', 'স্বাস্থ্য', 'দুর্যোগ', 'সাধারণ', 'অন্যান্য'],
      default: 'সাধারণ',
    },
    date: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['নিশ্চিত', 'অপেক্ষারত', 'বাতিল'],
      default: 'নিশ্চিত',
    },
    remarks: String,
    receipt: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Create index for search
donationSchema.index({ donorName: 'text', email: 'text', transactionId: 'text' });

export default mongoose.models.Donation || mongoose.model('Donation', donationSchema);
