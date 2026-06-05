#!/usr/bin/env node

/**
 * Quick Start Guide
 * This script walks you through the setup process
 */

import fs from 'fs';
import path from 'path';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (query) => {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
};

async function runSetup() {
  console.clear();
  console.log('\n╔═══════════════════════════════════════════════════════════╗');
  console.log('║     BNP Social Force - Backend Setup Wizard              ║');
  console.log('╚═══════════════════════════════════════════════════════════╝\n');

  const steps = [
    {
      title: '📦 Step 1: Install Dependencies',
      description: 'Install all required npm packages',
      action: async () => {
        console.log('\nRun this command:');
        console.log('$ npm install\n');
        console.log('This will install:');
        console.log('  • mongoose (Database ODM)');
        console.log('  • jsonwebtoken (JWT auth)');
        console.log('  • bcryptjs (Password hashing)');
        console.log('  • All React/Vite dependencies\n');
        
        const done = await question('Press Enter when completed... ');
      }
    },
    {
      title: '🗄️  Step 2: Set Up MongoDB',
      description: 'Create a MongoDB database',
      action: async () => {
        console.log('\n✅ Free Option: MongoDB Atlas');
        console.log('   1. Go to: https://mongodb.com/cloud/atlas');
        console.log('   2. Create account');
        console.log('   3. Create free cluster');
        console.log('   4. Add database user');
        console.log('   5. Whitelist IP: 0.0.0.0/0');
        console.log('   6. Copy connection string\n');
        
        const done = await question('Press Enter when you have the connection string... ');
      }
    },
    {
      title: '⚙️  Step 3: Configure Environment',
      description: 'Set up environment variables',
      action: async () => {
        console.log('\nEdit .env.local file:');
        console.log('1. Open .env.local in your editor');
        console.log('2. Add your MongoDB connection string');
        console.log('3. Generate JWT Secret:\n');
        console.log('   $ node -e "console.log(require(\'crypto\').randomBytes(32).toString(\'hex\'))"\n');
        console.log('4. Copy the output to JWT_SECRET\n');
        
        const done = await question('Press Enter when configured... ');
      }
    },
    {
      title: '👤 Step 4: Create Admin Account',
      description: 'Initialize database with admin user',
      action: async () => {
        console.log('\nRun this command:');
        console.log('$ npm run setup-admin\n');
        console.log('This creates:');
        console.log('  • Username: admin');
        console.log('  • Password: admin123 (change after login!)');
        console.log('  • Role: সুপার_এডমিন\n');
        
        const done = await question('Press Enter when completed... ');
      }
    },
    {
      title: '🚀 Step 5: Start Development Server',
      description: 'Launch the application',
      action: async () => {
        console.log('\nRun this command:');
        console.log('$ npm run dev\n');
        console.log('Then visit: http://localhost:5173\n');
        console.log('Test API login:');
        console.log('curl -X POST http://localhost:5173/api/auth/login \\');
        console.log('  -H "Content-Type: application/json" \\');
        console.log('  -d \'{"username":"admin","password":"admin123"}\'\n');
        
        const done = await question('Press Enter when server is running... ');
      }
    }
  ];

  console.log('═══════════════════════════════════════════════════════════\n');
  console.log('Follow these steps to complete the backend setup:\n');

  for (const step of steps) {
    console.log(`\\n${step.title}`);
    console.log(`${step.description}\n`);
    await step.action();
  }

  console.log('\n✨ Setup Complete! ✨\n');
  console.log('═══════════════════════════════════════════════════════════');
  console.log('\n📚 Documentation:');
  console.log('  • BACKEND_SETUP.md - Detailed setup guide');
  console.log('  • API_DOCUMENTATION.md - API reference');
  console.log('  • DEPLOYMENT_GUIDE.md - Vercel deployment');
  console.log('\n🚀 Next Steps:');
  console.log('  1. Update Admin Panel to use real API');
  console.log('  2. Set up payment integration');
  console.log('  3. Deploy to Vercel');
  console.log('  4. Connect your domain\n');
  console.log('═══════════════════════════════════════════════════════════\n');

  rl.close();
}

runSetup().catch(console.error);
