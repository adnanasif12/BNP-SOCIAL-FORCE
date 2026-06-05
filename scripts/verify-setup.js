#!/usr/bin/env node

/**
 * Backend Setup Verification Script
 * Run: node scripts/verify-setup.js
 */

import fs from 'fs';
import path from 'path';

const checks = [];

function check(name, condition, message = '') {
  checks.push({
    name,
    passed: condition,
    message,
  });
  
  const icon = condition ? '✅' : '❌';
  console.log(`${icon} ${name}`);
  if (message) console.log(`   ${message}`);
}

console.log('\n🔍 Verifying Backend Setup...\n');

// Check environment files
check(
  'Environment configuration exists',
  fs.existsSync('.env.example'),
  '.env.example found'
);

check(
  'Local environment configured',
  fs.existsSync('.env.local'),
  '.env.local found (make sure to fill in real values)'
);

// Check API files
const apiFiles = [
  'api/config/db.js',
  'api/models/Member.js',
  'api/models/Donation.js',
  'api/models/Admin.js',
  'api/auth/login.js',
  'api/auth/register.js',
  'api/members.js',
  'api/donations.js',
  'api/dashboard.js',
];

const allApiFilesExist = apiFiles.every(file => fs.existsSync(file));
check(
  'API files created',
  allApiFilesExist,
  `${apiFiles.length} API endpoint files ready`
);

// Check middleware
check(
  'Authentication middleware exists',
  fs.existsSync('api/middleware/auth.js'),
  'Auth protection middleware ready'
);

// Check package.json dependencies
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const requiredDeps = ['mongoose', 'jsonwebtoken', 'bcryptjs'];
const depsInstalled = requiredDeps.every(dep => 
  packageJson.dependencies[dep]
);
check(
  'Backend dependencies in package.json',
  depsInstalled,
  requiredDeps.join(', ')
);

// Check scripts
const requiredScripts = ['setup-admin'];
const scriptsExist = requiredScripts.every(script => 
  packageJson.scripts[script]
);
check(
  'Backend scripts configured',
  scriptsExist,
  'setup-admin script ready'
);

// Check vercel.json
check(
  'Vercel configuration updated',
  fs.existsSync('vercel.json'),
  'Functions and environment variables configured'
);

// Check documentation
check(
  'API Documentation exists',
  fs.existsSync('API_DOCUMENTATION.md'),
  'Complete API docs for reference'
);

check(
  'Deployment Guide exists',
  fs.existsSync('DEPLOYMENT_GUIDE.md'),
  'Step-by-step deployment instructions'
);

// Check utilities
check(
  'API utilities created',
  fs.existsSync('src/utils/api.js'),
  'Frontend API integration helpers ready'
);

// Summary
console.log('\n' + '='.repeat(50));
const passed = checks.filter(c => c.passed).length;
const total = checks.length;
console.log(`\n📊 Result: ${passed}/${total} checks passed\n`);

if (passed === total) {
  console.log('✨ Backend setup is complete!');
  console.log('\nNext steps:');
  console.log('1. npm install (install dependencies)');
  console.log('2. Create MongoDB Atlas account');
  console.log('3. Update .env.local with MongoDB connection string');
  console.log('4. npm run setup-admin (create initial admin)');
  console.log('5. npm run dev (start development server)');
} else {
  console.log('⚠️  Some checks failed. Please review the messages above.');
  process.exit(1);
}

console.log('\n' + '='.repeat(50) + '\n');
