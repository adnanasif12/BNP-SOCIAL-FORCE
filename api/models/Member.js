import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
      maxlength: [100, 'Name cannot be more than 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, 'Please provide a phone number'],
      match: [/^(\+88)?01[0-9]{9}$/, 'Please provide a valid Bangladesh phone number'],
    },
    district: {
      type: String,
      required: [true, 'Please provide a district'],
    },
    upazila: {
      type: String,
      required: [true, 'Please provide an upazila'],
    },
    membershipType: {
      type: String,
      enum: ['সাধারণ', 'প্রিমিয়াম', 'জীবনকাল'],
      default: 'সাধারণ',
    },
    joinedDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['সক্রিয়', 'নিষ্ক্রিয়'],
      default: 'সক্রিয়',
    },
    notes: String,
  },
  {
    timestamps: true,
  }
);

// Create index for search
memberSchema.index({ name: 'text', email: 'text', phone: 'text' });

export default mongoose.models.Member || mongoose.model('Member', memberSchema);
