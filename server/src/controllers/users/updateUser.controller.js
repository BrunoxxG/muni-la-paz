const { User } = require('../../db/connection');

module.exports = async (data, id) => {
    await User.update(data, { where: { id } });

    return;
};