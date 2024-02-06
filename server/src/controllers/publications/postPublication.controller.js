const { Publication, User } = require("../../db/connection");

module.exports = async (data, email) => {
  const newPublication = await Publication.create(data);
  const associatedUser = await User.findOne({where: {email}})
  await newPublication.setUser(associatedUser);


  return newPublication;
};