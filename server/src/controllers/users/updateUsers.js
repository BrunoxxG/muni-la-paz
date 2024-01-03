const { User } = require('../../db/connection');

module.exports = async (req, res) => {
  try {
    await User.update(req.body, { where: { id: req.params.id } });

    return res.status(200).json({ message: 'Update Complete' });
  } catch (error) {
    return res.status(500).json({ message: 'Error' });
  }
};