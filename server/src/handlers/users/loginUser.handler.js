const { loginUserController } = require('../../controllers');

module.exports = async (req, res) => {
  try {
    const token = await loginUserController(req.body);
    res.setHeader('Authorization', token);
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};