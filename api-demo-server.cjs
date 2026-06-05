#!/usr/bin/env node
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const ExcelJS = require('exceljs');

const DONATIONS_FILE = path.join(__dirname, 'donations-data.json');
const DONATIONS_EXCEL = path.join(__dirname, 'donations-data.xlsx');
const MEMBERS_FILE = path.join(__dirname, 'members-data.json');
const MEMBERS_EXCEL = path.join(__dirname, 'members-data.xlsx');

function readJsonFile(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
    return [];
  } catch (e) {
    return [];
  }
}

function writeJsonFile(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

async function saveDonationsToExcel(donations) {
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Donations');

    // Add headers
    worksheet.columns = [
      { header: 'ক্রমিক', key: 'serial', width: 8 },
      { header: 'দাতার নাম', key: 'donorName', width: 20 },
      { header: 'মোবাইল নম্বর', key: 'donorPhone', width: 15 },
      { header: 'পরিমাণ (টাকা)', key: 'amount', width: 15 },
      { header: 'কার্যক্রম', key: 'causeName', width: 20 },
      { header: 'পেমেন্ট পদ্ধতি', key: 'paymentMethod', width: 15 },
      { header: 'ট্রানজেকশন ID', key: 'transactionId', width: 15 },
      { header: 'তারিখ', key: 'date', width: 18 },
      { header: 'বার্তা', key: 'donorMessage', width: 25 },
    ];

    // Style header row
    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    headerRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF6366F1' } };

    // Add data rows
    donations.forEach((donation, index) => {
      const row = worksheet.addRow({
        serial: index + 1,
        donorName: donation.donorName,
        donorPhone: donation.donorPhone,
        amount: donation.amount,
        causeName: donation.causeName,
        paymentMethod: donation.paymentMethod,
        transactionId: donation.transactionId,
        date: new Date(donation.date).toLocaleDateString('bn-BD', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        }),
        donorMessage: donation.donorMessage || '',
      });
      
      // Alternate row colors
      if (index % 2 === 0) {
        row.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF3F4F6' } };
      }
    });

    // Add total row
    const totalRow = worksheet.addRow({
      serial: '',
      donorName: 'মোট',
      donorPhone: '',
      amount: donations.reduce((sum, d) => sum + (d.amount || 0), 0),
      causeName: '',
      paymentMethod: '',
      transactionId: '',
      date: '',
      donorMessage: '',
    });
    totalRow.font = { bold: true };
    totalRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFE4E6' } };

    // Save file
    await workbook.xlsx.writeFile(DONATIONS_EXCEL);
    console.log(`✅ Donations Excel saved: ${DONATIONS_EXCEL}`);
  } catch (e) {
    console.error('❌ Error saving Excel:', e.message);
  }
}

async function saveMembersToExcel(members) {
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Members');

    // Add headers
    worksheet.columns = [
      { header: 'ক্রমিক', key: 'serial', width: 8 },
      { header: 'সদস্যের নাম', key: 'name', width: 20 },
      { header: 'মোবাইল নম্বর', key: 'phone', width: 15 },
      { header: 'ইমেইল', key: 'email', width: 25 },
      { header: 'ঠিকানা', key: 'address', width: 25 },
      { header: 'যোগদানের তারিখ', key: 'joinedDate', width: 18 },
    ];

    // Style header row
    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    headerRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF10B981' } };

    // Add data rows
    members.forEach((member, index) => {
      const row = worksheet.addRow({
        serial: index + 1,
        name: member.name,
        phone: member.phone,
        email: member.email || '',
        address: member.address || '',
        joinedDate: new Date(member.joinedDate).toLocaleDateString('bn-BD'),
      });
      
      // Alternate row colors
      if (index % 2 === 0) {
        row.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF0FDFA' } };
      }
    });

    // Save file
    await workbook.xlsx.writeFile(MEMBERS_EXCEL);
    console.log(`✅ Members Excel saved: ${MEMBERS_EXCEL}`);
  } catch (e) {
    console.error('❌ Error saving Excel:', e.message);
  }
}


function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  res.end(JSON.stringify(data));
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    res.end();
    return;
  }

  // API Health
  if (pathname === '/api/' || pathname === '/api') {
    if (req.method === 'GET') {
      sendJson(res, 200, {
        success: true,
        message: '✅ BNP Social Force API (Demo Mode)',
        version: '1.0.0',
        database: 'Local JSON Files',
      });
    }
    return;
  }

  // GET Donations
  if (pathname === '/api/donations' && req.method === 'GET') {
    const donations = readJsonFile(DONATIONS_FILE);
    const total = donations.reduce((sum, d) => sum + (d.amount || 0), 0);
    sendJson(res, 200, {
      success: true,
      data: donations,
      statistics: { total, count: donations.length },
    });
    return;
  }

  // POST Donation
  if (pathname === '/api/donations' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const donations = readJsonFile(DONATIONS_FILE);
        const newDonation = {
          id: Date.now().toString(),
          ...data,
          status: 'নিশ্চিত',
        };
        donations.push(newDonation);
        writeJsonFile(DONATIONS_FILE, donations);
        
        // Save to Excel
        saveDonationsToExcel(donations);
        
        console.log(`✅ New donation: ${data.donorName} - ৳${data.amount}`);
        
        sendJson(res, 201, {
          success: true,
          message: '✅ Donation saved successfully!',
          data: newDonation,
        });
      } catch (e) {
        console.error('Error:', e);
        sendJson(res, 400, { success: false, message: e.message });
      }
    });
    return;
  }

  // GET Members
  if (pathname === '/api/members' && req.method === 'GET') {
    const members = readJsonFile(MEMBERS_FILE);
    sendJson(res, 200, {
      success: true,
      data: members,
      pagination: { total: members.length },
    });
    return;
  }

  // POST Member
  if (pathname === '/api/members' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const members = readJsonFile(MEMBERS_FILE);
        const newMember = {
          id: Date.now().toString(),
          ...data,
          joinedDate: new Date().toISOString(),
        };
        members.push(newMember);
        writeJsonFile(MEMBERS_FILE, members);
        
        // Save to Excel
        saveMembersToExcel(members);
        
        console.log(`✅ New member: ${data.name}`);
        
        sendJson(res, 201, {
          success: true,
          message: '✅ Member added successfully!',
          data: newMember,
        });
      } catch (e) {
        console.error('Error:', e);
        sendJson(res, 400, { success: false, message: e.message });
      }
    });
    return;
  }

  // Dashboard
  if (pathname === '/api/dashboard' && req.method === 'GET') {
    const donations = readJsonFile(DONATIONS_FILE);
    const members = readJsonFile(MEMBERS_FILE);
    const total = donations.reduce((sum, d) => sum + (d.amount || 0), 0);
    sendJson(res, 200, {
      success: true,
      statistics: {
        totalDonations: total,
        totalMembers: members.length,
        totalTransactions: donations.length,
      },
    });
    return;
  }

  // 404
  sendJson(res, 404, { success: false, message: 'Not found' });
});

const PORT = 3002;
server.listen(PORT, () => {
  console.log(`\n✅ Demo API Server Running!`);
  console.log(`📍 Port: ${PORT}`);
  console.log(`📊 API:  http://localhost:${PORT}/api`);
  console.log(`💾 Data: JSON files\n`);
});
