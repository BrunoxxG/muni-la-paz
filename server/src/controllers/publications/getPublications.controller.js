const { Publication } = require("../../db/connection");

module.exports = async (type) => {

  const allPublications = !type? await Publication.findAll({ order: [['id', 'DESC']] })
  :
  await Publication.findAll({
    where: {
      type: type
    },
    order: [['id', 'DESC']]
  });

  return allPublications;
};