const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (email, rol, name) => {
  const payload = { email, rol, name};
  const options = { expiresIn: '360m' };
  const token = jwt.sign(payload, process.env.JWT_SECRET, options);
  if (rol === 'Admin') {
    return { token, rol, name };
  }
  return {token, name};
};

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = { generateToken, verifyToken };
