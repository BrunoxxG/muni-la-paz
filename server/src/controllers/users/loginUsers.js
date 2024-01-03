const { User } = require('../../db/connection');
const { comparePassword } = require('../../auth/auth');
const { generateToken } = require('../../jwt/jwt');


module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Incorrect email or password' });

    const isMatchPassword = await comparePassword(password, user.password);
    if (!isMatchPassword) return res.status(400).json({ message: 'Incorrect email or password' });

    if(!user.passwordChanged) return res.status(201).json({ message: 'Change password required' });
    
    const token = generateToken(user.email, user.rol);
    res.setHeader('Authorization', token);
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: 'Error' });
  }
};