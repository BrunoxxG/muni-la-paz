const fs = require('fs/promises');

module.exports = async () => {

  const files = await fs.readdir('./public/images/carrousel');
  const imagePaths = files.map(filename => `/public/images/carrousel/${filename}`);
  
  return imagePaths;

};