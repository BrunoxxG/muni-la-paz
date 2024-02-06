const { Complex, User } = require("../../db/connection");

module.exports = async (data, email) => {
  const newComplex = await Complex.create(data);
  const associatedUser = await User.findOne({where: {email}})
  await newComplex.setUser(associatedUser);
  return newComplex;
};