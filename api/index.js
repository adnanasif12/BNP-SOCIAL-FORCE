export default (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  res.status(200).json({
    success: true,
    message: 'BNP Social Force API is running',
    version: '1.0.0',
    endpoints: {
      auth: {
        login: 'POST /api/auth/login',
        register: 'POST /api/auth/register',
      },
      members: {
        getAll: 'GET /api/members',
        create: 'POST /api/members',
        update: 'PUT /api/members?id=:id',
        delete: 'DELETE /api/members?id=:id',
      },
      donations: {
        getAll: 'GET /api/donations',
        create: 'POST /api/donations',
        update: 'PUT /api/donations?id=:id',
        delete: 'DELETE /api/donations?id=:id',
      },
    },
  });
};
