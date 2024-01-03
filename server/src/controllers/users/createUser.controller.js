const { User } = require('../../db/connection');
const { hashPassword } = require('../../auth/auth');

module.exports = async (user) => {
    const { name, email } = user;
    const password = await hashPassword(email);

    const newUser = await User.create({ name, email, password });

    return newUser;
};