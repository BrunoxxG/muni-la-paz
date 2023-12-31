const {User} = require('../../db/connection');

module.exports = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ message: 'Error' });
  }
};