const { User } = require('../../db/connection');
const { hashPassword } = require('../../auth/auth');

module.exports = async (req, res) => {
  try {
    const { name, email } = req.body;
    const password = await hashPassword(email);

    await User.create({ name, email, password });

    return res.status(200).json({ message: 'Created User' });
  } catch (error) {
    return res.status(500).json({ message: 'Error' });
  }
};