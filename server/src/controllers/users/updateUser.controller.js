const { hashPassword } = require('../../auth/auth');
const { User } = require('../../db/connection');

module.exports = async (data, id) => {

    if (data.updatePassword === 'true') {
        data = { ...data, 
            passwordChanged: true, 
            password: await hashPassword(data.password) 
        };
    }
    
    await User.update(data, { where: { id } });

    return;
};