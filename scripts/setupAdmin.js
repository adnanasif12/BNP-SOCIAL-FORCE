import { connectDB } from './api/config/db.js';
import Admin from './api/models/Admin.js';

async function setupInitialAdmin() {
  try {
    await connectDB();
    console.log('Database connected');

    const existingAdmin = await Admin.findOne({ username: process.env.DEFAULT_ADMIN_USERNAME });

    if (existingAdmin) {
      console.log('Admin already exists');
      return;
    }

    const admin = new Admin({
      username: process.env.DEFAULT_ADMIN_USERNAME || 'admin',
      email: process.env.DEFAULT_ADMIN_EMAIL || 'admin@bnpsocialforce.org',
      password: process.env.DEFAULT_ADMIN_PASSWORD || 'admin123',
      role: 'সুপার_এডমিন',
    });

    await admin.save();
    console.log('✅ Admin account created successfully');
    console.log(`Username: ${admin.username}`);
    console.log(`Email: ${admin.email}`);
    console.log('Please change the password after first login!');

    process.exit(0);
  } catch (error) {
    console.error('Setup failed:', error);
    process.exit(1);
  }
}

setupInitialAdmin();
