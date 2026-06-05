import jwt from 'jsonwebtoken';

const protect = (handler) => {
  return async (req, res) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
        return res.status(401).json({ success: false, message: 'Not authorized' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.adminId = decoded.id;
      return handler(req, res);
    } catch (error) {
      return res.status(401).json({ success: false, message: 'Token expired or invalid' });
    }
  };
};

export default protect;
