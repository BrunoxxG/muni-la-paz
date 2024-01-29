const { User } = require('../../db/connection');
const { comparePassword } = require('../../auth/auth');
const { generateToken } = require('../../jwt/jwt');

module.exports = async (data) => {
    const { email, password } = data;
    try {
        const user = await User.findOne({ where: { email } });
    
        if (!user) throw ({ statusCode: 402,message: 'Email o Contraseña Incorrectos' });
    
        const isMatchPassword = await comparePassword(password, user.password);
        if (!isMatchPassword) throw ({ statusCode: 402,message: 'Email o Contraseña Incorrectos' });
    
        if(!user.active) throw ({ statusCode: 405, message: 'Usuario Desactivado' });
    
        if(!user.passwordChanged) throw ({ statusCode: 406, message: 'Se necesita cambiar la Contraseña, revise su Email' });
        
        const token = generateToken(user.email, user.rol, user.name);
        
        return token;
        
    } catch (error) {
        throw error;
    }
};