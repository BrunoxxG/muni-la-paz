const { User } = require('../../db/connection');
const { comparePassword } = require('../../auth/auth');
const { generateToken } = require('../../jwt/jwt');

module.exports = async (data) => {
    const { email, password } = data;
    const user = await User.findOne({ where: { email } });

    if (!user) throw new Error('Incorrect email or password');

    const isMatchPassword = await comparePassword(password, user.password);
    if (!isMatchPassword) throw new Error('Incorrect email or password');

    if(!user.passwordChanged) throw new Error('Change password required');
    
    const token = generateToken(user.email, user.rol);
    
    return token;
};